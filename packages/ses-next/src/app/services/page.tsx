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
    <article className="group relative overflow-hidden rounded-lg border border-gray-200 transition-shadow duration-200 hover:shadow-md">
      <Link href={`/services/${slug}`} className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View {name} service</span>
      </Link>
      <div className="flex h-full flex-col justify-between p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-2">
              <Icon name={icon} size="xl" className="text-white" />
            </div>
            <h3 className="border-primary border-b-2 text-lg font-semibold">{name}</h3>
          </div>
          <p className="text-gray-500">{blurb}</p>
        </div>
        {featuredImage && (
          <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg">
            <SanityImage
              src={featuredImage.src}
              alt={featuredImage.alt}
              fill
              className="object-cover object-center transition-all group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <span className="text-primary mt-4 inline-block font-medium group-hover:underline">Learn more →</span>
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
          <div className="mx-auto mb-12 max-w-screen-xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              {hubContent.heading ?? 'Our Services'}
            </h1>
            {hubContent.intro &&
              hubContent.intro.map((paragraph, index) => (
                <p key={index} className="mb-3 text-lg text-gray-600">
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="mt-12">
            <Heading level={2}>Our Services</Heading>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {topLevelServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          <section aria-labelledby="service-areas-heading" className="mt-16">
            <div className="mx-auto max-w-screen-xl">
              <h2
                id="service-areas-heading"
                className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-6 lg:text-3xl"
              >
                Service Areas
              </h2>
              <p className="mb-4 text-center text-gray-600">
                We provide electrical services across Melbourne&apos;s western and inner-western suburbs, including:
              </p>
              {serviceAreas && (
                <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Service areas">
                  {serviceAreas.map((area) => (
                    <li key={area} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      {area}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section aria-labelledby="cta-heading" className="bg-primary/5 mt-16 rounded-xl p-8 text-center">
            <h2 id="cta-heading" className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-6 lg:text-3xl">
              Get a Free Quote
            </h2>
            <p className="mb-6 text-gray-600">
              Ready to get started? Contact our team for a free, no-obligation quote.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
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
