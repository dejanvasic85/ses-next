import Head from 'next/head';
import { NextSeo, LocalBusinessJsonLd } from 'next-seo';

export function PageHead({ canonicalUrl, companyName, companyLogo, description, phone, title, socialTitle }) {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={companyName} />
        <meta name="twitter:image" content={companyLogo} />
        <meta name="twitter:description" content={description} />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: socialTitle,
          description,
          images: [{ url: companyLogo, alt: companyName }],
          siteName: companyName,
        }}
      />
      <LocalBusinessJsonLd type="LocalBusiness" images={[companyLogo]} name={companyName} telephone={phone} />
    </>
  );
}
