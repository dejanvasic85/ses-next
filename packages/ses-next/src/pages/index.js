import { About, Contact, Hero, Layout, Services } from '../components';
import { getBasePageProps } from '../lib/basePageProps';

export default function Home({ content, googleReviews, pageUrl }) {
  const {
    about,
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
  return (
    <Layout content={content} pageUrl={pageUrl} googleReviews={googleReviews}>
      <main>
        <Hero
          companyName={companyName}
          companyLogo={companyLogo}
          googleReviewsUrl={googleMapsLocationPlaceUrl}
          numberOfReviews={googleReviews.numberOfReviews}
          overallRatingValue={googleReviews.overallRatingValue}
          social={social}
          mainHeading={mainHeading}
          subHeading={subHeading}
        />

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
      </main>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const props = await getBasePageProps({ pageUrl: '' });

  return {
    props,
  };
};
