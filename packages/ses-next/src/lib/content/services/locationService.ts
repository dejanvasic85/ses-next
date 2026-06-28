import { sanityClient } from '@/sanity/lib/client';
import { type LocationPage, LocationPageSchema } from '@/types';
import { mapLocationPage } from '@/lib/content/mappers';
import { allLocationPagesQuery, locationPageBySlugQuery } from '@/lib/content/queries';

export const getAllLocationPages = async (): Promise<LocationPage[]> => {
  try {
    const result = await sanityClient.fetch(allLocationPagesQuery, {}, { next: { tags: ['locationPage'] } });
    return result.map((item: unknown) => LocationPageSchema.parse(item)).map(mapLocationPage);
  } catch (error) {
    console.error('Error in getAllLocationPages:', error);
    throw new Error('Failed to fetch location pages');
  }
};

export const getLocationPageBySlug = async (slug: string): Promise<LocationPage | null> => {
  try {
    const result = await sanityClient.fetch(locationPageBySlugQuery, { slug }, { next: { tags: ['locationPage'] } });
    if (!result) return null;
    return mapLocationPage(LocationPageSchema.parse(result));
  } catch (error) {
    console.error('Error in getLocationPageBySlug:', error);
    throw new Error('Failed to fetch location page');
  }
};
