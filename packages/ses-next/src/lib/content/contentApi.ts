import { config } from '@/lib/config';
import { SanityDocumentSchema } from '@/types';

interface SanityApiRawResponse {
  result: unknown[];
}

export interface CacheApiResponse {
  result: Array<ReturnType<typeof SanityDocumentSchema.parse>>;
}

export const buildFetchFromApi = (): Promise<CacheApiResponse> =>
  fetchFromApi(
    `https://${config.sanityProjectId}.api.sanity.io/v2021-06-07/data/query/${config.sanityDataset}?query=*[]`,
  );

export const fetchFromApi = async (url: string): Promise<CacheApiResponse> => {
  console.log('Querying content service', url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Content service returned a on-200 error!');
  }

  const rawData = (await response.json()) as SanityApiRawResponse;

  // Validate each document in the result array
  const validatedResult = rawData.result.map((item, index) => {
    try {
      return SanityDocumentSchema.parse(item);
    } catch (error) {
      console.warn(`Invalid document at index ${index}:`, error);
      throw new Error(`Failed to validate Sanity document at index ${index}`);
    }
  });

  return {
    result: validatedResult,
  };
};
