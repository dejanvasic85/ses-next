import {
  SanityDocument,
  SanityHomepage,
  SanityService,
  SanityTeamMember,
  SanityTraining,
  SanityTestimonial,
  SanityShowcase,
  ServiceList,
  Team,
  Training,
  Testimonial,
  ServiceItem,
  TeamMember,
  Icon,
} from '@/types';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

interface ImageGalleryItem {
  alt: string;
  src: string;
}

interface FeaturedImage {
  alt: string;
  src: string;
}

const findDocumentById = <T extends SanityDocument>(
  data: SanityDocument[],
  id: string,
  type?: string,
): T | undefined => {
  const doc = data.find((item) => item._id === id);
  if (doc && type && doc._type !== type) {
    console.warn(`Expected document type '${type}' but found '${doc._type}' for id: ${id}`);
    return undefined;
  }
  return doc as T | undefined;
};

const findAssetById = (data: SanityDocument[], id: string): string => {
  const asset = findDocumentById(data, id);
  if (!asset || !('url' in asset)) {
    throw new Error(`Asset not found or invalid for id: ${id}`);
  }
  return asset.url as string;
};

// ============================================================================
// SHOWCASE/GALLERY MAPPERS
// ============================================================================

export const mapServiceShowcaseGallery = (data: SanityDocument[], service: SanityService): ImageGalleryItem[] => {
  const { showcase = [] } = service;

  return showcase
    .map((item) => findDocumentById<SanityShowcase>(data, item._ref, 'showcase'))
    .filter((showcase): showcase is SanityShowcase => showcase !== undefined)
    .map((showcase) => ({
      alt: showcase.title,
      src: findAssetById(data, showcase.photo.asset._ref),
    }));
};

export const mapFeaturedImage = (data: SanityDocument[], service: SanityService): FeaturedImage | null => {
  const { showcase = [] } = service;

  const featuredShowcase = showcase
    .map((item) => findDocumentById<SanityShowcase>(data, item._ref, 'showcase'))
    .filter((showcase): showcase is SanityShowcase => showcase !== undefined)
    .find((showcase) => showcase.featured === true);

  if (!featuredShowcase) {
    return null;
  }

  return {
    alt: featuredShowcase.title,
    src: findAssetById(data, featuredShowcase.photo.asset._ref),
  };
};

// ============================================================================
// MAIN MAPPERS
// ============================================================================

export const mapServices = (data: SanityDocument[], homepageItem: SanityHomepage): ServiceList => {
  const {
    services: { blurbs, items },
  } = homepageItem;

  const processedItems: ServiceItem[] = items.map((serviceRef) => {
    const service = findDocumentById<SanityService>(data, serviceRef._ref, 'service');

    if (!service) {
      throw new Error(`Service not found for reference: ${serviceRef._ref}`);
    }

    const { _id, name, blurb, description, icon, slug, content, linkToReadMore = false } = service;

    const imageGallery = mapServiceShowcaseGallery(data, service);
    const featuredImage = mapFeaturedImage(data, service);

    return {
      id: _id,
      name,
      blurb,
      description,
      linkToReadMore,
      icon: icon as Icon,
      slug: slug.current,
      content: content ?? null,
      imageGallery,
      featuredImage: featuredImage || null,
    };
  });

  return {
    blurbs: blurbs || null,
    items: processedItems,
  };
};

export const mapTeamMember = (data: SanityDocument[], teamMemberItem: SanityTeamMember): TeamMember => {
  const { avatar, name, role } = teamMemberItem;

  return {
    avatar: findAssetById(data, avatar.asset._ref),
    fullName: name,
    role: role,
  };
};

export const mapTeam = (data: SanityDocument[], homepageItem: SanityHomepage): Team => {
  const {
    team: { blurbs, members },
  } = homepageItem;

  const processedMembers = members.map((memberRef) => {
    const teamMember = findDocumentById<SanityTeamMember>(data, memberRef._ref, 'teamMember');

    if (!teamMember) {
      throw new Error(`Team member not found for reference: ${memberRef._ref}`);
    }

    return mapTeamMember(data, teamMember);
  });

  return {
    blurbs: blurbs || null,
    members: processedMembers,
  };
};

export const mapTraining = (data: SanityDocument[], homepageItem: SanityHomepage): Training[] => {
  const { training } = homepageItem;

  return training.map((trainingRef) => {
    const trainingItem = findDocumentById<SanityTraining>(data, trainingRef._ref, 'training');

    if (!trainingItem) {
      throw new Error(`Training item not found for reference: ${trainingRef._ref}`);
    }

    return {
      trainingTitle: trainingItem.trainingTitle,
      icon: trainingItem.icon as Icon,
    };
  });
};
