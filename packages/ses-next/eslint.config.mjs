import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'cache/**']),
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]);

export default eslintConfig;
