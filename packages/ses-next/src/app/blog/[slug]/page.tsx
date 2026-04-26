import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';

import { BlogLayout } from '@/components/BlogLayout';
import { CustomImage } from '@/components/CustomImage';
import { SanityImage } from '@/components/SanityImage';
import { getBlogPosts, getSiteSettings } from '@/lib/content/contentService';
import { tagsWithCountFromBlogs } from '@/lib/blogUtils';
import { safeJsonLd } from '@/lib/structuredData';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const publishedDateFormatValue = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
} as const;

const portableTextComponents = {
  types: {
    image: ({ value }: { value: string }) => <CustomImage value={value} />,
  },
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.filter(({ slug }) => slug).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Storm Electrical Solutions`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.photo }],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [blogPosts, siteSettings] = await Promise.all([getBlogPosts(), getSiteSettings()]);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const tagsWithCount = tagsWithCountFromBlogs(blogPosts);
  const { baseUrl, companyName } = siteSettings;
  const blogIndexUrl = new URL('/blog', baseUrl).toString();
  const pageUrl = new URL(`/blog/${slug}`, baseUrl).toString();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: companyName,
    },
    url: pageUrl,
    datePublished: post.publishedAt,
    image: post.photo,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: blogIndexUrl },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      <BlogLayout tagsWithCount={tagsWithCount} totalPosts={blogPosts.length}>
        <article className="prose lg:prose-lg mx-auto w-full px-8 lg:px-0">
          <h1 className="mb-12 text-4xl leading-tight font-bold tracking-tighter md:text-left md:text-5xl md:leading-none lg:text-6xl">
            {post.title}
          </h1>
          <figure className="w-full">
            <SanityImage
              loading="lazy"
              width={800}
              height={400}
              src={post.photo}
              className="rounded-box border-base-300/5 bg-base-300 border"
              alt={post.title}
            />
          </figure>
          <div className="mb-2 text-gray-700 italic">
            Published{` `}
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-AU', publishedDateFormatValue)}
            </time>
          </div>
          <PortableText value={post.body} components={portableTextComponents} />
        </article>
      </BlogLayout>
    </>
  );
}
