import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import NextImage from 'next/image';

import { BlogLayout, Layout } from '@/components';
import { getBasePageProps } from '@/lib/basePageProps';
import { getBlogPosts } from '@/lib/content/contentService';
import { tagsWithCountFromBlogs, type TagWithCount } from '@/lib/blogUtils';
import type { HomePageContentResult } from '@/lib/content/contentService';
import type { BlogPost } from '@/types';

interface TagsProps {
  content: HomePageContentResult;
  pageUrl: string;
  tagsWithCount: TagWithCount[];
  blogPosts: BlogPost[];
  totalPosts: number;
}

export default function Tags({ content, pageUrl, tagsWithCount, blogPosts, totalPosts }: TagsProps) {
  return (
    <Layout content={content} pageUrl={pageUrl}>
      <BlogLayout tagsWithCount={tagsWithCount} totalPosts={totalPosts}>
        <div className="grid gap-6">
          {blogPosts.map(({ id, description, title, tags, photo, slug, publishedAt }) => (
            <article key={id} className="card sm:card-side hover:bg-base-200 transition-colors">
              <figure className="w-full p-4 max-sm:pb-0 sm:w-48 sm:shrink-0 sm:pe-0">
                <NextImage
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
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag as string;
  const baseProps = await getBasePageProps({ pageUrl: `blog/tag/${tag}` });
  const blogPosts = await getBlogPosts();
  const tagsWithCount = tagsWithCountFromBlogs(blogPosts);

  return {
    props: {
      ...baseProps,
      blogPosts: blogPosts.filter(({ tags }) => tags.includes(tag)),
      tagsWithCount,
      totalPosts: blogPosts.length,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPosts = await getBlogPosts();

  const tagSet: string[] = [];
  blogPosts
    .flatMap(({ tags }) => tags)
    .forEach((tag) => {
      if (!tagSet.includes(tag)) {
        tagSet.push(tag);
      }
    });

  const paths = tagSet.map((tag) => ({ params: { tag } }));

  return {
    paths,
    fallback: false,
  };
};
