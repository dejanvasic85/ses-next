import {
  ProcessedBlogPost,
  ProcessedServiceList,
  ProcessedTeam,
  ProcessedTraining,
  ProcessedTestimonial,
  Social,
  SanityPortableText,
} from '@/types';
import {
  getHomepage,
  getAllBlogPosts,
  getAllFAQs,
  getAllTermsAndConditions,
  processBlogPost,
  processHomepageServices,
  processHomepageTeam,
  processHomepageTraining,
  processHomepageTestimonials,
  processHomepageCompanyLogo,
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

// ============================================================================
// EXPORTED FUNCTIONS
// ============================================================================

export const getHomePageContent = async (): Promise<HomePageContentResult> => {
  try {
    const [homepage, faqs] = await Promise.all([getHomepage(), getAllFAQs()]);

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
    } = homepage;

    const services = processHomepageServices(homepage);
    const team = processHomepageTeam(homepage);
    const training = processHomepageTraining(homepage);
    const testimonials = processHomepageTestimonials(homepage);
    const companyLogo = processHomepageCompanyLogo(homepage);

    const faqItems = faqs.map(({ question, answer }) => ({
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

export const getBlogPosts = async (): Promise<ProcessedBlogPost[]> => {
  try {
    const blogPosts = await getAllBlogPosts();
    return blogPosts.map(processBlogPost);
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
