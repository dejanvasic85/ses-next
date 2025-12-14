import { createClient } from 'next-sanity';

import { config } from '@/lib/config';
import type {
  FAQ,
  BlogPostContentModel,
  ServiceContentModel,
  SiteSettingsContentModel,
  HomepageContentModel,
  SanityTermsAndConditions,
} from '@/types';
import {
  FAQSchema,
  TermsAndConditionsSchema,
  BlogPostSchema,
  SiteSettingsSchema,
  HomepageSchema,
  ServiceSchema,
} from '@/types';
import {
  siteSettingsQuery,
  homepageQuery,
  servicesQuery,
  allBlogPostsQuery,
  blogPostBySlugQuery,
  allFaqsQuery,
  termsAndConditionsQuery,
} from '@/lib/content/queries';

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
// EXPORTED QUERY FUNCTIONS
// ============================================================================

export const getSiteSettingsContent = async (): Promise<SiteSettingsContentModel> => {
  const result = await sanityClient.fetch(siteSettingsQuery);
  return SiteSettingsSchema.parse(result);
};

export const getHomepage = async (): Promise<HomepageContentModel> => {
  const result = await sanityClient.fetch(homepageQuery);
  return HomepageSchema.parse(result);
};

export const getAllServicesContent = async (): Promise<ServiceContentModel[]> => {
  const result = await sanityClient.fetch(servicesQuery);
  return result.map((item: unknown) => ServiceSchema.parse(item));
};

export const getAllBlogPosts = async (): Promise<BlogPostContentModel[]> => {
  const result = await sanityClient.fetch(allBlogPostsQuery);
  return result.map((post: unknown) => BlogPostSchema.parse(post));
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPostContentModel | null> => {
  const result = await sanityClient.fetch(blogPostBySlugQuery, { slug });
  if (!result) return null;
  return BlogPostSchema.parse(result);
};

export const getAllFAQs = async (): Promise<FAQ[]> => {
  const result = await sanityClient.fetch(allFaqsQuery);
  return result.map((faq: unknown) => FAQSchema.parse(faq));
};

export const getAllTermsAndConditions = async (): Promise<SanityTermsAndConditions[]> => {
  const result = await sanityClient.fetch(termsAndConditionsQuery);
  return result.map((terms: unknown) => TermsAndConditionsSchema.parse(terms));
};
