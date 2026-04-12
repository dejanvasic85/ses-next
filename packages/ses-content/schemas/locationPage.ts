import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Location Page',
  name: 'locationPage',
  type: 'document',
  fields: [
    defineField({
      name: 'suburb',
      type: 'string',
      title: 'Suburb Name',
      description: 'Display name e.g. "Altona" or "Melbourne"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'Auto-generated from suburb name. Override if needed.',
      options: {source: 'suburb', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
    }),
    defineField({
      name: 'intro',
      type: 'array',
      title: 'Intro',
      description:
        'Unique content about this suburb — property types, local context, distance from base, common electrical issues, etc.',
      of: [{type: 'block'}, {type: 'image'}],
    }),
    defineField({
      name: 'services',
      type: 'array',
      title: 'Relevant Services',
      description: 'Subset of services most relevant to this suburb',
      of: [{type: 'reference', to: [{type: 'service'}]}],
    }),
    defineField({
      name: 'nearbySuburbs',
      type: 'array',
      title: 'Nearby Suburbs',
      description: 'Nearby location pages to cross-link with an "Also serving nearby" section',
      of: [{type: 'reference', to: [{type: 'locationPage'}]}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      description: 'Frequently asked questions displayed with FAQ schema markup',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              rows: 3,
              title: 'Answer',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description: 'Override page title tag (~60 chars max).',
      validation: (Rule) => Rule.max(60).warning('Keep SEO titles under 60 characters'),
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      rows: 3,
      title: 'SEO Description',
      description: 'Meta description (~155 chars max). Include a call to action.',
      validation: (Rule) => Rule.max(155).warning('Keep SEO descriptions under 155 characters'),
    }),
  ],
})
