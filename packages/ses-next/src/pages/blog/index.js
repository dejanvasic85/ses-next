import Link from 'next/link';
import NextImage from 'next/image';

import { BlogMenu, BlogLayout, Layout } from '../../components';
import { getBasePageProps } from '../../lib/basePageProps';
import { getBlogPosts } from '../../lib/content/contentService';
import { tagsFromBlogs } from '../../lib/blogUtils';

export default function Blog({ content, googleReviews, pageUrl, tags, blogPosts }) {
  return (
    <Layout content={content} pageUrl={pageUrl} googleReviews={googleReviews}>
      <BlogLayout tags={tags}>
        <div className="mx-auto w-full max-w-2xl">
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

export const getStaticProps = async () => {
  const baseProps = await getBasePageProps({ pageUrl: 'blog' });
  const blogPosts = await getBlogPosts();
  const tags = tagsFromBlogs(blogPosts);

  return {
    props: {
      ...baseProps,
      blogPosts: blogPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
      tags,
    },
  };
};
