import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Homepage',
  name: 'homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      type: 'string',
      title: 'Company name',
      descripton: 'Hint: The main title in the homepage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyLogo',
      type: 'image',
      title: 'Company Logo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
      descripton: 'Hint: Appears below the title (company name)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortTitle',
      type: 'string',
      title: 'Short Title',
      descripton: 'Hint: Appears in the desktop navbar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'About blurbs',
      name: 'about',
      type: 'array',
      of: [{type: 'text', rows: 4}],
    }),
    defineField({title: 'Base URL', name: 'baseUrl', type: 'url', description: 'Your domain name'}),
    defineField({
      title: 'Contact',
      name: 'contact',
      type: 'object',
      fields: [
        {
          name: 'blurbs',
          type: 'array',
          of: [{type: 'text', rows: 4}],
          title: 'Blurbs',
          description: 'Appears under the contact heading',
        },
        {
          name: 'callBack',
          type: 'string',
          title: 'Call back',
          description: 'Appears in the contact form',
        },
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
        {name: 'linkedIn', type: 'url', title: 'LinkedIn'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'object',
      fields: [
        defineField({
          name: 'blurbs',
          type: 'array',
          of: [{type: 'text', rows: 4}],
          title: 'Blurbs',
          description: 'Set up a few sentences as introductions to the services section',
        }),
        defineField({
          name: 'items',
          title: 'Items',
          description: 'Links to the service documents',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'service'}]}],
        }),
      ],
    }),
    defineField({
      title: 'Team',
      name: 'team',
      type: 'object',
      fields: [
        defineField({
          name: 'blurbs',
          type: 'array',
          of: [{type: 'text', rows: 4}],
          title: 'Blurbs',
          description: 'Set up to two blurbs to appear in the teams section',
        }),
        defineField({
          name: 'members',
          title: 'Members',
          description: 'Links to the team documents',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'teamMember'}]}],
        }),
      ],
    }),
    defineField({
      title: 'Training',
      name: 'training',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'training'}]}],
    }),
    defineField({
      title: 'Testinomials',
      name: 'testimonials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'testimonial'}]}],
    }),
  ],
})
