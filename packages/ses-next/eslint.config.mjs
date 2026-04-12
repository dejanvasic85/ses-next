import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import tailwind from 'eslint-plugin-tailwindcss';

const tailwindEntryFile = new URL('./styles/globals.css', import.meta.url).pathname;

const eslintConfig = defineConfig([
  ...nextVitals,
  ...tailwind.configs['flat/recommended'],
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'cache/**',
    'test-results/**',
    'playwright-report/**',
  ]),
  {
    settings: {
      tailwindcss: {
        config: tailwindEntryFile,
        cssFiles: [tailwindEntryFile],
      },
    },
    rules: {
      '@next/next/no-img-element': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
]);

export default eslintConfig;
