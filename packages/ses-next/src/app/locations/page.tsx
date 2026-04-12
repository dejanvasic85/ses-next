import type { Metadata } from 'next';
import Link from 'next/link';

import { getAllLocationPages, getSiteSettings } from '@/lib/content/contentService';
import { ServiceBreadcrumb } from '@/components/ServiceBreadcrumb/ServiceBreadcrumb';
import { safeJsonLd } from '@/lib/structuredData';
import type { LocationPage } from '@/types';

export const metadata: Metadata = {
  title: 'Service Areas — Melbourne Electricians | SES',
  description:
    "Solar Energy Solutions services Melbourne's western suburbs. Find your local electrician in Altona, Footscray, Newport, Yarraville and more.",
  alternates: {
    canonical: '/locations',
  },
  openGraph: {
    title: 'Service Areas — Melbourne Electricians | SES',
    description:
      "Solar Energy Solutions services Melbourne's western suburbs. Find your local electrician in Altona, Footscray, Newport, Yarraville and more.",
  },
};

type LocationCardProps = {
  page: LocationPage;
};

function LocationCard({ page }: LocationCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/locations/${page.slug}`} className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View electrician services in {page.suburb}</span>
      </Link>
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex-shrink-0 rounded-full p-2.5">
              <svg
                className="text-primary h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="group-hover:text-primary text-lg font-semibold text-gray-900 transition-colors">
              {page.suburb}
            </h2>
          </div>
          <span className="text-primary flex-shrink-0 text-sm font-medium transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
      <div className="bg-primary h-0.5 w-0 transition-all duration-300 group-hover:w-full" aria-hidden="true" />
    </article>
  );
}

export default async function LocationsIndexPage() {
  const [pages, siteSettings] = await Promise.all([getAllLocationPages(), getSiteSettings()]);

  const { baseUrl, phone } = siteSettings;
  const locationsUrl = new URL('locations', baseUrl).toString();

  const breadcrumbItems = [{ name: 'Home', item: baseUrl }, { name: 'Locations' }];

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SES Service Areas — Melbourne Electricians',
    description: "Suburb pages for Solar Energy Solutions, serving Melbourne's western suburbs.",
    url: locationsUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: pages.map(({ slug, suburb }, position) => ({
        '@type': 'ListItem',
        position: position + 1,
        name: `Electrician ${suburb}`,
        url: new URL(`locations/${slug}`, baseUrl).toString(),
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: locationsUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />

      <ServiceBreadcrumb items={breadcrumbItems} />

      {/* Page header */}
      <div className="relative overflow-hidden bg-white">
        <div
          className="absolute inset-x-0 -top-16 -z-10 h-64 opacity-40"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #45C1E3 0%, #007bc0 40%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-screen-lg px-4 py-12 text-center md:px-8 md:py-16">
          <p className="text-primary mb-3 text-sm font-semibold tracking-widest uppercase">Melbourne&apos;s West</p>
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">Areas We Serve</h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600">
            Based in Altona North, we service Melbourne&apos;s western suburbs. Select your suburb below for local
            electricians, solar, and air conditioning.
          </p>
        </div>
      </div>

      {/* Suburb grid */}
      <div className="mx-auto max-w-screen-lg px-4 pb-16 md:px-8">
        {pages.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <LocationCard key={page.id} page={page} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-gray-500">Location pages coming soon.</p>
        )}
      </div>

      {/* CTA strip */}
      <section aria-labelledby="locations-cta-heading" className="border-primary/10 bg-primary/5 border-t">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-between gap-6 px-4 py-12 sm:flex-row md:px-8">
          <div>
            <h2 id="locations-cta-heading" className="text-xl font-bold text-gray-900">
              Don&apos;t see your suburb?
            </h2>
            <p className="mt-1 text-gray-600">
              We cover more of Melbourne&apos;s west — call us and we&apos;ll let you know.
            </p>
          </div>
          <a href={`tel:${phone}`} className="btn btn-primary whitespace-nowrap" aria-label={`Call us on ${phone}`}>
            {phone}
          </a>
        </div>
      </section>
    </>
  );
}
