import {defineType} from 'sanity'

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
    },
    {
      name: 'seoDescription',
      type: 'text',
      rows: 3,
      title: 'SEO Description',
      description: 'Meta description (~155 chars max). Include a call to action.',
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
  ],
})
