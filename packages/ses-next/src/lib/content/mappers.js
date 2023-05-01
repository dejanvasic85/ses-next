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

export const mapServices = (data, homepageItem) => {
  const {
    services: { blurbs, items },
  } = homepageItem;

  return {
    blurbs,
    items: items.map(({ _ref }) => {
      const service = data.find((item) => item._id === _ref);
      const { name, description, icon, slug, content } = service;

      return {
        imageGallery: mapServiceShowcaseGallery(data, service),
        name,
        description,
        icon,
        slug: slug.current,
        content,
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
