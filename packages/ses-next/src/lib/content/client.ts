import { createClient } from 'next-sanity';

import { config } from '@/lib/config';

export const sanityClient = createClient({
  projectId: config.sanityProjectId,
  dataset: config.sanityDataset,
  apiVersion: '2021-06-07',
  useCdn: true,
  perspective: 'published',
});
