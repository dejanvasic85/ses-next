import { sanityClient } from '@/sanity/lib/client';
import { type TermsAndConditionsContent, type SanityTermsAndConditions, TermsAndConditionsSchema } from '@/types';
import { termsAndConditionsQuery } from '@/lib/content/queries';

export const getTermsAndConditions = async (): Promise<TermsAndConditionsContent[]> => {
  try {
    const result = await sanityClient.fetch(termsAndConditionsQuery, {}, { next: { tags: ['terms-and-conditions'] } });
    const termsDocuments = TermsAndConditionsSchema.array().parse(result);
    return termsDocuments.map((doc: SanityTermsAndConditions) => ({
      id: doc._id,
      terms: doc.terms,
    }));
  } catch (error) {
    console.error('Error in getTermsAndConditions:', error);
    throw new Error('Failed to fetch terms and conditions');
  }
};
