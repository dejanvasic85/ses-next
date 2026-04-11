# Instructions

# Technical Requirements

- Next.js v16
- Tailwind CSS V4
- Sanity CMS (schema located under apps/content-studio) v4
- Accessibility (a11y) AAA compliant
- Responsive design (mobile-first)
- Clean and maintainable code with re-usable React components

## Commands

This is a monorepo with multiple apps so each command should target specific workspace
having to navigate to each app.
E.g. `npm run build -w <workspace>`

Here are some commands you can use:

- npm run type:check: Runs TypeScript type checking without building
- npm run format: Uses Prettier to format the code
- npm run lint: Runs ESLint check
- npm run dev: Starts the development server for the main website but you will need to run it in the background otherwise it will block the terminal

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

## React

- Each Component should declare its own prop types using TypeScript within the same file
- **NEVER** use inline TypeScript types in function parameters - always declare a separate type or interface (e.g., `type MyProps = {...}` not `function MyComponent({ prop }: { prop: string })`)
- Component files should have constants declared outside the component function
- Avoid use of inline styles, prefer Tailwind CSS classes
- Event handlers should be named with the `handle` prefix (e.g. `handleClick`)
- Try to limit components and modules up to 200 lines and split into different components to manage complexity

## Workflow

- **MUST**: After finishing code changes and **before every push**, run all three checks in order:
  1. `npm run lint`
  2. `npm run format`
  3. `npm run type:check`
- Never push without running these checks — commit any formatting changes before pushing
- For larger change sets also ensure Next.js can build: `npm run build`
- E2E testing: `npm run test:e2e`
- Pre-commit hooks auto-run: Husky runs lint-staged (prettier + eslint)
- **MUST**: At the end of every completed change, push commits to the remote branch and ensure there is an open pull request for that branch
- If no pull request exists yet, create one immediately after pushing
- **MUST**: Do not merge any pull request until explicit user approval is given
- **MUST**: Wait for pull request review suggestions/comments, apply requested fixes, push updates, and repeat until all review comments are addressed
- Resolve addressed review comments in the GitHub pull request conversation
- **MUST**: Update any plan files with progress to help with issue tracking. Use check `[x]` markdown format

## Dependency management

- Always pin dependencies to a specific version when installing. E.g. npm install --save-exact -w <workspace>
- Ensure to find the latest version of a package before adding it
- Avoid using deprecated packages or APIs
- Always install packages at the root of the monorepo targeting the correct workspace with -w <workspace>
