import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import tailwind from 'eslint-plugin-tailwindcss';

const tailwindEntryFile = new URL('./styles/globals.css', import.meta.url).pathname;
const typescriptPlugin = nextVitals.find((c) => c.plugins?.['@typescript-eslint'])?.plugins?.['@typescript-eslint'];

/*
 * Semantic theme tokens are the styling contract — raw Tailwind palette
 * utilities do not respond to a theme change, which is what made dark mode
 * impossible before. `neutral` is absent from the colour list on purpose: it is
 * a DaisyUI semantic token, not a palette ramp.
 *
 * Genuine exceptions (overlay scrims, brand gradients, illustration fills) get
 * an inline eslint-disable with a reason, so each one stays visible in review.
 */
const paletteColors = [
  'white',
  'black',
  'slate',
  'gray',
  'zinc',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
].join('|');

const paletteProperties = [
  'bg',
  'text',
  'border',
  'divide',
  'from',
  'via',
  'to',
  'ring',
  'shadow',
  'fill',
  'stroke',
  'outline',
  'placeholder',
  'decoration',
].join('|');

const variantPrefix = '([a-z-]+:)*';
const paletteShade = '(-(50|[1-9]00|950))?';
const opacitySuffix = '(\\/\\d+)?';
const paletteClassRegex = `/(^|\\s)${variantPrefix}(${paletteProperties})-(${paletteColors})${paletteShade}${opacitySuffix}($|\\s)/`;

const paletteClassMessage =
  'Use semantic theme tokens (base-100/200/300, base-content, primary, secondary, neutral) or a .surface-* class instead of a raw Tailwind palette colour. Raw palette classes do not respond to the dark theme. If this is a genuine exception (overlay scrim, brand gradient, illustration fill), add an eslint-disable-next-line with a reason.';

const noPaletteClassRules = [
  { selector: `Literal[value=${paletteClassRegex}]`, message: paletteClassMessage },
  { selector: `TemplateElement[value.raw=${paletteClassRegex}]`, message: paletteClassMessage },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  tailwind.configs.recommended,
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
        cssConfigPath: tailwindEntryFile,
      },
    },
    rules: {
      '@next/next/no-img-element': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'no-restricted-syntax': ['error', ...noPaletteClassRules],
    },
  },
  {
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
      ],
    },
  },
]);

export default eslintConfig;
