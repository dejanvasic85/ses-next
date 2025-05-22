import React from 'react';
import { NextSeo } from 'next-seo';

interface PageHeadProps {
  canonicalUrl: string;
  companyName: string;
  companyLogo: string;
  description: string;
  title: string;
  socialTitle: string;
  phone?: string;
}

export function PageHead({ 
  canonicalUrl, 
  companyName, 
  companyLogo, 
  description, 
  title, 
  socialTitle 
}: PageHeadProps) {
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
