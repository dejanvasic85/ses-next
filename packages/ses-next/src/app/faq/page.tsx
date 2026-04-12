import type { Metadata } from 'next';

import { getFAQs, getSiteSettings } from '@/lib/content/contentService';
import { safeJsonLd } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'FAQ | Storm Electrical Solutions',
  description: 'Check out our frequently asked questions to learn more about our electrical services in Melbourne.',
  alternates: {
    canonical: '/faq',
  },
};

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
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Frequently asked questions
            </h1>
            <p className="mx-auto text-center text-gray-500 md:text-lg">
              Check out our frequently asked questions to learn more about our services.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-8">
            {faqItems.map(({ question, answer }, idx) => (
              <div className="rounded-lg bg-gray-100 p-5" key={idx}>
                <div className="mb-4 flex items-center justify-between gap-4 border-b pb-4">
                  <h2 className="text-primary font-semibold sm:text-lg md:text-xl">{question}</h2>
                </div>
                <p className="text-gray-500">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
