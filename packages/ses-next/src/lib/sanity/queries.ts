import { sanityClient } from '@/lib/sanity/client';
import type {
  BlogPost as SanityBlogPost,
  FAQ as SanityFAQ,
  Homepage as SanityHomepage,
  Service as SanityService,
  Showcase as SanityShowcase,
  TeamMember as SanityTeamMember,
  TermsAndConditions as SanityTermsAndConditions,
  Testimonial as SanityTestimonial,
  Training as SanityTraining,
  ProcessedBlogPost as BlogPost,
  ProcessedServiceItem as ServiceItem,
  ProcessedServiceList as ServiceList,
  ProcessedTeam as Team,
  ProcessedTeamMember as TeamMember,
  ProcessedTestimonial as Testimonial,
  ProcessedTraining as Training,
} from '@/types';
import { BlogPostSchema, FAQSchema, HomepageSchema, TermsAndConditionsSchema } from '@/types';

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
// CONTENT MODELS (GROQ query results with resolved references)
// ============================================================================

type ShowcaseContentModel = Omit<SanityShowcase, 'photo'> & {
  photo: {
    asset: {
      url: string;
    };
  };
};

type ServiceContentModel = Omit<SanityService, 'showcase'> & {
  showcase?: ShowcaseContentModel[];
};

type TeamMemberContentModel = Omit<SanityTeamMember, 'avatar'> & {
  avatar: {
    asset: {
      url: string;
    };
  };
};

type BlogPostContentModel = Omit<SanityBlogPost, 'photo'> & {
  photo: {
    asset: {
      url: string;
    };
  };
};

type TrainingContentModel = SanityTraining;
type TestimonialContentModel = SanityTestimonial;
type FAQContentModel = SanityFAQ;
type TermsAndConditionsContentModel = SanityTermsAndConditions;

export type HomepageContentModel = Omit<
  SanityHomepage,
  'companyLogo' | 'services' | 'team' | 'training' | 'testimonials'
> & {
  companyLogo: {
    asset: {
      url: string;
    };
  };
  services: {
    blurbs?: string[];
    items: ServiceContentModel[];
  };
  team: {
    blurbs?: string[];
    members: TeamMemberContentModel[];
  };
  training: TrainingContentModel[];
  testimonials: TestimonialContentModel[];
};

// ============================================================================
// QUERY FUNCTIONS
// ============================================================================

export const getHomepage = async (): Promise<HomepageContentModel> => {
  const result = await sanityClient.fetch(homepageQuery);
  return result;
};

export const getAllBlogPosts = async (): Promise<BlogPostContentModel[]> => {
  const result = await sanityClient.fetch(allBlogPostsQuery);
  return result;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPostContentModel | null> => {
  const result = await sanityClient.fetch(blogPostBySlugQuery, { slug });
  if (!result) return null;
  return result;
};

export const getAllFAQs = async (): Promise<FAQContentModel[]> => {
  const result = await sanityClient.fetch(allFaqsQuery);
  return result.map((faq: unknown) => FAQSchema.parse(faq));
};

export const getAllTermsAndConditions = async (): Promise<TermsAndConditionsContentModel[]> => {
  const result = await sanityClient.fetch(termsAndConditionsQuery);
  return result.map((terms: unknown) => TermsAndConditionsSchema.parse(terms));
};

// ============================================================================
// MAPPER FUNCTIONS (Convert content models to app models)
// ============================================================================

export const mapBlogPost = (model: BlogPostContentModel): BlogPost => {
  const photoUrl = model.photo.asset.url;

  return {
    id: model._id,
    title: model.title,
    description: model.description,
    slug: model.slug.current,
    photo: photoUrl,
    publishedAt: model.publishedAt,
    tags: model.tags,
    body: model.body,
  };
};

export const mapService = (model: ServiceContentModel): ServiceItem => {
  const imageGallery =
    model.showcase?.map((item) => ({
      alt: item.title,
      src: item.photo.asset.url,
    })) || [];

  const featuredShowcase = model.showcase?.find((item) => item.featured === true);
  const featuredImage = featuredShowcase
    ? {
        alt: featuredShowcase.title,
        src: featuredShowcase.photo.asset.url,
      }
    : undefined;

  return {
    id: model._id,
    name: model.name,
    blurb: model.blurb,
    description: model.description,
    linkToReadMore: model.linkToReadMore,
    icon: model.icon,
    slug: model.slug.current,
    content: model.content,
    imageGallery,
    featuredImage,
  };
};

export const mapTeamMember = (model: TeamMemberContentModel): TeamMember => {
  const avatarUrl = model.avatar.asset.url;

  return {
    avatar: avatarUrl,
    fullName: model.name,
    role: model.role,
  };
};

export const mapTraining = (model: TrainingContentModel): Training => {
  return {
    trainingTitle: model.trainingTitle,
    icon: model.icon,
  };
};

export const mapTestimonial = (model: TestimonialContentModel): Testimonial => {
  const result: Testimonial = {
    date: model.date || '',
    comment: model.comment,
    starRating: model.rating,
    reviewer: {
      displayName: model.fullName,
    },
  };

  if (model.profileImgUrl) {
    result.reviewer.profilePhotoUrl = model.profileImgUrl;
  }
  if (model.reviewUrl) {
    result.reviewer.profileUrl = model.reviewUrl;
    result.url = model.reviewUrl;
  }

  return result;
};

export const mapHomepageServices = (model: HomepageContentModel): ServiceList => {
  return {
    blurbs: model.services.blurbs,
    items: model.services.items.map(mapService),
  };
};

export const mapHomepageTeam = (model: HomepageContentModel): Team => {
  return {
    blurbs: model.team.blurbs,
    members: model.team.members.map(mapTeamMember),
  };
};

export const mapHomepageTraining = (model: HomepageContentModel): Training[] => {
  return model.training.map(mapTraining);
};

export const mapHomepageTestimonials = (model: HomepageContentModel): Testimonial[] => {
  return model.testimonials.map(mapTestimonial);
};

export const mapHomepageCompanyLogo = (model: HomepageContentModel): string => {
  return model.companyLogo.asset.url;
};
