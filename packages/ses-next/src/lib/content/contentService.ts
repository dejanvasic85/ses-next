import {
  SanityDocumentSchema,
  SanityDocument,
  Homepage,
  HomepageSchema,
  BlogPost,
  BlogPostSchema,
  TermsAndConditions,
  TermsAndConditionsSchema,
  FAQ,
  FAQSchema,
  ProcessedBlogPost,
  ProcessedServiceList,
  ProcessedTeam,
  ProcessedTraining,
  ProcessedTestimonial,
  Social,
  SanityPortableText,
} from '@/types';
import { jsonFileCacher } from './cache';
import { buildFetchFromApi, CacheApiResponse } from './contentApi';
import { mapCompanyLogo, mapServices, mapTeam, mapTestimonials, mapTraining } from './mappers';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface HomePageContentResult {
  baseUrl: string;
  companyName: string;
  companyLogo: string;
  contact: {
    phone: string;
    blurbs?: string[];
    callBack?: string;
  };
  faqItems: Array<{ question: string; answer: string }>;
  googleMapsLocation?: string;
  googleMapsLocationPlaceUrl?: string;
  meta: {
    title: string;
    description: string;
  };
  services: ProcessedServiceList;
  shortTitle: string;
  social: Social;
  mainHeading?: string;
  subHeading?: string;
  team: ProcessedTeam;
  training: ProcessedTraining[];
  testimonials: ProcessedTestimonial[];
}

export interface ProcessedTermsAndConditions {
  id: string;
  terms: SanityPortableText;
}

type MapperFunction = (
  fullContent: SanityDocument[],
  item: Homepage,
) => ProcessedServiceList | ProcessedTeam | ProcessedTraining[] | ProcessedTestimonial[] | string;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getHomePage = (data: SanityDocument[]): Homepage => {
  const homepage = data.find((doc): doc is Homepage => doc._type === 'homepage');
  if (!homepage) {
    throw new Error('Homepage document not found');
  }
  return HomepageSchema.parse(homepage);
};

const getFaqItems = (data: SanityDocument[]): FAQ[] => {
  const faqItems = data.filter((doc): doc is FAQ => doc._type === 'faq');
  return faqItems.map((faq) => FAQSchema.parse(faq));
};

const getBlogPostDocuments = (data: SanityDocument[]): BlogPost[] => {
  const blogPosts = data.filter((doc): doc is BlogPost => doc._type === 'blog-post');
  return blogPosts.map((post) => BlogPostSchema.parse(post));
};

const getTermsDocuments = (data: SanityDocument[]): TermsAndConditions[] => {
  const termsDocuments = data.filter((doc): doc is TermsAndConditions => doc._type === 'terms-and-conditions');
  return termsDocuments.map((terms) => TermsAndConditionsSchema.parse(terms));
};

const composeContent = (fullContent: SanityDocument[], item: Homepage) => {
  return (...mappers: MapperFunction[]) => mappers.map((mapper) => mapper(fullContent, item));
};

const validateSanityData = (data: unknown[]): SanityDocument[] => {
  return data.map((item, index) => {
    try {
      return SanityDocumentSchema.parse(item);
    } catch (error) {
      console.warn(`Invalid document at index ${index}:`, error);
      throw new Error(`Failed to validate Sanity document at index ${index}`);
    }
  });
};

const fetchFromCacheOrApi = async (): Promise<CacheApiResponse> => {
  const date = new Date();
  const cacheKey = `content-data-${date.getMonth() + 1}-${date.getFullYear()}`;
  const response = await jsonFileCacher(cacheKey, buildFetchFromApi);

  // Validate the response structure
  if (!response || !Array.isArray(response.result)) {
    throw new Error('Invalid response structure from cache/API');
  }

  return {
    result: validateSanityData(response.result),
  };
};

// ============================================================================
// EXPORTED FUNCTIONS
// ============================================================================

export const getHomePageContent = async (
  contentFetch?: () => Promise<CacheApiResponse>,
): Promise<HomePageContentResult> => {
  try {
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
      socialMedia: social = {},
      mainHeading,
      subHeading,
    } = homepageItem;

    const contentResults = composeContent(fullContent, homepageItem)(
      mapServices,
      mapTeam,
      mapTraining,
      mapTestimonials,
      mapCompanyLogo,
    );

    const services = contentResults[0] as ProcessedServiceList;
    const team = contentResults[1] as ProcessedTeam;
    const training = contentResults[2] as ProcessedTraining[];
    const testimonials = contentResults[3] as ProcessedTestimonial[];
    const companyLogo = contentResults[4] as string;

    const faqItems = getFaqItems(fullContent).map(({ question, answer }) => ({
      question,
      answer,
    }));

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
  } catch (error) {
    console.error('Error in getHomePageContent:', error);
    throw new Error('Failed to fetch homepage content');
  }
};

export const getBlogPosts = async (contentFetch?: () => Promise<CacheApiResponse>): Promise<ProcessedBlogPost[]> => {
  try {
    const { result: fullContent } = contentFetch ? await contentFetch() : await fetchFromCacheOrApi();
    const blogPosts = getBlogPostDocuments(fullContent);

    return blogPosts.map((post) => {
      const { _id, description, body, title, tags, slug, publishedAt, photo } = post;

      // Find the photo asset in the fullContent
      const photoAsset = fullContent.find((doc) => doc._id === photo.asset._ref);
      if (!photoAsset || !('url' in photoAsset)) {
        throw new Error(`Photo asset not found for blog post: ${title}`);
      }

      return {
        id: _id,
        description,
        body,
        title,
        tags,
        slug: slug.current,
        publishedAt,
        photo: photoAsset.url as string,
      };
    });
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    throw new Error('Failed to fetch blog posts');
  }
};

export const getTermsAndConditions = async (
  contentFetch?: () => Promise<CacheApiResponse>,
): Promise<ProcessedTermsAndConditions[]> => {
  try {
    const { result: fullContent } = contentFetch ? await contentFetch() : await fetchFromCacheOrApi();
    const termsDocuments = getTermsDocuments(fullContent);

    return termsDocuments.map(({ _id, terms }) => ({
      id: _id,
      terms,
    }));
  } catch (error) {
    console.error('Error in getTermsAndConditions:', error);
    throw new Error('Failed to fetch terms and conditions');
  }
};

// ============================================================================
// TYPE EXPORTS FOR CONSUMERS
// ============================================================================

export type { HomePageContentResult, CacheApiResponse };
