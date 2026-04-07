# App Router Migration Plan

Migration plan for the `ses-next` workspace (packages/ses-next) from Pages Router to App Router.

MUST: use the nextjs dev tools MCP for documentation before taking tasks on.

## Current State Summary

| Aspect              | Current State                                                       |
| ------------------- | ------------------------------------------------------------------- |
| Next.js version     | 16.2.1 (App Router fully supported)                                 |
| React version       | 19.2.4 (Server Components supported)                                |
| Router              | Pages Router (`src/pages/`) with one App Router file (`sitemap.ts`) |
| Data fetching       | `getStaticProps` + `getStaticPaths` (SSG only, no SSR)              |
| Pages count         | 10 page files + 1 API route                                         |
| Components          | 24 shared components                                                |
| Auth                | None (public site)                                                  |
| State management    | React Context (ConfigProvider) + local state                        |
| Styling             | Tailwind CSS v4 + DaisyUI v5                                        |
| SEO                 | `next-seo` + custom `PageHead` + JSON-LD structured data            |
| CMS                 | Sanity via `next-sanity`                                            |
| Client interactions | Contact form (reCAPTCHA + AWS SES), GTM, scroll tracking            |

## Architecture Decisions

### Server Components by default

Since this is a statically-generated marketing site with minimal client interactivity, the
majority of components will become Server Components. Only components with browser APIs, event
handlers, or React hooks need `"use client"`.

### Static generation preserved

All current pages use `getStaticProps` (SSG). The App Router equivalent is the default
behaviour -- Server Components with `fetch` caching or direct data access. No change to the
static-first strategy.

### No ISR or SSR needed

The site rebuilds on deploy. No need to introduce `revalidate` or dynamic rendering unless
requirements change.

---

## Phase 0 -- Preparation (Pre-Migration)

**Goal:** Set up the foundation and safety net before touching any routes.

### 0.1 Snapshot current behaviour

- [ ] Run the full Playwright E2E suite (`npm run test:e2e -w ses-next`) and save results
- [ ] Take Lighthouse snapshots of key pages (homepage, services hub, a service page, blog index, a blog post) for baseline scores
- [ ] Commit all current changes so git history is clean

### 0.2 Expand E2E coverage

Before migrating, add smoke tests for routes not currently covered:

- [x] `/faq` -- page loads, FAQ items render
- [x] `/terms` -- page loads, content renders
- [x] `/services/:slug` -- a specific service page renders correctly
- [x] `/services/:parent/:child` -- a sub-service page renders correctly
- [x] `/blog/tag/:tag` -- a tag filter page renders
- [x] `/api/contact` -- returns 405 for GET, accepts POST with validation errors
- [x] `/404` -- custom 404 page renders

### 0.3 Migrate `next.config.js` to ESM

The config currently uses CommonJS (`require`/`module.exports`). Migrate to `next.config.ts`:

- [x] Rename `next.config.js` to `next.config.ts`
- [x] Convert `require()` to `import`
- [x] Convert `module.exports` to `export default`
- [x] Use the `NextConfig` type from `next`
- [x] Verify build still passes

### 0.4 Audit `next-seo` compatibility

`next-seo` v7 has a `next-seo/pages` export for Pages Router and the root `next-seo` package for
App Router (JSON-LD components), but the App Router approach is to use the built-in `metadata`
API. Plan:

- [x] Replace `next-seo` with Next.js built-in `metadata` export and `generateMetadata` during migration
- [x] Replace JSON-LD components from `next-seo` with `<script type="application/ld+json">` in Server Components

---

## Phase 1 -- Root Layout and Global Providers

**Goal:** Create the App Router root layout replacing `_app.tsx` and `_document.tsx`.

### 1.1 Create root layout

**File:** `src/app/layout.tsx`

This replaces both `_app.tsx` and `_document.tsx`:

- [x] Set `<html lang="en">` (from `_document.tsx`)
- [x] Set favicon and apple-touch-icon `<link>` tags via `metadata` export (from `_document.tsx`)
- [x] Apply Inter font via `next/font/google` (replace manual font import from `_app.tsx`)
- [x] Set global `metadata` export: robots, openGraph locale/type, site name
- [x] Import `globals.css`
- [x] Render `{children}` in `<body>`

### 1.2 Migrate client-side providers

Create a client component wrapper for providers that require browser APIs:

**File:** `src/app/providers.tsx` (`"use client"`)

- [x] Move `GoogleReCaptchaProvider` wrapping here
- [x] Move GTM initialisation here (currently in `_app.tsx` useEffect)
- [x] Move `ConfigProvider` here (provides Sanity config via context)
- [x] Import `Providers` into `layout.tsx` and wrap `{children}`

### 1.3 Migrate Navbar and Footer into layout

The current `Layout` component (`src/components/Layout.tsx`) wraps every page with
`PageHead` + `Navbar` + `Footer`. In the App Router:

- [x] Add `Navbar` and `Footer` directly in `layout.tsx` (they are shared across all routes)
- [x] `Navbar` uses `useScrollPosition` and `useState` -- mark as `"use client"`
- [x] `Footer` is presentational only -- keep as Server Component if possible, or mark `"use client"` if it uses hooks
- [ ] The `Layout` component wrapper becomes unnecessary -- remove it after all pages are migrated
- [ ] The `PageHead` component becomes unnecessary -- replaced by `metadata`/`generateMetadata`

### 1.4 Verify hybrid mode works

At this point, `src/app/layout.tsx` exists alongside `src/pages/`. Next.js supports this hybrid
mode. All existing pages should continue to work.

- [x] Run dev server and verify all pages render
- [x] Run E2E tests

---

## Phase 2 -- Static Pages (Simplest Routes First)

**Goal:** Migrate pages with no dynamic segments to gain confidence.

### 2.1 Homepage (`/`)

**From:** `src/pages/index.tsx`
**To:** `src/app/page.tsx`

- [x] Create `src/app/page.tsx` as a Server Component
- [x] Move `getStaticProps` logic inline -- call `getBasePageProps()`, `getHomePageContent()`, and import `googleReviews` directly at the top level of the async component
- [x] Export `metadata` (or `generateMetadata`) with title, description, canonical URL, OpenGraph
- [x] Move JSON-LD structured data (LocalBusiness, credentials) to inline `<script>` tags
- [x] Render Hero, Contact, Services, About, Team, Testimonials sections
- [x] Delete `src/pages/index.tsx`
- [x] Run E2E tests for homepage

### 2.2 FAQ page (`/faq`)

**From:** `src/pages/faq.tsx`
**To:** `src/app/faq/page.tsx`

- [x] Create `src/app/faq/page.tsx` as a Server Component
- [x] Inline data fetching (FAQ items + base props)
- [x] Export `metadata` with FAQ page title/description
- [x] Move FAQ and Breadcrumb JSON-LD to inline `<script>` tags
- [x] Delete `src/pages/faq.tsx`

### 2.3 Terms page (`/terms`)

**From:** `src/pages/terms/index.tsx`
**To:** `src/app/terms/page.tsx`

- [x] Create `src/app/terms/page.tsx` as a Server Component
- [x] Inline data fetching (terms content + base props)
- [x] Export `metadata`
- [x] Delete `src/pages/terms/index.tsx`

### 2.4 Error pages

**From:** `src/pages/404.tsx` and `src/pages/500.tsx`
**To:** `src/app/not-found.tsx` and `src/app/error.tsx`

- [x] Create `src/app/not-found.tsx` -- replaces the custom 404 page. This is a Server Component.
- [x] Create `src/app/error.tsx` -- replaces the custom 500 page. This must be a Client Component (`"use client"`).
- [x] Delete `src/pages/404.tsx` and `src/pages/500.tsx`

### 2.5 Verify

- [x] Run full E2E suite
- [ ] Compare Lighthouse scores against Phase 0 baseline

---

## Phase 3 -- Blog Routes (Dynamic Segments)

**Goal:** Migrate blog pages which use `getStaticPaths` + dynamic `[slug]` segments.

### 3.1 Blog index (`/blog`)

**From:** `src/pages/blog/index.tsx`
**To:** `src/app/blog/page.tsx`

- [x] Create `src/app/blog/page.tsx` as a Server Component
- [x] Inline data fetching: call `getBlogPosts()` + `getSiteSettings()`
- [x] Compute `tagsWithCount` server-side
- [x] Export `metadata`

### 3.2 Blog post page (`/blog/[slug]`)

**From:** `src/pages/blog/[slug].tsx`
**To:** `src/app/blog/[slug]/page.tsx`

- [x] Create `src/app/blog/[slug]/page.tsx` as a Server Component
- [x] Replace `getStaticPaths` with `generateStaticParams`:
  ```ts
  export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
  }
  ```
- [x] Replace `getStaticProps` with direct data fetching in the component using the `params` prop
- [x] Export `generateMetadata` for dynamic title/description/canonical/OpenGraph
- [x] Move Article and Breadcrumb JSON-LD to inline `<script>` tags

### 3.3 Blog tag page (`/blog/tag/[tag]`)

**From:** `src/pages/blog/tag/[tag].tsx`
**To:** `src/app/blog/tag/[tag]/page.tsx`

- [x] Create page as a Server Component
- [x] Replace `getStaticPaths` with `generateStaticParams`
- [x] Replace `getStaticProps` with direct data fetching
- [x] Export `generateMetadata` with `noIndex` (robots: { index: false })

### 3.4 Shared blog layout (optional improvement)

- [ ] Consider creating `src/app/blog/layout.tsx` to share the `BlogLayout` wrapper (sidebar + mobile filter) across blog routes
- [x] The blog sidebar and mobile filter use `useParams` and `usePathname` from `next/navigation` (already done)

### 3.5 Clean up and verify

- [x] Delete `src/pages/blog/` directory
- [x] Update `BlogSidebar` and `BlogFilterMobile` to use `next/navigation` hooks (already done)
- [ ] Run E2E tests for all blog routes

---

## Phase 4 -- Service Routes (Catch-All Dynamic Segments)

**Goal:** Migrate the services hub and the catch-all `[...slug]` service pages.

### 4.1 Services hub (`/services`)

**From:** `src/pages/services/index.tsx`
**To:** `src/app/services/page.tsx`

- [x] Create `src/app/services/page.tsx` as a Server Component
- [x] Inline data fetching: `getBasePageProps()` + `getServicesHubContent()`
- [x] Export `metadata`
- [x] Move CollectionPage and Breadcrumb JSON-LD to inline `<script>` tags

### 4.2 Service detail pages (`/services/[...slug]`)

**From:** `src/pages/services/[...slug].tsx`
**To:** `src/app/services/[...slug]/page.tsx`

- [x] Create `src/app/services/[...slug]/page.tsx` as a Server Component
- [x] Replace `getStaticPaths` with `generateStaticParams`:
  ```ts
  export async function generateStaticParams() {
    const services = await getServices();
    return services.map((s) => (s.parentSlug ? { slug: [s.parentSlug, s.slug] } : { slug: [s.slug] }));
  }
  ```
- [x] Replace `getStaticProps` with direct data fetching using `params.slug` array
- [x] Export `generateMetadata` for dynamic SEO
- [x] Move Service, LocalBusiness, FAQ, and Breadcrumb JSON-LD to inline `<script>` tags

### 4.3 Clean up and verify

- [x] Delete `src/pages/services/` directory
- [x] Run E2E tests for all service routes

---

## Phase 5 -- API Route

**Goal:** Migrate the single API route.

### 5.1 Contact API (`/api/contact`)

**From:** `src/pages/api/contact.ts`
**To:** `src/app/api/contact/route.ts`

- [x] Create `src/app/api/contact/route.ts`
- [x] Export `POST` handler function (replacing the default handler pattern):
  ```ts
  export async function POST(request: Request) {
    const body = await request.json();
    // ... reCAPTCHA verification, email sending
    return Response.json({ success: true });
  }
  ```
- [x] Optionally add a `GET` handler returning 405 or remove it (App Router only matches exported methods)
- [x] Delete `src/pages/api/contact.ts`
- [x] Harden route handler with runtime payload validation (`safeParse`) and sanitize API responses (no echoed payload/raw errors)
- [x] Make customer thank-you email best-effort (avoid duplicate admin notifications on retries)
- [ ] Test contact form submission end-to-end

---

## Phase 6 -- Component Updates and Cleanup

**Goal:** Update all components to work optimally with the App Router and remove Pages Router artifacts.

### 6.1 Mark client components

Add `"use client"` directive to components that use browser APIs or React hooks:

| Component          | Reason for `"use client"`                                         |
| ------------------ | ----------------------------------------------------------------- |
| `Navbar`           | `useState`, `useEffect`, `useScrollPosition`, event handlers      |
| `ContactForm`      | `useForm` (react-hook-form), `useGoogleReCaptcha`, event handlers |
| `Contact`          | Contains `ContactForm` (client), `useContact` hook                |
| `Testimonial`      | `useState`, `useEffect`, `useRef` (clamp detection)               |
| `ImageCarousel`    | `useState`, `useEffect` (keyboard events)                         |
| `GalleryCarousel`  | `useState`, event handlers                                        |
| `Modal`            | `react-modal` (DOM manipulation)                                  |
| `PopSuccess`       | `useState`, animation state                                       |
| `BlogSidebar`      | `useParams`/`usePathname` (from `next/navigation`)                |
| `BlogFilterMobile` | `useParams`/`usePathname` (from `next/navigation`)                |

All other components (Heading, Container, Footer, Hero, Services, Team, Rating, Gallery,
LinkButton, About, RelatedServices, ServiceBreadcrumb, BlogLayout, BlogMenu, Icon, CustomImage)
can remain as Server Components.

### 6.2 Remove `next/router` usage

Two components currently import from `next/router`:

| Component          | Current                 | Replace with                           |
| ------------------ | ----------------------- | -------------------------------------- |
| `BlogSidebar`      | `useRouter().query.tag` | `useParams()` from `next/navigation`   |
| `BlogSidebar`      | `useRouter().pathname`  | `usePathname()` from `next/navigation` |
| `BlogFilterMobile` | `useRouter().query.tag` | `useParams()` from `next/navigation`   |
| `BlogFilterMobile` | `useRouter().pathname`  | `usePathname()` from `next/navigation` |

### 6.3 Replace `next/head` with metadata API

- [ ] Delete `src/components/PageHead.tsx` (no longer needed)
- [ ] All SEO is now handled by `metadata` exports and `generateMetadata` in page/layout files

### 6.4 Remove `next-seo` dependency

After all pages are migrated:

- [ ] Verify no imports from `next-seo` remain
- [ ] Run `npm uninstall next-seo -w ses-next`

### 6.5 Remove `react-gtm-module`

Consider replacing with the Next.js `<Script>` component pattern for GTM, which is the
recommended approach:

- [ ] Add GTM script via `next/script` in the root layout (or keep in providers if preferred)
- [ ] Remove `react-gtm-module` dependency

### 6.6 Remove `ConfigProvider` (optional simplification)

The `ConfigProvider` passes Sanity `projectId` and `dataset` down via context. With Server
Components, these can be imported directly from environment/config where needed:

- [ ] Evaluate if any client component actually needs Sanity config at runtime
- [ ] If only used in `CustomImage` for the image URL builder, pass it as a prop or use a server utility
- [ ] Remove `ConfigProvider` and `useConfig` hook if no longer needed

### 6.7 Delete Pages Router files

- [ ] Delete `src/pages/_app.tsx`
- [ ] Delete `src/pages/_document.tsx`
- [ ] Delete `src/pages/` directory entirely (should be empty by now)
- [ ] Delete `src/components/Layout.tsx` (replaced by `app/layout.tsx`)
- [ ] Delete `src/components/PageHead.tsx` (replaced by metadata API)
- [ ] Update `src/components/index.ts` barrel exports to remove deleted components

---

## Phase 7 -- Verification and Optimisation

**Goal:** Ensure everything works and take advantage of App Router features.

### 7.1 Full test pass

- [ ] Run `npm run type:check -w ses-next` -- zero TypeScript errors
- [ ] Run `npm run lint -w ses-next` -- zero lint errors
- [x] Run `npm run build -w ses-next` -- successful build
- [ ] Run `npm run test:e2e -w ses-next` -- all tests pass
- [ ] Manual smoke test of every route in dev mode

### 7.2 Lighthouse comparison

- [ ] Run Lighthouse on the same pages as Phase 0
- [ ] Compare Performance, Accessibility, SEO, Best Practices scores
- [ ] Address any regressions

### 7.3 Optional App Router enhancements

These are not required for migration but unlock App Router capabilities:

- [ ] **Loading states:** Add `loading.tsx` files for routes that fetch data (blog, services) to show skeleton UI during navigation
- [ ] **Streaming:** Large pages (services with galleries) could benefit from Suspense boundaries to stream content progressively
- [ ] **Route groups:** Use `(marketing)` route group if layout variations are needed in the future
- [ ] **Parallel routes:** Not needed currently but available if the site grows
- [ ] **`robots.ts`:** Replace static `public/robots.txt` with dynamic `src/app/robots.ts` for programmatic control
- [ ] **`opengraph-image`:** Use the OG Image generation API for dynamic social preview images

---

## File Mapping Reference

Complete mapping of Pages Router files to App Router equivalents:

| Pages Router File              | App Router File                          | Type             |
| ------------------------------ | ---------------------------------------- | ---------------- |
| `pages/_app.tsx`               | `app/layout.tsx` + `app/providers.tsx`   | Root layout      |
| `pages/_document.tsx`          | `app/layout.tsx` (metadata export)       | Root layout      |
| `pages/index.tsx`              | `app/page.tsx`                           | Server Component |
| `pages/faq.tsx`                | `app/faq/page.tsx`                       | Server Component |
| `pages/terms/index.tsx`        | `app/terms/page.tsx`                     | Server Component |
| `pages/404.tsx`                | `app/not-found.tsx`                      | Server Component |
| `pages/500.tsx`                | `app/error.tsx`                          | Client Component |
| `pages/blog/index.tsx`         | `app/blog/page.tsx`                      | Server Component |
| `pages/blog/[slug].tsx`        | `app/blog/[slug]/page.tsx`               | Server Component |
| `pages/blog/tag/[tag].tsx`     | `app/blog/tag/[tag]/page.tsx`            | Server Component |
| `pages/services/index.tsx`     | `app/services/page.tsx`                  | Server Component |
| `pages/services/[...slug].tsx` | `app/services/[...slug]/page.tsx`        | Server Component |
| `pages/api/contact.ts`         | `app/api/contact/route.ts`               | Route Handler    |
| `app/sitemap.ts`               | `app/sitemap.ts` (already exists)        | No change        |
| `components/Layout.tsx`        | Deleted (absorbed into `app/layout.tsx`) | --               |
| `components/PageHead.tsx`      | Deleted (replaced by metadata API)       | --               |

---

## Dependencies to Remove After Migration

| Package            | Reason                                                     |
| ------------------ | ---------------------------------------------------------- |
| `next-seo`         | Replaced by built-in `metadata` API and `generateMetadata` |
| `react-gtm-module` | Replaced by `next/script` GTM pattern (optional)           |

## Dependencies to Keep

| Package                     | Reason                                             |
| --------------------------- | -------------------------------------------------- |
| `next-sanity`               | CMS client (fully compatible with App Router)      |
| `@sanity/image-url`         | Image URL builder                                  |
| `@portabletext/react`       | Rich text rendering (works in both RSC and client) |
| `react-google-recaptcha-v3` | Contact form anti-spam (client component)          |
| `react-hook-form`           | Contact form (client component)                    |
| `react-modal`               | Modal dialog (client component)                    |
| `zod`                       | Schema validation (works everywhere)               |
| `aws-sdk`                   | Email service (server-only, route handler)         |
| `date-fns`                  | Date formatting (works everywhere)                 |
| `class-names`               | Conditional CSS classes (works everywhere)         |
| `daisyui` / `tailwindcss`   | Styling (no change)                                |

---

## Risk Assessment

| Risk                                      | Likelihood | Impact | Mitigation                                       |
| ----------------------------------------- | ---------- | ------ | ------------------------------------------------ |
| SEO regression (metadata/OG tags missing) | Medium     | High   | Compare rendered HTML before/after per page      |
| JSON-LD structured data broken            | Medium     | High   | Validate with Google Rich Results Test tool      |
| Client component boundary misplacement    | Medium     | Medium | Console errors will surface; test thoroughly     |
| `next-seo` removal breaks something       | Low        | Medium | Migrate page-by-page, verify metadata each time  |
| Redirects stop working                    | Low        | Medium | Redirects in `next.config` work for both routers |
| Contact form breaks                       | Low        | High   | Dedicated E2E test for form submission           |
| Build time regression                     | Low        | Low    | Monitor build times during migration             |
| Sanity preview/draft mode incompatibility | Low        | Low    | Not currently using preview mode                 |

---

## Estimated Effort

| Phase     | Description                   | Estimate         |
| --------- | ----------------------------- | ---------------- |
| 0         | Preparation                   | 1-2 hours        |
| 1         | Root layout and providers     | 1-2 hours        |
| 2         | Static pages                  | 2-3 hours        |
| 3         | Blog routes                   | 2-3 hours        |
| 4         | Service routes                | 2-3 hours        |
| 5         | API route                     | 30 minutes       |
| 6         | Component updates and cleanup | 2-3 hours        |
| 7         | Verification and optimisation | 1-2 hours        |
| **Total** |                               | **~12-18 hours** |

The migration can be done incrementally -- Next.js supports running Pages Router and App Router
side by side. Each phase results in a deployable state.
