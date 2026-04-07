import type { Metadata } from 'next';
import Link from 'next/link';
import NextImage from 'next/image';

import { BlogLayout } from '@/components/BlogLayout';
import { getBlogPosts, getSiteSettings } from '@/lib/content/contentService';
import { sanityImageLoader } from '@/lib/sanityImageLoader';
import { tagsWithCountFromBlogs } from '@/lib/blogUtils';

export const metadata: Metadata = {
  title: 'Blog | Storm Electrical Solutions',
  description: 'Electrical tips, guides, and news from the Storm Electrical Solutions team in Melbourne.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Storm Electrical Solutions',
    description: 'Electrical tips, guides, and news from the Storm Electrical Solutions team in Melbourne.',
  },
};

export default async function BlogPage() {
  const [blogPosts, siteSettings] = await Promise.all([getBlogPosts(), getSiteSettings()]);

  const sorted = [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const tagsWithCount = tagsWithCountFromBlogs(blogPosts);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteSettings.baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd)
            .replace(/</g, '\\u003c')
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029'),
        }}
      />
      <BlogLayout tagsWithCount={tagsWithCount} totalPosts={sorted.length}>
        <div className="grid gap-6">
          {sorted.map(({ id, description, title, tags, photo, slug, publishedAt }) => (
            <article key={id} className="card sm:card-side hover:bg-base-200 transition-colors">
              <figure className="w-full p-4 max-sm:pb-0 sm:w-48 sm:shrink-0 sm:pe-0">
                <NextImage
                  width={300}
                  height={300}
                  loading="lazy"
                  src={photo}
                  className="bg-base-300 rounded-lg w-full h-auto object-cover aspect-square"
                  alt={title}
                  loader={sanityImageLoader}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  <Link href={`/blog/${slug}`} className="hover:underline">
                    {title}
                  </Link>
                </h2>
                <p className="text-xs opacity-60">{new Date(publishedAt).toLocaleDateString()}</p>
                <p className="text-sm opacity-60 line-clamp-2">{description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${encodeURIComponent(tag)}`}
                      className="badge badge-outline badge-sm hover:badge-primary"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </BlogLayout>
    </>
  );
}
