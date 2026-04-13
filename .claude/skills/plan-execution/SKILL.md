# Skill: plan-execution

## Trigger

Use this skill when the user says:

- "create execution plan"
- "plan the work for PRD"
- "plan PRD [number]"
- invokes `/plan-execution`

## Purpose

Generate a detailed execution plan for a PRD, broken into phased tasks with specific file paths and verification steps. This is stage 3 of the planning pipeline.

## Output

- Creates: `docs/planning/plans/NNN-slug/plan.md`
- Creates: `docs/planning/plans/NNN-slug/assets/` directory (placeholder)
- Updates: PRD's `plan:` frontmatter field

## Workflow

### Step 1 — Identify the PRD

If the user referenced a specific PRD number or path, read it. If not, list PRDs with `status: approved` or `status: in-progress` from `docs/planning/prds/` and ask which one to plan.

Read the PRD fully before proceeding.

### Step 2 — Cross-reference the codebase

Before writing the plan, gather context from the codebase:

- Search for files mentioned in the PRD's Current State and Requirements sections
- Identify actual file paths that need changing (use Glob/Grep to verify they exist)
- Look for related components, schemas, queries, and types that may be affected
- Check `docs/planning/plans/` for any existing plans that may relate

This step is critical — the plan must reference real file paths, not guesses.

### Step 3 — Generate the plan

**Directory and filename:**

- Use the same number and slug as the PRD: `NNN-slug/`
- E.g., PRD `01-structured-data.md` → `docs/planning/plans/01-structured-data/plan.md`

**Frontmatter:**

```yaml
---
title: '[PRD title]: Execution Plan'
number: '[PRD number]'
status: planning
priority: [from PRD]
created: 'YYYY-MM-DD'
updated: 'YYYY-MM-DD'
owner: '[from PRD]'
prd: '[PRD filename]'
started: ''
completed: ''
estimated-hours: ''
tags: [from PRD]
---
```

**Body structure** (follow `docs/planning/templates/plan.md`):

- **Overview** — one paragraph: what this plan delivers, which PRD it implements
- **Phases** — break work into logical phases ordered by dependency:
  - Schema/CMS changes before frontend
  - Backend/API before UI
  - Foundation before content
- **Each task** must include:
  - Specific file paths (verified against codebase)
  - Numbered steps describing exactly what to change
  - Verification statement
- **Sanity CMS Steps** — if the PRD involves CMS schema or content, list them separately.
- **Verification Checklist** — always include in this order:
  1. `npm run format`
  2. `npm run lint`
  3. `npm run type:check`
  4. `npm run build`
  5. `npm run test:e2e`
- **Rollback Plan** — how to undo if something breaks in production

### Step 4 — Create assets directory

Create `docs/planning/plans/NNN-slug/assets/.gitkeep` to ensure the directory is tracked.

### Step 5 — Update the PRD

Patch the PRD file's `plan:` frontmatter field with the plan filename (e.g., `01-structured-data/plan.md`).

### Step 6 — Confirm

Report the files created/updated. Ask if the user wants to start working on the plan immediately.

## Task ordering rules

For SEO/content PRDs:

1. Schema/CMS changes first
2. TypeScript types and validation schemas
3. Data queries
4. Data mappers
5. Components/pages
6. Content creation
7. E2E tests

For engineering PRDs:

1. Schema/model changes
2. Service layer
3. API routes
4. UI components
5. Tests

## Notes

- Plans directory: `docs/planning/plans/`
- Template: `docs/planning/templates/plan.md`
- Always verify file paths exist in the codebase before referencing them
- Search the project structure to discover the correct path prefixes — do not assume a specific project layout
