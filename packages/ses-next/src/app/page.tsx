import type { Metadata } from 'next';
import { googleReviews } from 'ses-reviews';

import { About, Contact, Hero, Services } from '@/components';
import { getHomePageContent, getSiteSettings, getServices } from '@/lib/content/contentService';
import { safeJsonLd } from '@/lib/structuredData';
import type { GoogleReview } from '@/types';

const title = 'Melbourne Electricians | 24/7 Emergency Electrical Services | Storm Electrical Solutions';
const description =
  'Licensed Melbourne electricians with 19+ years experience. Emergency electrical services, air conditioning, solar, lighting & data cabling. 5-star rated. Free quotes. Call (03) 4050 7937.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
  },
};

export default async function Home() {
  const [siteSettings, homepageContent, services] = await Promise.all([
    getSiteSettings(),
    getHomePageContent(),
    getServices(),
  ]);

  const {
    companyName,
    alternateName,
    companyLogo,
    googleMapsLocation,
    googleMapsLocationPlaceUrl,
    social,
    phone,
    baseUrl,
    meta,
  } = siteSettings;
  const { mainHeading, subHeading, team, training } = homepageContent;

  const ratingCount = Number(googleReviews.numberOfReviews.replace('reviews', '').trim());
  const ratingValue = Number(googleReviews.overallRatingValue.replace('.0', '').trim());
  const reviews = googleReviews.reviews.slice(0, 9);

  const reviewsJson = reviews.map(({ comment, reviewer, starRating }: GoogleReview) => ({
    author: reviewer.displayName,
    reviewBody: comment,
    reviewRating: {
      bestRating: '5',
      worstRating: '1',
      reviewAspect: 'Ambiance',
      ratingValue: String(starRating),
    },
  }));

  const sameAs = [social.facebook, social.instagram, social.linkedIn].filter((url): url is string => url !== null);

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: companyName,
    description: meta.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '61B Hansen St',
      addressLocality: 'Altona North',
      addressRegion: 'VIC',
      postalCode: '3025',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -37.8354339,
      longitude: 144.8650809,
    },
    priceRange: '$$',
    telephone: phone,
    image: companyLogo,
    url: baseUrl,
    sameAs,
    areaServed: [
      'Melbourne',
      'Altona',
      'Altona North',
      'Newport',
      'Yarraville',
      'Footscray',
      'Williamstown',
      'Moonee Ponds',
      'Ascot Vale',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating: 5,
      worstRating: 0,
    },
    review: reviewsJson,
  };

  const credentialsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: companyName,
    ...(alternateName ? { alternateName } : {}),
    url: baseUrl,
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'CEC Accredited Installer' },
      { '@type': 'EducationalOccupationalCredential', name: 'NETA Accredited' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(credentialsJsonLd) }} />
      <Hero
        companyName={companyName}
        companyLogo={companyLogo}
        googleReviewsUrl={googleMapsLocationPlaceUrl}
        numberOfReviews={ratingCount}
        overallRatingValue={ratingValue}
        social={social}
        mainHeading={mainHeading}
        subHeading={subHeading}
      />
      <section id="contact" className="mt-32 pt-24">
        <Contact contact={homepageContent.contact} location={googleMapsLocation} />
      </section>
      <section id="services" className="mt-16 pt-24">
        <Services services={services} blurbs={homepageContent.services.blurbs ?? []} className="mt-12" />
      </section>
      <section id="about" className="mt-16 pt-24">
        <About team={team} testimonials={reviews} googleReviewsUrl={googleMapsLocationPlaceUrl} training={training} />
      </section>
    </>
  );
}
