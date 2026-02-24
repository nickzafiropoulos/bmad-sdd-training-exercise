# Step 2: Build — Execution Guide

This guide helps you **cover the task properly** by tying each task requirement to concrete actions and a verification checklist. Use it alongside `_bmad-output/planning-artifacts/epics-and-stories.md`.

**Sprint readiness:** Before starting each sprint, run the **Sprint Readiness Check** in `docs/task-progress-documentation/sprint-readiness-check.md` to confirm prerequisites are met.

**Sprint Planning:** Before **every** sprint, run **Sprint Planning** so `_bmad-output/implementation-artifacts/sprint-status.yaml` is up to date (see Sprint Readiness Check). Use **`/bmad-bmm-sprint-planning`** or keep `sprint-status.yaml` in sync manually.

---

## How to use this guide

1. **Before each sprint:** Run **Sprint Planning** (or update `sprint-status.yaml`); then run the **Sprint Readiness Check** for that sprint.
2. Work in **sprint order** (Sprint 1 → 2 → 3 → 4). Before each sprint, run that sprint’s readiness check.
3. For each story, do the **Concrete actions** then tick **Done** when acceptance criteria are met.
4. Run the **Verification checklist** at the end of Step 2 to confirm the task is fully covered.
5. Update `documentation-of-my-bmad-driven-to-do-list-app.md` Section 3 (What we did, Evidence) as you complete work.

---

## Sprint 1: Foundation & test infrastructure

**Covers task:** Project setup (structure + Jest/Vitest + Playwright + package.json).

### Story 1.1 — Initialize T3 Stack project

| Done | Concrete actions |
|------|------------------|
| ☑ | Create the app. From **parent** of your project dir (or a new folder): `pnpm dlx create-t3-app@latest zaffr --CI --trpc --tailwind --drizzle --dbProvider sqlite --appRouter` (omit `--noInstall` to install deps). Do **not** add `--nextAuth`. If you already have this repo with docs/planning, create in a subfolder (e.g. `zaffr`) then move app files to repo root if you want a single root, or work from `zaffr/` as app root. |
| ☑ | Confirm structure: `src/app` (frontend), `src/server` (backend), and a place for tests (you’ll add `__tests__`/`e2e` in 1.2/1.3). Add `.env.example` with `DATABASE_URL` (and any other required vars); no secrets in repo. |
| ☑ | Run `pnpm dev` and `pnpm build` to verify. |

### Story 1.2 — Set up Jest or Vitest

| Done | Concrete actions |
|------|------------------|
| ☑ | Install and configure Vitest (or Jest) for TypeScript/Next.js/tRPC (e.g. `pnpm add -D vitest @vitejs/plugin-react` and vitest config, or Jest with next-jest). |
| ☑ | Add to **package.json**: `"test": "vitest"` (or `"test": "jest"`). |
| ☑ | Create test folder structure (e.g. `__tests__/` or co-located `*.test.ts`/`*.test.tsx`) and add one passing smoke test. Run `pnpm test`. |

### Story 1.3 — Set up Playwright for E2E

| Done | Concrete actions |
|------|------------------|
| ☑ | Install Playwright: `pnpm add -D @playwright/test` and `pnpm exec playwright install` (browsers). |
| ☑ | Add **playwright.config.ts** (e.g. in project root or `e2e/`) with `baseURL` pointing at your app (e.g. `http://localhost:3000`). |
| ☑ | Add to **package.json**: `"test:e2e": "playwright test"`. |
| ☑ | Add one smoke E2E test (e.g. page loads or visit `/`). Run `pnpm test:e2e` (with app running or configured for CI). |

---

## Sprint 2: Design system & backend

**Covers task:** Backend (API + integration tests, Postman MCP or similar); UI foundation (design system).

### Stories 2.1–2.4 — Design system & UI foundation

| Done | Concrete actions |
|------|------------------|
| ☑ | **2.1** Define design tokens / Tailwind theme: dark default, light alternate, accent set (primary, completion, destructive). No hardcoded colours in components. |
| ☑ | **2.2** Add theme switcher (dark/light), persist (e.g. localStorage), apply on load. |
| ☑ | **2.3** Layout/shell: logo at `zaffr/public/brand/logo-zaffr.svg` (reference in app as `/brand/logo-zaffr.svg`); desktop sidebar / mobile header. |
| ☑ | **2.4** Typography and spacing via tokens; list-first hierarchy, responsive. |

### Stories 3.1–3.3 — Backend API & persistence

| Done | Concrete actions |
|------|------------------|
| ☑ | **3.1** Drizzle schema: `todos` table (`id`, `description`, `completed`, `created_at`). Create and run initial migration; document `npm run db:migrate` or `npm run db:push` (in zaffr: push applies schema; migrate runs drizzle/*.sql). |
| ☑ | **3.2** tRPC router `todo`: `getAll`, `create` (`{ description }`), `toggle` (`{ id }`), `delete` (`{ id }`). Wire to Drizzle; camelCase in API. |
| ☑ | **3.3** Input validation (e.g. Zod) for create; TRPCError for not-found and server errors; consistent error shape. |

### Story 3.4 — Integration tests + API contract

| Done | Concrete actions |
|------|------------------|
| ☑ | Write integration tests for `getAll` (empty + with data), `create`, `toggle`, `delete`. Run with `npm test`. |
| ☐ | Optionally validate API contract with **Postman MCP or similar** (request/response shape, errors). |

---

## Sprint 3: Todo list UI & core flows

**Covers task:** Frontend (UI + component tests; Chrome DevTools MCP for debug).

### Stories 4.1–4.5 — Todo UI and states

| Done | Concrete actions |
|------|------------------|
| ☑ | **4.1** Implement `TodoList`, `TodoItem`, `TodoForm`; use tRPC; semantic markup; design tokens only. |
| ☑ | **4.2** Empty state: clear copy + CTA (e.g. “Add your first todo”). |
| ☑ | **4.3** Loading state (skeleton or spinner) while `todo.getAll` loads. |
| ☑ | **4.4** Single error state: one message + one suggested action (e.g. retry). |
| ☑ | **4.5** Wire list + create/complete/delete to tRPC; instant feedback; persistence across refresh. |
| ☑ | Use **Chrome DevTools MCP** (or DevTools) to debug and inspect as you build. |

### Story 4.6 — Component tests

| Done | Concrete actions |
|------|------------------|
| ☑ | Add component/unit tests for TodoList, TodoItem, TodoForm, EmptyState, LoadingState, ErrorState (mocked tRPC where needed). Run `pnpm test`. |

### Story 4.7 — Responsive & accessibility

| Done | Concrete actions |
|------|------------------|
| ☑ | Responsive layout; keyboard-operable core flows; semantic markup/ARIA; aim for zero critical WCAG issues (validate with Lighthouse/axe later). |

---

## Sprint 4: E2E & QA readiness

**Covers task:** E2E tests (Playwright MCP / Playwright); test commands and coverage.

### Stories 5.1–5.4 — E2E tests

| Done | Concrete actions |
|------|------------------|
| ☑ | **5.1** E2E: create todo, assert it appears (and optionally persists after reload). |
| ☑ | **5.2** E2E: toggle complete, assert state change. |
| ☑ | **5.3** E2E: delete todo, assert removal (and optionally does not reappear). |
| ☑ | **5.4** E2E: empty state (clear CTA); error handling (trigger error, assert one message/suggested action). |
| ☑ | Use **Playwright** (or Playwright MCP) to automate. Ensure **≥5 passing** E2E tests in total. Run `pnpm test:e2e`. |

### Story 5.5 — Test commands & coverage

| Done | Concrete actions |
|------|------------------|
| ☑ | **package.json** has `test` (unit/integration) and `test:e2e`. Add `test:coverage` (or coverage flag) for unit/integration; document path to ≥70% coverage. Update README with how to run tests. |

---

## Verification checklist — “Task covered”

Use this to confirm you’ve met the task requirements.

### Project setup

| ☐ | Project structure has clear frontend, backend, and test areas. |
| ☐ | Jest or Vitest configured; `pnpm test` runs unit/integration tests. |
| ☐ | Playwright configured; `pnpm test:e2e` runs E2E tests. |
| ☐ | Test commands are in **package.json** (`test`, `test:e2e`). |

### Backend

| ☐ | API supports CRUD on todos (endpoints, validation, error handling per BMAD specs). |
| ☐ | Integration tests exist for each API endpoint. |
| ☐ | API contract validated (by tests and optionally Postman MCP or similar). |

### Frontend

| ☐ | UI for todo management built from BMAD/UX specs (components and state). |
| ☐ | Component tests written as you built; Chrome DevTools MCP (or DevTools) used to debug/inspect. |

### E2E tests

| ☐ | E2E tests cover: create todo, complete todo, delete todo, empty state, error handling. |
| ☐ | Playwright (or Playwright MCP) used to automate. |
| ☐ | **At least 5 passing** Playwright tests. |

### Success criteria (from full task brief)

| ☐ | Working app; all CRUD operations work. |
| ☐ | Unit, integration, and E2E suites run. |
| ☐ | Coverage path to ≥70% documented or scripted. |
| ☐ | Zero critical WCAG violations (validate in Step 4 if needed). |

When all boxes are ticked, Step 2 is complete and the task is covered. Then document **What we did** and **Evidence** in `documentation-of-my-bmad-driven-to-do-list-app.md` Section 3.
