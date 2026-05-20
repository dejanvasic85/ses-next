---
title: 'Enhance CI Pipeline Checks for Formatting and Linting: Execution Plan'
number: '010'
status: completed
created: '2026-05-20'
updated: '2026-05-20'
idea: '2026-04-enhance-ci-pipeline-format-and-lint-checks.md'
started: '2026-05-20'
completed: '2026-05-20'
estimated-hours: '1'
tags:
  - ci
  - lint
  - formatting
  - github-actions
---

# 010 — Enhance CI Pipeline Checks for Formatting and Linting: Execution Plan

## Overview

This plan splits the single generic `CI checks` step in `.github/workflows/ci.yml` into three explicit, named steps — **Format check**, **Lint**, and **Type check** — so GitHub's UI surfaces a clear pass/fail status for each concern. Previously `pnpm run ci` ran all three together via Turbo's `ci` task, which meant a formatting failure looked the same as a type error in the workflow log. Running each check as its own step makes failures immediately actionable.

---

## Phase 1 — Split CI Workflow Steps

### Task 1.1 — Replace the single `CI checks` step with three explicit steps

**Files changed:**

- `.github/workflows/ci.yml` — replaced `pnpm run ci` step with separate Format check, Lint, and Type check steps

**Steps:**

1. Removed the existing step: `- name: CI checks / run: pnpm run ci`
2. Replaced with three sequential steps before the Vercel deployment wait:
   ```yaml
   - name: Format check
     run: pnpm format:check

   - name: Lint
     run: pnpm lint

   - name: Type check
     run: pnpm type:check
   ```

**Verification:** `pnpm format`, `pnpm lint`, and `pnpm type:check` all pass locally.

---

## Verification Checklist

- [x] `pnpm format`
- [x] `pnpm lint`
- [x] `pnpm type:check`
- [ ] `pnpm build`
- [ ] `pnpm test:e2e`

---

## Rollback Plan

1. Revert `.github/workflows/ci.yml` — restore the single step `- name: CI checks / run: pnpm run ci`.
2. No code or schema changes were made, so no database or CMS rollback is needed.

---

## Assets

- No assets required for this plan.
