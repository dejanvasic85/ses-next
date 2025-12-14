import type {
  BlogPost,
  ServiceList,
  Team,
  Training,
  ServiceItem,
  Social,
  SanityPortableText,
  SiteSettings,
  ContactContentModel,
} from '@/types';
import {
  getHomepage,
  getAllBlogPosts,
  getAllFAQs,
  getAllTermsAndConditions,
  getAllServicesContent,
  getSiteSettingsContent,
  mapBlogPost,
  mapHomepageServices,
  mapHomepageTeam,
  mapHomepageTraining,
  mapService,
  mapSocialMedia,
  mapHomepageContact,
  mapSiteSettings,
} from '@/lib/sanity/queries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface HomePageContentResult {
  baseUrl: string;
  companyName: string;
  companyLogo: string;
  contact: ContactContentModel;
  googleMapsLocation: string | null;
  googleMapsLocationPlaceUrl: string | null;
  meta: {
    title: string;
    description: string;
  };
  services: ServiceList;
  shortTitle: string;
  social: Social;
  mainHeading: string | null;
  subHeading: string | null;
  team: Team;
  training: Training[];
}

export interface ProcessedTermsAndConditions {
  id: string;
  terms: SanityPortableText;
}

// ============================================================================
// EXPORTED FUNCTIONS
// ============================================================================

export const getHomePageContent = async (siteSettings: SiteSettings): Promise<HomePageContentResult> => {
  try {
    const homepage = await getHomepage();

    const {
      baseUrl,
      companyName,
      googleMapsLocation,
      googleMapsLocationPlaceUrl,
      meta,
      shortTitle,
      social: socialMedia,
    } = siteSettings;

    const { mainHeading, subHeading } = homepage;

    const social = mapSocialMedia(socialMedia);
    const services = mapHomepageServices(homepage);
    const team = mapHomepageTeam(homepage);
    const training = mapHomepageTraining(homepage);
    const contact = mapHomepageContact(homepage);
    const companyLogo = siteSettings.companyLogo;

    return {
      baseUrl,
      companyName,
      companyLogo,
      contact,
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
