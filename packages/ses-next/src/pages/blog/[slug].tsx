import { GetStaticProps, GetStaticPaths } from 'next';
import NextImage from 'next/image';
import { ArticleJsonLd } from 'next-seo';

import { PortableText } from '@portabletext/react';
import { formatDistanceToNow } from 'date-fns';

import { Layout, BlogLayout, CustomImage } from '@/components';
import { getBasePageProps } from '../../lib/basePageProps';
import { getBlogPosts } from '../../lib/content/contentService';
import { tagsFromBlogs } from '../../lib/blogUtils';

interface BlogPostProps {
  content: any;
  pageUrl: string;
  tags: string[];
  post: any;
}

export default function BlogPost({ content, pageUrl, tags, post }: BlogPostProps) {
  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        description={post.title}
        authorName="SES Melbourne"
        title={post.title}
        url={pageUrl}
        datePublished={post.publishedAt}
        images={[post.photo]}
      />
      <Layout content={content} pageUrl={pageUrl}>
        <BlogLayout tags={tags}>
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
                className="border-base-content bg-base-300 rounded-box border border-opacity-5"
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
  const tags = tagsFromBlogs(blogPosts);

  return {
    props: {
      ...baseProps,
      blogPosts,
      post,
      tags,
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
