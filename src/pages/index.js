import Head from 'next/head';

import { content } from '../lib/content';
import { About, Contact, Footer, HeroV2 as Hero, Navbar, ServicesV1 as Services } from '../components';

export default function Home({ about, contact, googleMapsLocation, meta, services, team, testimonials }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={meta.description} />
        <link rel="canonical" href="http://sesmelbourne.com.au/" />
      </Head>
      <Navbar contactPhone={contact.phone} />
      <main>
        <Hero />
      </main>
      <section id="services" className="mt-32 pt-24">
        <Services services={services} className="mt-12" />
      </section>
      <section id="about" className="mt-16 pt-24">
        <About aboutIntro={about} team={team} testimonials={testimonials} />
      </section>
      <section id="contact" className="mt-12">
        <Contact contact={contact} location={googleMapsLocation} />
      </section>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      ...content,
    },
  };
};
