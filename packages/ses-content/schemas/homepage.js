import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Homepage',
  name: 'homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Homepage title',
    }),
    defineField({
      title: 'About blurbs',
      name: 'about',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({title: 'Base URL', name: 'baseUrl', type: 'url'}),
    defineField({
      title: 'Contact',
      name: 'contact',
      type: 'object',
      fields: [
        {
          name: 'blurbs',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Blurbs',
          description: 'Appears under the contact heading',
        },
        {name: 'callBack', type: 'string', title: 'Call back'},
        {name: 'phone', type: 'string', title: 'Phone number'},
      ],
    }),
    defineField({
      title: 'Google Maps location (url)',
      description:
        'You can get this by going to google maps doing a search and clicking share. Then click embed map and copy the url.',
      name: 'googleMapsLocation',
      type: 'url',
    }),
    defineField({
      title: 'Meta',
      name: 'meta',
      type: 'object',
      description: 'These are important for Google seo and social media',
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
      title: 'Social media',
      name: 'socialMedia',
      type: 'object',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook'},
        {name: 'instagram', type: 'url', title: 'LinkedIn'},
      ],
    }),
    defineField({
      title: 'Team',
      name: 'team',
      type: 'object',
      fields: [
        {
          name: 'blurbs',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Blurbs',
          description: 'Set up to two blurbs to appear in the teams section',
        },
      ],
    }),
  ],
})
