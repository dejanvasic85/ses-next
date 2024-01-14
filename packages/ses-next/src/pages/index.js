import { googleReviews } from 'ses-reviews';

import { getHomePageContent } from '../lib/content/contentService';
import { About, Contact, Footer, Hero, Navbar, PageHead, Services } from '../components';

export default function Home({
  about,
  baseUrl,
  companyName,
  companyLogo,
  contact,
  googleMapsLocation,
  googleMapsLocationPlaceUrl,
  googleReviews,
  meta,
  social,
  services,
  shortTitle,
  tagline,
  team,
  training,
}) {
  return (
    <>
      <PageHead
        canonicalUrl={baseUrl}
        companyLogo={companyLogo}
        companyName={companyName}
        description={meta.description}
        googleReviews={googleReviews}
        phone={contact.phone}
        socialTitle={companyName}
        title={meta.title}
      />
      <Navbar contactPhone={contact.phone} title={shortTitle} />
      <main>
        <Hero
          companyName={companyName}
          companyLogo={companyLogo}
          googleReviewsUrl={googleMapsLocationPlaceUrl}
          numberOfReviews={googleReviews.numberOfReviews}
          overallRatingValue={googleReviews.overallRatingValue}
          social={social}
          tagline={tagline}
        />
      </main>
      <section id="services" className="mt-32 pt-24">
        <Services services={services} className="mt-12" />
      </section>
      <section id="about" className="mt-16 pt-24">
        <About
          aboutIntro={about}
          team={team}
          testimonials={googleReviews.reviews}
          googleReviewsUrl={googleMapsLocationPlaceUrl}
          training={training}
        />
      </section>
      <section id="contact" className="mt-16 pt-24">
        <Contact contact={contact} location={googleMapsLocation} />
      </section>
      <Footer social={social} services={services} />
    </>
  );
}

export const getStaticProps = async () => {
  const content = await getHomePageContent();
  const reviews = googleReviews.reviews.slice(0, 6);
  console.log('googleMapsLocationPlaceUrl', content.googleMapsLocationPlaceUrl);

  return {
    props: {
      ...content,
      googleReviews: {
        ...googleReviews,
        reviews,
      },
    },
  };
};
