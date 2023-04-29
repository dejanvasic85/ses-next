import { content } from './fallbackContent';

const getByTypename = (data, type) => {
  return data.find(({ _type }) => _type === type);
};

const mapServiceShowcaseGallery = (data, service) => {
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

const mapServices = (data, homepageItem) => {
  const {
    services: { blurbs, items },
  } = homepageItem;

  return {
    blurbs,
    items: items.map(({ _ref }) => {
      const service = data.find((item) => item._id === _ref);
      const { name, description, icon } = service;

      return {
        imageGallery: mapServiceShowcaseGallery(data, service),
        name,
        description,
        icon,
      };
    }),
  };
};

const mapTeamMember = (data, teamMemberItem) => {
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

const mapTeam = (data, homepageItem) => {
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

const mapTraining = (data, homepageItem) => {
  const { training } = homepageItem;
  return training.map(({ _ref }) => data.find(({ _id }) => _id === _ref));
};

const mapTestimonials = (data, homepageItem) => {
  const { testimonials } = homepageItem;
  return testimonials.map(({ _ref }) => data.find(({ _id }) => _id === _ref));
};

const mapCompanyLogo = (data, homepageItem) => {
  return data.find(({ _id }) => _id === homepageItem.companyLogo.asset._ref)?.url;
};

const fetchFromApi = async (url) => {
  console.log('Querying content service');
  const response = await fetch(url);

  if (response.status < 200 || response.status > 299) {
    throw new Error('Content service returned a on-200 error!');
  }

  return response.json();
};

const composeContent = (fullContent, homepageItem) => {
  return (...mappers) => mappers.map((mapper) => mapper(fullContent, homepageItem));
};

export const getHomePageContent = async () => {
  const { result: fullContent } = await fetchFromApi(
    `https://j7d3pd5g.api.sanity.io/v2021-06-07/data/query/production?query=*[]`,
  );
  console.log('Success. Mapping response to content...');
  const homepageItem = getByTypename(fullContent, 'homepage');
  const {
    baseUrl,
    companyName,
    contact,
    googleMapsLocation,
    meta,
    shortTitle,
    socialMedia: social,
    tagline,
  } = homepageItem;

  const [services, team, training, testimonials, companyLogo] = composeContent(fullContent, homepageItem)(
    mapServices,
    mapTeam,
    mapTraining,
    mapTestimonials,
    mapCompanyLogo,
  );

  console.log('Success. Creating content object...');

  return {
    baseUrl,
    companyName,
    companyLogo,
    contact,
    googleMapsLocation,
    meta,
    services,
    shortTitle,
    social,
    tagline,
    team,
    training,
    testimonials,
  };
};
