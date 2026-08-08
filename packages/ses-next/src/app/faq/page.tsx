import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { PageSection } from '@/components/PageSection';
import { getFAQs, getSiteSettings } from '@/lib/content/contentService';
import { safeJsonLd } from '@/lib/structuredData';

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const { companyName, phone } = siteSettings;
  return {
    title: `Electrician FAQs Melbourne | Common Questions Answered | ${companyName}`,
    description: `Answers to common questions about electrical work in Melbourne — costs, safety, switchboards, solar & more. Licensed electricians, 5.0★ rated. Call ${phone}.`,
    alternates: {
      canonical: '/faq',
    },
  };
}

export default async function FaqPage() {
  const [faqItems, siteSettings] = await Promise.all([getFAQs(), getSiteSettings()]);

  const { baseUrl } = siteSettings;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'FAQ' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      <PageSection>
        <Container width="standard">
          <div className="mb-10 md:mb-16">
            <h1 className="text-base-content mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">
              Frequently asked questions
            </h1>
            <p className="text-base-content/70 mx-auto text-center md:text-lg">
              Check out our frequently asked questions to learn more about our services.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-8">
            {faqItems.map(({ question, answer }, idx) => (
              <div className="surface-quiet rounded-lg p-5" key={idx}>
                <div className="mb-4 flex items-center justify-between gap-4 border-b pb-4">
                  <h2 className="text-primary font-semibold sm:text-lg md:text-xl">{question}</h2>
                </div>
                <p className="text-base-content/70">{answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </PageSection>
    </>
  );
}
