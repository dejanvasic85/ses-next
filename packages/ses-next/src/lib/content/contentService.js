import getConfig from 'next/config';

import { jsonFileCacher } from './cache';
import { fetchFromApi } from './contentApi';
import { mapCompanyLogo, mapServices, mapTeam, mapTestimonials, mapTraining } from './mappers';

const { serverRuntimeConfig } = getConfig();

const getHomePage = (data) => {
  return data.find(({ _type }) => _type === 'homepage');
};

const getFaqItems = (data) => {
  return data.filter(({ _type }) => _type === 'faq');
};

const composeContent = (fullContent, item) => {
  return (...mappers) => mappers.map((mapper) => mapper(fullContent, item));
};

const fetchFromCacheOrApi = async () => {
  const date = new Date();
  const cacheKey = `content-data-${date.getMonth() + 1}-${date.getFullYear()}`;
  return jsonFileCacher(cacheKey, () =>
    fetchFromApi(
      `https://${serverRuntimeConfig.sanityProjectId}.api.sanity.io/v2021-06-07/data/query/${serverRuntimeConfig.sanityDataset}?query=*[]`,
    ),
  );
};

export const getHomePageContent = async () => {
  const { result: fullContent } = await fetchFromCacheOrApi();
  console.log('Content: Mapping api response');
  const homepageItem = getHomePage(fullContent);
  const {
    baseUrl,
    companyName,
    contact,
    googleMapsLocation,
    meta,
    shortTitle,
    socialMedia: social,
    tagline,
  } = homepageItem;

  const [services, team, training, testimonials, companyLogo] = composeContent(fullContent, homepageItem)(
    mapServices,
    mapTeam,
    mapTraining,
    mapTestimonials,
    mapCompanyLogo,
  );

  const faqItems = getFaqItems(fullContent).map(({ question, answer }) => ({ question, answer }));

  return {
    baseUrl,
    companyName,
    companyLogo,
    contact,
    faqItems,
    googleMapsLocation,
    meta,
    services,
    shortTitle,
    social,
    tagline,
    team,
    training,
    testimonials,
  };
};
