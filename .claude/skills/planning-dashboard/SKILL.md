# Skill: planning-dashboard

## Trigger

Use this skill when the user says:

- "update dashboard"
- "show pipeline status"
- "what's the status"
- "planning status"
- invokes `/planning-dashboard`

## Purpose

Scan all planning documents, parse their YAML frontmatter, and regenerate the three `_index.md` dashboard files with current status summaries.

## Output

Updates all three dashboard files:

- `docs/planning/ideas/_index.md`
- `docs/planning/prds/_index.md`
- `docs/planning/plans/_index.md`

## Workflow

### Step 1 — Scan all planning documents

Read every `.md` file (excluding `_index.md` itself) in:

- `docs/planning/ideas/`
- `docs/planning/prds/`
- `docs/planning/plans/` (read `plan.md` inside each subdirectory)

For each file, extract the YAML frontmatter fields.

### Step 2 — Calculate metrics

**For ideas:**

- Count by status: `captured | evaluating | accepted | rejected | deferred`
- Count by domain and priority
- Identify ideas with `status: accepted` that have no `prd:` value (orphaned — should be promoted)

**For PRDs:**

- Count by status: `draft | review | approved | in-progress | completed | cancelled`
- Count by priority and domain
- Calculate acceptance criteria completion: count checked `[x]` vs total `[ ]` + `[x]` checkboxes
- Identify PRDs with `status: approved` that have no `plan:` value (ready to plan)
- Identify dependency chains (PRDs listed in `depends-on` of other PRDs)

**For plans:**

- Count by status: `planning | ready | in-progress | blocked | completed`
- Identify blocked plans
- Calculate overall completion percentage from acceptance criteria checkboxes in the linked PRD

### Step 3 — Generate dashboard files

#### `docs/planning/ideas/_index.md`

```markdown
---
updated: 'YYYY-MM-DD'
---

# Ideas Pipeline

## Summary

| Status     | Count |
| ---------- | ----- |
| Captured   | N     |
| Evaluating | N     |
| Accepted   | N     |
| Rejected   | N     |
| Deferred   | N     |
| **Total**  | **N** |

## Ideas

| File                      | Title | Status | Priority | Domain | Captured | PRD       |
| ------------------------- | ----- | ------ | -------- | ------ | -------- | --------- |
| [filename](./filename.md) | title | status | priority | domain | date     | link or — |

(Sorted by: priority desc, then captured date desc)

## Action Required

- [List any accepted ideas with no PRD link — needs /promote-to-prd]
```

#### `docs/planning/prds/_index.md`

```markdown
---
updated: 'YYYY-MM-DD'
---

# PRDs Pipeline

## Summary

| Status      | Count |
| ----------- | ----- |
| Draft       | N     |
| Review      | N     |
| Approved    | N     |
| In Progress | N     |
| Completed   | N     |
| Cancelled   | N     |
| **Total**   | **N** |

## PRDs

| #                                 | Title | Status | Priority | Phase | Completion   | Plan      |
| --------------------------------- | ----- | ------ | -------- | ----- | ------------ | --------- |
| [00](./00-implementation-plan.md) | title | status | priority | phase | X/Y criteria | link or — |

(Sorted by: number asc)

## Pipeline Flow
```

Ideas → PRDs → Plans
[N accepted ideas] → [N PRDs total] → [N plans total]

```

## Action Required

- [List approved PRDs with no plan link — needs /plan-execution]
- [List PRDs where depends-on PRDs are not yet completed]
```

#### `docs/planning/plans/_index.md`

```markdown
---
updated: 'YYYY-MM-DD'
---

# Execution Plans

## Summary

| Status      | Count |
| ----------- | ----- |
| Planning    | N     |
| Ready       | N     |
| In Progress | N     |
| Blocked     | N     |
| Completed   | N     |
| **Total**   | **N** |

## Plans

| #                         | Title | Status | Priority | PRD      | Started   | Completed |
| ------------------------- | ----- | ------ | -------- | -------- | --------- | --------- |
| [NNN](./NNN-slug/plan.md) | title | status | priority | prd link | date or — | date or — |

(Sorted by: priority desc, then number asc)

## Blockers

- [List any plans with status: blocked and note what's blocking them]
```

### Step 4 — Confirm

Report which dashboard files were updated and the high-level counts for each stage.

## Notes

- Parse YAML frontmatter between `---` delimiters at the top of each file
- Checkbox completion: count `- [x]` as done, `- [ ]` as pending
- If a stage directory is empty, write a minimal dashboard noting no items yet
- Preserve the `updated:` frontmatter field with today's date on each write
- Do not modify any non-`_index.md` files in this skill
