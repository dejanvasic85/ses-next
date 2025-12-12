import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(S.document().schemaType('homepage').documentId('b6d118ba-d760-4e31-959a-578ce5b713df')),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.documentTypeListItem('training').title('Training'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      S.documentTypeListItem('blog-post').title('Blog Posts'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('showcase').title('Showcase'),
      S.documentTypeListItem('terms-and-conditions').title('Terms & Conditions'),
    ])
