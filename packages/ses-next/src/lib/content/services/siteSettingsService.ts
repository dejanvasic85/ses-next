import { sanityClient } from '@/sanity/lib/client';
import { type SiteSettings, SiteSettingsSchema } from '@/types';
import { mapSiteSettings } from '@/lib/content/mappers';
import { siteSettingsQuery } from '@/lib/content/queries';

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const result = await sanityClient.fetch(siteSettingsQuery, {}, { next: { tags: ['siteSettings'] } });
    const siteSettings = SiteSettingsSchema.parse(result);
    return mapSiteSettings(siteSettings);
  } catch (error) {
    console.error('Error in getSiteSettings:', error);
    throw new Error('Failed to fetch site settings');
  }
};
