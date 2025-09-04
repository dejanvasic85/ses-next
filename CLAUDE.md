# Technical Requirements

- Next.js (located under apps/web) v15
- Tailwind CSS V4
- Sanity CMS (schema located under apps/content-studio) v4
- Accessibility (a11y) AAA compliant
- Responsive design (mobile-first)
- Clean and maintainable code with re-usable React components
- Ensure the use of typescript alias @/ for imports

Please read all the latest documentation for Next.js, Tailwind CSS, and Sanity CMS to ensure you are familiar with the latest features and best practices before implementing any new features or changes in these areas.

# Commands

This is a monorepo with multiple apps so each command should target specific workspace
having to navigate to each app.
E.g. `npm run build -w <workspace-name>`. E.g. npm run type:check -w web.

Here are some commands you can use:

- npm run type:check: Runs TypeScript type checking without building
- npm run format: Uses Prettier to format the code
- npm run lint: Runs ESLint check
- npm run dev: Starts the development server for the main website but you will need to run it in the background otherwise it will block the terminal

# Code style

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
- Each file should have line break at the end
- Try to limit components and modules up to 200 lines and split in to different components to manage complexity
- Typescript files should be camelCase e.g. myService.ts
- React components should be PascalCase e.g. MyComponent.tsx
- Npm workspaces should be kebab-case

# Workflow

- Be sure to typecheck when you’re done making a series of code changes
- Use `npm run format` whenever the format is not correct
- Prefer running single tests, and not the whole test suite, for performance

# Dependency management

- Always pin dependencies to a specific version when installing. E.g. npm install --save-exact -w web
- Ensure to find the latest version of a package before adding it
- Avoid using deprecated packages or APIs
- Always install packages at the root of the monorepo targeting the correct workspace with -w <workspace-name>
