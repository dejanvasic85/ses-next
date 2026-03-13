import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicesHub',
  title: 'Services Hub',
  type: 'document',
  fields: [
    defineField({name: 'pageTitle', title: 'Page Title (SEO)', type: 'string'}),
    defineField({name: 'pageDescription', title: 'Page Description (SEO)', type: 'text', rows: 3}),
    defineField({name: 'heading', title: 'Page Heading (H1)', type: 'string'}),
    defineField({
      name: 'intro',
      title: 'Intro Paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 4}],
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of Melbourne suburbs served',
    }),
  ],
})
