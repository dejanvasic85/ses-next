import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { JsonLdScript, BreadcrumbJsonLd } from 'next-seo';

import { Layout } from '@/components/Layout';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Icon } from '@/components/Icon/Icon';
import { getBasePageProps } from '@/lib/basePageProps';
import type { BasePageProps, ServiceItem } from '@/types';

const pageTitle = 'Electrical Services Melbourne | Storm Electrical Solutions';
const pageDescription =
  'Licensed Melbourne electricians offering air conditioning, lighting, electrical testing, solar, data cabling and more. 19+ years experience. Free quotes. Call (03) 4050 7937.';

const serviceAreas = [
  'Altona',
  'Altona North',
  'Newport',
  'Yarraville',
  'Footscray',
  'Williamstown',
  'Moonee Ponds',
  'Ascot Vale',
  'Seddon',
  'Sunshine',
];

type ServicesHubProps = BasePageProps;

interface ServiceCardProps {
  service: ServiceItem;
}

function ServiceCard({ service }: ServiceCardProps) {
  const { name, blurb, slug, icon = 'bolt', featuredImage } = service;

  return (
    <article className="group relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <Link href={`/services/${slug}`} className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View {name} service</span>
      </Link>
      <div className="flex h-full flex-col justify-between p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary p-2">
              <Icon name={icon} size="xl" className="text-white" />
            </div>
            <h3 className="text-lg font-semibold border-b-2 border-primary">{name}</h3>
          </div>
          <p className="text-gray-500">{blurb}</p>
        </div>
        {featuredImage && (
          <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden relative">
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              fill
              className="object-cover object-center transition-all group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <span className="mt-4 inline-block text-primary font-medium group-hover:underline">Learn more →</span>
      </div>
    </article>
  );
}

export default function ServicesHub({ services, siteSettings, pageUrl }: ServicesHubProps) {
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Electrical Services Melbourne',
    description: pageDescription,
    url: pageUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: services.map(({ slug, name }, position) => ({
        '@type': 'ListItem',
        position: position + 1,
        name,
        url: new URL(`services/${slug}`, siteSettings.baseUrl).toString(),
      })),
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: siteSettings.baseUrl },
          { name: 'Services', item: pageUrl },
        ]}
      />
      <JsonLdScript data={collectionPageJsonLd} scriptKey="services-hub" />
      <Layout
        services={services}
        siteSettings={siteSettings}
        pageUrl={pageUrl}
        title={pageTitle}
        description={pageDescription}
      >
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <Container>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">Electrical Services Melbourne</h1>
            <p className="text-lg text-gray-600 mb-3">
              Storm Electrical Solutions provides a full range of residential and commercial electrical services across
              Melbourne&apos;s western suburbs. Our licensed electricians are CEC accredited with 19+ years of
              experience delivering safe, reliable, and code-compliant work — from emergency call-outs to planned
              installations.
            </p>
            <p className="text-lg text-gray-600 mb-10">
              We service Altona, Newport, Footscray, Williamstown, Yarraville and surrounding suburbs. Free quotes
              available. Call{' '}
              <a href={`tel:${siteSettings.phone}`} className="text-primary font-medium hover:underline">
                {siteSettings.phone}
              </a>
              .
            </p>

            <Heading level={2}>Our Services</Heading>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            <section aria-labelledby="service-areas-heading" className="mt-16">
              <h2
                id="service-areas-heading"
                className="text-gray-700 text-center mb-4 md:mb-6 text-2xl lg:text-3xl font-bold"
              >
                Service Areas
              </h2>
              <p className="text-gray-600 mb-4">
                We provide electrical services across Melbourne&apos;s western and inner-western suburbs, including:
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Service areas">
                {serviceAreas.map((area) => (
                  <li key={area} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {area}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="cta-heading" className="mt-16 bg-primary/5 rounded-xl p-8 text-center">
              <h2 id="cta-heading" className="text-gray-700 text-center mb-4 md:mb-6 text-2xl lg:text-3xl font-bold">
                Get a Free Quote
              </h2>
              <p className="text-gray-600 mb-6">
                Ready to get started? Contact our team for a free, no-obligation quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="btn btn-primary"
                  aria-label={`Call us on ${siteSettings.phone}`}
                >
                  <Icon name="phone" size="md" className="mr-2" />
                  {siteSettings.phone}
                </a>
                <Link href="/#contact" className="btn btn-outline">
                  Send us a message
                </Link>
              </div>
            </section>
          </Container>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const props = await getBasePageProps({ pageUrl: 'services/' });

  return {
    props,
  };
};
