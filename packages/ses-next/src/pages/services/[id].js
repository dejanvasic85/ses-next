import { PortableText } from '@portabletext/react';
import urlBuilder from '@sanity/image-url';

import { getHomePageContent } from '../../lib/content/contentService';
import { getBasePageProps } from '../../lib/basePageProps';
import { config } from '../../lib/config';
import { Layout } from '../../components';

const builder = urlBuilder({
  projectId: config.sanityProjectId,
  dataset: config.sanityDataset,
});

const CustomImage = (props) => {
  const src = builder.image(props.value).url();
  return <img src={src} alt="inline image" />;
};

export default function Service({ content, service, pageUrl, googleReviews, title }) {
  const { name, content: serviceContent } = service;
  return (
    <Layout content={content} pageUrl={pageUrl} googleReviews={googleReviews} title={title}>
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
      </div>

      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12 pb-20">
        <div className="-m-1 flex flex-wrap md:-m-2">
          {service.imageGallery.map(({ alt, src }, idx) => (
            <div className="flex w-1/3 flex-wrap" key={idx}>
              <div className="w-full p-1 md:p-2">
                <img alt={alt} className="block h-full w-full rounded-lg object-cover object-center" src={src} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const props = await getBasePageProps({ pageUrl: `services/${params.id}` });
  const service = props.content.services.items.find(({ slug }) => slug === params.id);
  const [titlePrefix = ''] = props.content.meta.title.split('|');

  return {
    props: {
      ...props,
      service,
      title: `${titlePrefix.trim()} | ${service.name}`,
    },
  };
};

export const getStaticPaths = async () => {
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
