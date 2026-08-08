# SES - Storm Electrical Solutions

## Commands

This is a monorepo with multiple apps so each command should target specific workspace
having to navigate to each app.
E.g. `pnpm --filter <workspace> build`

To deploy the Sanity Studio schema, navigate to `packages/ses-content` and run:
`pnpm run deploy`
(Must use `pnpm run` not `pnpm` directly, as `deploy` is a reserved pnpm command.)

## Nextjs structure

- The app folder should only contain routing components (page.tsx and route.ts)
- Components that are relevant to a page, should still go in to the components folder

## Layout

Route pages and full-width sections should compose from the shared primitives in
`src/components/Container.tsx` and `src/components/PageSection.tsx` rather than
hand-rolling wrapper `className` strings.

- `PageSection` — the `bg-base-100`/`bg-base-200` band with a route page's
  standard vertical rhythm (`py-6 sm:py-8 lg:py-12`). Use `tone="muted"` for a
  `bg-base-200` band.
- `Container` — the horizontal width + padding wrapper (`mx-auto px-4 sm:px-6
lg:px-8`). Pick a `width`: `narrow` (`max-w-4xl`, e.g. the services hub),
  `standard` (`max-w-screen-xl`, e.g. FAQ/terms/error pages), `wide`
  (`max-w-screen-lg`, e.g. prose articles and in-page sections), `expanded`
  (`max-w-screen-2xl`, e.g. the image gallery), or `full` (no extra cap beyond
  Tailwind's own `container` breakpoints, e.g. homepage sections nested in
  `Section`). Use `as` to render a `section`, `article`, or `nav` instead of a
  `div`, and pass `className` for one-off spacing (e.g. `mt-12 mb-8`) — never
  re-add a `max-w-*` or `px-*` here.
- `Section` (homepage-only) still owns the larger `py-16 md:py-24` rhythm for
  full-bleed sections on `/`; it composes with `Container` the same way.

## Theming

Semantic theme tokens are the styling contract. Raw Tailwind palette utilities
(`bg-white`, `text-gray-500`, `border-slate-200`) do not respond to a theme
change, and ESLint rejects them via `no-restricted-syntax`.

- Backgrounds: `bg-base-100` (cards, panels), `bg-base-200` (recessed bands),
  `bg-base-300` (borders, dividers)
- Text: `text-base-content`, muted as `text-base-content/70`, subtle as
  `text-base-content/50`
- Brand: `primary`, `secondary`, `accent`, `neutral` — each with a matching
  `-content` for text sitting on that fill
- Surfaces: prefer `.surface-glass`, `.surface-card` or `.surface-quiet` over
  hand-rolling a background plus border plus shadow. Glass sits on the ambient
  gradient or on imagery, never on another glass panel and never more than one
  blur deep; anything holding dense text uses `.surface-card`
- Headings inherit the display face from `@layer base`, so `font-display` is
  only needed on non-heading elements
- Both themes are defined in `styles/globals.css`. Dark is reached through
  `prefers-color-scheme` only — there is no toggle and no persisted preference
- Genuine exceptions (overlay scrims, brand gradients, illustration fills) need
  an `eslint-disable-next-line no-restricted-syntax` with a reason
- `/design-system` renders every token and surface from the real components; it
  is noindex and is the fastest way to review a theme change

## Code style

- Ensure the use of typescript alias @/ for imports
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')
- React components should be functional components
- Each React component should declare its own prop types using TypeScript within the same file
- React component files should have constants declared outside the component function
- Use camelCase for variable and function names
- Use PascalCase for React component names
- Avoid use of inline styles, prefer Tailwind CSS classes
- Avoid using `any` type in Typescript or casting with as
- Declare constant values and objects using `const`
- Constant values that are objects, do not use CAPS for the variable name, use camelCase instead suffixed with 'Value'
- Event handlers should be named with the `handle` prefix (e.g. `handleClick`)
- Only write code comments when the code is not clear and keep it conscise, avoid commenting out code
- Avoid magic numbers and strings, use constants instead
- NEVER use screaming case (e.g. SCREAM_CASE) instead use regular camelCase
- Each file should have line break at the end
- Try to limit components and modules up to 200 lines and split in to different components to manage complexity
- Typescript files should be camelCase e.g. myService.ts
- React components should be PascalCase e.g. MyComponent.tsx
- Npm workspaces should be kebab-case

## React guidelines

- Each Component should declare its own prop types using TypeScript within the same file
- Component files should have constants declared outside the component function
- Avoid use of inline styles, prefer Tailwind CSS classes
- Event handlers should be named with the `handle` prefix (e.g. `handleClick`)
- Try to limit components and modules up to 200 lines and split into different components to manage complexity

## Typescript guidelines

- Never use "as" casting
- **NEVER** use inline TypeScript types in function parameters - always declare a separate type or interface (e.g., `type MyProps = {...}` not `function MyComponent({ prop }: { prop: string })`)

## Workflow

All changes MUST follow the following workflow

- After finishing code changes and **before every push**, run all checks in order:
  1. `pnpm format`
  2. `pnpm lint`
  3. `pnpm type:check`
  4. `pnpm build`
  5. `pnpm test:e2e`
- Never push without running these checks — commit any formatting changes before pushing
- Pre-commit hooks auto-run: Husky runs lint-staged (prettier + eslint)
- **After every push, always watch CI through to a terminal state** — do not hand
  back a branch or PR while checks are still running. Use
  `gh pr checks <number> --watch`. If anything fails, pull the failing job's logs,
  fix it, and push again rather than reporting the failure and stopping. Passing
  locally is not a substitute: local runs miss lockfile, environment and
  build-cache differences that only surface in CI
- Update any plan files with progress to help with issue tracking

## Dependency management

- Always pin dependencies to a specific version when installing. E.g. `pnpm add --exact --filter <workspace> <package>`
- Ensure to find the latest version of a package before adding it
- Avoid using deprecated packages or APIs
- Always install packages at the root of the monorepo targeting the correct workspace with `--filter <workspace>`
