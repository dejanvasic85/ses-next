import type { Metadata } from 'next';
import { googleReviews } from 'ses-reviews';

import { About, Contact, Hero, Services, ServiceAreas } from '@/components';
import { getHomePageContent, getSiteSettings, getServices } from '@/lib/content/contentService';
import { safeJsonLd, personJsonLd } from '@/lib/structuredData';
import type { GoogleReview } from '@/types';

const title = 'Melbourne Electricians | Same-Day Priority Response | Storm Electrical Solutions';
const description =
  'Licensed Melbourne electricians. Emergency electrical services, air conditioning, solar, lighting & data cabling. 5-star rated. Free quotes.';

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

  const yearsExperience = new Date().getFullYear() - (siteSettings.establishedYear ?? 2007);

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
    recLicence,
    owner,
    establishedYear,
    streetAddress,
    suburb,
    state,
    postcode,
    latitude,
    longitude,
    openingHours,
  } = siteSettings;
  const { mainHeading, subHeading, team, training, serviceAreas } = homepageContent;

  const ratingCount = Number(googleReviews.numberOfReviews.replace(/[^\d]/g, ''));

  const trustSignals = homepageContent.trustSignals.map((signal) =>
    signal.icon === 'star' ? { ...signal, value: String(ratingCount) } : signal,
  );
  const ratingValue = Number(googleReviews.overallRatingValue.replace('.0', '').trim());
  const reviews = googleReviews.reviews.slice(0, 9);

  const reviewsJson = reviews.map(({ comment, reviewer, starRating }: GoogleReview) => ({
    author: { '@type': 'Person', name: reviewer.displayName },
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
      streetAddress,
      addressLocality: suburb,
      addressRegion: state,
      postalCode: postcode,
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
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
    openingHoursSpecification: openingHours
      ? [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: openingHours.daysOfWeek,
            opens: openingHours.opensAt,
            closes: openingHours.closesAt,
          },
        ]
      : undefined,
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

  const ownerJsonLd =
    owner?.name &&
    owner?.role &&
    personJsonLd({
      name: owner.name,
      role: owner.role,
      licenceNumber: recLicence,
      accreditations: owner.accreditations,
      companyName,
      url: baseUrl,
    });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(credentialsJsonLd) }} />
      {ownerJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ownerJsonLd) }} />
      )}
      <Hero
        companyName={companyName}
        companyLogo={companyLogo}
        social={social}
        mainHeading={mainHeading}
        subHeading={subHeading}
        trustSignals={trustSignals}
      />
      <section id="contact" className="mt-32 pt-24">
        <Contact
          contact={homepageContent.contact}
          location={googleMapsLocation}
          streetAddress={streetAddress}
          suburb={suburb}
        />
      </section>
      <section id="services" className="mt-16 pt-24">
        <Services services={services} blurbs={homepageContent.services.blurbs ?? []} className="mt-12" />
      </section>
      {serviceAreas.length > 0 && (
        <section className="mt-16 pt-8">
          <ServiceAreas areas={serviceAreas} />
        </section>
      )}
      <section id="about" className="mt-16 pt-24">
        <About team={team} testimonials={reviews} googleReviewsUrl={googleMapsLocationPlaceUrl} training={training} />
      </section>
    </>
  );
}
