import {defineField} from 'sanity'

export default defineField({
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
})
