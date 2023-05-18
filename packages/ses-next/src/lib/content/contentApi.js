import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const buildFetchFromApi = () =>
  fetchFromApi(
    `https://${serverRuntimeConfig.sanityProjectId}.api.sanity.io/v2021-06-07/data/query/${serverRuntimeConfig.sanityDataset}?query=*[]`,
  );

export const fetchFromApi = async (url) => {
  console.log('Querying content service');
  const response = await fetch(url);

  if (response.status < 200 || response.status > 299) {
    throw new Error('Content service returned a on-200 error!');
  }

  return response.json();
};
