import Link from 'next/link';
import NextImage from 'next/image';

import { Layout } from '../../components';
import { getBasePageProps } from '../../lib/basePageProps';
import { getBlogPosts } from '../../lib/content/contentService';

export default function Home({ content, googleReviews, pageUrl, tags, blogPosts }) {
  return (
    <Layout content={content} pageUrl={pageUrl} googleReviews={googleReviews}>
      <div className="flex min-h-[50vh] w-full flex-col mt-6 justify-center gap-6 p-4 lg:flex-row">
        <section className="max-w-2xl max-lg:mx-auto max-lg:w-full">
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
        <div className="mx-auto w-full max-w-2xl">
          <div className="grid justify-items-stretch gap-6">
            {blogPosts.map(({ id, title, tags, photo, slug, publishedAt }) => (
              <Link
                key={id}
                class="card sm:card-side hover:bg-base-200 transition-colors sm:max-w-none"
                href={`/blog/${slug}`}
              >
                <figure class="mx-auto w-full object-cover p-6 max-sm:pb-0 sm:max-w-[12rem] sm:pe-0">
                  <NextImage
                    width={200}
                    height={200}
                    loading="lazy"
                    src={photo}
                    class="border-base-content bg-base-300 rounded-btn border border-opacity-5"
                    alt={title}
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">{title}</h2>{' '}
                  <div>
                    {tags.map((tag) => (
                      <span class="badge" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p class="text-xs opacity-60">{new Date(publishedAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
