import {defineType} from 'sanity'

export default defineType({
  type: 'document',
  name: 'testimonial',
  title: 'Testimonial',
  fields: [
    {
      name: 'fullName',
      type: 'string',
      title: 'Full name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'comment',
      type: 'text',
      title: 'Comment',
      rows: 5,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      options: {
        list: [
          {title: '1', value: 1},
          {title: '2', value: 2},
          {title: '3', value: 3},
          {title: '4', value: 4},
          {title: '5', value: 5},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'profileImgUrl',
      type: 'string',
      title: 'Avatar Url',
      validation: (Rule) => Rule.optional(),
    },
    {
      name: 'date',
      type: 'string',
      title: 'Date',
      validation: (Rule) => Rule.optional(),
    },
    {
      name: 'reviewUrl',
      type: 'string',
      title: 'Review Url',
      validation: (Rule) => Rule.optional(),
    },
  ],
})
