import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';

import { CustomImage } from '@/components';
import { getTermsAndConditions } from '@/lib/content/contentService';

export const metadata: Metadata = {
  title: 'Terms of Service | Storm Electrical Solutions',
  description: 'Terms of service for Storm Electrical Solutions.',
  alternates: {
    canonical: '/terms',
  },
};

export default async function TermsPage() {
  const [termsContent] = await getTermsAndConditions();

  if (!termsContent) {
    notFound();
  }

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Terms of Service</h1>
          <div className="mx-auto prose text-gray-500 md:text-lg">
            <PortableText
              value={termsContent.terms}
              components={{
                types: {
                  image: ({ value }) => <CustomImage value={value} />,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
