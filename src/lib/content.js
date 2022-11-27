import { faker } from '@faker-js/faker';

export const content = {
  about: [
    'At Storm Electrical Solutions we pride ourselves on being a forward thinking and innovative company offering a customer focused, quality service within the electrical industry.',
    'We offer a great deal of experience and expertise in a wide range of commercial, industrial and residential projects large or small including installations, maintenance, fault finding and testing.',
  ],
  contact: {
    blurb:
      'We provide services to all areas of Melbourne. Call us on 0415 338 040 or submit your details below for a free quote.',
    callBack: 'Our team will be notified immediately and we will get back to you as soon as possible.',
    phone: '+61 415 338 040',
  },
  googleMapsLocation:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d402589.81581793836!2d144.7729596601535!3d-37.97169289892203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC!5e0!3m2!1sen!2sau!4v1669503547251!5m2!1sen!2sau',
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
      imageGallery: [
        {
          src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700',
          alt: 'New air conditioning unit',
        },
      ],
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
      imageGallery: [
        {
          src: 'http://sesmelbourne.com.au/wp-content/uploads/2017/07/Solar_panels.jpg',
          alt: 'Solar panel upgrades and installation',
        },
      ],
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
      imageGallery: [
        {
          src: 'http://sesmelbourne.com.au/wp-content/uploads/2017/07/downlights.jpg',
          alt: 'LED replacement as part of VEET scheme',
        },
      ],
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
