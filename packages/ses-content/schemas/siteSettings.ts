import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      type: 'string',
      title: 'Company Name',
      description: 'The official name of the company',
      validation: (Rule) => Rule.required(),
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
      description: 'Appears in the desktop navbar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Base URL',
      name: 'baseUrl',
      type: 'url',
      description: 'Your domain name (e.g., https://example.com)',
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
      description: 'Default SEO settings for the site (important for Google and social media)',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'description',
          type: 'string',
          title: 'Description',
        },
      ],
    }),
    defineField({
      title: 'Social Media',
      name: 'socialMedia',
      type: 'object',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook'},
        {name: 'linkedIn', type: 'url', title: 'LinkedIn'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
