import { Container } from '@/components/Container';
import type { LocationPageFaq } from '@/types';

type LocationFaqsProps = {
  faqs: LocationPageFaq[];
  suburb: string;
};

export function LocationFaqs({ faqs, suburb }: LocationFaqsProps) {
  return (
    <Container width="wide" as="section" className="mt-12 mb-8" aria-labelledby="location-faq-heading">
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
    </Container>
  );
}
