import Head from 'next/head';

import { HeroV2 as Hero, Services } from '../components';

export default function Home({ meta, services }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={meta.description} />
        <link rel="canonical" href="http://sesmelbourne.com.au/" />
      </Head>
      <main>
        <Hero />
      </main>
      <Services className="mt-24" services={services} />
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      contact: {
        phone: '+61 415 338 040',
      },
      meta: {
        title: 'SES - Storm Electrical Solutions - Melbourne Electricians',
        description:
          'Melbourne Electricians. Free Quotes. Lighting. Testing. Data. Air Conditioning. Emergency Call out. Upgrade your old Halogen lights for Free!',
      },
      services: [
        {
          name: 'Air conditioning',
          description: 'Split systems.',
        },
        {
          name: 'Data and TV',
          description: 'Installation, Repairs & Upgrades.',
        },
        {
          name: 'Renewable Energy',
          description: 'Including Wind & Solar.',
        },
        {
          name: 'Testing',
          description: 'Test and Tag. Emergency Light Testing.',
        },
        {
          name: 'Telecommunications',
          description: 'Test and Tag. Emergency Light Testing.',
        },
        {
          name: 'Lighting',
          description:
            'Free LED lamp changes as part of the VEET scheme. Business LED VEET Scheme incentives with lighting analysis to help save your business energy with funding from the Victorian Government.',
        },
        {
          name: 'Catering Maintenance - Emergency Call out',
          description: 'Preventative Maintenance. Installations.',
        },
      ],
    },
  };
};
