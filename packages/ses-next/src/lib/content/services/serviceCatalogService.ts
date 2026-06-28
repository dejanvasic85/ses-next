import { sanityClient } from '@/sanity/lib/client';
import {
  type ServiceItem,
  type ServicesHubContent,
  type LocationPageNearbySuburbRef,
  ServiceSchema,
  ServicesHubSchema,
  LocationPageNearbySuburbRefSchema,
} from '@/types';
import { mapService } from '@/lib/content/mappers';
import { servicesQuery, servicesHubQuery, locationPagesByServiceSlugsQuery } from '@/lib/content/queries';

export const getServices = async (): Promise<ServiceItem[]> => {
  try {
    const result = await sanityClient.fetch(servicesQuery, {}, { next: { tags: ['service'] } });
    return result.map((item: unknown) => ServiceSchema.parse(item)).map(mapService);
  } catch (error) {
    console.error('Error in getServices:', error);
    throw new Error('Failed to fetch services');
  }
};

export const getServicesHubContent = async (): Promise<ServicesHubContent> => {
  try {
    const result = await sanityClient.fetch(servicesHubQuery, {}, { next: { tags: ['servicesHub'] } });
    if (!result) {
      return { pageTitle: null, pageDescription: null, heading: null, intro: null };
    }
    const hub = ServicesHubSchema.parse(result);
    return {
      pageTitle: hub.pageTitle,
      pageDescription: hub.pageDescription,
      heading: hub.heading,
      intro: hub.intro,
    };
  } catch (error) {
    console.error('Error in getServicesHubContent:', error);
    throw new Error('Failed to fetch services hub content');
  }
};

export const getLocationPagesByServiceSlugs = async (
  serviceSlugs: string[],
): Promise<LocationPageNearbySuburbRef[]> => {
  try {
    if (serviceSlugs.length === 0) {
      return [];
    }

    const result = await sanityClient.fetch(
      locationPagesByServiceSlugsQuery,
      { serviceSlugs },
      { next: { tags: ['locationPage'] } },
    );

    const parsedLocations = LocationPageNearbySuburbRefSchema.array().parse(result);

    return parsedLocations.map((location) => ({
      id: location._id,
      suburb: location.suburb,
      slug: location.slug.current,
    }));
  } catch (error) {
    console.error('Error in getLocationPagesByServiceSlugs:', error);
    throw new Error('Failed to fetch location pages by service slugs');
  }
};
