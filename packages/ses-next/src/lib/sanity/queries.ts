import { sanityClient } from '@/lib/sanity/client';
import type {
  SanityFAQ,
  BlogPost,
  BlogPostContentModel,
  ServiceItem,
  ServiceList,
  ServiceContentModel,
  ShowcaseContentModel,
  Team,
  TeamMember,
  TeamMemberContentModel,
  Training,
  TrainingContentModel,
  SiteSettingsContentModel,
  Social,
  HomepageContentModel,
  SanityTermsAndConditions,
} from '@/types';
import {
  FAQSchema,
  TermsAndConditionsSchema,
  BlogPostContentModelSchema,
  SiteSettingsContentModelSchema,
  HomepageContentModelSchema,
} from '@/types';

// ============================================================================
// GROQ QUERIES
// ============================================================================

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  _type,
  companyName,
  companyLogo{
    asset->{
      _id,
      url
    }
  },
  shortTitle,
  baseUrl,
  googleMapsLocation,
  googleMapsLocationPlaceUrl,
  meta,
  socialMedia
}`;

const homepageQuery = `*[_type == "homepage"][0]{
  _id,
  _type,
  mainHeading,
  subHeading,
  about,
  contact,
  services {
    blurbs,
    items[]->{
      _id,
      _type,
      name,
      description,
      blurb,
      slug,
      linkToReadMore,
      icon,
      content,
      showcase[]->{
        _id,
        _type,
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
      _type,
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
    _type,
    trainingTitle,
    icon
  },
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
// QUERY FUNCTIONS
// ============================================================================

export const getSiteSettings = async (): Promise<SiteSettingsContentModel> => {
  const result = await sanityClient.fetch(siteSettingsQuery);
  return SiteSettingsContentModelSchema.parse(result);
};

export const getHomepage = async (): Promise<HomepageContentModel> => {
  const result = await sanityClient.fetch(homepageQuery);
  return HomepageContentModelSchema.parse(result);
};

export const getAllBlogPosts = async (): Promise<BlogPostContentModel[]> => {
  const result = await sanityClient.fetch(allBlogPostsQuery);
  return result.map((post: unknown) => BlogPostContentModelSchema.parse(post));
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPostContentModel | null> => {
  const result = await sanityClient.fetch(blogPostBySlugQuery, { slug });
  if (!result) return null;
  return BlogPostContentModelSchema.parse(result);
};

export const getAllFAQs = async (): Promise<SanityFAQ[]> => {
  const result = await sanityClient.fetch(allFaqsQuery);
  return result.map((faq: unknown) => FAQSchema.parse(faq));
};

export const getAllTermsAndConditions = async (): Promise<SanityTermsAndConditions[]> => {
  const result = await sanityClient.fetch(termsAndConditionsQuery);
  return result.map((terms: unknown) => TermsAndConditionsSchema.parse(terms));
};

// ============================================================================
// MAPPER FUNCTIONS (Convert ContentModel types to mapped types)
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
    })) || null;

  const featuredShowcase = model.showcase?.find((item) => item.featured === true);
  const featuredImage = featuredShowcase
    ? {
        alt: featuredShowcase.title,
        src: featuredShowcase.photo.asset.url,
      }
    : null;

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

export const mapSiteSettingsCompanyLogo = (model: SiteSettingsContentModel): string => {
  return model.companyLogo.asset.url;
};

export const mapSiteSettings = (model: SiteSettingsContentModel) => {
  const social: Social = {
    facebook: model.socialMedia?.facebook || null,
    instagram: model.socialMedia?.instagram || null,
    linkedIn: model.socialMedia?.linkedIn || null,
    twitter: null,
  };

  return {
    companyName: model.companyName,
    companyLogo: model.companyLogo.asset.url,
    shortTitle: model.shortTitle,
    baseUrl: model.baseUrl,
    googleMapsLocation: model.googleMapsLocation,
    googleMapsLocationPlaceUrl: model.googleMapsLocationPlaceUrl,
    meta: model.meta,
    social,
  };
};
