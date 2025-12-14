import { GetStaticProps } from 'next';
import { PortableText } from '@portabletext/react';
import { Layout, CustomImage } from '@/components';
import { getBasePageProps } from '@/lib/basePageProps';
import { getTermsAndConditions, ProcessedTermsAndConditions } from '@/lib/content/contentService';
import { BasePageProps } from '@/types';

interface TermsProps extends BasePageProps {
  pageUrl: string;
  termsContent: ProcessedTermsAndConditions;
}

export default function Terms({ pageUrl, termsContent, services, siteSettings }: TermsProps) {
  return (
    <Layout services={services} siteSettings={siteSettings} pageUrl={pageUrl}>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Terms of Service</h1>
            <p className="mx-auto prose text-gray-500 md:text-lg">
              <PortableText
                value={termsContent.terms}
                components={{
                  types: {
                    image: ({ value }) => <CustomImage value={value} />,
                  },
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const baseProps = await getBasePageProps({ pageUrl: 'terms' });
  const [termsContent] = await getTermsAndConditions();

  return {
    props: {
      ...baseProps,
      termsContent,
    },
  };
};
