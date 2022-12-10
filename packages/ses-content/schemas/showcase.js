import {defineType} from 'sanity'

export default defineType({
  type: 'document',
  name: 'showcase',
  title: 'Showcase gallery',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'image',
      name: 'photo',
      title: 'Photo',
    },
  ],
})
