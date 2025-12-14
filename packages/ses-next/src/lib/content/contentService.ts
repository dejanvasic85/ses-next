import type { BlogPost, SiteSettings, ServiceItem, HomePageContent, ProcessedTermsAndConditions } from '@/types';
import {
  getHomepage,
  getAllBlogPosts,
  getAllFAQs,
  getAllTermsAndConditions,
  getAllServicesContent,
  getSiteSettingsContent,
} from '@/lib/content/client';
import {
  mapBlogPost,
  mapHomepageTeam,
  mapHomepageTraining,
  mapService,
  mapSocialMedia,
  mapHomepageContact,
  mapSiteSettings,
} from '@/lib/content/mappers';

// ============================================================================
// EXPORTED FUNCTIONS
// ============================================================================

export const getHomePageContent = async (): Promise<HomePageContent> => {
  try {
    const homepage = await getHomepage();

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
    const blogPosts = await getAllBlogPosts();
    return blogPosts.map(mapBlogPost);
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    throw new Error('Failed to fetch blog posts');
  }
};

export const getTermsAndConditions = async (): Promise<ProcessedTermsAndConditions[]> => {
  try {
    const termsDocuments = await getAllTermsAndConditions();
    return termsDocuments.map(({ _id, terms }) => ({
      id: _id,
      terms,
    }));
  } catch (error) {
    console.error('Error in getTermsAndConditions:', error);
    throw new Error('Failed to fetch terms and conditions');
  }
};

export const getFAQs = async (): Promise<Array<{ question: string; answer: string }>> => {
  try {
    const faqs = await getAllFAQs();
    return faqs.map(({ question, answer }) => ({
      question,
      answer,
    }));
  } catch (error) {
    console.error('Error in getFAQs:', error);
    throw new Error('Failed to fetch FAQs');
  }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const siteSettings = await getSiteSettingsContent();
    return mapSiteSettings(siteSettings);
  } catch (error) {
    console.error('Error in getSiteSettings:', error);
    throw new Error('Failed to fetch site settings');
  }
};

export const getServices = async (): Promise<ServiceItem[]> => {
  try {
    const services = await getAllServicesContent();
    return services.map(mapService);
  } catch (error) {
    console.error('Error in getServices:', error);
    throw new Error('Failed to fetch services');
  }
};
