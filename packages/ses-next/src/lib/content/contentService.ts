import { createClient } from 'next-sanity';
import { config } from '@/lib/config';
import {
  type BlogPost,
  type SiteSettings,
  type ServiceItem,
  type HomePageContent,
  type TermsAndConditionsContent,
  type FAQ,
  type BlogPostContentModel,
  type SanityTermsAndConditions,
  SiteSettingsSchema,
  HomepageSchema,
  ServiceSchema,
  BlogPostSchema,
  FAQSchema,
  TermsAndConditionsSchema,
} from '@/types';
import {
  mapBlogPost,
  mapHomepageTeam,
  mapHomepageTraining,
  mapService,
  mapHomepageContact,
  mapSiteSettings,
} from '@/lib/content/mappers';
import {
  allBlogPostsQuery,
  allFaqsQuery,
  homepageQuery,
  servicesQuery,
  siteSettingsQuery,
  blogPostBySlugQuery,
  termsAndConditionsQuery,
} from './queries';

// ============================================================================
// INTERNAL SANITY CLIENT (NOT EXPORTED)
// ============================================================================

const sanityClient = createClient({
  projectId: config.sanityProjectId,
  dataset: config.sanityDataset,
  apiVersion: '2021-06-07',
  useCdn: true,
  perspective: 'published',
});

// ============================================================================
// EXPORTED FUNCTIONS
// ============================================================================

export const getHomePageContent = async (): Promise<HomePageContent> => {
  try {
    const result = await sanityClient.fetch(homepageQuery);
    const homepage = HomepageSchema.parse(result);

    const team = mapHomepageTeam(homepage);
    const training = mapHomepageTraining(homepage);
    const contact = mapHomepageContact(homepage);

    return {
      contact,
      services: homepage.services,
      mainHeading: homepage.mainHeading,
      subHeading: homepage.subHeading,
      team,
      training,
    };
  } catch (error) {
    console.error('Error in getHomePageContent:', error);
    throw new Error('Failed to fetch homepage content');
  }
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const result = await sanityClient.fetch(allBlogPostsQuery);
    return result.map((post: unknown) => BlogPostSchema.parse(post)).map(mapBlogPost);
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    throw new Error('Failed to fetch blog posts');
  }
};

export const getTermsAndConditions = async (): Promise<TermsAndConditionsContent[]> => {
  try {
    const result = await sanityClient.fetch(termsAndConditionsQuery);
    const termsDocuments = result.map((terms: unknown) => TermsAndConditionsSchema.parse(terms));
    return termsDocuments.map((doc: SanityTermsAndConditions) => ({
      id: doc._id,
      terms: doc.terms,
    }));
  } catch (error) {
    console.error('Error in getTermsAndConditions:', error);
    throw new Error('Failed to fetch terms and conditions');
  }
};

export const getFAQs = async (): Promise<Array<{ question: string; answer: string }>> => {
  try {
    const result = await sanityClient.fetch(allFaqsQuery);
    const faqs = result.map((faq: unknown) => FAQSchema.parse(faq));
    return faqs.map((faq: FAQ) => ({
      question: faq.question,
      answer: faq.answer,
    }));
  } catch (error) {
    console.error('Error in getFAQs:', error);
    throw new Error('Failed to fetch FAQs');
  }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const result = await sanityClient.fetch(siteSettingsQuery);
    const siteSettings = SiteSettingsSchema.parse(result);
    return mapSiteSettings(siteSettings);
  } catch (error) {
    console.error('Error in getSiteSettings:', error);
    throw new Error('Failed to fetch site settings');
  }
};

export const getServices = async (): Promise<ServiceItem[]> => {
  try {
    const result = await sanityClient.fetch(servicesQuery);
    return result.map((item: unknown) => ServiceSchema.parse(item)).map(mapService);
  } catch (error) {
    console.error('Error in getServices:', error);
    throw new Error('Failed to fetch services');
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPostContentModel | null> => {
  try {
    const result = await sanityClient.fetch(blogPostBySlugQuery, { slug });
    if (!result) return null;
    return BlogPostSchema.parse(result);
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    throw new Error('Failed to fetch blog post');
  }
};
