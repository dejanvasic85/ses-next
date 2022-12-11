import {defineType} from 'sanity'

import iconField from './iconField'

export default defineType({
  type: 'document',
  name: 'training',
  title: 'Training',
  fields: [
    {
      name: 'trainingTitle',
      title: 'Training title',
      type: 'string',
      placeholder: 'e.g. working at heights',
      validation: (rule) => rule.required(),
    },
    iconField,
  ],
})
