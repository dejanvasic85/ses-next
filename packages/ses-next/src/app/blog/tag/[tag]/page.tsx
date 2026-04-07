import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlogLayout } from '@/components/BlogLayout';
import { SanityImage } from '@/components/SanityImage';
import { getBlogPosts } from '@/lib/content/contentService';
import { tagsWithCountFromBlogs } from '@/lib/blogUtils';

type BlogTagPageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const tagSet = new Set(posts.flatMap(({ tags }) => tags));
  return Array.from(tagSet).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: BlogTagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = tag.replace(/-/g, ' ');

  return {
    title: `${label} | Blog | Storm Electrical Solutions`,
    description: `Read our blog posts about ${label}.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/blog/tag/${encodeURIComponent(tag)}`,
    },
  };
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag } = await params;
  const blogPosts = await getBlogPosts();
  const sortedBlogPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const tagsWithCount = tagsWithCountFromBlogs(sortedBlogPosts);
  const filteredPosts = sortedBlogPosts.filter(({ tags }) => tags.includes(tag));

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <BlogLayout tagsWithCount={tagsWithCount} totalPosts={sortedBlogPosts.length}>
      <div className="grid gap-6">
        {filteredPosts.map(({ id, description, title, tags, photo, slug, publishedAt }) => (
          <article key={id} className="card sm:card-side hover:bg-base-200 transition-colors">
            <figure className="w-full p-4 max-sm:pb-0 sm:w-48 sm:shrink-0 sm:pe-0">
              <SanityImage
                width={300}
                height={300}
                loading="lazy"
                src={photo}
                className="bg-base-300 rounded-lg w-full h-auto object-cover aspect-square"
                alt={title}
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
                {tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog/tag/${encodeURIComponent(t)}`}
                    className="badge badge-outline badge-sm hover:badge-primary"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </BlogLayout>
  );
}
