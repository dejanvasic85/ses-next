import Head from 'next/head';

import { content } from '../lib/content';
import { Footer, HeroV2 as Hero, Navbar, Services, Team } from '../components';

export default function Home({ contact, meta, services, team }) {
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
        <Team introduction={team.introduction} members={team.members} />
      </div>
      <div id="services">
        <Services className="mt-12 pt-20 bg-slate-100" services={services} />
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
