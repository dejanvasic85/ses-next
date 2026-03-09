import { GetStaticProps } from 'next';
import { LocalBusinessJsonLd } from 'next-seo';
import { googleReviews } from 'ses-reviews';

import { About, Contact, Hero, Layout, Services } from '@/components';
import { getBasePageProps } from '@/lib/basePageProps';
import { getHomePageContent } from '@/lib/content/contentService';
import type { BasePageProps, GoogleReviews, SiteSettings, HomePageContent } from '@/types';

interface HomeProps extends BasePageProps {
  homepageContent: HomePageContent;
  googleReviews: GoogleReviews;
  pageUrl: string;
}

export default function Home({ homepageContent, googleReviews, pageUrl, services, siteSettings }: HomeProps) {
  const { companyName, alternateName, companyLogo, googleMapsLocation, googleMapsLocationPlaceUrl, meta, social, phone, baseUrl } =
    siteSettings;
  const { mainHeading, subHeading, team, training } = homepageContent;

  const ratingCount = Number(googleReviews.numberOfReviews.replace('reviews', '').trim());
  const ratingValue = Number(googleReviews.overallRatingValue.replace('.0', '').trim());
  const reviews = googleReviews.reviews.slice(0, 9);

  const reviewsJson = reviews.map(({ comment, reviewer, starRating }) => ({
    author: reviewer.displayName,
    reviewBody: comment,
    reviewRating: {
      bestRating: '5',
      worstRating: '1',
      reviewAspect: 'Ambiance',
      ratingValue: String(starRating),
    },
  }));

  const sameAs = [social.facebook, social.instagram, social.linkedIn].filter(
    (url): url is string => url !== null,
  );

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
      <LocalBusinessJsonLd
        type="Electrician"
        name={companyName}
        description={meta.description}
        address={{
          streetAddress: '61B Hansen St',
          addressLocality: 'Altona North',
          addressRegion: 'VIC',
          postalCode: '3025',
          addressCountry: 'AU',
        }}
        geo={{ latitude: -37.8354339, longitude: 144.8650809 }}
        priceRange="$$"
        telephone={phone}
        image={companyLogo}
        url={pageUrl}
        sameAs={sameAs}
        areaServed={[
          'Melbourne',
          'Altona',
          'Altona North',
          'Newport',
          'Yarraville',
          'Footscray',
          'Williamstown',
          'Moonee Ponds',
          'Ascot Vale',
        ]}
        aggregateRating={{
          ratingValue: ratingValue,
          ratingCount: ratingCount,
          bestRating: 5,
          worstRating: 0,
        }}
        review={reviewsJson}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialsJsonLd) }}
      />
      <Layout services={services} siteSettings={siteSettings} pageUrl={pageUrl}>
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
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const baseProps = await getBasePageProps({ pageUrl: '' });
  const homepageContent = await getHomePageContent();

  return {
    props: {
      ...baseProps,
      homepageContent,
      googleReviews,
    },
  };
};
