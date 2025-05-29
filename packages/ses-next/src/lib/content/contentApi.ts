import { config } from '../config';

export const buildFetchFromApi = (): Promise<any> =>
  fetchFromApi(
    `https://${config.sanityProjectId}.api.sanity.io/v2021-06-07/data/query/${config.sanityDataset}?query=*[]`,
  );

export const fetchFromApi = async (url: string): Promise<any> => {
  console.log('Querying content service', url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Content service returned a on-200 error!');
  }

  return response.json();
};
