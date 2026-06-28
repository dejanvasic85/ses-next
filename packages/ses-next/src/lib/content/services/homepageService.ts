import { sanityClient } from '@/sanity/lib/client';
import { type HomePageContent, HomepageSchema } from '@/types';
import { mapHomepageTeam, mapHomepageTraining, mapHomepageContact } from '@/lib/content/mappers';
import { homepageQuery } from '@/lib/content/queries';

export const getHomePageContent = async (): Promise<HomePageContent> => {
  try {
    const result = await sanityClient.fetch(homepageQuery, {}, { next: { tags: ['homepage'] } });
    const homepage = HomepageSchema.parse(result);

    const team = mapHomepageTeam(homepage);
    const training = mapHomepageTraining(homepage);
    const contact = mapHomepageContact(homepage);

    const trustSignals = (homepage.trustSignals ?? []).map((s) => ({
      value: s.value,
      label: s.label,
      icon: s.icon,
    }));

    const serviceAreas = (homepage.serviceAreas ?? []).map((a) => ({
      id: a._id,
      suburb: a.suburb,
      slug: a.slug.current,
    }));

    return {
      contact,
      services: homepage.services,
      mainHeading: homepage.mainHeading,
      subHeading: homepage.subHeading,
      team,
      training,
      trustSignals,
      serviceAreas,
    };
  } catch (error) {
    console.error('Error in getHomePageContent:', error);
    throw new Error('Failed to fetch homepage content');
  }
};
