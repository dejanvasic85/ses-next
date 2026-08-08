import type { Metadata } from 'next';
import Link from 'next/link';

import { Heading } from '@/components/Heading';
import { Icon } from '@/components/Icon/Icon';
import { SanityImage } from '@/components/SanityImage';
import { getAllLocationPages, getServicesHubContent, getSiteSettings, getServices } from '@/lib/content/contentService';
import { safeJsonLd } from '@/lib/structuredData';
import type { ServiceItem } from '@/types';

const servicesTitle = 'Electrical Services Melbourne | Licensed Electricians | SES';

export async function generateMetadata(): Promise<Metadata> {
  const { phone } = await getSiteSettings();
  const servicesDescription = `Full-range electrical services in Melbourne — solar, air conditioning, switchboards, lighting & more. 5.0★ rated, REC 24794, 19 yrs experience. Call ${phone}.`;

  return {
    title: servicesTitle,
    description: servicesDescription,
    alternates: {
      canonical: '/services',
    },
    openGraph: {
      title: servicesTitle,
      description: servicesDescription,
    },
  };
}

type ServiceRowProps = {
  service: ServiceItem;
};

function ServiceRow({ service }: ServiceRowProps) {
  const { name, blurb, slug, icon = 'bolt', featuredImage } = service;

  return (
    <article className="group hover:bg-base-200/60 relative flex items-center gap-4 p-5 transition-colors sm:gap-5 sm:p-6">
      <Link href={`/services/${slug}`} className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View {name} service</span>
      </Link>
      <div className="bg-primary flex-none rounded-full p-3">
        <Icon name={icon} size="lg" className="text-primary-content" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="border-primary inline-block border-b-2 text-lg font-semibold">{name}</h3>
        <p className="text-base-content/70 mt-1 text-sm sm:text-base">{blurb}</p>
      </div>
      {featuredImage && (
        <div className="relative hidden h-20 w-28 flex-none overflow-hidden rounded-lg sm:block">
          <SanityImage
            src={featuredImage.src}
            alt={featuredImage.alt}
            fill
            className="object-cover object-center transition-transform group-hover:scale-105"
            sizes="112px"
          />
        </div>
      )}
      <Icon
        name="chevron-right"
        size="md"
        className="text-base-content/30 group-hover:text-primary flex-none transition-colors group-hover:translate-x-0.5"
      />
    </article>
  );
}

export default async function ServicesHubPage() {
  const [siteSettings, hubContent, services, locationPages] = await Promise.all([
    getSiteSettings(),
    getServicesHubContent(),
    getServices(),
    getAllLocationPages(),
  ]);

  const { baseUrl, phone } = siteSettings;

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
      <div className="bg-base-100 py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-secondary mb-3 text-sm font-semibold tracking-[0.2em] uppercase">Service Directory</p>
            <Heading level={1}>{hubContent.heading ?? 'Our Services'}</Heading>
            {hubContent.intro &&
              hubContent.intro.map((paragraph, index) => (
                <p key={index} className="text-base-content/70 mb-3 text-lg last:mb-0">
                  {paragraph}
                </p>
              ))}
          </div>

          <section aria-labelledby="services-heading" className="mb-16">
            <Heading level={2} align="left">
              Browse our services
            </Heading>
            <div className="surface-card divide-base-300 rounded-box divide-y overflow-hidden">
              {topLevelServices.map((service) => (
                <ServiceRow key={service.id} service={service} />
              ))}
            </div>
          </section>

          <section aria-labelledby="service-areas-heading" className="mb-16">
            <h2 id="service-areas-heading" className="text-base-content mb-4 text-xl font-semibold lg:text-2xl">
              Service Areas
            </h2>
            <p className="text-base-content/70 mb-4">
              We provide electrical services across Melbourne&apos;s western and inner-western suburbs, including:
            </p>
            {locationPages.length > 0 && (
              <ul className="flex flex-wrap items-center gap-2" aria-label="Service areas">
                {locationPages.map(({ id, suburb, slug }) => (
                  <li key={id}>
                    <Link
                      href={`/locations/${slug}`}
                      className="bg-base-200 text-base-content/80 hover:bg-base-300 hover:text-base-content rounded-full px-3 py-1 text-sm transition-colors"
                    >
                      {suburb}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="cta-heading" className="surface-glass rounded-box p-8 text-center">
            <h2 id="cta-heading" className="text-base-content mb-4 text-xl font-semibold lg:text-2xl">
              Get a Free Quote
            </h2>
            <p className="text-base-content/70 mb-6">
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
