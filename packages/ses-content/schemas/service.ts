import {defineField, defineType} from 'sanity'

import iconField from './iconField'

export default defineType({
  title: 'Service',
  name: 'service',
  type: 'document',
  fields: [
    {name: 'name', type: 'string', title: 'Name'},
    {name: 'description', type: 'string', title: 'Description'},
    {
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description: 'Override page title tag (~60 chars max). Defaults to service name if empty.',
      validation: (Rule) => Rule.max(60).warning('Keep SEO titles under 60 characters'),
    },
    {
      name: 'seoDescription',
      type: 'text',
      rows: 3,
      title: 'SEO Description',
      description: 'Meta description (~155 chars max). Include a call to action.',
      validation: (Rule) => Rule.max(155).warning('Keep SEO descriptions under 155 characters'),
    },
    {
      name: 'blurb',
      type: 'text',
      rows: 3,
      title: 'Blurb',
      description: 'Displays on the homepage and the product LD json for google',
    },
    {name: 'slug', type: 'slug', title: 'URL slug e.g. air-conditioning'},
    {name: 'linkToReadMore', type: 'boolean', title: 'Show link to read more on homepage'},
    iconField,
    {
      name: 'showcase',
      title: 'Showcase',
      description: 'Showcase photos for this service',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'showcase'}]}],
    },
    {
      name: 'content',
      title: 'Content',
      description: 'This content will be displayed on the service page',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    },
    defineField({
      name: 'faqs',
      title: 'FAQs',
      description:
        'Frequently asked questions displayed below the main content with FAQ schema markup',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
})
