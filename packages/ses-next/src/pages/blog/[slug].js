import Link from 'next/link';

import { PortableText } from '@portabletext/react';
import { formatDistanceToNow } from 'date-fns';

import { Layout, CustomImage } from '../../components';
import { getBasePageProps } from '../../lib/basePageProps';
import { getBlogPosts } from '../../lib/content/contentService';

export default function BlogPost({ content, googleReviews, pageUrl, tags, post }) {
  return (
    <Layout content={content} pageUrl={pageUrl} googleReviews={googleReviews}>
      <div className="flex min-h-[50vh] flex-col mt-6 justify-center gap-6 lg:flex-row container mx-auto">
        <section className="max-w-xl max-lg:mx-auto max-lg:w-full">
          <div className="mx-auto sm:max-w-none">
            <div className="mb-8 px-6">
              <div className="flex items-center gap-3">
                <Link href="/blog" className="inline-block hover:opacity-80">
                  <h1 className="font-title text-base-content text-xl font-extrabold">SES Melbourne Blog</h1>
                </Link>{' '}
                <div className="tooltip tooltip-right" data-tip="RSS">
                  <a target="_blank" href="https://daisyui.com/blog/rss.xml" className="hover:text-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z"></path>
                      <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <ul class="menu menu-horizontal lg:menu-vertical lg:w-56">
              <li class="menu-title">Tags</li>{' '}
              {tags.map((tag) => (
                <li class="menu-item">
                  <Link href={`/blog/tag/${tag}`} className="menu-link">
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <article className="mx-auto w-full md:w-3/5 px-10 prose lg:prose-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 md:text-left">
            {post.title}
          </h1>
          <div class="mb-2 text-gray-700 italic">
            Published{` `}
            <time title={post.publishedAt}>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</time>
          </div>
          <PortableText
            value={post.body}
            components={{
              types: { image: CustomImage },
            }}
          />
        </article>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const baseProps = await getBasePageProps({ pageUrl: '' });
  const blogPosts = await getBlogPosts();
  const post = blogPosts.find(({ slug }) => slug === params.slug);
  const tags = blogPosts.flatMap(({ tags }) => tags);

  return {
    props: {
      ...baseProps,
      blogPosts,
      post,
      tags,
    },
  };
};

export const getStaticPaths = async () => {
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
