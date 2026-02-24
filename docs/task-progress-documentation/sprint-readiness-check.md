# Sprint Readiness Check

Run this **before starting each sprint** to confirm prerequisites are met and nothing is blocking. Use with `step-2-build-execution-guide.md` and `_bmad-output/planning-artifacts/epics-and-stories.md`.

---

## Sprint Planning (every sprint)

**Before every sprint**, run **Sprint Planning** so implementation status is tracked in one place:

| ☑ | **Sprint Planning run** — Run **`/bmad-bmm-sprint-planning`** (or the BMAD Sprint Planning workflow). This reads `_bmad-output/planning-artifacts/*epic*.md` (e.g. `epics-and-stories.md`) and writes **`_bmad-output/implementation-artifacts/sprint-status.yaml`** with all epics and stories and their status. If you prefer not to run the workflow, keep `sprint-status.yaml` updated manually so it reflects completed work and the next story in line. |

This step ensures Create Story / Dev Story workflows (if used later) and status checks have a single source of truth. See `_bmad-output/implementation-artifacts/README.md` for what goes in that folder.

---

## When to use

- **Before Sprint 1:** Confirm Step 1 (Analysis & specification) is complete and you’re ready to build.
- **Before Sprints 2, 3, 4:** Confirm the previous sprint is done and deliverables are in place so the next sprint can start cleanly.

---

## Before Sprint 1 (Foundation & test infrastructure)

**Goal:** Ready to initialize the T3 app and set up test tooling.

| ☐ | **Planning complete** — PRD, architecture, UX spec, and epics & stories exist and are agreed. |
| ☐ | **Artifacts in place** — `_bmad-output/planning-artifacts/` contains: `prd.md`, `architecture.md`, `ux-design-specification.md`, `epics-and-stories.md`. |
| ☐ | **Step 1 signed off** — Product brief, PRD, architecture, UX (through design system), epics/stories are complete per `documentation-of-my-bmad-driven-to-do-list-app.md` Section 2. |
| ☐ | **Environment** — Node/pnpm (or npm/yarn) available; you can run `pnpm dlx create-t3-app@latest ...` (or equivalent). |
| ☐ | **Repo decision** — You know where the app will live (new folder like `zaffr`, or current repo with app in subfolder/root). |

**If all are ticked:** Start Sprint 1 (Stories 1.1, 1.2, 1.3).

---

## Before Sprint 2 (Design system & backend)

**Goal:** Ready to add design tokens, theme, layout, and the todo API.

| ☑ | **Sprint 1 done** — T3 app exists; `npm run dev` and `npm run build` succeed. |
| ☑ | **Test infra** — `npm test` runs (Vitest); `npm run test:e2e` runs (Playwright); both commands are in `package.json`. |
| ☑ | **Structure** — Clear separation of frontend (`src/app`), backend (`src/server`), and test dirs (`__tests__`/`e2e`). |
| ☑ | **No blocking issues** — No known showstoppers from Sprint 1 (e.g. broken build or missing deps). |

**If all are ticked:** Start Sprint 2 (Stories 2.1–2.4, 3.1–3.4).

---

## Before Sprint 3 (Todo list UI & core flows)

**Goal:** Ready to build todo UI components and wire them to the API.

| ☑ | **Sprint 2 done** — Design system (tokens, theme switcher, layout/logo) and backend (Drizzle schema, tRPC todo router, validation) are in place. |
| ☑ | **API works** — `todo.getAll`, `todo.create`, `todo.toggle`, `todo.delete` are callable (e.g. from app or tests). |
| ☑ | **Integration tests** — Todo API has integration tests; they pass with `npm test`. |
| ☑ | **Design tokens** — Components can use theme tokens; no hardcoded colours for new work. |

**If all are ticked:** Start Sprint 3 (Stories 4.1–4.5, 4.6, 4.7).

---

## Before Sprint 4 (E2E & QA readiness)

**Goal:** Ready to add E2E tests and lock in test commands and coverage.

| ☑ | **Sprint 3 done** — Todo list UI is implemented: list, item, form, empty/loading/error states, wired to tRPC. |
| ☑ | **Component tests** — TodoList, TodoItem, TodoForm, and state views have component/unit tests; they pass. |
| ☑ | **App is testable** — App runs reliably; core flows (add, complete, delete) work in the browser so E2E can target them. |
| ☑ | **Playwright** — `pnpm test:e2e` runs; you can add and run E2E specs against the app. |

**If all are ticked:** Start Sprint 4 (Stories 5.1–5.5).

---

## Quick reference

| Sprint | Focus | Readiness in one line |
|--------|--------|------------------------|
| **1** | Project + test infra | Planning done; env ready; know where app lives. |
| **2** | Design system + backend | T3 app + test commands work; structure clear. |
| **3** | Todo UI + component tests | API + design system done; integration tests pass. |
| **4** | E2E + coverage | Full UI + component tests; app stable for E2E. |

After Sprint 4, run the **Verification checklist** in `step-2-build-execution-guide.md` to confirm the full task is covered.
