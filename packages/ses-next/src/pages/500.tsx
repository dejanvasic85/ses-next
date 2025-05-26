import NextLink from 'next/link';

import { getBasePageProps } from '@/lib/basePageProps';

const ServerErrorPage = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Server Error</h1>
          <p className="text-center text-gray-800 text-lg">
            We experienced something unexpected. Please try again later or{' '}
            <NextLink href="/" className="link">
              contact support
            </NextLink>{' '}
            if the issue persists.
          </p>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const baseProps = await getBasePageProps({ pageUrl: '' });

  return {
    props: {
      ...baseProps,
    },
  };
};

export default ServerErrorPage;
