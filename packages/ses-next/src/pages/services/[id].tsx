import { GetStaticProps, GetStaticPaths } from 'next';
import { PortableText } from '@portabletext/react';
import { ProductJsonLd } from 'next-seo';
import Link from 'next/link';

import { getBlogPosts, getHomePageContent } from '../../lib/content/contentService';
import { getBasePageProps } from '../../lib/basePageProps';
import { Layout, CustomImage } from '../../components';

interface ServiceProps {
  blogPosts: any[];
  content: any;
  service: any;
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
        images={service.imageGallery.map(({ src }: any) => src)}
      />
      <Layout content={content} pageUrl={pageUrl} title={title}>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <article className="mx-auto px-4 md:px-8 max-w-screen-lg prose lg:prose-lg">
            <h1 className="text-center">{name}</h1>
            <PortableText
              value={serviceContent}
              components={{
                types: { image: CustomImage },
              }}
            />
          </article>

          <div className="mx-auto px-4 md:px-8 max-w-screen-lg prose lg:prose-lg">
            <h2>Blog posts</h2>
            <p>Check out some of our {service.name} blog posts:</p>
            {blogPosts.map(({ id, title, slug }: any) => (
              <div key={id}>
                <Link href={`/blog/${slug}`} className="py-2">
                  {title}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12 pb-20">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {service.imageGallery.map(({ alt, src }: any, idx: number) => (
              <div className="flex w-1/3 flex-wrap" key={idx}>
                <div className="w-full p-1 md:p-2">
                  <img alt={alt} className="block h-full w-full rounded-lg object-cover object-center" src={src} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = await getBasePageProps({ pageUrl: `services/${params?.id}` });
  const service = (props.content as any).services.items.find(({ slug }: any) => slug === params?.id);
  const [titlePrefix = ''] = (props.content as any).meta.title.split('|');
  const posts = await getBlogPosts();
  const blogPosts = posts.filter(({ tags }: any) => tags.includes(params?.id));

  return {
    props: {
      ...props,
      service,
      title: `${titlePrefix.trim()} | ${service.name}`,
      blogPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const content = await getHomePageContent();
  const paths = content.services.items
    .filter(({ slug }: any) => slug)
    .map(({ slug }: any) => ({
      params: { id: slug },
    }));

  return {
    paths,
    fallback: false,
  };
};
