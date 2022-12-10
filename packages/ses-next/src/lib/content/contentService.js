import { content } from './fallbackContent';

const getByTypename = (data, type) => {
  return data.find(({ _type }) => _type === type);
};

export const getHomePageContent = async () => {
  console.log('Querying content service');
  const contentResponse = await fetch(`https://j7d3pd5g.api.sanity.io/v2021-06-07/data/query/production?query=*[]`);

  if (contentResponse.status < 200 || contentResponse.status > 299) {
    throw new Error('Content service returned a on-200 error!');
  }

  const { result } = await contentResponse.json();
  const { baseUrl, companyName, shortTitle, tagline } = getByTypename(result, 'homepage');

  return {
    ...content,
    baseUrl,
    companyName,
    shortTitle,
    tagline,
  };
};
