import { config } from '../config';

export const buildFetchFromApi = () =>
  fetchFromApi(
    `https://${config.sanityProjectId}.api.sanity.io/v2021-06-07/data/query/${config.sanityDataset}?query=*[]`,
  );

export const fetchFromApi = async (url) => {
  console.log('Querying content service', url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Content service returned a on-200 error!');
  }

  return response.json();
};
