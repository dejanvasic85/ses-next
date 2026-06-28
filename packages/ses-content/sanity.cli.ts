import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'j7d3pd5g',
    dataset: 'production',
  },
  studioHost: 'ses',
  typegen: {
    schema: '../../packages/ses-next/src/sanity/schema.json',
    generates: '../../packages/ses-next/src/sanity/sanity.types.ts',
    path: '../../packages/ses-next/src/**/*.{ts,tsx}',
  },
})
