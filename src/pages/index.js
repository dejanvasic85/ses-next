import Head from 'next/head';

import { content } from '../lib/content';
import { About, Contact, Footer, Hero, Navbar, Services } from '../components';

export default function Home({
  about,
  baseUrl,
  contact,
  googleMapsLocation,
  meta,
  social,
  services,
  team,
  testimonials,
}) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={baseUrl} />
      </Head>
      <Navbar contactPhone={contact.phone} />
      <main>
        <Hero social={social} />
      </main>
      <section id="services" className="mt-32 pt-24">
        <Services services={services} className="mt-12" />
      </section>
      <section id="about" className="mt-16 pt-24">
        <About aboutIntro={about} team={team} testimonials={testimonials} />
      </section>
      <section id="contact" className="mt-16 pt-24">
        <Contact contact={contact} location={googleMapsLocation} />
      </section>
      <Footer social={social} />
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
