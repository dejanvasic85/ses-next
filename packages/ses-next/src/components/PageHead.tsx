import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';

interface PageHeadProps {
  canonicalUrl: string;
  companyName: string;
  companyLogo: string;
  description: string;
  title: string;
  socialTitle: string;
  phone?: string;
}

export function PageHead({ canonicalUrl, companyName, companyLogo, description, title, socialTitle }: PageHeadProps) {
  return (
    <Head>
      {generateNextSeo({
        title,
        description,
        canonical: canonicalUrl,
        openGraph: {
          url: canonicalUrl,
          title: socialTitle,
          description,
          images: [{ url: companyLogo, alt: companyName }],
          siteName: companyName,
        },
        twitter: {
          cardType: 'summary',
          site: companyName,
          handle: '@' + companyName,
        },
      })}
    </Head>
  );
}
