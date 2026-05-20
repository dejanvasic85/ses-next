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
      description: 'Hint: Appears below the logo',
    }),
    defineField({
      name: 'subHeading',
      type: 'string',
      title: 'Sub Heading',
      description: 'Hint: Appears below the main heading',
    }),
    defineField({
      title: 'About blurbs',
      name: 'about',
      type: 'array',
      of: [{type: 'text', rows: 4}],
    }),
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
      title: 'Trust Signals',
      name: 'trustSignals',
      description: 'Displayed as a stat strip between hero and services. Aim for 4 items.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'e.g. "19+" or "REC 24794"',
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'e.g. "Years Experience"',
            }),
            defineField({
              name: 'icon',
              type: 'string',
              title: 'Icon key',
              description: 'e.g. clock, star, shield, badge',
            }),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        },
      ],
    }),
    defineField({
      title: 'Service Areas',
      name: 'serviceAreas',
      description: 'Suburb pill links shown above the contact section.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'locationPage'}]}],
    }),
  ],
})
