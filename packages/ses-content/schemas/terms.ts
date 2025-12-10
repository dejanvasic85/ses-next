import {defineType} from 'sanity'

export default defineType({
  title: 'Terms and Conditions',
  name: 'terms-and-conditions',
  type: 'document',
  fields: [
    {
      name: 'terms',
      title: 'Terms and Conditions',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
})
