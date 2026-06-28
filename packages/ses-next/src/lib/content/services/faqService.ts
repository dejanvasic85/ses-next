import { sanityClient } from '@/sanity/lib/client';
import { type FAQ, FAQSchema } from '@/types';
import { allFaqsQuery } from '@/lib/content/queries';

export const getFAQs = async (): Promise<Array<{ question: string; answer: string }>> => {
  try {
    const result = await sanityClient.fetch(allFaqsQuery, {}, { next: { tags: ['faq'] } });
    const faqs = result.map((faq: unknown) => FAQSchema.parse(faq));
    return faqs.map((faq: FAQ) => ({
      question: faq.question,
      answer: faq.answer,
    }));
  } catch (error) {
    console.error('Error in getFAQs:', error);
    throw new Error('Failed to fetch FAQs');
  }
};
