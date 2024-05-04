import {defineType} from 'sanity'

export default defineType({
  title: 'Blog post',
  name: 'blog-post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      descripton: 'Hint: This will display in the blogs section',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    },
    {
      type: 'image',
      name: 'photo',
      title: 'Photo',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
