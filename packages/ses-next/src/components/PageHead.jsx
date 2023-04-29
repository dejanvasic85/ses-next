import Head from 'next/head';

export function PageHead({ canonicalUrl, companyName, companyLogo, description, title, socialTitle }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />
      <meta property="og:image" content={companyLogo} />
      <meta name="twitter:description" content={description} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={companyName} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={companyName} />
      <meta name="twitter:image" content={companyLogo} />
    </Head>
  );
}
