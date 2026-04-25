# SES - Storm Electrical Solutions

## Commands

This is a monorepo with multiple apps so each command should target specific workspace
having to navigate to each app.
E.g. `npm run build -w <workspace>`

## Nextjs structure

- The app folder should only contain routing components (page.tsx and route.ts)
- Components that are relevant to a page, should still go in to the components folder

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

- After finishing code changes and **before every push**, run all three checks in order:
  1. `npm run format`
  2. `npm run lint`
  3. `npm run type:check`
  4. `npm run build`
  5. `npm run test:e2e`
- Never push without running these checks — commit any formatting changes before pushing
- Pre-commit hooks auto-run: Husky runs lint-staged (prettier + eslint)
- Update any plan files with progress to help with issue tracking

## Dependency management

- Always pin dependencies to a specific version when installing. E.g. npm install --save-exact -w <workspace>
- Ensure to find the latest version of a package before adding it
- Avoid using deprecated packages or APIs
- Always install packages at the root of the monorepo targeting the correct workspace with -w <workspace>
