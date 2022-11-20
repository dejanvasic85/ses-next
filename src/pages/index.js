import Head from 'next/head';

import { content } from '../lib/content';
import { Footer, HeroV2 as Hero, Navbar, Services } from '../components';

export default function Home({ contact, meta, services }) {
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
      <Services className="mt-32 pt-12 bg-slate-100" services={services} />
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
