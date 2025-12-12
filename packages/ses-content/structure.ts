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
        .child(S.document().schemaType('homepage').documentId('homepage')),
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
