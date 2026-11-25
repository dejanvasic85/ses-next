import {defineField, defineType} from 'sanity'

const employmentTypeOptions = [
  {title: 'Full time', value: 'FULL_TIME'},
  {title: 'Part time', value: 'PART_TIME'},
  {title: 'Contractor', value: 'CONTRACTOR'},
  {title: 'Casual', value: 'TEMPORARY'},
]

export default defineType({
  name: 'careers',
  title: 'Careers',
  type: 'document',
  groups: [
    {name: 'promo', title: 'Banner and team card', default: true},
    {name: 'page', title: 'Careers page'},
  ],
  fields: [
    defineField({
      name: 'isHiring',
      title: 'Currently hiring',
      description:
        'Turn this on to show the banner, the team card and the careers page. Turn it off once the role is filled.',
      type: 'boolean',
      initialValue: false,
      group: ['promo', 'page'],
    }),
    defineField({
      name: 'roleTitle',
      title: 'Role title',
      description: 'e.g. "A Grade Electrician"',
      type: 'string',
      validation: (rule) => rule.required(),
      group: ['promo', 'page'],
    }),
    defineField({
      name: 'bannerText',
      title: 'Banner text',
      description: 'The thin strip at the top of every page. Keep it short.',
      type: 'string',
      validation: (rule) => rule.max(80),
      group: 'promo',
    }),
    defineField({
      name: 'teamCardHeading',
      title: 'Team card heading',
      description: 'Shown in the "Meet our Team" row, e.g. "This could be you"',
      type: 'string',
      group: 'promo',
    }),
    defineField({
      name: 'teamCardButton',
      title: 'Team card button text',
      description: 'e.g. "Join the team"',
      type: 'string',
      group: 'promo',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Page title (SEO)',
      type: 'string',
      group: 'page',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Page description (SEO)',
      type: 'text',
      rows: 3,
      group: 'page',
    }),
    defineField({
      name: 'heading',
      title: 'Page heading (H1)',
      type: 'string',
      group: 'page',
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 4}],
      group: 'page',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment type',
      type: 'string',
      options: {list: employmentTypeOptions, layout: 'radio'},
      initialValue: 'FULL_TIME',
      group: 'page',
    }),
    defineField({
      type: 'array',
      of: [{type: 'string'}],
      name: 'responsibilities',
      title: "What you'll do",
      group: 'page',
    }),
    defineField({
      type: 'array',
      of: [{type: 'string'}],
      name: 'requirements',
      title: "What you'll need",
      group: 'page',
    }),
    defineField({
      type: 'array',
      of: [{type: 'string'}],
      name: 'benefits',
      title: 'What we offer',
      group: 'page',
    }),
    defineField({
      name: 'applyText',
      title: 'How to apply',
      description: 'Shown above the call and email buttons',
      type: 'text',
      rows: 3,
      group: 'page',
    }),
    defineField({
      name: 'applyEmail',
      title: 'Apply email',
      description: 'Leave blank to use the email in Site Settings',
      type: 'string',
      validation: (rule) => rule.email(),
      group: 'page',
    }),
    defineField({
      name: 'datePosted',
      title: 'Date posted',
      description: 'Used by Google job listings',
      type: 'date',
      group: 'page',
    }),
  ],
  preview: {
    select: {title: 'roleTitle', isHiring: 'isHiring'},
    prepare: ({title, isHiring}) => ({
      title: title ?? 'Careers',
      subtitle: isHiring ? 'Hiring: showing on the website' : 'Not hiring: hidden',
    }),
  },
})
