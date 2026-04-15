---
title: 'Enhance CI pipeline checks for formatting and linting'
status: captured
priority: unset
source: internal
captured: '2026-04-14'
domain: infrastructure
prd: ''
tags:
  - ci
  - lint
  - formatting
  - github-actions
---

## Problem / Opportunity

Formatting and linting issues are still reaching pull requests, which creates avoidable review churn and slows delivery. Strengthening CI feedback for style and lint compliance can fail fast and keep quality gates consistent.

## Context

Current CI in `.github/workflows/ci.yml` runs `npm run ci` and Playwright tests for non-main pushes. The `ci` task in `turbo.json` already depends on `lint`, `type:check`, and `format:check`, and root scripts in `package.json` define `format:check` and `lint` commands.

This means checks exist but are grouped under a generic step (`Type check` running `npm run ci`), which makes failures less obvious in GitHub UI and can reduce visibility into whether formatting or linting failed specifically.

## Rough Scope

- Split or relabel CI quality-gate steps so formatting and linting results are explicit and easy to diagnose.
- Ensure formatting and lint checks run early in the workflow and fail fast before slower steps.
- Keep local and CI behavior aligned with existing root scripts and Turbo tasks.
- Optionally add branch protection guidance so these checks are required before merge.

## Success Signal

- CI surfaces separate, clearly named pass/fail statuses for formatting and linting.
- PRs with format or lint issues fail quickly with actionable logs.
- Fewer style-related review comments and fewer follow-up fix commits after PR review.

## Open Questions

- Should formatting and linting run as separate GitHub Action steps, or as separate jobs for parallel execution?
- Do we keep `npm run ci` as a consolidated gate in addition to explicit steps, or replace it for clarity?
- Should branch protection require both checks explicitly to merge?

## References

- `.github/workflows/ci.yml`
- `turbo.json`
- `package.json`
