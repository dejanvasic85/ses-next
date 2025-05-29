export const mapServiceShowcaseGallery = (data: any[], service: any): any[] => {
  const { showcase = [] } = service;
  const showcaseItems = showcase.map((item: any) => data.find(({ _id }: any) => _id === item._ref));

  return showcaseItems.map(
    ({
      title,
      photo: {
        asset: { _ref },
      },
    }: any) => ({
      alt: title,
      src: data.find((d: any) => d._id === _ref).url,
    }),
  );
};

export const mapFeaturedImage = (data: any[], service: any): any => {
  const { showcase = [] } = service;
  const featuredImage = showcase
    .map((item: any) => data.find(({ _id }: any) => _id === item._ref))
    .find(({ featured }: any) => featured === true);

  if (!featuredImage) {
    return null;
  }

  return {
    alt: featuredImage.title,
    src: data.find(({ _id }: any) => _id === featuredImage.photo.asset._ref).url,
  };
};

export const mapServices = (data: any[], homepageItem: any): any => {
  const {
    services: { blurbs, items },
  } = homepageItem;

  return {
    blurbs,
    items: items.map(({ _ref }: any) => {
      const service = data.find((item: any) => item._id === _ref);
      const { name, blurb, description, icon, slug, content, linkToReadMore = false } = service;
      const imageGallery = mapServiceShowcaseGallery(data, service);
      const featuredImage = mapFeaturedImage(data, service);

      return {
        name,
        blurb,
        description,
        linkToReadMore,
        icon,
        slug: slug.current,
        content,
        imageGallery,
        featuredImage,
      };
    }),
  };
};

export const mapTeamMember = (data: any[], teamMemberItem: any): any => {
  const {
    avatar: {
      asset: { _ref },
    },
    name,
    role,
  } = teamMemberItem;

  return {
    avatar: data.find(({ _id }: any) => _id === _ref).url,
    fullName: name,
    role: role,
  };
};

export const mapTeam = (data: any[], homepageItem: any): any => {
  const {
    team: { blurbs, members },
  } = homepageItem;

  return {
    blurbs,
    members: members.map((m: any) =>
      mapTeamMember(
        data,
        data.find(({ _id }: any) => _id === m._ref),
      ),
    ),
  };
};

export const mapTraining = (data: any[], homepageItem: any): any[] => {
  const { training } = homepageItem;
  return training.map(({ _ref }: any) => data.find(({ _id }: any) => _id === _ref));
};

export const mapTestimonials = (data: any[], homepageItem: any): any[] => {
  const { testimonials } = homepageItem;
  return testimonials.map(({ _ref }: any) => data.find(({ _id }: any) => _id === _ref));
};

export const mapCompanyLogo = (data: any[], homepageItem: any): string | undefined => {
  return data.find(({ _id }: any) => _id === homepageItem.companyLogo.asset._ref)?.url;
};
