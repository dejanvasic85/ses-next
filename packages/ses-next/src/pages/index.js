import Head from 'next/head';

import { getHomePageContent } from '../lib/content/contentService';
import { About, Contact, Footer, Hero, Navbar, Services } from '../components';

export default function Home({
  about,
  baseUrl,
  companyName,
  companyLogo,
  contact,
  googleMapsLocation,
  meta,
  social,
  services,
  shortTitle,
  tagline,
  team,
  testimonials,
  training,
}) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link rel="canonical" href={baseUrl} />
        <meta name="description" content={meta.description} />
        <meta property="og:image" content={companyLogo} />
        <meta name="twitter:description" content={meta.description} />
        <meta property="og:title" content="Storm Electrical Solutions Melbourne" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:site_name" content={companyName} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={companyName} />
        <meta name="twitter:image" content={companyLogo} />
      </Head>
      <Navbar contactPhone={contact.phone} title={shortTitle} />
      <main>
        <Hero companyName={companyName} companyLogo={companyLogo} social={social} tagline={tagline} />
      </main>
      <section id="services" className="mt-32 pt-24">
        <Services services={services} className="mt-12" />
      </section>
      <section id="about" className="mt-16 pt-24">
        <About aboutIntro={about} team={team} testimonials={testimonials} training={training} />
      </section>
      <section id="contact" className="mt-16 pt-24">
        <Contact contact={contact} location={googleMapsLocation} />
      </section>
      <Footer social={social} />
    </>
  );
}

export const getStaticProps = async () => {
  const content = await getHomePageContent();

  return {
    props: {
      ...content,
    },
  };
};
