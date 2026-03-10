import { NextSeo } from 'next-seo';

interface PageHeadProps {
  canonicalUrl: string;
  companyName: string;
  companyLogo: string;
  description: string;
  title: string;
}

export function PageHead({ canonicalUrl, companyName, companyLogo, description, title }: PageHeadProps) {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonicalUrl}
      openGraph={{
        url: canonicalUrl,
        title,
        description,
        images: [{ url: companyLogo, alt: companyName }],
        siteName: companyName,
        locale: 'en_AU',
      }}
    />
  );
}
