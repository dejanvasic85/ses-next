import {defineConfig, globalIgnores} from 'eslint/config'
import studio from '@sanity/eslint-config-studio'
import typescript from 'typescript-eslint'

const eslintConfig = defineConfig([
  ...studio,
  globalIgnores(['dist/**']),
  {
    files: ['**/*.ts?(x)'],
    plugins: {
      '@typescript-eslint': typescript.plugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': ['error', {assertionStyle: 'never'}],
      '@typescript-eslint/no-non-null-assertion': 'error',
    },
  },
])

export default eslintConfig
