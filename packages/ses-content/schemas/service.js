import {defineType} from 'sanity'

export default defineType({
  title: 'Service',
  name: 'service',
  type: 'document',
  fields: [
    {name: 'name', type: 'string', title: 'Name'},
    {name: 'description', type: 'string', title: 'Description'},
    {
      name: 'icon',
      type: 'string',
      options: {
        list: [
          {title: 'Air conditioner', value: 'Air'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Height', value: 'height'},
          {title: 'Light', value: 'light'},
          {title: 'Lightning Bolt', value: 'bolt'},
          {title: 'Linked in', value: 'linked-in'},
          {title: 'Mobile phone', value: 'mobile'},
          {title: 'Plug', value: 'plug'},
          {title: 'Phone', value: 'phone'},
          {title: 'Power', value: 'power'},
          {title: 'Recycle', value: 'recycle'},
          {title: 'Space', value: 'space'},
          {title: 'Tick with circle', value: 'tick-circle'},
          {title: 'Signal tower', value: 'signal-tower'},
          {title: 'Wrench', value: 'wrench'},
          {title: 'Warning', value: 'warning'},
          {title: 'Close (x)', value: 'x'},
          {title: 'Staggered Bars', value: 'bars-staggered'},
        ],
      },
    },
    {
      name: 'showcase',
      title: 'Showcase',
      description: 'Showcase photos for this service',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'showcase'}]}],
    },
  ],
})
