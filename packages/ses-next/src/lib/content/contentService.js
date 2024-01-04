import { jsonFileCacher } from './cache';
import { buildFetchFromApi } from './contentApi';
import { mapCompanyLogo, mapServices, mapTeam, mapTestimonials, mapTraining } from './mappers';

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
  return jsonFileCacher(cacheKey, buildFetchFromApi);
};

export const getHomePageContent = async (contentFetch) => {
  const { result: fullContent } = contentFetch ? await contentFetch() : await fetchFromCacheOrApi();
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
