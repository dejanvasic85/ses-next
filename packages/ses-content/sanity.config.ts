import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'ses-content',

  projectId: 'j7d3pd5g',
  dataset: 'production',

  plugins: [deskTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
