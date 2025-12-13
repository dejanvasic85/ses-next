import type {
  BlogPost,
  ServiceList,
  Team,
  Training,
  Social,
  SanityPortableText,
  SanitySiteSettings,
  SiteSettingsContentModel,
} from '@/types';
import {
  getSiteSettings,
  getHomepage,
  getAllBlogPosts,
  getAllFAQs,
  getAllTermsAndConditions,
  mapBlogPost,
  mapHomepageServices,
  mapHomepageTeam,
  mapHomepageTraining,
  mapSiteSettingsCompanyLogo,
} from '@/lib/sanity/queries';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface HomePageContentResult {
  baseUrl: string;
  companyName: string;
  companyLogo: string;
  contact: {
    phone: string;
    blurbs: string[] | null;
    callBack: string | null;
  };
  faqItems: Array<{ question: string; answer: string }>;
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

export const getHomePageContent = async (): Promise<HomePageContentResult> => {
  try {
    const [siteSettings, homepage, faqs] = await Promise.all([getSiteSettings(), getHomepage(), getAllFAQs()]);

    const { baseUrl, companyName, googleMapsLocation, googleMapsLocationPlaceUrl, meta, shortTitle, socialMedia } =
      siteSettings;

    const { contact, mainHeading, subHeading } = homepage;

    const social = {
      facebook: socialMedia?.facebook || null,
      instagram: socialMedia?.instagram || null,
      linkedIn: socialMedia?.linkedIn || null,
      twitter: null,
    };

    const services = mapHomepageServices(homepage);
    const team = mapHomepageTeam(homepage);
    const training = mapHomepageTraining(homepage);
    const companyLogo = mapSiteSettingsCompanyLogo(siteSettings);

    const faqItems = faqs.map(({ question, answer }) => ({
      question,
      answer,
    }));

    return {
      baseUrl,
      companyName,
      companyLogo,
      contact: {
        phone: contact.phone,
        blurbs: contact.blurbs,
        callBack: contact.callBack,
      },
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
