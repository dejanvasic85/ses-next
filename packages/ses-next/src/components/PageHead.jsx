import Head from 'next/head';
import { NextSeo } from 'next-seo';

export function PageHead({ canonicalUrl, companyName, companyLogo, description, title, socialTitle }) {
  return (
    <>
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
        twitter={{
          cardType: 'summary',
          site: companyName,
          handle: '@' + companyName,
        }}
      />
    </>
  );
}
