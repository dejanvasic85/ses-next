import getConfig from 'next/config';
import { PortableText } from '@portabletext/react';
import urlBuilder from '@sanity/image-url';

import { Navbar, Footer, PageHead } from '../../components';
import { getHomePageContent } from '../../lib/content/contentService';

const { serverRuntimeConfig } = getConfig();

const CustomImage = (props) => {
  const src = urlBuilder({
    projectId: serverRuntimeConfig.sanityProjectId,
    dataset: serverRuntimeConfig.sanityDataset,
  })
    .image(props.value)
    .url();
  return <img src={src} />;
};

export default function Service({
  canonicalUrl,
  companyName,
  companyLogo,
  contact,
  meta,
  navLinks,
  social,
  shortTitle,
  service,
}) {
  const { name, content } = service;
  console.log('service', service);
  return (
    <>
      <PageHead
        canonicalUrl={canonicalUrl}
        companyLogo={companyLogo}
        companyName={companyName}
        description={meta.description}
        socialTitle={companyName}
        title={`${service.name} - ${meta.title}`}
      />
      <Navbar contactPhone={contact.phone} title={shortTitle} links={navLinks} />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-md px-4 md:px-8">
          <article className="prose lg:prose-lg">
            <h1 className="text-center">{name}</h1>
            <PortableText
              value={content}
              components={{
                types: { image: CustomImage },
              }}
            />
          </article>
        </div>
      </div>

      <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12 pb-20">
        <div class="-m-1 flex flex-wrap md:-m-2">
          {service.imageGallery.map(({ alt, src }, idx) => (
            <div class="flex w-1/3 flex-wrap" key={idx}>
              <div class="w-full p-1 md:p-2">
                <img alt={alt} class="block h-full w-full rounded-lg object-cover object-center" src={src} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer social={social} />
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const content = await getHomePageContent();
  const { baseUrl, companyName, companyLogo, contact, meta, social, shortTitle } = content;
  const service = content.services.items.find(({ slug }) => slug === params.id);
  const canonicalUrl = `${baseUrl}services/${params.id}`;

  return {
    props: {
      canonicalUrl,
      companyName,
      companyLogo,
      contact,
      meta,
      navLinks: { home: '/', services: '/#services', about: '/#about', contact: '/#contact' },
      social,
      shortTitle,
      service,
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
