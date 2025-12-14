import { Team, Training, TeamMember, ServiceContentModel, HomepageContentModel, TeamMemberContentModel } from '@/types';

interface ImageGalleryItem {
  alt: string;
  src: string;
}

interface FeaturedImage {
  alt: string;
  src: string;
}

export const mapServiceShowcaseGallery = (service: ServiceContentModel): ImageGalleryItem[] => {
  const { showcase = [] } = service;

  return (
    showcase?.map((showcase) => ({
      alt: showcase.title,
      src: showcase.photo.asset.url,
    })) ?? []
  );
};

export const mapFeaturedImage = (service: ServiceContentModel): FeaturedImage | null => {
  const { showcase = [] } = service;

  const featuredShowcase = showcase?.find((showcase) => showcase.featured === true);

  if (!featuredShowcase) {
    return null;
  }

  return {
    alt: featuredShowcase.title,
    src: featuredShowcase.photo.asset.url,
  };
};

export const mapTeamMember = (teamMemberItem: TeamMemberContentModel): TeamMember => {
  const { avatar, name, role } = teamMemberItem;

  return {
    avatar: avatar.asset.url,
    fullName: name,
    role: role,
  };
};

export const mapTeam = (homepageItem: HomepageContentModel): Team => {
  const {
    team: { blurbs, members },
  } = homepageItem;

  return {
    blurbs: blurbs || [],
    members: members.map(mapTeamMember),
  };
};

export const mapTraining = (homepageItem: HomepageContentModel): Training[] => {
  const { training } = homepageItem;

  return training.map((t) => {
    return {
      trainingTitle: t.trainingTitle,
      icon: t.icon,
    };
  });
};
