import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { googleReviews } from 'ses-reviews';

import { getAllLocationPages, getLocationPageBySlug, getSiteSettings } from '@/lib/content/contentService';
import { faqJsonLd, safeJsonLd } from '@/lib/structuredData';
import { CustomImage } from '@/components/CustomImage';
import { ServiceBreadcrumb } from '@/components/ServiceBreadcrumb/ServiceBreadcrumb';
import { LocationNearbySuburbs } from '@/components/LocationNearbySuburbs/LocationNearbySuburbs';
import { LocationServices } from '@/components/LocationServices/LocationServices';
import { LocationFaqs } from '@/components/LocationFaqs/LocationFaqs';
import type { GoogleReview } from '@/types';

type LocationPageProps = {
  params: Promise<{ locationSlug: string }>;
};

const portableTextComponents = {
  types: {
    image: ({ value }: { value: string }) => <CustomImage value={value} />,
  },
};

export async function generateStaticParams() {
  const pages = await getAllLocationPages();
  return pages.filter(({ slug }) => slug).map(({ slug }) => ({ locationSlug: slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { locationSlug } = await params;
  const page = await getLocationPageBySlug(locationSlug);

  if (!page) {
    return {};
  }

  const title = page.seoTitle || `Electrician ${page.suburb} | SES`;
  const description = page.seoDescription ?? undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/locations/${page.slug}`,
    },
    openGraph: {
      title,
      description,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { locationSlug } = await params;
  const [page, siteSettings] = await Promise.all([getLocationPageBySlug(locationSlug), getSiteSettings()]);

  if (!page) {
    notFound();
  }

  const { baseUrl, companyName, phone } = siteSettings;
  const locationsUrl = new URL('locations', baseUrl).toString();
  const pageUrl = new URL(`locations/${page.slug}`, baseUrl).toString();

  const ratingCount = Number(googleReviews.numberOfReviews.replace('reviews', '').trim());
  const ratingValue = Number(googleReviews.overallRatingValue.replace('.0', '').trim());

  const reviewsJson = googleReviews.reviews.slice(0, 9).map(({ comment, reviewer, starRating }: GoogleReview) => ({
    author: reviewer.displayName,
    reviewBody: comment,
    reviewRating: {
      bestRating: '5',
      worstRating: '1',
      ratingValue: String(starRating),
    },
  }));

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: `${companyName} — Electrician ${page.suburb}`,
    url: pageUrl,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '61B Hansen St',
      addressLocality: 'Altona North',
      addressRegion: 'VIC',
      postalCode: '3025',
      addressCountry: 'AU',
    },
    areaServed: {
      '@type': 'City',
      name: page.suburb,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviewsJson,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: locationsUrl },
      { '@type': 'ListItem', position: 3, name: `Electrician ${page.suburb}` },
    ],
  };

  const breadcrumbItems = [
    { name: 'Home', item: baseUrl },
    { name: 'Locations', item: locationsUrl },
    { name: `Electrician ${page.suburb}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      {page.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd(page.faqs)) }} />
      )}
      <ServiceBreadcrumb items={breadcrumbItems} />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <article className="mx-auto px-4 md:px-8 max-w-screen-lg prose lg:prose-lg">
          <h1 className="text-center">Electrician {page.suburb}</h1>
          {page.intro && <PortableText value={page.intro} components={portableTextComponents} />}
        </article>

        {page.services.length > 0 && <LocationServices services={page.services} />}

        {page.nearbySuburbs.length > 0 && <LocationNearbySuburbs nearbySuburbs={page.nearbySuburbs} />}

        {page.faqs.length > 0 && <LocationFaqs faqs={page.faqs} suburb={page.suburb} />}
      </div>
    </>
  );
}
