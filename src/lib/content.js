import { faker } from '@faker-js/faker';

export const content = {
  about: [
    'At Storm Electrical Solutions we pride ourselves on being a forward thinking and innovative company offering a customer focused, quality service within the electrical industry.',
    'We can offer a great deal of experience and expertise in a wide range of commercial, industrial and residential projects large or small including installations, maintenance, fault finding and testing.',
    'We keep abreast of the latest developments in renewable energy and the electrical industry to ensure our customers get the best possible service available.',
  ],
  contact: {
    phone: '+61 415 338 040',
  },
  meta: {
    title: 'SES - Storm Electrical Solutions - Melbourne Electricians',
    description:
      'Melbourne Electricians. Free Quotes. Lighting. Testing. Data. Air Conditioning. Emergency Call out. Upgrade your old Halogen lights for Free!',
  },
  services: [
    {
      name: 'Air conditioning',
      description: 'Split systems.',
      icon: 'air',
    },
    {
      name: 'Data and TV',
      description: 'Installation, Repairs & Upgrades.',
      icon: 'power',
    },
    {
      name: 'Renewable Energy',
      description: 'Including Wind & Solar.',
      icon: 'recycle',
    },
    {
      name: 'Testing',
      description: 'Test and Tag. Emergency Light Testing.',
      icon: 'plug',
    },
    {
      name: 'Telecommunications',
      description: 'Test and Tag. Emergency Light Testing.',
      icon: 'mobile',
    },
    {
      name: 'Catering Maintenance - Emergency Call out',
      description: 'Preventative Maintenance. Installations.',
      icon: 'wrench',
    },
    {
      name: 'Lighting',
      description:
        'Free LED lamp changes as part of the VEET scheme Business LED VEET Scheme incentives with lighting analysis to help save your business energy with funding from the Victorian Government.',
      icon: 'light',
    },
  ],
  team: {
    introduction:
      'We have trained experts in all areas of electrical work. Our team is made up of highly skilled electricians, who are all fully qualified and licensed.',
    members: [
      {
        avatar: faker.image.avatar(),
        fullName: faker.name.fullName(),
        role: faker.name.jobTitle(),
      },
      {
        avatar: faker.image.avatar(),
        fullName: faker.name.fullName(),
        role: faker.name.jobTitle(),
      },
      {
        avatar: faker.image.avatar(),
        fullName: faker.name.fullName(),
        role: faker.name.jobTitle(),
      },
      {
        avatar: faker.image.avatar(),
        fullName: faker.name.fullName(),
        role: faker.name.jobTitle(),
      },
      {
        avatar: faker.image.avatar(),
        fullName: faker.name.fullName(),
        role: faker.name.jobTitle(),
      },
    ],
  },
  testimonials: [
    {
      fullName: faker.name.fullName(),
      comment: faker.lorem.paragraph(),
      rating: faker.datatype.number({ min: 4, max: 5 }),
    },
    {
      fullName: faker.name.fullName(),
      comment: faker.lorem.paragraph(),
      rating: faker.datatype.number({ min: 4, max: 5 }),
    },
    {
      fullName: faker.name.fullName(),
      comment: faker.lorem.paragraph(),
      rating: faker.datatype.number({ min: 4, max: 5 }),
    },
  ],
};
