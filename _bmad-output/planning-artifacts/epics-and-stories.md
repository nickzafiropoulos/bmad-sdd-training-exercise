---
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - docs/full-task-brief.md
workflowType: epics-and-stories
project_name: Zaffr
date: '2026-02-24'
status: complete
---

# Epics and Stories — Zaffr

This document defines epics and stories for the Zaffr Todo application. It aligns with the PRD (FR1–FR7, NFRs), architecture, UX design specification, and full task brief. **QA (test infrastructure and test scenarios) and UI design are first-class:** test setup is in Sprint 1; design system and UI components have dedicated epics and stories.

---

## Epic 1: Project foundation & test infrastructure

**Goal:** Initialize the application and set up test infrastructure from day one so all subsequent work is testable.

**QA integration:** Set up test infrastructure immediately: **Jest/Vitest** for unit (and integration) tests, **Playwright** for E2E tests. Configure test commands in **package.json** (Stories 1.2, 1.3, 5.5).

### Story 1.1: Initialize T3 Stack project

**As a** developer  
**I want** the project initialized with create-t3-app (Next.js, tRPC, Drizzle, Tailwind, SQLite, App Router, no auth)  
**So that** we have a single codebase for frontend, API, and DB ready for implementation.

**Acceptance criteria:**
- [ ] Project created with `pnpm dlx create-t3-app@latest` (or equivalent) with options: `--trpc --tailwind --drizzle --dbProvider sqlite --appRouter` and no NextAuth.
- [ ] **Project structure** clearly separates **frontend** (e.g. `src/app`), **backend** (e.g. `src/server`), and **tests** (e.g. `__tests__`/co-located for unit/integration, `e2e/` for E2E per architecture).
- [ ] `src/app`, `src/server`, Drizzle config and folder structure match architecture.
- [ ] Dev server runs with `pnpm dev` (or npm/yarn); build runs with `pnpm build`.
- [ ] `.env.example` exists with required vars (e.g. DATABASE_URL); no secrets in repo.

**References:** Architecture (Starter Template, Project Structure). Task: "Create appropriate structure for frontend, backend, and tests."

---

### Story 1.2: Set up Jest or Vitest for unit and integration tests

**As a** developer  
**I want** Jest or Vitest configured for unit and integration tests  
**So that** we can run and maintain unit/integration tests from day one.

**Acceptance criteria:**
- [ ] Jest or Vitest is installed and configured for the project (TypeScript, Next.js/tRPC compatible).
- [ ] Test command is defined in `package.json` (e.g. `"test": "vitest"` or `"test": "jest"`).
- [ ] At least one placeholder or smoke test runs successfully (e.g. trivial test in `__tests__` or co-located).
- [ ] Test folder structure is documented (e.g. `__tests__/` or co-located `*.test.ts`/`*.test.tsx` for unit/integration per architecture).

**References:** Full task brief (Jest/Vitest for unit tests); architecture (Testing Framework, Structure Patterns).

---

### Story 1.3: Set up Playwright for E2E tests

**As a** developer  
**I want** Playwright configured for end-to-end tests  
**So that** we can run E2E tests for user journeys (create, complete, delete, empty state, error handling).

**Acceptance criteria:**
- [ ] Playwright is installed and configured (e.g. `e2e/` or `tests/e2e/`, `playwright.config.ts`).
- [ ] E2E test command is defined in `package.json` (e.g. `"test:e2e": "playwright test"`).
- [ ] At least one smoke E2E test runs (e.g. page loads or navigates to app root).
- [ ] Config targets app URL (e.g. dev server or baseURL) so CI/local can run E2E.

**References:** Full task brief (Playwright for E2E; ≥5 passing Playwright tests); architecture (e2e/ folder).

---

## Epic 2: Design system & UI foundation

**Goal:** Implement the UX design specification so all UI is consistent, themeable, and accessible. UI design is not an afterthought: tokens, theme, layout, and logo are built before feature UI.

**References:** UX design specification (Design System Foundation, Stakeholder UX/UI Inspiration, Trickle-Down to Epics and Stories).

### Story 2.1: Design tokens and Tailwind theme (dark default, accents)

**As a** user  
**I want** a consistent, dark-first visual system with clear accents for actions and states  
**So that** the app feels cohesive and hierarchy is clear (Todoist-level simplicity).

**Acceptance criteria:**
- [ ] Design tokens (or Tailwind `theme` extension) define: background (dark default, light alternate), text, borders, and accent set (primary action, completion, destructive, optional status).
- [ ] No hardcoded colours in components; all UI colours use tokens (per design system rules).
- [ ] Default theme is dark (deep charcoal/black background, light text); accent colours used for primary action and key states.
- [ ] New components can use tokens so they respect theme automatically.

**References:** UX spec (Theme layer, Customization Strategy, Dark first); PRD NFR (accessibility).

---

### Story 2.2: Theme switcher (dark / light) with persistence

**As a** user  
**I want** to switch between dark and light mode and have my choice remembered  
**So that** I can use the app in my preferred theme across sessions.

**Acceptance criteria:**
- [ ] A theme switcher control is available in the UI (e.g. header or layout).
- [ ] Toggling switches between dark and light theme; tokens drive all colours.
- [ ] User preference is persisted (e.g. localStorage) and applied on next load.
- [ ] Logo and components respect the active theme (e.g. logo fill for light/dark if needed).

**References:** UX spec (Theme switcher; Stakeholder: theme switcher for light).

---

### Story 2.3: Layout shell and logo placement

**As a** user  
**I want** a clear layout with recognizable branding  
**So that** the app feels intentional and I know where I am.

**Acceptance criteria:**
- [ ] Layout/shell component exists; desktop: logo in sidebar (e.g. top); mobile: logo in header (e.g. left).
- [ ] Logo asset used: `zaffr/public/brand/logo-zaffr.svg` (reference in app as `/brand/logo-zaffr.svg`).
- [ ] Logo scales for container and respects theme (e.g. invert or swap fill for light mode if needed).
- [ ] List-first layout: main content area is the primary view; minimal chrome.

**References:** UX spec (Branding: Logo; Layout; List first).

---

### Story 2.4: Base typography and spacing (tokens, list-first hierarchy)

**As a** user  
**I want** readable typography and consistent spacing  
**So that** the list and actions are easy to scan and use.

**Acceptance criteria:**
- [ ] Typography and spacing use design tokens (or Tailwind theme); no one-off magic numbers in components.
- [ ] Hierarchy supports list-first experience (clear heading/list/item distinction).
- [ ] Responsive: layout and spacing work on desktop and mobile.

**References:** UX spec (Design System Foundation); NFR-P1 (responsive).

---

## Epic 3: Backend API & persistence

**Goal:** Implement durable todo storage and a well-defined API (tRPC) so the frontend can perform CRUD with clear contracts. Integration tests validate API behaviour.

**QA integration:** Write integration tests for each API endpoint as you build (Story 3.4). Use **Postman MCP or similar** to validate API contracts (request/response shape, errors).

**References:** PRD FR2, FR3, FR4, FR5, FR6; architecture (Data Architecture, API & Communication Patterns). Task: "Write integration tests for each API endpoint; use Postman MCP or similar to validate API contracts."

### Story 3.1: Drizzle todo schema and initial migration

**As a** developer  
**I want** a single `todos` table with id, description, completed, created_at  
**So that** todo data is persisted and queryable.

**Acceptance criteria:**
- [ ] Drizzle schema defines `todos` table; columns: `id` (PK), `description`, `completed`, `created_at` (snake_case per architecture).
- [ ] Initial migration is created and applied; DB can be reset/migrated via project command (e.g. `pnpm db:migrate` or similar).
- [ ] No other tables required for MVP.

**References:** Architecture (Data Architecture, Naming Patterns).

---

### Story 3.2: tRPC todo router (getAll, create, toggle, delete)

**As a** developer  
**I want** tRPC procedures for all todo CRUD operations  
**So that** the frontend has a type-safe, well-defined API.

**Acceptance criteria:**
- [ ] Router `todo` with procedures: `getAll`, `create` (input `{ description }`), `toggle` (input `{ id }`), `delete` (input `{ id }`).
- [ ] Procedures use Drizzle for reads/writes; responses return domain objects (e.g. `Todo[]`, `Todo`) with camelCase for API (e.g. `createdAt`).
- [ ] Root router includes todo router; client can call `todo.getAll`, etc.

**References:** Architecture (API & Communication Patterns, Format Patterns).

---

### Story 3.3: API input validation and error handling

**As a** user  
**I want** invalid inputs and server errors to be handled consistently  
**So that** I see clear feedback and the app never fails silently.

**Acceptance criteria:**
- [ ] Create input validated (e.g. description length/type via Zod or tRPC validator); invalid input returns BAD_REQUEST with safe message.
- [ ] Not-found and server errors use TRPCError with appropriate codes (e.g. NOT_FOUND, INTERNAL_SERVER_ERROR); messages safe for client.
- [ ] Error shape is consistent so frontend and tests can rely on it.

**References:** Architecture (Process Patterns, Error handling); NFR-R2, NFR-S1.

---

### Story 3.4: Integration tests for todo API

**As a** developer  
**I want** integration tests for the todo tRPC procedures  
**So that** we maintain API contract and behaviour as we change code.

**Acceptance criteria:**
- [ ] Integration tests cover: getAll (empty and with data), create, toggle, delete.
- [ ] Tests run with the project unit/integration test command (Jest/Vitest).
- [ ] Tests use in-memory or test DB where appropriate; no dependency on running dev server for these tests.
- [ ] API contract (request/response shape, errors) is validated by these tests; optionally validate with **Postman MCP or similar** (e.g. manual or automated contract checks) as part of build.

**References:** Full task brief (integration tests per endpoint; "Postman MCP or similar to validate API contracts"); architecture (Implementation Sequence).

---

## Epic 4: Todo list UI & core user flows

**Goal:** Implement the main todo list experience: list display, create, complete, delete, and all required states (empty, loading, error). UI follows the design system and UX spec; components are tested and accessible.

**QA integration:** Write component tests as you build (Story 4.6). Use **Chrome DevTools MCP** (or browser DevTools) to debug and inspect during development.

**References:** PRD FR1–FR7; UX spec (Core User Experience, UX Pattern Analysis, Empty/Loading/Error). Task: "Write component tests as you build; use Chrome DevTools MCP to debug and inspect."

### Story 4.1: TodoList, TodoItem, TodoForm components (structure and semantics)

**As a** user  
**I want** a clear list of todos with an obvious way to add and manage items  
**So that** I can use the app without instructions.

**Acceptance criteria:**
- [ ] `TodoList` uses tRPC `todo.getAll` and renders list or delegates to Empty/Loading/Error as appropriate.
- [ ] `TodoItem` displays description, completion status, and controls for toggle and delete; semantic markup (e.g. list item, checkbox, button).
- [ ] `TodoForm` provides input and submit for creating a todo; uses tRPC `todo.create` and invalidates list on success.
- [ ] All components use design tokens only (no hardcoded colours); align with Todoist-level simplicity and hierarchy.

**References:** Architecture (Project Structure, Component boundaries); UX spec (Inline actions, One action one result).

---

### Story 4.2: Empty state with clear CTA

**As a** user  
**I want** when there are no todos, to see a clear empty state and an obvious way to add the first todo  
**So that** I never wonder what to do next.

**Acceptance criteria:**
- [ ] When list is empty (and not loading/error), an Empty state is shown.
- [ ] Copy explains no items and what to do next (e.g. "No todos yet" / "Add your first todo").
- [ ] Add action is visible or one click away (e.g. visible input or prominent CTA in empty state).
- [ ] Matches UX spec: "One clear CTA in empty state"; avoid unclear or broken-looking empty screen.

**References:** FR1.2; UX spec (Empty state as entry point, Anti-Patterns).

---

### Story 4.3: Loading state

**As a** user  
**I want** to see a loading state while the list is being fetched  
**So that** I know the app is working and not broken.

**Acceptance criteria:**
- [ ] While `todo.getAll` is loading, a dedicated loading UI is shown (skeleton or spinner).
- [ ] No silent loading (no blank or stale content without indication).
- [ ] Loading state uses design tokens and fits layout.

**References:** FR1.3; UX spec (Explicit loading).

---

### Story 4.4: Error state (one message, one suggested action)

**As a** user  
**I want** when something goes wrong, to see one clear error message and a suggested next step  
**So that** I am not confused or left without guidance.

**Acceptance criteria:**
- [ ] When list fetch or a mutation fails, a single error state is shown (no multiple or vague messages).
- [ ] Copy explains what went wrong and suggests next step (e.g. "Couldn't load your list. Check your connection and try again." or retry).
- [ ] Matches UX spec and NFR-R2: clear error state when backend/network fails.

**References:** FR1.4; NFR-R2; UX spec (Error copy that explains and suggests next step).

---

### Story 4.5: Wire list display and create/complete/delete to tRPC with instant feedback

**As a** user  
**I want** every action to feel instant and to see the list update correctly  
**So that** I trust the app and can rely on it.

**Acceptance criteria:**
- [ ] List displays data from `todo.getAll`; create invalidates/refetches so new item appears; toggle and delete update list and persist.
- [ ] Instant feedback on create, complete, delete (e.g. optimistic update or fast refetch); buttons/inputs show loading/disabled during mutation to avoid double submit.
- [ ] Data persists across refresh and sessions (FR6.2).

**References:** FR2.3, FR4.2, FR5.2, FR7.1; architecture (Communication Patterns).

---

### Story 4.6: Component / unit tests for TodoList, TodoItem, TodoForm, and state views

**As a** developer  
**I want** unit or component tests for the main UI components and state views  
**So that** we can refactor safely and maintain behaviour.

**Acceptance criteria:**
- [ ] Tests for TodoList (or list + states), TodoItem, TodoForm, EmptyState, LoadingState, ErrorState as appropriate (e.g. rendered output, key interactions with mocked tRPC).
- [ ] Tests run with the project test command (Jest/Vitest).
- [ ] Tests support movement toward ≥70% meaningful coverage (task brief).

**References:** Full task brief (component tests as we build); architecture (tests in __tests__ or co-located).

---

### Story 4.7: Responsive layout and accessibility (WCAG, keyboard)

**As a** user  
**I want** the app to work on desktop and mobile and to be usable with keyboard and assistive technologies  
**So that** the app is inclusive and meets our quality bar.

**Acceptance criteria:**
- [ ] Layout and components are responsive; usable on desktop and mobile (NFR-P1, FR7.2).
- [ ] Core flows (view list, add, complete, delete) are keyboard operable; focus order and focus management are sensible.
- [ ] Semantic markup and ARIA where needed; zero critical WCAG violations (NFR-A1, NFR-A2).
- [ ] Accessibility can be validated via Lighthouse or axe (e.g. in Playwright or CI later).

**References:** NFR-A1, NFR-A2; UX spec (Accessibility as baseline); full task brief (zero critical WCAG).

---

## Epic 5: E2E tests & QA readiness

**Goal:** Implement end-to-end tests that cover the required user journeys and ensure test commands and coverage direction meet the task brief (≥5 passing Playwright tests, coverage heading toward 70%).

**QA integration:** Use **Playwright** (or Playwright MCP when available) to automate browser interactions. Cover: create todo, complete todo, delete todo, empty state, error handling.

**References:** Full task brief (E2E tests; "Use Playwright MCP to automate browser interactions"; create, complete, delete, empty state, error handling; ≥5 passing Playwright tests).

### Story 5.1: E2E — Create todo

**As a** developer  
**I want** an E2E test that creates a todo and verifies it appears in the list  
**So that** we protect the create flow from regressions.

**Acceptance criteria:**
- [ ] Playwright test: open app, add a todo (via form), assert it appears in the list (and optionally persists after reload).
- [ ] Test is stable and runs with `test:e2e` (or equivalent).

---

### Story 5.2: E2E — Complete (toggle) todo

**As a** developer  
**I want** an E2E test that marks a todo complete and verifies the state  
**So that** we protect the complete flow from regressions.

**Acceptance criteria:**
- [ ] Playwright test: create or start with a todo, toggle complete, assert visual or state change (e.g. completed style or attribute).
- [ ] Test runs with E2E suite.

---

### Story 5.3: E2E — Delete todo

**As a** developer  
**I want** an E2E test that deletes a todo and verifies it is removed  
**So that** we protect the delete flow from regressions.

**Acceptance criteria:**
- [ ] Playwright test: create or start with a todo, delete it, assert it is removed from the list (and optionally does not reappear after reload).
- [ ] Test runs with E2E suite.

---

### Story 5.4: E2E — Empty state and error handling

**As a** developer  
**I want** E2E tests for empty state and error handling  
**So that** we protect these critical states from regressions.

**Acceptance criteria:**
- [ ] At least one test: empty list shows empty state with clear CTA or add affordance.
- [ ] At least one test: error state can be triggered (e.g. by failing API or network) and shows one clear message/suggested action (or document how error E2E is run, e.g. with mock failure).
- [ ] Total E2E tests ≥5 passing (create, complete, delete, empty, error = 5); all run via package.json E2E command.

**References:** Full task brief (E2E: empty state, error handling; minimum 5 passing Playwright tests).

---

### Story 5.5: Test commands and coverage setup in package.json

**As a** developer  
**I want** all test commands and coverage configuration in package.json  
**So that** CI and local dev use a single, documented entry point.

**Acceptance criteria:**
- [ ] `package.json` includes: unit/integration test command (e.g. `test`), E2E command (e.g. `test:e2e`).
- [ ] Coverage can be generated for unit/integration tests (e.g. `test:coverage` or flag); direction toward ≥70% meaningful coverage is documented or scripted.
- [ ] README or docs mention how to run tests and E2E.

**References:** Full task brief (test commands in package.json; 70% coverage).

---

## Sprint plan (high-level ordering)

Stories are ordered so that **test infrastructure is day one**, **design system and UI foundation come before feature UI**, and **E2E closes the loop**. Backend can be built in parallel with design system once project is initialized.

| Sprint | Focus | Stories (recommended order) |
|--------|--------|-----------------------------|
| **Sprint 1** | Foundation & test infra | 1.1, 1.2, 1.3 |
| **Sprint 2** | Design system & backend | 2.1, 2.2, 2.3, 2.4; 3.1, 3.2, 3.3 |
| **Sprint 3** | API tests & todo UI | 3.4; 4.1, 4.2, 4.3, 4.4, 4.5 |
| **Sprint 4** | UI tests, a11y, E2E | 4.6, 4.7; 5.1, 5.2, 5.3, 5.4, 5.5 |

- **Sprint 1** delivers runnable app shell and test commands (unit/integration + E2E) in package.json.
- **Sprint 2** delivers design tokens, theme switcher, layout/logo, and full todo API with integration tests.
- **Sprint 3** delivers full todo list UI (list, item, form, empty/loading/error) wired to API.
- **Sprint 4** delivers component/unit tests, accessibility compliance, and ≥5 passing Playwright E2E tests with coverage/commands documented.

This order keeps **QA integration** and **UI design** explicit in the plan and in the backlog.

---

## Task requirements checklist (Step 2 Build)

Use this section to verify that every task requirement is covered by an epic or story.

| Component | Implementation task | Covered by | QA integration | Covered by |
|-----------|---------------------|------------|----------------|------------|
| **Project setup** | Initialize project structure (frontend, backend, tests) | Story 1.1 (structure criterion + 1.2/1.3 for test dirs) | Jest/Vitest for unit tests, Playwright for E2E; test commands in package.json | Stories 1.2, 1.3, 5.5 |
| **Backend** | API for CRUD on todos; endpoints, validation, error handling per BMAD specs | Stories 3.1, 3.2, 3.3 | Integration tests per endpoint; Postman MCP or similar to validate API contracts | Story 3.4 (+ Epic 3 QA note) |
| **Frontend** | UI for todo management; components and state per BMAD specs | Epic 2 + Stories 4.1–4.5, 4.7 | Component tests as you build; Chrome DevTools MCP to debug/inspect | Story 4.6 (+ Epic 4 QA note) |
| **E2E tests** | E2E tests covering all user journeys from stories | Stories 5.1–5.4 | Playwright MCP to automate; cover create, complete, delete, empty state, error handling | Epic 5 + 5.1–5.4, 5.5 |

All four components and their QA integration are explicitly addressed in the epics and stories above.

---

## Document history

| Date | Change |
|------|--------|
| 2026-02-24 | Epics and stories created; QA (Jest/Vitest, Playwright, package.json) and UI design (design system, theme, components, states, a11y) included. Sprint plan added. |
| 2026-02-24 | Task requirements double-check: added explicit project structure (frontend/backend/tests) in 1.1; Postman MCP or similar in 3.4 and Epic 3; Chrome DevTools MCP in Epic 4; Playwright MCP in Epic 5; added "Task requirements checklist" table mapping each component and QA integration to stories. |
