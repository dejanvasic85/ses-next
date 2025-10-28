import { Activity } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { PortableText } from '@portabletext/react';
import { ProductJsonLd } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';

import { getBlogPosts, getHomePageContent } from '../../lib/content/contentService';
import { getBasePageProps } from '../../lib/basePageProps';
import { Layout, CustomImage, ImageCarousel } from '../../components';
import type { HomePageContentResult } from '@/lib/content/contentService';
import type { ProcessedBlogPost, ProcessedServiceItem } from '@/types';

interface ServiceProps {
  blogPosts: ProcessedBlogPost[];
  content: HomePageContentResult;
  service: ProcessedServiceItem;
  pageUrl: string;
  title: string;
}

export default function Service({ blogPosts, content, service, pageUrl, title }: ServiceProps) {
  const { name, content: serviceContent } = service;
  return (
    <>
      <ProductJsonLd
        type="Service"
        productName={service.name}
        description={service.description}
        images={service.imageGallery?.map(({ src }) => src) ?? []}
      />
      <Layout content={content} pageUrl={pageUrl} title={title}>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <article className="mx-auto px-4 md:px-8 max-w-screen-lg prose lg:prose-lg">
            <h1 className="text-center">{name}</h1>
            {serviceContent && (
              <PortableText
                value={serviceContent}
                components={{
                  types: {
                    image: ({ value }) => <CustomImage value={value} />,
                  },
                }}
              />
            )}
          </article>
          {service.imageGallery && <ImageCarousel images={service.imageGallery} serviceName={service.name} />}

          <Activity mode={blogPosts.length > 0 ? 'visible' : 'hidden'}>
            <div className="mx-auto px-4 md:px-8 max-w-screen-lg mt-12 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Blog Posts</h2>
              <p className="text-gray-600 mb-6">Explore our {service.name.toLowerCase()} articles and insights</p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map(({ id, title, slug, description, photo, publishedAt }) => (
                  <Link
                    key={id}
                    href={`/blog/${slug}`}
                    className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gray-200">
                      <Image
                        src={photo}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(publishedAt).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="text-blue-600 text-sm font-medium group-hover:underline">Read more →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Activity>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = await getBasePageProps({ pageUrl: `services/${params?.id}` });
  const content = props.content as HomePageContentResult;
  const service = content.services.items.find(({ slug }) => slug === params?.id);
  const [titlePrefix = ''] = content.meta.title.split('|');
  const posts = await getBlogPosts();
  const blogPosts = posts.filter(({ tags }) => tags.includes(params?.id as string));

  return {
    props: {
      ...props,
      service: service!,
      title: `${titlePrefix.trim()} | ${service!.name}`,
      blogPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const content = await getHomePageContent();
  const paths = content.services.items
    .filter(({ slug }) => slug)
    .map(({ slug }) => ({
      params: { id: slug },
    }));

  return {
    paths,
    fallback: false,
  };
};
