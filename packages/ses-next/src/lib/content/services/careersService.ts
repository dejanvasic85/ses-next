import { sanityClient } from '@/sanity/lib/client';
import { type CareersContent, type CareersContentModel, CareersSchema } from '@/types';
import { careersFallbackValue } from '@/lib/content/careersFallback';
import { careersQuery } from '@/lib/content/queries';

const defaultTeamCardHeading = 'This could be you';
const defaultTeamCardButton = 'Join the team';
const defaultEmploymentType = 'FULL_TIME';
const isoDateLength = 10;

const mapCareers = (model: CareersContentModel, roleTitle: string): CareersContent => ({
  roleTitle,
  bannerText: model.bannerText ?? `We're hiring: ${roleTitle}`,
  teamCardHeading: model.teamCardHeading ?? defaultTeamCardHeading,
  teamCardButton: model.teamCardButton ?? defaultTeamCardButton,
  seoTitle: model.seoTitle,
  seoDescription: model.seoDescription,
  heading: model.heading ?? `Now hiring: ${roleTitle}`,
  intro: model.intro ?? [],
  employmentType: model.employmentType ?? defaultEmploymentType,
  responsibilities: model.responsibilities ?? [],
  requirements: model.requirements ?? [],
  benefits: model.benefits ?? [],
  applyText: model.applyText,
  applyEmail: model.applyEmail,
  datePosted: model.datePosted ?? model._createdAt?.slice(0, isoDateLength) ?? null,
  updatedAt: model._updatedAt ?? null,
});

/**
 * Returns the open role, or null when the "Currently hiring" switch is off.
 * Every hiring surface (banner, team card, careers page) keys off this null.
 */
export const getCareers = async (): Promise<CareersContent | null> => {
  try {
    const result = await sanityClient.fetch(careersQuery, {}, { next: { tags: ['careers'] } });
    const careers = result ? CareersSchema.parse(result) : careersFallbackValue;
    if (!careers.isHiring || !careers.roleTitle) {
      return null;
    }

    return mapCareers(careers, careers.roleTitle);
  } catch (error) {
    console.error('Error in getCareers:', error);
    return null;
  }
};
