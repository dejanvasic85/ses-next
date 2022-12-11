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

export const getHomePageContent = async () => {
  console.log('Querying content service');
  const contentResponse = await fetch(`https://j7d3pd5g.api.sanity.io/v2021-06-07/data/query/production?query=*[]`);

  if (contentResponse.status < 200 || contentResponse.status > 299) {
    throw new Error('Content service returned a on-200 error!');
  }

  console.log('Success. Mapping data');

  const { result: fullContent } = await contentResponse.json();
  const homepageItem = getByTypename(fullContent, 'homepage');
  const { baseUrl, companyName, contact, meta, shortTitle, tagline } = homepageItem;
  const services = mapServices(fullContent, homepageItem);
  const team = mapTeam(fullContent, homepageItem);
  const training = mapTraining(fullContent, homepageItem);

  console.log('Success. Creating content object...');

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
    training,
  };
};
