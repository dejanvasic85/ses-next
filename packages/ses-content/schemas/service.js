import {defineType} from 'sanity'

import iconField from './iconField'

export default defineType({
  title: 'Service',
  name: 'service',
  type: 'document',
  fields: [
    {name: 'name', type: 'string', title: 'Name'},
    {name: 'description', type: 'string', title: 'Description'},
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
