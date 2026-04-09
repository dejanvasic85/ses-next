import type { Metadata } from 'next';
import Link from 'next/link';

import { Heading } from '@/components/Heading';
import { Icon } from '@/components/Icon/Icon';
import { SanityImage } from '@/components/SanityImage';
import { getServicesHubContent, getSiteSettings, getServices } from '@/lib/content/contentService';
import { safeJsonLd } from '@/lib/structuredData';
import type { ServiceItem } from '@/types';

export const metadata: Metadata = {
  title: 'Electrical Services Melbourne | Storm Electrical Solutions',
  description:
    'Explore our full range of electrical services in Melbourne. Licensed electricians for residential, commercial and emergency electrical work.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Electrical Services Melbourne | Storm Electrical Solutions',
    description:
      'Explore our full range of electrical services in Melbourne. Licensed electricians for residential, commercial and emergency electrical work.',
  },
};

type ServiceCardProps = {
  service: ServiceItem;
};

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
            <SanityImage
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

export default async function ServicesHubPage() {
  const [siteSettings, hubContent, services] = await Promise.all([
    getSiteSettings(),
    getServicesHubContent(),
    getServices(),
  ]);

  const { baseUrl, phone, serviceAreas } = siteSettings;

  const pageUrl = new URL('services/', baseUrl).toString();
  const topLevelServices = services.filter((s) => !s.parentService);

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubContent.pageTitle,
    description: hubContent.pageDescription,
    url: pageUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: topLevelServices.map(({ slug, name }, position) => ({
        '@type': 'ListItem',
        position: position + 1,
        name,
        url: new URL(`services/${slug}`, baseUrl).toString(),
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-screen-xl text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">{hubContent.heading}</h1>
            {hubContent.intro &&
              hubContent.intro.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 mb-3">
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="mt-12">
            <Heading level={2}>Our Services</Heading>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
              {topLevelServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          <section aria-labelledby="service-areas-heading" className="mt-16">
            <div className="mx-auto max-w-screen-xl">
              <h2
                id="service-areas-heading"
                className="text-gray-700 text-center mb-4 md:mb-6 text-2xl lg:text-3xl font-bold"
              >
                Service Areas
              </h2>
              <p className="text-gray-600 mb-4 text-center">
                We provide electrical services across Melbourne&apos;s western and inner-western suburbs, including:
              </p>
              {serviceAreas && (
                <ul className="flex flex-wrap gap-2 items-center justify-center" aria-label="Service areas">
                  {serviceAreas.map((area) => (
                    <li key={area} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {area}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section aria-labelledby="cta-heading" className="mt-16 bg-primary/5 rounded-xl p-8 text-center">
            <h2 id="cta-heading" className="text-gray-700 text-center mb-4 md:mb-6 text-2xl lg:text-3xl font-bold">
              Get a Free Quote
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to get started? Contact our team for a free, no-obligation quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${phone}`} className="btn btn-primary" aria-label={`Call us on ${phone}`}>
                <Icon name="phone" size="md" className="mr-2" />
                {phone}
              </a>
              <Link href="/#contact" className="btn btn-outline">
                Send us a message
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
