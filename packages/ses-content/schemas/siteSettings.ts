import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      type: 'string',
      title: 'Company name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alternateName',
      type: 'string',
      title: 'Alternate Name',
      description: 'Optional alternate business name (e.g. "SES Melbourne") used for SEO schema',
    }),
    defineField({
      name: 'companyLogo',
      type: 'image',
      title: 'Company Logo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortTitle',
      type: 'string',
      title: 'Short Title',
      description: 'Hint: Appears in the desktop navbar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Base URL',
      name: 'baseUrl',
      type: 'url',
      description: 'Your domain name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Phone',
      name: 'phone',
      type: 'string',
      description: 'Hint: clickable number to call in the navbar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Mobile',
      name: 'mobile',
      type: 'string',
      description: 'Mobile phone number',
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
      description: 'Business email address',
    }),
    defineField({
      title: 'Address',
      name: 'address',
      type: 'string',
      description: 'Full street address e.g. 61B Hansen St, Altona North VIC 3025',
    }),
    defineField({
      title: 'ABN',
      name: 'abn',
      type: 'string',
      description: 'Australian Business Number e.g. 33 651 527 043',
    }),
    defineField({
      title: 'REC Licence Number',
      name: 'recLicence',
      type: 'string',
      description: 'Registered Electrical Contractor licence number',
    }),
    defineField({
      title: 'Business Hours',
      name: 'businessHours',
      type: 'string',
      description: 'e.g. Monday–Friday: 7:00 AM – 6:00 PM',
    }),
    defineField({
      name: 'establishedYear',
      type: 'number',
      title: 'Year Established',
      description: 'e.g. 2007 — used to derive years of experience dynamically',
    }),
    defineField({
      name: 'directorName',
      type: 'string',
      title: 'Director Name',
      description: 'e.g. Karl Rainbow',
    }),
    defineField({
      name: 'latitude',
      type: 'number',
      title: 'Latitude',
      description: 'Business location latitude for JSON-LD geo coordinates e.g. -37.8354339',
    }),
    defineField({
      name: 'longitude',
      type: 'number',
      title: 'Longitude',
      description: 'Business location longitude for JSON-LD geo coordinates e.g. 144.8650809',
    }),
    defineField({
      name: 'streetAddress',
      type: 'string',
      title: 'Street Address',
      description: 'e.g. 61B Hansen St — used in JSON-LD PostalAddress',
    }),
    defineField({
      name: 'suburb',
      type: 'string',
      title: 'Suburb',
      description: 'e.g. Altona North',
    }),
    defineField({
      name: 'state',
      type: 'string',
      title: 'State',
      description: 'e.g. VIC',
    }),
    defineField({
      name: 'postcode',
      type: 'string',
      title: 'Postcode',
      description: 'e.g. 3025',
    }),
    defineField({
      name: 'openingHours',
      type: 'object',
      title: 'Opening Hours',
      description: 'Structured opening hours for JSON-LD OpeningHoursSpecification',
      fields: [
        {
          name: 'daysOfWeek',
          type: 'array',
          title: 'Days of Week',
          of: [{type: 'string'}],
          options: {
            list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          },
        },
        {name: 'opensAt', type: 'string', title: 'Opens At', description: 'e.g. 07:00'},
        {name: 'closesAt', type: 'string', title: 'Closes At', description: 'e.g. 18:00'},
      ],
    }),
    defineField({
      title: 'Owner',
      name: 'owner',
      type: 'object',
      description: 'Business owner details used for structured data and AI attribution',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Full Name',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'role',
          type: 'string',
          title: 'Role / Job Title',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'accreditations',
          type: 'array',
          title: 'Accreditations',
          of: [{type: 'string'}],
          description: 'e.g. "Clean Energy Council Accredited Designer and Installer"',
        },
      ],
    }),
    defineField({
      title: 'Google Maps location embedded url',
      description:
        'You can get this by going to google maps doing a search and clicking share. Then click embed map and copy the url.',
      name: 'googleMapsLocation',
      type: 'url',
    }),
    defineField({
      title: 'Google Maps place url',
      description:
        'This is the actual url of the google place and you get it from the url of the google maps location. It should look something like this: https://www.google.com/maps/place/Your+Company+Name/@51.',
      name: 'googleMapsLocationPlaceUrl',
      type: 'url',
    }),
    defineField({
      title: 'Meta',
      name: 'meta',
      type: 'object',
      description: 'These are important for Google seo and social media',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          type: 'string',
          title: 'Description',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      title: 'Social media',
      name: 'socialMedia',
      type: 'object',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook'},
        {name: 'linkedIn', type: 'url', title: 'LinkedIn'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
      ],
    }),
  ],
})
