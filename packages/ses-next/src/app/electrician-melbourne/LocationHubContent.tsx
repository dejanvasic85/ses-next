import Link from 'next/link';
import { PortableText } from '@portabletext/react';

import { CustomImage } from '@/components/CustomImage';
import { Icon } from '@/components/Icon/Icon';
import { LinkButton } from '@/components/LinkButton';
import type { LocationPage } from '@/types';

type LocationHubContentProps = {
  page: LocationPage;
  allSuburbs: LocationPage[];
  phone: string;
};

const portableTextComponents = {
  types: {
    image: ({ value }: { value: string }) => <CustomImage value={value} />,
  },
};

export function LocationHubContent({ page, allSuburbs, phone }: LocationHubContentProps) {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto px-4 md:px-8 max-w-screen-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Electrician Melbourne</h1>

        {page.intro && (
          <div className="prose lg:prose-lg mb-12">
            <PortableText value={page.intro} components={portableTextComponents} />
          </div>
        )}

        {allSuburbs.length > 0 && (
          <section aria-labelledby="areas-heading" className="mb-12">
            <h2 id="areas-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Areas We Serve
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allSuburbs.map(({ id, suburb, slug, distanceFromBase }) => (
                <li key={id}>
                  <Link
                    href={`/electrician-${slug}/`}
                    className="group block bg-gray-50 hover:bg-primary/5 border border-gray-200 hover:border-primary rounded-lg p-5 transition-colors h-full"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                      Electrician {suburb}
                    </h3>
                    {distanceFromBase && <p className="text-sm text-gray-500">{distanceFromBase}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {page.faqs.length > 0 && (
          <section aria-labelledby="faq-heading" className="mb-12">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="divide-y divide-gray-200">
              {page.faqs.map(({ question, answer }) => (
                <div key={question} className="py-6">
                  <dt className="text-lg font-semibold text-gray-900">{question}</dt>
                  <dd className="mt-2 text-gray-600">{answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Ready to book or need a quote? Call us or send a message.</p>
          <LinkButton href={`tel:${phone}`}>
            <Icon name="phone" size="lg" /> {phone}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
