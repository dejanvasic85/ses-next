import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';

interface PageHeadProps {
  canonicalUrl: string;
  companyName: string;
  companyLogo: string;
  description: string;
  title: string;
}

export function PageHead({ canonicalUrl, companyName, companyLogo, description, title }: PageHeadProps) {
  return (
    <Head>
      {generateNextSeo({
        title,
        description,
        canonical: canonicalUrl,
        openGraph: {
          url: canonicalUrl,
          title,
          description,
          images: [{ url: companyLogo, alt: companyName }],
          siteName: companyName,
          locale: 'en_AU',
        },
      })}
    </Head>
  );
}
