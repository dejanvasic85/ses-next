import {defineType} from 'sanity'

export default defineType({
  type: 'document',
  name: 'faq',
  title: 'FAQ',
  fields: [
    {
      type: 'string',
      name: 'question',
      title: 'Question',
    },
    {
      type: 'string',
      name: 'answer',
      title: 'Answer',
    },
  ],
})
