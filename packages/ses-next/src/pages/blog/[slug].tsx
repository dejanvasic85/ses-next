import { GetStaticProps, GetStaticPaths } from 'next';
import NextImage from 'next/image';
import { ArticleJsonLd } from 'next-seo';

import { PortableText } from '@portabletext/react';
import { formatDistanceToNow } from 'date-fns';

import { Layout, BlogLayout, CustomImage } from '@/components';
import { getBasePageProps } from '@/lib/basePageProps';
import { getBlogPosts } from '@/lib/content/contentService';
import { tagsWithCountFromBlogs, type TagWithCount } from '@/lib/blogUtils';
import type { BasePageProps, BlogPost } from '@/types';

interface BlogPostProps extends BasePageProps {
  pageUrl: string;
  tagsWithCount: TagWithCount[];
  totalPosts: number;
  post: BlogPost;
}

export default function BlogPost({ pageUrl, tagsWithCount, totalPosts, post, services, siteSettings }: BlogPostProps) {
  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        headline={post.title}
        description={post.title}
        author="SES Melbourne"
        url={pageUrl}
        datePublished={post.publishedAt}
        image={post.photo}
      />
      <Layout services={services} siteSettings={siteSettings} pageUrl={pageUrl}>
        <BlogLayout tagsWithCount={tagsWithCount} totalPosts={totalPosts}>
          <article className="mx-auto w-full px-8 lg:px-0 prose lg:prose-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 md:text-left">
              {post.title}
            </h1>
            <figure className="w-full">
              <NextImage
                loading="lazy"
                width={800}
                height={400}
                src={post.photo}
                className="bg-base-300 rounded-box border-opacity-5"
                alt={post.title}
              />
            </figure>
            <div className="mb-2 text-gray-700 italic">
              Published{` `}
              <time title={post.publishedAt}>
                {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
              </time>
            </div>
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }) => <CustomImage value={value} />,
                },
              }}
            />
          </article>
        </BlogLayout>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const baseProps = await getBasePageProps({ pageUrl: `blog/${params?.slug}` });
  const blogPosts = await getBlogPosts();
  const post = blogPosts.find(({ slug }) => slug === params?.slug);
  const tagsWithCount = tagsWithCountFromBlogs(blogPosts);

  return {
    props: {
      ...baseProps,
      post,
      tagsWithCount,
      totalPosts: blogPosts.length,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPosts = await getBlogPosts();
  const paths = blogPosts
    .filter(({ slug }) => slug)
    .map(({ slug }) => ({
      params: { slug },
    }));

  return {
    paths,
    fallback: false,
  };
};
