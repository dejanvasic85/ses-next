import type {
  BlogPost,
  BlogPostContentModel,
  LocationPage,
  LocationPageContentModel,
  ServiceItem,
  ServiceContentModel,
  Team,
  TeamMember,
  TeamMemberContentModel,
  Training,
  TrainingContentModel,
  SiteSettingsContentModel,
  SiteSettings,
  Social,
  HomepageContentModel,
  ContactContentModel,
} from '@/types';

// ============================================================================
// MAPPER FUNCTIONS (Convert ContentModel types to internal types)
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

  const parentService = model.parentService
    ? { name: model.parentService.name, slug: model.parentService.slug.current }
    : null;

  return {
    id: model._id,
    name: model.name,
    blurb: model.blurb,
    description: model.description,
    linkToReadMore: model.linkToReadMore,
    showOnHomepage: model.showOnHomepage ?? null,
    icon: model.icon,
    slug: model.slug.current,
    parentService,
    content: model.content,
    imageGallery,
    featuredImage,
    seoTitle: model.seoTitle,
    seoDescription: model.seoDescription,
    serviceType: model.serviceType ?? null,
    faqs: model.faqs ?? null,
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

export const mapHomepageTeam = (model: HomepageContentModel): Team => {
  return {
    blurbs: model.team.blurbs ?? [],
    members: model.team.members.map(mapTeamMember),
  };
};

export const mapHomepageTraining = (model: HomepageContentModel): Training[] => {
  return model.training.map(mapTraining);
};

export const mapHomepageContact = (model: HomepageContentModel): ContactContentModel => {
  return {
    phone: model.contact.phone,
    blurbs: model.contact.blurbs,
    callBack: model.contact.callBack,
  };
};

export const mapLocationPage = (model: LocationPageContentModel): LocationPage => ({
  id: model._id,
  suburb: model.suburb,
  slug: model.slug.current,
  isHub: model.isHub ?? false,
  heroImage: model.heroImage?.asset?.url ?? null,
  intro: model.intro ?? null,
  services: (model.services ?? []).map((s) => ({
    id: s._id,
    name: s.name,
    blurb: s.blurb,
    slug: s.slug.current,
    icon: s.icon,
    parentService: s.parentService ? { name: s.parentService.name, slug: s.parentService.slug.current } : null,
  })),
  nearbySuburbs: (model.nearbySuburbs ?? []).map((location) => ({
    id: location._id,
    suburb: location.suburb,
    slug: location.slug.current,
  })),
  faqs: (model.faqs ?? []).map(({ question, answer }) => ({ question, answer })),
  seoTitle: model.seoTitle ?? null,
  seoDescription: model.seoDescription ?? null,
});

export const mapSocialMedia = (
  socialMedia?: { facebook?: string | null; instagram?: string | null; linkedIn?: string | null } | null,
): Social => {
  return {
    facebook: socialMedia?.facebook || null,
    instagram: socialMedia?.instagram || null,
    linkedIn: socialMedia?.linkedIn || null,
    twitter: null,
  };
};

export const mapSiteSettings = (model: SiteSettingsContentModel): SiteSettings => {
  const social = mapSocialMedia(model.socialMedia);

  return {
    companyName: model.companyName,
    alternateName: model.alternateName,
    companyLogo: model.companyLogo.asset.url,
    shortTitle: model.shortTitle,
    baseUrl: model.baseUrl,
    googleMapsLocation: model.googleMapsLocation,
    googleMapsLocationPlaceUrl: model.googleMapsLocationPlaceUrl,
    meta: model.meta,
    social,
    phone: model.phone,
  };
};
