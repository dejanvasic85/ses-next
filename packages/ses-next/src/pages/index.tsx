import { GetStaticProps } from 'next';
import { LocalBusinessJsonLd } from 'next-seo';
import { googleReviews } from 'ses-reviews';

import { About, Contact, Hero, Layout, Services } from '../components';
import { getBasePageProps } from '../lib/basePageProps';
import type { HomePageContentResult } from '@/lib/content/contentService';
import type { GoogleReviews } from '@/types';

interface HomeProps {
  content: HomePageContentResult;
  googleReviews: GoogleReviews;
  pageUrl: string;
}

export default function Home({ content, googleReviews, pageUrl }: HomeProps) {
  const {
    companyName,
    companyLogo,
    contact,
    googleMapsLocation,
    googleMapsLocationPlaceUrl,
    mainHeading,
    subHeading,
    social,
    services,
    team,
    training,
  } = content;

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

  return (
    <>
      <LocalBusinessJsonLd
        type="LocalBusiness"
        id={pageUrl}
        images={[companyLogo]}
        name={companyName}
        description={content.meta.description}
        address={{
          streetAddress: '61B Hansen St',
          addressLocality: 'Altona North',
          addressRegion: 'VIC',
          postalCode: '3025',
          addressCountry: 'AU',
        }}
        telephone={contact.phone}
        rating={{
          ratingValue: String(ratingValue),
          ratingCount: String(ratingCount),
          bestRating: '5',
          worstRating: '0',
        }}
        review={reviewsJson}
      />
      <Layout content={content} pageUrl={pageUrl}>
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
        <section id="services" className="mt-32 pt-24">
          <Services services={services} className="mt-12" />
        </section>
        <section id="about" className="mt-16 pt-24">
          <About team={team} testimonials={reviews} googleReviewsUrl={googleMapsLocationPlaceUrl} training={training} />
        </section>
        <section id="contact" className="mt-16 pt-24">
          <Contact contact={contact} location={googleMapsLocation} />
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const baseProps = await getBasePageProps({ pageUrl: '' });

  return {
    props: {
      ...baseProps,
      googleReviews,
    },
  };
};
