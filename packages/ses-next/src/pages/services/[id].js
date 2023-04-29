import Head from 'next/head';

import { Navbar, Footer } from '../../components';
import { getHomePageContent } from '../../lib/content/contentService';

export default function Service({ baseUrl, companyName, companyLogo, contact, meta, social, shortTitle }) {
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
      <Footer social={social} />
    </>
  );
}

export const getStaticProps = async () => {
  console.log('Page: Services getStaticProps');
  const content = await getHomePageContent();

  return {
    props: {
      ...content,
    },
  };
};

const slugify = (value) => value.toLowerCase().replace(' ', '-');

export const getStaticPaths = async () => {
  const content = await getHomePageContent();
  const paths = content.services.items.map(({ name }) => ({
    params: { id: slugify(name) },
  }));

  return {
    paths,
    fallback: false,
  };
};
