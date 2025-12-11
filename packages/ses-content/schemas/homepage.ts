import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Homepage',
  name: 'homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'mainHeading',
      type: 'string',
      title: 'Main Heading',
      description: 'The primary heading displayed on the homepage',
    }),
    defineField({
      name: 'subHeading',
      type: 'string',
      title: 'Sub Heading',
      description: 'Appears below the main heading',
    }),
    defineField({
      title: 'About blurbs',
      name: 'about',
      type: 'array',
      of: [{type: 'text', rows: 4}],
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
      title: 'Testimonials',
      name: 'testimonials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'testimonial'}]}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
