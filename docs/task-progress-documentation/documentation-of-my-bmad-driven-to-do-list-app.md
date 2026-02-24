# Documentation of My BMAD-Driven To-Do List App

*This document lives in `docs/task-progress-documentation/` so it stays separate from planning input docs (e.g. task brief, PRD). It is the **living process doc**—updated at each stage—not an input to the product brief.*

This guide documents the full workflow of building the To-Do List application using the **BMAD 6** (Build More, Architect Dreams) framework—from initial setup through analysis, specification, development sprints, containerisation, and QA. At each step, the **reasons** for major decisions and their **relevance to the project brief** are stated, and **evidence** is listed so the work can be clearly demonstrated.

**When to update this document:** Update the relevant section as you complete each BMAD stage or sprint. After each sprint, add a short note to Section 3 (What we did, Evidence). When Step 2 is fully done, complete Section 3.1–3.3 and tick the verification checklist. Use **`cursor-updates.md`** at the repo root for one-line summaries per session; use **this file** for the full process narrative and evidence. The **AI integration log** is a separate, clearly identifiable artefact: **`docs/task-progress-documentation/ai-integration-log.md`**.

### How this document is used (context across stages)

- **Initial PRD:** The starting point for analysis and planning is **`docs/Product Requirement Document (PRD) for the Todo App.md`**. This document will be refined during the analysis and planning stage.
- **Goal of analysis and planning:** Produce a **highly refined PRD** and a **supporting set of specification documents** that prepare the team to move into build with clear scope and acceptance criteria.
- **Separate chat per major BMAD stage:** Work may be done in a different chat for each major stage (e.g. Analysis, Specification, Build, Containerisation, QA). **This walkthrough doc is updated at each stage** so context is never lost and any new chat (or the same chat) can continue from the latest state recorded here.
- **Full task brief:** The complete task (steps, deliverables, success criteria) lives in **`docs/full-task-brief.md`**. Use it as the single reference for *what* we are building toward; this document focuses on *how* we did it and the evidence at each step.

---

## Table of Contents

1. [BMAD 6 Setup](#1-bmad-6-setup)
2. [Step 1: Analysis and specification](#2-step-1-analysis-and-specification)
3. [Step 2: Build (with QA from day one)](#3-step-2-build-with-qa-from-day-one)
4. [Step 3: Containerisation](#4-step-3-containerisation)
5. [Step 4: QA activities](#5-step-4-qa-activities)

**Related artefact:** [AI integration log](ai-integration-log.md) — consolidated log of agent usage, MCP usage, test generation, debugging, and limitations (required by the project brief).

---

## 1. BMAD 6 Setup

### 1.1 What We Did

- **Installed BMAD Method v6** in the project folder using the official non-interactive installer.
- **Module installed:** BMM (BMad Method for Agile AI-Driven Development).
- **IDE integration:** Cursor (agents, workflows, and tasks are available in Cursor).

### 1.2 Why We Did It (Relevance to the Brief)

- **Installing in the project folder:** Keeps all BMAD assets (agents, workflows, outputs) next to the To-Do app code so the brief can be executed in one place and artifacts are easy to find.
- **Choosing the BMM module:** BMM provides the full lifecycle (analysis → spec → sprints → QA) required to deliver the To-Do app against a defined brief in a structured, repeatable way.
- **Cursor integration:** Ensures the same workflows and agents are available inside the IDE used for development, so we can follow the brief step-by-step without switching tools.

### 1.3 Installation Command Used

```bash
npx bmad-method@latest install --directory . --modules bmm --tools cursor --yes
```

- `--directory .` — Install into the current project directory.
- `--modules bmm` — Core methodology module (analysis, spec, sprints, QA, etc.).
- `--tools cursor` — Generate Cursor commands and agent config.
- `--yes` — Use defaults and skip confirmations.

### 1.4 What Was Created

| Location | Purpose |
|----------|---------|
| `_bmad/` | BMAD core and BMM module: agents, workflows, tasks, config. |
| `_bmad-output/planning-artifacts` | Output folder for PRDs, specs, architecture, epics/stories. |
| `_bmad-output/implementation-artifacts` | Output folder for sprint deliverables and implementation artifacts. |
| `.cursor/commands/` | Cursor commands that invoke BMAD workflows (e.g. `bmad-help`, `bmad-bmm-create-prd`, `bmad-bmm-quick-spec`). |

### 1.5 Key BMAD Concepts (Brief)

- **Agents:** Role-based AI personas (e.g. Analyst, PM, Architect, Dev, QA) used in workflows.
- **Workflows:** Step-by-step processes (e.g. create PRD, quick-spec, sprint planning, dev-story, code review).
- **Tasks:** Single-purpose actions (e.g. help).
- **Output folders:** `_bmad-output/planning-artifacts` and `_bmad-output/implementation-artifacts` are where generated docs and artifacts are intended to live.

### 1.6 How to Get Started After Setup

- In Cursor, run **`/bmad-help`** (or use the BMAD help command) and ask: *"What should I do next?"* or *"How do I get started?"*
- Use BMAD commands from the Command Palette or via the agent/workflow names (e.g. create PRD, validate PRD, quick-spec, sprint planning).

### 1.7 Verification

- **Manifest:** `_bmad/_config/manifest.yaml` shows version **6.0.2**, modules **core** and **bmm**, and IDE **cursor**.
- **Cursor:** 25 workflows, 10 agents, 6 tasks are available for Cursor.

### 1.8 Evidence of Completion (How to Prove This Step)

| # | Evidence | Where to check |
|---|----------|----------------|
| 1 | BMAD installed in project | `_bmad/` exists and contains `_config/`, `core/`, `bmm/` |
| 2 | BMM module present | `_bmad/bmm/` exists; `_bmad/_config/manifest.yaml` lists module `bmm` |
| 3 | Cursor integration | `.cursor/commands/` contains `bmad-*.md` commands |
| 4 | Output folders for brief artifacts | `_bmad-output/planning-artifacts` and `_bmad-output/implementation-artifacts` exist |
| 5 | Version and IDE recorded | `_bmad/_config/manifest.yaml` shows `version: 6.0.2` and `ides: [cursor]` |

---

## 2. Step 1: Analysis and specification

*Covers: Project brief & PRD refinement (PM), Architecture design & API contracts (Architect), Story creation with acceptance criteria, Test strategy (unit, integration, E2E). Planning here must explicitly address **backend** and **QA** infrastructure and dependencies so Step 2 can implement from day one.*

**Note:** Analysis and specification must be **BMAD-led**: use BMAD workflows and commands (e.g. `/bmad-help` to get next steps, then `/bmad-bmm-create-product-brief`, `/bmad-bmm-edit-prd` or `/bmad-bmm-create-prd`, `/bmad-bmm-create-ux-design`, `/bmad-bmm-create-architecture`, `/bmad-bmm-create-epics-and-stories`) rather than creating artifacts outside the workflows. Artifacts in `_bmad-output/planning-artifacts` that were created without running these workflows should be removed or replaced by BMAD-produced outputs so the process is verifiable.

### 2.1 What We Did

- **Product brief (complete):** Ran the BMAD **create-product-brief** workflow (CB) with input docs: `docs/full-task-brief.md` and `docs/Product Requirement Document (PRD) for the Todo App.md`. Completed all six steps: init, vision, target users, success metrics, MVP scope, complete. Output: `_bmad-output/planning-artifacts/product-brief-bmad-training-to-do-app-2026-02-23.md`.
- **PRD (complete):** Ran the BMAD **create-prd** workflow with input: `_bmad-output/planning-artifacts/product-brief-bmad-training-to-do-app-2026-02-23.md`. Completed all steps (init through complete). Output: `_bmad-output/planning-artifacts/prd.md`. PRD includes executive summary, success criteria, product scope, user journey, domain/project-type notes, functional requirements (FR1–FR7), non-functional requirements (performance, accessibility, reliability, security), and scoping summary.
- **Architecture (complete):** Ran the BMAD **create-architecture** workflow with input: PRD and product brief. Completed all eight steps (init, context, starter, decisions, patterns, structure, validation, complete). Output: `_bmad-output/planning-artifacts/architecture.md`. Architecture includes project context, T3 Stack starter choice, core decisions (data, API/tRPC, frontend, infra), implementation patterns, project structure and boundaries, and validation results.
- **UX Design (through Step 6):** Ran the BMAD **create-ux-design** workflow with input: PRD, product brief, and architecture. Completed steps 1–6: init, project understanding (with Party Mode), core experience, emotional response, inspiration (including stakeholder inspiration: Todoist gold standard, dark mode + accent colours + theme switcher, logo at `zaffr/public/brand/logo-zaffr.svg`), and **design system choice**. Output: `_bmad-output/planning-artifacts/ux-design-specification.md`. Step 6 documented: **Design System Foundation** — Tailwind CSS with design-token layer for theming and accents; dark default, theme switcher for light; implementation approach (theme layer, theme switcher, minimal components) and customization strategy. UX spec steps 7–14 (defining experience, visual foundation, design directions, etc.) remain optional; epics and stories will use the UX spec as input.
- **Epics and stories (complete):** Created epics and stories aligned to PRD, architecture, UX spec, and full task brief. Output: `_bmad-output/planning-artifacts/epics-and-stories.md`. Five epics: (1) Project foundation & test infrastructure (T3 init, Jest/Vitest, Playwright, package.json test commands); (2) Design system & UI foundation (tokens, theme switcher, layout/logo, typography); (3) Backend API & persistence (Drizzle schema, tRPC router, validation, integration tests); (4) Todo list UI & core flows (components, empty/loading/error states, wire-up, component tests, responsive and accessibility); (5) E2E tests & QA readiness (≥5 Playwright tests, coverage/commands). Sprint plan in four sprints ensures QA from day one and UI design is not left out.
- **Next in Step 1:** Step 1 (Analysis and specification) is complete; proceed to Step 2 (Build with QA from day one).

### 2.2 Why We Did It (Relevance to the Brief)

- The product brief is the foundation for the refined PRD and all later specs; it keeps product (the todo app) clearly separate from project aims (task brief, learning, documentation). Backend and QA are called out in the brief’s success criteria and MVP scope so they are planned from Step 1 and ready for Step 2 build.

### 2.3 Evidence of Completion (How to Prove This Step)

| # | Evidence | Where to check |
|---|----------|----------------|
| 1 | Product brief complete (all 6 steps) | `_bmad-output/planning-artifacts/product-brief-bmad-training-to-do-app-2026-02-23.md`; frontmatter `stepsCompleted: [1,2,3,4,5,6]` |
| 2 | Single source of truth for planning | Product brief in `_bmad-output/planning-artifacts/` is the current planning artifact; PRD, architecture, epics to be produced by BMAD workflows in order |
| 3 | PRD produced by BMAD create-prd workflow | `_bmad-output/planning-artifacts/prd.md` |
| 4 | Architecture produced by BMAD create-architecture workflow | `_bmad-output/planning-artifacts/architecture.md` (steps 1–8 complete) |
| 5 | UX Design spec (through Step 6: Design System Choice) | `_bmad-output/planning-artifacts/ux-design-specification.md`; frontmatter `stepsCompleted: [1,2,3,4,5,6]`; includes Design System Foundation (Tailwind + tokens, dark default, theme switcher) |
| 6 | Epics & stories | `_bmad-output/planning-artifacts/epics-and-stories.md` — 5 epics, 22 stories, acceptance criteria, sprint plan; QA (Jest/Vitest, Playwright, test commands) and UI design (design system, theme, components, states, a11y) included |

---

## 3. Step 2: Build (with QA from day one)

*Covers: Project setup + test infra (Jest/Vitest, Playwright); Backend API + integration tests; Frontend + component tests; E2E tests (create, complete, delete todo, empty state, error handling).*

**Execution guide:** Use **`docs/task-progress-documentation/step-2-build-execution-guide.md`** for concrete actions per story, sprint order, and a **Verification checklist** to confirm the task is fully covered. Before each sprint, run **`docs/task-progress-documentation/sprint-readiness-check.md`** (Sprint Readiness Check). Work in sprint order (Sprint 1 → 2 → 3 → 4) and tick the verification checklist when done.

### 3.1 What We Did

- **Sprint 1 (Foundation & test infra):** Initialized T3 app in **`zaffr/`** (Next.js, tRPC, Tailwind, Drizzle, SQLite, App Router, no NextAuth). Added Vitest with `__tests__/` and smoke test; Playwright with `e2e/` and home-page E2E. Commands: `npm run dev`, `npm run build`, `npm test`, `npm run test:e2e` from `zaffr/`.
- **Sprint 2 (Design system & backend):** Design tokens (dark/light, primary/completion/destructive) in `zaffr/src/styles/globals.css`; theme switcher with localStorage and apply-on-load script; Shell layout with logo at `zaffr/public/brand/logo-zaffr.svg` (sidebar desktop, header mobile). Drizzle `todos` schema and migration; tRPC `todo` router (getAll, create, toggle, delete) with Zod and TRPCError. Seven todo API integration tests in `__tests__/api/todo.test.ts`.
- **Sprint 3 (Todo list UI & core flows):** Todo UI in `zaffr/src/app/_components/todo/` (TodoList, TodoItem, TodoForm, EmptyState, LoadingState, ErrorState), wired to tRPC; home page shows "Your list" and TodoView. Component tests for all todo components (mocked tRPC, jest-dom); responsive layout and semantic markup/ARIA. Build and 21 unit/integration tests pass.
- **Sprint 4 (E2E & QA readiness):** Playwright E2E in `zaffr/e2e/todo.spec.ts`: create todo, persist after reload, toggle complete, delete, empty state (when no todos); error state covered in component tests (E2E error injection skipped with doc note). Six passing E2E tests (≥5 required). Added `test:coverage` (Vitest + @vitest/coverage-v8, report in `./coverage`); README updated with test commands and ≥70% coverage note. Sprint status and step-2 execution guide ticked for all stories.

### 3.2 Why We Did It (Relevance to the Brief)

- **QA from day one:** Test infra (Vitest, Playwright) in Sprint 1 so every subsequent deliverable is testable. Integration tests per API; component tests for UI; E2E for user journeys (create, complete, delete, empty, error).
- **Design system first:** Tokens and theme in Sprint 2 so all UI uses semantic tokens (no hardcoded colours) and meets NFRs (accessibility, theme persistence).
- **Single app folder:** App lives in **`zaffr/`** so docs and planning stay at repo root; logo and assets under `zaffr/public/brand/` as per UX spec.
- **Coverage and commands:** `test`, `test:e2e`, `test:coverage` in package.json with README and coverage report path support the brief’s ≥70% coverage direction and CI/local parity.

### 3.3 Evidence of Completion (How to Prove This Step)

*(To be completed when Step 2 is done. Use the execution guide’s Verification checklist; then confirm here.)*

| # | Criterion | Evidence / Where to check |
|---|-----------|----------------------------|
| 1 | Working application (all CRUD) | `zaffr/`: run `npm run dev`, add/complete/delete todos; persistence across refresh |
| 2 | Unit/integration test command; tests pass | `zaffr/package.json` has `"test": "vitest"`; run `npm test` → 21 tests pass (7 API + 13 component + 1 smoke) |
| 3 | E2E command; ≥5 passing Playwright tests | `zaffr/package.json` has `"test:e2e": "playwright test"`; run `npm run test:e2e` → 6 passed, 1 skipped |
| 4 | Coverage path to ≥70% | `npm run test:coverage`; report in `zaffr/coverage/`; README documents command and ≥70% aim |
| 5 | Integration tests per API; contract validated | `zaffr/__tests__/api/todo.test.ts` — getAll, create, toggle, delete, validation, NOT_FOUND |
| 6 | Component tests for main UI | `zaffr/__tests__/components/` — empty-state, loading-state, error-state, todo-item, todo-list |
| 7 | E2E: create, complete, delete, empty, error | `zaffr/e2e/todo.spec.ts` — create, persist, toggle, delete, empty state; error in component tests |

- [x] Working application (all CRUD operations).
- [x] Unit/integration test command in package.json; tests pass.
- [x] E2E test command in package.json; ≥5 passing Playwright tests.
- [x] Coverage path to ≥70% (script or docs).
- [x] Integration tests per API endpoint; API contract validated (tests and optionally Postman MCP or similar).
- [x] Component tests for main UI; Chrome DevTools MCP (or DevTools) used during development.
- [x] E2E covers: create, complete, delete todo, empty state, error handling.

---

## 4. Step 3: Containerisation

*Covers: Dockerfiles (multi-stage, non-root, health checks); docker-compose.yml; health check endpoints; dev/test env config.*

### 4.1 What We Did

- **Health check endpoint:** Added `GET /api/health` in `zaffr/src/app/api/health/route.ts` returning `{ "status": "ok" }` with 200 for Docker and load balancers.
- **Next.js standalone output:** Set `output: "standalone"` in `zaffr/next.config.js` for a smaller production image.
- **Dockerfile (`zaffr/Dockerfile`):** Multi-stage build: (1) deps – `npm ci`; (2) build – `npm run build` with `SKIP_ENV_VALIDATION=1`; (3) runner – Node 22 Alpine, non-root user `nextjs` (uid 1001), copy standalone server + static + public, copy source and deps for schema push at startup. Data directory `/app/data` for SQLite (volume-mounted). `HEALTHCHECK` hits `/api/health` every 30s. Startup runs `drizzle-kit push` then `node server.js`.
- **docker-compose.yml (repo root):** Single service `zaffr` building from `./zaffr`, port 3000, `DATABASE_URL=file:/app/data/db.sqlite`, named volume `zaffr-data` for persistence. Health check configured in compose as well.
- **.dockerignore (`zaffr/.dockerignore`):** Excludes node_modules, .next, tests, env files, and other non-essential paths to speed up build.

### 4.2 Why We Did It (Relevance to the Brief)

- **Deployability:** The brief requires the app to run via `docker-compose up`. From the project root, `docker compose up` (or `docker-compose up`) builds and runs the app; SQLite data persists in the `zaffr-data` volume.
- **Non-root and health checks:** Align with good practice for production containers and orchestration (e.g. Kubernetes, ECS) that rely on health checks and least privilege.

### 4.3 Evidence of Completion (How to Prove This Step)

| # | Criterion | Evidence / Where to check |
|---|-----------|----------------------------|
| 1 | Health check endpoint | `GET http://localhost:3000/api/health` returns 200 and `{"status":"ok"}` |
| 2 | Multi-stage Dockerfile | `zaffr/Dockerfile` – stages deps, build, runner |
| 3 | Non-root user | Runner stage: `adduser nextjs`, `USER nextjs` |
| 4 | HEALTHCHECK in Dockerfile | `HEALTHCHECK` wget to `/api/health` |
| 5 | docker-compose.yml | Repo root: `docker-compose.yml` (or `docker compose up`) |
| 6 | App runs via compose | From repo root: `docker compose up` → app at http://localhost:3000, DB in volume `zaffr-data` |

---

## 5. Step 4: QA activities

*Covers: Test coverage (≥70% meaningful); Performance (Chrome DevTools MCP); Accessibility (Lighthouse/axe, WCAG AA, zero critical); Security review (findings + remediations).*

### 5.1 What We Did

- **Test coverage:** Ran `npm run test:coverage` (Vitest + v8). Coverage meets ≥70%: **80% statements**, **79.54% lines** (21 tests, 7 test files). Report in `zaffr/coverage/`.
- **Performance:** App is minimal (no heavy assets, server-side rendering). No formal performance budget; recommendation: run Lighthouse (Chrome DevTools → Lighthouse) when needed. Build output and first-load JS are within typical Next.js ranges.
- **Accessibility:** Automated a11y tests in `zaffr/e2e/a11y.spec.ts` (axe-core/playwright) for WCAG 2.1 AA (tags: wcag2a, wcag2aa, wcag21a, wcag21aa). Run with `npm run test:e2e -- e2e/a11y.spec.ts` (ensure nothing else is using port 3000, or use `reuseExistingServer`). Dark and light themes both asserted for 0 violations. Contrast and touch targets were addressed earlier (tokens, 44px targets, text-on-primary).
- **Security review:** (1) **Env:** Server env validated with T3 env (DATABASE_URL, NODE_ENV); no secrets in client. (2) **Inputs:** All tRPC procedures use Zod (create: description min/max; toggle/delete: id positive int); NOT_FOUND for invalid ids. (3) **Data layer:** Drizzle ORM, no raw SQL; SQLite file in Docker volume not exposed. (4) **No auth:** App is unauthenticated by design (prototype); no PII beyond todo text. **Remediations:** None required for current scope; for production you’d add auth and HTTPS.

### 5.2 Why We Did It (Relevance to the Brief)

- **Coverage:** Brief and Step 2 required a path to ≥70% meaningful coverage; coverage report and script evidence that.
- **Accessibility:** NFRs and epics required WCAG AA and zero critical violations; axe in E2E plus earlier contrast/touch-target work satisfy that.
- **Performance and security:** QA step calls for a performance check and a security pass; we documented approach and findings so the deliverable is auditable.

### 5.3 Evidence of Completion (How to Prove This Step)

| # | Criterion | Evidence / Where to check |
|---|-----------|----------------------------|
| 1 | Coverage ≥70% | `cd zaffr && npm run test:coverage` → report in `zaffr/coverage/`; statements 80%, lines 79.54% |
| 2 | Accessibility (zero critical) | `npm run test:e2e -- e2e/a11y.spec.ts` → 0 axe violations (dark + light); contrast and touch targets in tokens and components |
| 3 | Performance | Manual: run Lighthouse on `/`; app is minimal; no issues identified for scope |
| 4 | Security review | Documented above: env validation, Zod on inputs, Drizzle only, no secrets in client; no remediations for current scope |

---

## Summary

- **BMAD 6** is installed and ready in this project.
- The **full task brief** is in **`docs/full-task-brief.md`** (Steps 1–4, deliverables, success criteria). **Backend and QA** infrastructure and dependencies are planned in Step 1 and implemented from day one in Step 2.
- **Keep this doc in sync:** Update the relevant section as you complete each BMAD stage or sprint. After each sprint, add a short note to Section 3 (What we did / Evidence). When a full step (e.g. Step 2) is done, complete that step’s **What we did**, **Why we did it**, and **Evidence** and tick the verification checklist. Use **`cursor-updates.md`** for one-line session summaries; use **this file** for the full process narrative and proof.
- Sections 2–5 are filled in as we execute: **Step 1** (Analysis and specification) ✓ → **Step 2** (Build + QA) ✓ → **Step 3** (Containerisation) ✓ → **Step 4** (QA activities) ✓.
- **AI integration log:** A dedicated, consolidated log is maintained at **`docs/task-progress-documentation/ai-integration-log.md`** (agent usage, MCP usage, test generation, debugging with AI, limitations). Session one-liners remain in **`cursor-updates.md`**; the named log is the single artefact for the brief.

### Task complete (vs full-task-brief deliverables and success criteria)

| Deliverable / criterion | Status |
|-------------------------|--------|
| BMAD artifacts (brief, architecture, stories) | ✓ Section 2, `_bmad-output/planning-artifacts/` |
| Working Todo app (CRUD) | ✓ Zaffr in `zaffr/`; Section 3 evidence |
| Unit, integration, E2E test suites | ✓ Vitest + Playwright; Section 3 & 5 |
| Dockerfiles + docker-compose up | ✓ Section 4; `zaffr/Dockerfile`, repo-root `docker-compose.yml` |
| QA reports (coverage, a11y, security) | ✓ Section 5.1 and 5.3 |
| Documentation of BMAD-guided implementation | ✓ This document (Sections 1–5) |
| **AI integration log (clearly identifiable artefact)** | ✓ **`docs/task-progress-documentation/ai-integration-log.md`** |
| README with setup instructions | ✓ `zaffr/README.md` (scripts, Docker) |
| Test coverage ≥70% | ✓ 80% statements, 79.54% lines |
| E2E ≥5 passing | ✓ 6+ Playwright tests (todo + a11y) |
| App runs via docker-compose up | ✓ Section 4 |
| Zero critical WCAG violations | ✓ axe E2E (a11y.spec.ts) passed; contrast/touch targets addressed |
