import type { LocationPageFaq } from '@/types';

type LocationFaqsProps = {
  faqs: LocationPageFaq[];
  suburb: string;
};

export function LocationFaqs({ faqs, suburb }: LocationFaqsProps) {
  return (
    <section aria-labelledby="location-faq-heading" className="mx-auto mt-12 mb-8 max-w-screen-lg px-4 md:px-8">
      <h2 id="location-faq-heading" className="text-base-content mb-6 text-3xl font-bold">
        Frequently Asked Questions — {suburb}
      </h2>
      <dl className="divide-base-300 divide-y">
        {faqs.map(({ question, answer }) => (
          <div key={question} className="py-6">
            <dt className="text-base-content text-lg font-semibold">{question}</dt>
            <dd className="text-base-content/70 mt-2">{answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
