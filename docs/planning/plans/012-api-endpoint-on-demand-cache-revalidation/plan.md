---
title: 'Add API Endpoint for On-Demand Next.js Cache Revalidation: Execution Plan'
number: '012'
status: completed
created: '2026-06-27'
updated: '2026-06-27'
idea: '2026-05-api-endpoint-for-on-demand-cache-revalidation.md'
started: ''
completed: ''
estimated-hours: '4'
tags:
  - nextjs
  - cache
  - sanity
  - webhooks
  - performance
---

# 012 — Add API Endpoint for On-Demand Next.js Cache Revalidation: Execution Plan

## Overview

This plan implements a protected `POST /api/revalidate` route handler that Sanity can call after publish events, replacing the full-redeploy deployment hook with targeted `revalidatePath(...)` calls. The endpoint validates a shared secret from the `REVALIDATE_SECRET` env var and maps each Sanity `_type` to the correct Next.js path(s). It follows the same Route Handler pattern used in `packages/ses-next/src/app/api/contact/route.ts` and adds integration tests to `packages/ses-next/tests/routes.spec.ts`.

---

## Phase 1 — Config and Environment

### Task 1.1 — Add `revalidateSecret` to config

**Files to change:**

- `packages/ses-next/src/lib/config.ts` — add `revalidateSecret` field to schema and raw config

**Steps:**

1. Add `revalidateSecret: z.string()` to `AppConfigSchema`.
2. Add `revalidateSecret: process.env.REVALIDATE_SECRET` to the `rawConfig` object.
3. Add `REVALIDATE_SECRET=<your-secret>` to `packages/ses-next/.env.local` (for local development).

**Verification:** `pnpm type:check` passes; accessing `config.revalidateSecret` resolves to a string.

---

## Phase 2 — Route Handler

### Task 2.1 — Create the revalidate route

**Files to change:**

- `packages/ses-next/src/app/api/revalidate/route.ts` — new file

**Steps:**

1. Create file `packages/ses-next/src/app/api/revalidate/route.ts`.
2. Import `revalidatePath` from `'next/cache'` and `config` from `'@/lib/config'`.
3. Declare a `RevalidateBody` type with `_type: string` and optional `slug?: string`.
4. Declare a `typeToPathsMap` const (outside the handler) mapping each document type to its revalidation paths:
   - `siteSettings` → `['/']` (revalidates the whole site via root)
   - `homepage` → `['/']`
   - `service` → `['/services']`
   - `blog-post` → `['/blog']`
   - `faq` → `['/faq']`
   - `locationPage` → `['/locations']`
   - `terms-and-conditions` → `['/terms']`
   - `teamMember` → `['/']`
   - `training` → `['/']`
   - `showcase` → `['/']`
   - `servicesHub` → `['/services']`
5. Implement `export async function POST(request: Request)`:
   - Read the `Authorization` header and compare `Bearer <token>` against `config.revalidateSecret`; return `401` if mismatch.
   - Parse JSON body; return `400` on parse failure.
   - Extract `_type`; return `400` if missing.
   - Look up `typeToPathsMap[_type]`; return `400` with `{ message: 'Unknown document type' }` if not found.
   - Call `revalidatePath(path)` for each matching path.
   - Return `200` with `{ revalidated: true, paths }`.
6. Export a `GET` handler that returns `405`.

**Verification:** `pnpm build` succeeds; route exists at `/api/revalidate`.

---

## Phase 3 — Tests

### Task 3.1 — Add E2E tests for the revalidate route

**Files to change:**

- `packages/ses-next/tests/routes.spec.ts` — add a new `test.describe('Revalidate API Route', ...)` block

**Steps:**

1. Add tests inside a new `test.describe('Revalidate API Route', ...)` block at the end of the file.
2. Add test: `returns 401 when no Authorization header` — POST to `/api/revalidate` without the header, expect `401`.
3. Add test: `returns 401 when wrong secret` — POST with `Authorization: Bearer wrong-secret`, expect `401`.
4. Add test: `returns 400 for malformed JSON` — POST with valid auth header and invalid JSON body, expect `400`.
5. Add test: `returns 400 for unknown _type` — POST with valid auth header and `{ _type: 'unknown' }`, expect `400`.
6. Add test: `returns 200 and revalidates known _type` — POST with valid auth header and `{ _type: 'homepage' }`, expect `200` and `revalidated: true`.
7. Use a `revalidateSecret` value that matches the `REVALIDATE_SECRET` set in `.env.local` for tests.

**Verification:** `pnpm test:e2e` passes with all new tests green.

---

## Phase 4 — Sanity Webhook

### Task 4.1 — Configure the Sanity webhook

This is a manual step in the Sanity dashboard (no code change required).

**Steps:**

1. Open Sanity project settings → API → Webhooks.
2. Create a new webhook:
   - **Name:** `Next.js On-Demand Revalidation`
   - **URL:** `https://<production-domain>/api/revalidate`
   - **Trigger on:** `Publish` (document create/update/delete publish events)
   - **Projection:** `{ _type }` (send only the document type)
   - **HTTP Method:** POST
   - **Headers:** `Authorization: Bearer <REVALIDATE_SECRET value>`
3. Remove or disable the existing deployment hook once the webhook is verified working.

**Verification:** After publishing a Sanity document, the live site updates within seconds without a full redeploy.

---

## Verification Checklist

Run in order before pushing:

- [ ] `pnpm format`
- [ ] `pnpm lint`
- [ ] `pnpm type:check`
- [ ] `pnpm build`
- [ ] `pnpm test:e2e`

## Rollback Plan

1. In Sanity, disable the `Next.js On-Demand Revalidation` webhook and re-enable the deployment hook.
2. Remove or revert `packages/ses-next/src/app/api/revalidate/route.ts`.
3. Revert the `revalidateSecret` additions in `packages/ses-next/src/lib/config.ts`.
4. Redeploy.

## Assets

- No additional assets required.
