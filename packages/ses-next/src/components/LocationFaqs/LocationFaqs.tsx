import type { LocationPageFaq } from '@/types';

type LocationFaqsProps = {
  faqs: LocationPageFaq[];
  suburb: string;
};

export function LocationFaqs({ faqs, suburb }: LocationFaqsProps) {
  return (
    <section aria-labelledby="location-faq-heading" className="mx-auto mt-12 mb-8 max-w-screen-lg px-4 md:px-8">
      <h2 id="location-faq-heading" className="mb-6 text-3xl font-bold text-gray-900">
        Frequently Asked Questions — {suburb}
      </h2>
      <dl className="divide-y divide-gray-200">
        {faqs.map(({ question, answer }) => (
          <div key={question} className="py-6">
            <dt className="text-lg font-semibold text-gray-900">{question}</dt>
            <dd className="mt-2 text-gray-600">{answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
