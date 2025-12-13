import {StructureBuilder, StructureResolverContext} from 'sanity/desk'

export const structure = (S: StructureBuilder, context: StructureResolverContext) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings'].includes(listItem.getId() ?? ''),
      ),
    ])
}
