import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';

import { Container, CustomImage, PageSection } from '@/components';
import { getTermsAndConditions, getSiteSettings } from '@/lib/content/contentService';

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const { companyName } = siteSettings;
  return {
    title: `Terms of Service | ${companyName}`,
    description: `Terms of service for ${companyName}.`,
    alternates: {
      canonical: '/terms',
    },
  };
}

export default async function TermsPage() {
  const [termsContent] = await getTermsAndConditions();

  if (!termsContent) {
    notFound();
  }

  return (
    <PageSection>
      <Container width="standard">
        <div className="mb-10 md:mb-16">
          <h1 className="text-base-content mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">
            Terms of Service
          </h1>
          <div className="prose text-base-content/70 mx-auto md:text-lg">
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
      </Container>
    </PageSection>
  );
}
