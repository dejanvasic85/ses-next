import { content } from './fallbackContent';

const getByTypename = (data, type) => {
  return data.find(({ _type }) => _type === type);
};

const getServiceShowcaseGallery = (data, service) => {
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

const getServices = (data, homepageItem) => {
  const {
    services: { blurbs, items },
  } = homepageItem;

  return {
    blurbs,
    items: items.map(({ _ref }) => {
      const service = data.find((item) => item._id === _ref);

      return {
        imageGallery: getServiceShowcaseGallery(data, service),
        service,
      };
    }),
  };
};

const getTeamMember = (data, teamMemberItem) => {
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

const getTeam = (data, homepageItem) => {
  const {
    team: { blurbs, members },
  } = homepageItem;

  return {
    blurbs,
    members: members.map((m) =>
      getTeamMember(
        data,
        data.find(({ _id }) => _id === m._ref),
      ),
    ),
  };
};

export const getHomePageContent = async () => {
  console.log('Querying content service');
  const contentResponse = await fetch(`https://j7d3pd5g.api.sanity.io/v2021-06-07/data/query/production?query=*[]`);

  if (contentResponse.status < 200 || contentResponse.status > 299) {
    throw new Error('Content service returned a on-200 error!');
  }

  const { result: fullContent } = await contentResponse.json();
  const homepageItem = getByTypename(fullContent, 'homepage');
  const { baseUrl, companyName, contact, meta, shortTitle, tagline } = homepageItem;
  const services = getServices(fullContent, homepageItem);
  const team = getTeam(fullContent, homepageItem);

  return {
    ...content,
    baseUrl,
    companyName,
    contact,
    meta,
    services,
    shortTitle,
    tagline,
    team,
  };
};
