import { jsonFileCacher } from './cache';
import { buildFetchFromApi } from './contentApi';
import { mapCompanyLogo, mapServices, mapTeam, mapTestimonials, mapTraining } from './mappers';

const getHomePage = (data: any[]): any => {
  return data.find(({ _type }: any) => _type === 'homepage');
};

const getFaqItems = (data: any[]): any[] => {
  return data.filter(({ _type }: any) => _type === 'faq');
};

const composeContent = (fullContent: any[], item: any) => {
  return (...mappers: any[]) => mappers.map((mapper) => mapper(fullContent, item));
};

const fetchFromCacheOrApi = async (): Promise<any> => {
  const date = new Date();
  const cacheKey = `content-data-${date.getMonth() + 1}-${date.getFullYear()}`;
  return jsonFileCacher(cacheKey, buildFetchFromApi);
};

export const getHomePageContent = async (contentFetch?: () => Promise<any>): Promise<any> => {
  const { result: fullContent } = contentFetch ? await contentFetch() : await fetchFromCacheOrApi();
  const homepageItem = getHomePage(fullContent);
  const {
    baseUrl,
    companyName,
    contact,
    googleMapsLocation,
    googleMapsLocationPlaceUrl,
    meta,
    shortTitle,
    socialMedia: social,
    mainHeading,
    subHeading,
  } = homepageItem;

  const [services, team, training, testimonials, companyLogo] = composeContent(fullContent, homepageItem)(
    mapServices,
    mapTeam,
    mapTraining,
    mapTestimonials,
    mapCompanyLogo,
  );

  const faqItems = getFaqItems(fullContent).map(({ question, answer }: any) => ({ question, answer }));

  return {
    baseUrl,
    companyName,
    companyLogo,
    contact,
    faqItems,
    googleMapsLocation,
    googleMapsLocationPlaceUrl,
    meta,
    services,
    shortTitle,
    social,
    mainHeading,
    subHeading,
    team,
    training,
    testimonials,
  };
};

export const getBlogPosts = async (contentFetch?: () => Promise<any>): Promise<any[]> => {
  const { result: fullContent } = contentFetch ? await contentFetch() : await fetchFromCacheOrApi();

  return fullContent
    .filter(({ _type }: any) => _type === 'blog-post')
    .map(({ _id, description, body, title, tags, slug, publishedAt, photo }: any) => ({
      id: _id,
      description,
      body,
      title,
      tags,
      slug: slug.current,
      publishedAt,
      photo: fullContent.find(({ _id }: any) => _id === photo.asset._ref).url,
    }));
};

export const getTermsAndConditions = async (contentFetch?: () => Promise<any>): Promise<any[]> => {
  const { result: fullContent } = contentFetch ? await contentFetch() : await fetchFromCacheOrApi();

  return fullContent
    .filter(({ _type }: any) => _type === 'terms-and-conditions')
    .map(({ _id, terms }: any) => ({
      id: _id,
      terms,
    }));
};
