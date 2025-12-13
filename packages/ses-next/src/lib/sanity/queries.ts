import { sanityClient } from '@/lib/sanity/client';
import {
  BlogPost,
  BlogPostSchema,
  FAQ,
  FAQSchema,
  Homepage,
  HomepageSchema,
  ProcessedBlogPost,
  ProcessedServiceItem,
  ProcessedServiceList,
  ProcessedTeam,
  ProcessedTeamMember,
  ProcessedTestimonial,
  ProcessedTraining,
  Service,
  Showcase,
  TeamMember,
  TermsAndConditions,
  TermsAndConditionsSchema,
  Testimonial,
  Training,
} from '@/types';

// ============================================================================
// GROQ QUERIES
// ============================================================================

const homepageQuery = `*[_type == "homepage"][0]{
  _id,
  _type,
  companyName,
  companyLogo{
    asset->{
      _id,
      url
    }
  },
  mainHeading,
  subHeading,
  shortTitle,
  baseUrl,
  contact,
  googleMapsLocation,
  googleMapsLocationPlaceUrl,
  meta,
  socialMedia,
  services{
    blurbs,
    items[]->{
      _id,
      name,
      description,
      blurb,
      slug,
      linkToReadMore,
      icon,
      content,
      showcase[]->{
        _id,
        title,
        featured,
        photo{
          asset->{
            url
          }
        }
      }
    }
  },
  team{
    blurbs,
    members[]->{
      _id,
      name,
      role,
      avatar{
        asset->{
          url
        }
      }
    }
  },
  training[]->{
    _id,
    trainingTitle,
    icon
  },
  testimonials[]->{
    _id,
    fullName,
    comment,
    rating,
    profileImgUrl,
    date,
    reviewUrl
  }
}`;

const allBlogPostsQuery = `*[_type == "blog-post"] | order(publishedAt desc){
  _id,
  _type,
  title,
  description,
  slug,
  photo{
    asset->{
      url
    }
  },
  publishedAt,
  tags,
  body
}`;

const blogPostBySlugQuery = `*[_type == "blog-post" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  description,
  slug,
  photo{
    asset->{
      url
    }
  },
  publishedAt,
  tags,
  body
}`;

const allFaqsQuery = `*[_type == "faq"]{
  _id,
  _type,
  question,
  answer
}`;

const termsAndConditionsQuery = `*[_type == "terms-and-conditions"]{
  _id,
  _type,
  terms
}`;

// ============================================================================
// DATA TYPES (GROQ query results with resolved references)
// ============================================================================

type ShowcaseData = Omit<Showcase, 'photo'> & {
  photo: {
    asset: {
      url: string;
    };
  };
};

type ServiceData = Omit<Service, 'showcase'> & {
  showcase?: ShowcaseData[];
};

type TeamMemberData = Omit<TeamMember, 'avatar'> & {
  avatar: {
    asset: {
      url: string;
    };
  };
};

type BlogPostData = Omit<BlogPost, 'photo'> & {
  photo: {
    asset: {
      url: string;
    };
  };
};

export type HomepageData = Omit<Homepage, 'companyLogo' | 'services' | 'team' | 'training' | 'testimonials'> & {
  companyLogo: {
    asset: {
      url: string;
    };
  };
  services: {
    blurbs?: string[];
    items: ServiceData[];
  };
  team: {
    blurbs?: string[];
    members: TeamMemberData[];
  };
  training: Training[];
  testimonials: Testimonial[];
};

// ============================================================================
// QUERY FUNCTIONS
// ============================================================================

export const getHomepage = async (): Promise<HomepageData> => {
  const result = await sanityClient.fetch(homepageQuery);
  return result;
};

export const getAllBlogPosts = async (): Promise<BlogPostData[]> => {
  const result = await sanityClient.fetch(allBlogPostsQuery);
  return result;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPostData | null> => {
  const result = await sanityClient.fetch(blogPostBySlugQuery, { slug });
  if (!result) return null;
  return result;
};

export const getAllFAQs = async (): Promise<FAQ[]> => {
  const result = await sanityClient.fetch(allFaqsQuery);
  return result.map((faq: unknown) => FAQSchema.parse(faq));
};

export const getAllTermsAndConditions = async (): Promise<TermsAndConditions[]> => {
  const result = await sanityClient.fetch(termsAndConditionsQuery);
  return result.map((terms: unknown) => TermsAndConditionsSchema.parse(terms));
};

// ============================================================================
// HELPER FUNCTIONS TO PROCESS QUERY RESULTS
// ============================================================================

export const processBlogPost = (post: BlogPostData): ProcessedBlogPost => {
  const photoUrl = post.photo.asset.url;

  return {
    id: post._id,
    title: post.title,
    description: post.description,
    slug: post.slug.current,
    photo: photoUrl,
    publishedAt: post.publishedAt,
    tags: post.tags,
    body: post.body,
  };
};

export const processService = (service: ServiceData): ProcessedServiceItem => {
  const imageGallery =
    service.showcase?.map((item) => ({
      alt: item.title,
      src: item.photo.asset.url,
    })) || [];

  const featuredShowcase = service.showcase?.find((item) => item.featured === true);
  const featuredImage = featuredShowcase
    ? {
        alt: featuredShowcase.title,
        src: featuredShowcase.photo.asset.url,
      }
    : undefined;

  return {
    id: service._id,
    name: service.name,
    blurb: service.blurb,
    description: service.description,
    linkToReadMore: service.linkToReadMore,
    icon: service.icon,
    slug: service.slug.current,
    content: service.content,
    imageGallery,
    featuredImage,
  };
};

export const processTeamMember = (member: TeamMemberData): ProcessedTeamMember => {
  const avatarUrl = member.avatar.asset.url;

  return {
    avatar: avatarUrl,
    fullName: member.name,
    role: member.role,
  };
};

export const processTraining = (training: Training): ProcessedTraining => {
  return {
    trainingTitle: training.trainingTitle,
    icon: training.icon,
  };
};

export const processTestimonial = (testimonial: Testimonial): ProcessedTestimonial => {
  const result: ProcessedTestimonial = {
    date: testimonial.date || '',
    comment: testimonial.comment,
    starRating: testimonial.rating,
    reviewer: {
      displayName: testimonial.fullName,
    },
  };

  if (testimonial.profileImgUrl) {
    result.reviewer.profilePhotoUrl = testimonial.profileImgUrl;
  }
  if (testimonial.reviewUrl) {
    result.reviewer.profileUrl = testimonial.reviewUrl;
    result.url = testimonial.reviewUrl;
  }

  return result;
};

export const processHomepageServices = (homepage: HomepageData): ProcessedServiceList => {
  return {
    blurbs: homepage.services.blurbs,
    items: homepage.services.items.map(processService),
  };
};

export const processHomepageTeam = (homepage: HomepageData): ProcessedTeam => {
  return {
    blurbs: homepage.team.blurbs,
    members: homepage.team.members.map(processTeamMember),
  };
};

export const processHomepageTraining = (homepage: HomepageData): ProcessedTraining[] => {
  return homepage.training.map(processTraining);
};

export const processHomepageTestimonials = (homepage: HomepageData): ProcessedTestimonial[] => {
  return homepage.testimonials.map(processTestimonial);
};

export const processHomepageCompanyLogo = (homepage: HomepageData): string => {
  return homepage.companyLogo.asset.url;
};
