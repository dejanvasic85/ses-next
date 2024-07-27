export const mapServiceShowcaseGallery = (data, service) => {
  const { showcase = [] } = service;
  const showcaseItems = showcase.map((item) => data.find(({ _id }) => _id === item._ref));

  return showcaseItems.map(
    ({
      title,
      photo: {
        asset: { _ref },
      },
    }) => ({
      alt: title,
      src: data.find((d) => d._id === _ref).url,
    }),
  );
};

export const mapFeaturedImage = (data, service) => {
  const { showcase = [] } = service;
  const featuredImage = showcase
    .map((item) => data.find(({ _id }) => _id === item._ref))
    .find(({ featured }) => featured === true);

  if (!featuredImage) {
    return null;
  }

  return {
    alt: featuredImage.title,
    src: data.find(({ _id }) => _id === featuredImage.photo.asset._ref).url,
  };
};

export const mapServices = (data, homepageItem) => {
  const {
    services: { blurbs, items },
  } = homepageItem;

  return {
    blurbs,
    items: items.map(({ _ref }) => {
      const service = data.find((item) => item._id === _ref);
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

export const mapTeamMember = (data, teamMemberItem) => {
  const {
    avatar: {
      asset: { _ref },
    },
    name,
    role,
  } = teamMemberItem;

  return {
    avatar: data.find(({ _id }) => _id === _ref).url,
    fullName: name,
    role: role,
  };
};

export const mapTeam = (data, homepageItem) => {
  const {
    team: { blurbs, members },
  } = homepageItem;

  return {
    blurbs,
    members: members.map((m) =>
      mapTeamMember(
        data,
        data.find(({ _id }) => _id === m._ref),
      ),
    ),
  };
};

export const mapTraining = (data, homepageItem) => {
  const { training } = homepageItem;
  return training.map(({ _ref }) => data.find(({ _id }) => _id === _ref));
};

export const mapTestimonials = (data, homepageItem) => {
  const { testimonials } = homepageItem;
  return testimonials.map(({ _ref }) => data.find(({ _id }) => _id === _ref));
};

export const mapCompanyLogo = (data, homepageItem) => {
  return data.find(({ _id }) => _id === homepageItem.companyLogo.asset._ref)?.url;
};
