import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { googleReviews } from 'ses-reviews';

import { getAllLocationPages, getLocationPageBySlug, getSiteSettings } from '@/lib/content/contentService';
import { faqJsonLd, safeJsonLd } from '@/lib/structuredData';
import { ServiceBreadcrumb } from '@/components/ServiceBreadcrumb/ServiceBreadcrumb';
import { LocationSuburbContent } from './LocationSuburbContent';

export const dynamicParams = false;

type LocationSuburbPageProps = {
  params: Promise<{ suburb: string }>;
};

export async function generateStaticParams() {
  const pages = await getAllLocationPages();
  return pages.filter(({ slug }) => slug && slug !== 'melbourne').map(({ slug }) => ({ suburb: slug }));
}

export async function generateMetadata({ params }: LocationSuburbPageProps): Promise<Metadata> {
  const { suburb } = await params;
  const page = await getLocationPageBySlug(suburb);

  if (!page) {
    return {};
  }

  const title = page.seoTitle ?? `Electrician ${page.suburb} — Licensed Local Electricians | SES`;
  const description = page.seoDescription ?? undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/electrician-${suburb}/`,
    },
    openGraph: {
      title,
      description,
    },
  };
}

export default async function LocationSuburbPage({ params }: LocationSuburbPageProps) {
  const { suburb } = await params;

  const [page, siteSettings, allPages] = await Promise.all([
    getLocationPageBySlug(suburb),
    getSiteSettings(),
    getAllLocationPages(),
  ]);

  if (!page) {
    notFound();
  }

  const { baseUrl, companyName, phone } = siteSettings;
  const otherSuburbs = allPages.filter((p) => p.slug !== suburb && p.slug !== 'melbourne');

  const hubUrl = new URL('electrician-melbourne/', baseUrl).toString();
  const pageUrl = new URL(`electrician-${suburb}/`, baseUrl).toString();

  const ratingCount = Number(googleReviews.numberOfReviews.replace('reviews', '').trim());
  const ratingValue = Number(googleReviews.overallRatingValue.replace('.0', '').trim());

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
    areaServed: { '@type': 'City', name: page.suburb },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Electrician Melbourne', item: hubUrl },
      { '@type': 'ListItem', position: 3, name: `Electrician ${page.suburb}` },
    ],
  };

  const breadcrumbItems = [
    { name: 'Home', item: baseUrl },
    { name: 'Electrician Melbourne', item: hubUrl },
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
      <LocationSuburbContent page={page} phone={phone} otherSuburbs={otherSuburbs} />
    </>
  );
}
