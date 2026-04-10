import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { googleReviews } from 'ses-reviews';

import { getAllLocationPages, getLocationPageBySlug, getSiteSettings } from '@/lib/content/contentService';
import { faqJsonLd, safeJsonLd } from '@/lib/structuredData';
import { ServiceBreadcrumb } from '@/components/ServiceBreadcrumb/ServiceBreadcrumb';
import { LocationHubContent } from './LocationHubContent';

const hubSlug = 'melbourne';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLocationPageBySlug(hubSlug);

  const title = page?.seoTitle ?? 'Electrician Melbourne — Licensed Local Electricians | SES';
  const description = page?.seoDescription ?? undefined;

  return {
    title,
    description,
    alternates: {
      canonical: '/electrician-melbourne/',
    },
    openGraph: {
      title,
      description,
    },
  };
}

export default async function MelbourneHubPage() {
  const [page, siteSettings, allPages] = await Promise.all([
    getLocationPageBySlug(hubSlug),
    getSiteSettings(),
    getAllLocationPages(),
  ]);

  if (!page) {
    notFound();
  }

  const { baseUrl, companyName, phone } = siteSettings;
  const suburbs = allPages.filter((p) => p.slug !== hubSlug);

  const pageUrl = new URL('electrician-melbourne/', baseUrl).toString();

  const ratingCount = Number(googleReviews.numberOfReviews.replace('reviews', '').trim());
  const ratingValue = Number(googleReviews.overallRatingValue.replace('.0', '').trim());

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: companyName,
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
    areaServed: { '@type': 'City', name: 'Melbourne' },
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
      { '@type': 'ListItem', position: 2, name: 'Electrician Melbourne' },
    ],
  };

  const breadcrumbItems = [{ name: 'Home', item: baseUrl }, { name: 'Electrician Melbourne' }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      {page.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd(page.faqs)) }} />
      )}
      <ServiceBreadcrumb items={breadcrumbItems} />
      <LocationHubContent page={page} allSuburbs={suburbs} phone={phone} />
    </>
  );
}
