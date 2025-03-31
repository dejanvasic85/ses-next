import { PortableText } from '@portabletext/react';
import { Layout, CustomImage } from '../../components';
import { getBasePageProps } from '../../lib/basePageProps';
import { getTermsAndConditions } from '../../lib/content/contentService';

export default function Terms({ content, googleReviews, pageUrl, termsContent }) {
  return (
    <Layout content={content} pageUrl={pageUrl} googleReviews={googleReviews}>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Terms of Service</h1>
            <p className="mx-auto text-center text-gray-500 md:text-lg">
              <PortableText
                value={termsContent.terms}
                components={{
                  types: { image: CustomImage },
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const baseProps = await getBasePageProps({ pageUrl: 'terms' });
  const [termsContent] = await getTermsAndConditions();

  return {
    props: {
      ...baseProps,
      termsContent,
    },
  };
};
