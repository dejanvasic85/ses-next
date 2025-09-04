import {
  SanityDocument,
  Homepage,
  Service,
  TeamMember,
  Training,
  Testimonial,
  Showcase,
  ProcessedServiceList,
  ProcessedTeam,
  ProcessedTraining,
  ProcessedTestimonial,
  ProcessedServiceItem,
  ProcessedTeamMember,
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

export const mapServiceShowcaseGallery = (data: SanityDocument[], service: Service): ImageGalleryItem[] => {
  const { showcase = [] } = service;

  return showcase
    .map((item) => findDocumentById<Showcase>(data, item._ref, 'showcase'))
    .filter((showcase): showcase is Showcase => showcase !== undefined)
    .map((showcase) => ({
      alt: showcase.title,
      src: findAssetById(data, showcase.photo.asset._ref),
    }));
};

export const mapFeaturedImage = (data: SanityDocument[], service: Service): FeaturedImage | null => {
  const { showcase = [] } = service;

  const featuredShowcase = showcase
    .map((item) => findDocumentById<Showcase>(data, item._ref, 'showcase'))
    .filter((showcase): showcase is Showcase => showcase !== undefined)
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

export const mapServices = (data: SanityDocument[], homepageItem: Homepage): ProcessedServiceList => {
  const {
    services: { blurbs, items },
  } = homepageItem;

  const processedItems: ProcessedServiceItem[] = items.map((serviceRef) => {
    const service = findDocumentById<Service>(data, serviceRef._ref, 'service');

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
      content,
      imageGallery,
      featuredImage: featuredImage || undefined,
    };
  });

  return {
    blurbs,
    items: processedItems,
  };
};

export const mapTeamMember = (data: SanityDocument[], teamMemberItem: TeamMember): ProcessedTeamMember => {
  const { avatar, name, role } = teamMemberItem;

  return {
    avatar: findAssetById(data, avatar.asset._ref),
    fullName: name,
    role: role,
  };
};

export const mapTeam = (data: SanityDocument[], homepageItem: Homepage): ProcessedTeam => {
  const {
    team: { blurbs, members },
  } = homepageItem;

  const processedMembers = members.map((memberRef) => {
    const teamMember = findDocumentById<TeamMember>(data, memberRef._ref, 'teamMember');

    if (!teamMember) {
      throw new Error(`Team member not found for reference: ${memberRef._ref}`);
    }

    return mapTeamMember(data, teamMember);
  });

  return {
    blurbs,
    members: processedMembers,
  };
};

export const mapTraining = (data: SanityDocument[], homepageItem: Homepage): ProcessedTraining[] => {
  const { training } = homepageItem;

  return training.map((trainingRef) => {
    const trainingItem = findDocumentById<Training>(data, trainingRef._ref, 'training');

    if (!trainingItem) {
      throw new Error(`Training item not found for reference: ${trainingRef._ref}`);
    }

    return {
      trainingTitle: trainingItem.trainingTitle,
      icon: trainingItem.icon as Icon,
    };
  });
};

export const mapTestimonials = (data: SanityDocument[], homepageItem: Homepage): ProcessedTestimonial[] => {
  const { testimonials } = homepageItem;

  return testimonials.map((testimonialRef) => {
    const testimonial = findDocumentById<Testimonial>(data, testimonialRef._ref, 'testimonial');

    if (!testimonial) {
      throw new Error(`Testimonial not found for reference: ${testimonialRef._ref}`);
    }

    const result: ProcessedTestimonial = {
      date: testimonial.date || '',
      comment: testimonial.comment,
      starRating: testimonial.rating,
      reviewer: {
        displayName: testimonial.fullName,
      },
    };

    // Only add optional fields if they have values
    if (testimonial.profileImgUrl) {
      result.reviewer.profilePhotoUrl = testimonial.profileImgUrl;
    }
    if (testimonial.reviewUrl) {
      result.reviewer.profileUrl = testimonial.reviewUrl;
      result.url = testimonial.reviewUrl;
    }

    return result;
  });
};

export const mapCompanyLogo = (data: SanityDocument[], homepageItem: Homepage): string => {
  return findAssetById(data, homepageItem.companyLogo.asset._ref);
};
