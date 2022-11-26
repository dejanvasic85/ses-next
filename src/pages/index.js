import Head from 'next/head';

import { content } from '../lib/content';
import { About, Footer, HeroV2 as Hero, Navbar, Services } from '../components';

export default function Home({ about, contact, meta, services, team, testimonials }) {
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
      <div id="about" className="mt-32 pt-20">
        <About aboutIntro={about} team={team} testimonials={testimonials} />
      </div>
      <div id="services">
        <Services className="mt-16 pt-16 bg-slate-100" services={services} />
      </div>
      <div id="contact"></div>
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
