import {StructureBuilder} from 'sanity/desk'

export const structure = (S: StructureBuilder) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings'),
        ),
      S.listItem()
        .title('Careers')
        .id('careers')
        .child(S.document().schemaType('careers').documentId('careers').title('Careers')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings', 'careers'].includes(listItem.getId() ?? ''),
      ),
    ])
}
