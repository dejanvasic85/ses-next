import {defineField, defineType} from 'sanity'

import iconField from './iconField'

export default defineType({
  title: 'Service',
  name: 'service',
  type: 'document',
  fields: [
    {name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required()},
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: (Rule) => Rule.required(),
    },
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
      name: 'serviceType',
      type: 'string',
      title: 'Service Type (JSON-LD)',
      description:
        'Used for the serviceType property in Service structured data (JSON-LD). Falls back to the service name if empty.',
    },
    {
      name: 'blurb',
      type: 'text',
      rows: 3,
      title: 'Blurb',
      description: 'Displays on the homepage and the product LD json for google',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL slug e.g. air-conditioning',
      validation: (Rule) => Rule.required(),
    },
    {name: 'linkToReadMore', type: 'boolean', title: 'Show link to read more on homepage'},
    {
      name: 'showOnHomepage',
      title: 'Show on homepage',
      type: 'boolean',
      description: 'Display this service in the homepage services grid',
      initialValue: false,
    },
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
    {
      name: 'parentService',
      title: 'Parent service',
      type: 'reference',
      to: [{type: 'service'}],
      description:
        'If set, this service appears as a sub-service under the parent. Leave empty for top-level services.',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const ref = (value as {_ref?: string} | undefined)?._ref
          if (!ref) return true
          const docId = (context.document as {_id?: string})?._id
          if (ref === docId) {
            return 'A service cannot be its own parent'
          }
          const parentDoc = await context.getClient({apiVersion: '2024-01-01'}).fetch<{
            parentService?: {_ref?: string}
          } | null>(`*[_id == $id][0]{ parentService }`, {id: ref})
          if (parentDoc?.parentService?._ref) {
            return 'Parent must be a top-level service (cannot have its own parent)'
          }
          return true
        }),
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
