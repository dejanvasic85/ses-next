import { GetStaticProps } from 'next';
import { LocalBusinessJsonLd } from 'next-seo';
import { googleReviews } from 'ses-reviews';

import { About, Contact, Hero, Layout, Services } from '@/components';
import { getBasePageProps } from '@/lib/basePageProps';
import { getHomePageContent } from '@/lib/content/contentService';
import type { BasePageProps, GoogleReviews, SiteSettings, HomePageContentResult } from '@/types';

interface HomeProps extends BasePageProps {
  homepageContent: HomePageContentResult;
  googleReviews: GoogleReviews;
  pageUrl: string;
}

export default function Home({ homepageContent, googleReviews, pageUrl, services, siteSettings }: HomeProps) {
  const { companyName, companyLogo, googleMapsLocation, googleMapsLocationPlaceUrl, meta, social, phone } =
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

  return (
    <>
      <LocalBusinessJsonLd
        type="LocalBusiness"
        name={companyName}
        description={meta.description}
        address={{
          streetAddress: '61B Hansen St',
          addressLocality: 'Altona North',
          addressRegion: 'VIC',
          postalCode: '3025',
          addressCountry: 'AU',
        }}
        telephone={phone}
        image={companyLogo}
        url={pageUrl}
        aggregateRating={{
          ratingValue: ratingValue,
          ratingCount: ratingCount,
          bestRating: 5,
          worstRating: 0,
        }}
        review={reviewsJson}
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
        <section id="services" className="mt-32 pt-24">
          <Services services={services} blurbs={homepageContent.services.blurbs ?? []} className="mt-12" />
        </section>
        <section id="about" className="mt-16 pt-24">
          <About team={team} testimonials={reviews} googleReviewsUrl={googleMapsLocationPlaceUrl} training={training} />
        </section>
        <section id="contact" className="mt-16 pt-24">
          <Contact contact={homepageContent.contact} location={googleMapsLocation} />
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const baseProps = await getBasePageProps({ pageUrl: '' });
  const homepageContent = await getHomePageContent(baseProps.siteSettings);

  return {
    props: {
      ...baseProps,
      homepageContent,
      googleReviews,
    },
  };
};
