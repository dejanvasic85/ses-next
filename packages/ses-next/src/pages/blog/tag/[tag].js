import Link from 'next/link';
import NextImage from 'next/image';

import { BlogLayout, Layout } from '../../../components';
import { getBasePageProps } from '../../../lib/basePageProps';
import { getBlogPosts } from '../../../lib/content/contentService';
import { tagsFromBlogs } from '../../../lib/blogUtils';

export default function Tags({ content, googleReviews, pageUrl, tags, blogPosts }) {
  return (
    <Layout content={content} pageUrl={pageUrl} googleReviews={googleReviews}>
      <BlogLayout tags={tags}>
        <div className="mx-auto w-full">
          <div className="grid justify-items-stretch gap-6">
            {blogPosts.map(({ id, description, title, tags, photo, slug, publishedAt }) => (
              <div key={id} className="card sm:card-side hover:bg-base-200 transition-colors sm:max-w-none">
                <figure className="mx-auto w-full object-cover p-6 max-sm:pb-0 sm:max-w-[12rem] sm:pe-0">
                  <NextImage
                    width={300}
                    height={300}
                    loading="lazy"
                    src={photo}
                    className="border-base-content bg-base-300 rounded-btn border border-opacity-5"
                    alt={title}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title underline">
                    <Link href={`/blog/${slug}`}>{title}</Link>
                  </h2>
                  <p className="text-xs opacity-60">{new Date(publishedAt).toLocaleDateString()}</p>
                  <p className="text-sm opacity-60">{description}</p>
                  <div>
                    {tags.map((tag) => (
                      <span className="badge" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlogLayout>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const baseProps = await getBasePageProps({ pageUrl: `blog/tag/${params.tag}` });
  const blogPosts = await getBlogPosts();
  const tags = tagsFromBlogs(blogPosts);

  return {
    props: {
      ...baseProps,
      blogPosts: blogPosts.filter(({ tags }) => tags.includes(params.tag)),
      tags,
    },
  };
};

export const getStaticPaths = async () => {
  const blogPosts = await getBlogPosts();

  const tagSet = [];
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
