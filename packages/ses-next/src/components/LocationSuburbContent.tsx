import Link from 'next/link';
import { PortableText } from '@portabletext/react';

import { CustomImage } from '@/components/CustomImage';
import { Icon } from '@/components/Icon/Icon';
import { LinkButton } from '@/components/LinkButton';
import type { LocationPage } from '@/types';

type LocationSuburbContentProps = {
  page: LocationPage;
  phone: string;
  otherSuburbs: LocationPage[];
};

const portableTextComponents = {
  types: {
    image: ({ value }: { value: string }) => <CustomImage value={value} />,
  },
};

export function LocationSuburbContent({ page, phone, otherSuburbs }: LocationSuburbContentProps) {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto px-4 md:px-8 max-w-screen-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Electrician {page.suburb}</h1>

        {page.intro && (
          <div className="prose lg:prose-lg mb-8">
            <PortableText value={page.intro} components={portableTextComponents} />
          </div>
        )}

        {page.distanceFromBase && (
          <div className="bg-primary/10 border-l-4 border-primary rounded-r-lg p-4 mb-8">
            <p className="text-gray-800 font-medium">{page.distanceFromBase}</p>
          </div>
        )}

        {page.services.length > 0 && (
          <section aria-labelledby="services-heading" className="mb-12">
            <h2 id="services-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Our Services in {page.suburb}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {page.services.map(({ id, name, blurb, slug, parentService }) => {
                const servicePath = parentService ? `/services/${parentService.slug}/${slug}` : `/services/${slug}`;
                return (
                  <li key={id}>
                    <Link
                      href={servicePath}
                      className="group block bg-gray-50 hover:bg-primary/5 border border-gray-200 hover:border-primary rounded-lg p-4 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                        {name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{blurb}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {otherSuburbs.length > 0 && (
          <section aria-labelledby="also-serving-heading" className="mb-12">
            <h2 id="also-serving-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Also Serving Nearby
            </h2>
            <ul className="flex flex-wrap gap-2">
              {otherSuburbs.map(({ id, suburb, slug }) => (
                <li key={id}>
                  <Link
                    href={`/electrician-${slug}/`}
                    className="inline-block bg-gray-100 hover:bg-primary hover:text-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    {suburb}
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
