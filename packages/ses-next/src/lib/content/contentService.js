import { jsonFileCacher } from './cache';
import { fetchFromApi } from './contentApi';
import { mapCompanyLogo, mapServices, mapTeam, mapTestimonials, mapTraining } from './mappers';

const getByTypename = (data, type) => {
  return data.find(({ _type }) => _type === type);
};

const composeContent = (fullContent, homepageItem) => {
  return (...mappers) => mappers.map((mapper) => mapper(fullContent, homepageItem));
};

const fetchFromCacheOrApi = async () => {
  const date = new Date();
  const cacheKey = `content-data-${date.getMonth() + 1}-${date.getFullYear()}`;
  return jsonFileCacher(cacheKey, () =>
    fetchFromApi(`https://j7d3pd5g.api.sanity.io/v2021-06-07/data/query/production?query=*[]`),
  );
};

export const getHomePageContent = async () => {
  const { result: fullContent } = await fetchFromCacheOrApi();
  console.log('Content: Mapping api response');
  const homepageItem = getByTypename(fullContent, 'homepage');
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

  return {
    baseUrl,
    companyName,
    companyLogo,
    contact,
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
