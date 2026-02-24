---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-bmad-training-to-do-app-2026-02-23.md
workflowType: architecture
project_name: Zaffr
user_name: Nickzafiropoulos
date: '2026-02-23'
lastStep: 8
status: complete
completedAt: '2026-02-23'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

- **FR1 – List display and load:** Single list visible on open; empty, loading, and error states. Architecturally: frontend must support three distinct UI states and a single “list” data load; backend must expose a list-fetch capability.
- **FR2 – Create todo:** New todo with description and metadata (e.g. creation time), persisted via backend. Implies: API create endpoint, client create flow, and shared todo schema (id, description, completed, metadata).
- **FR3 – View todo:** View all items with completion status and metadata. Implies: list + item representation in API and UI.
- **FR4 – Complete todo:** Toggle completion; state persisted. Implies: update/patch endpoint and optimistic or consistent update strategy.
- **FR5 – Delete todo:** Remove item; persisted. Implies: delete endpoint and removal from list.
- **FR6 – Persistence and API:** Backend API for CRUD and durability. Implies: well-defined API contract, persistent store (e.g. DB or file), and no in-memory-only state for the list.
- **FR7 – Experience and feedback:** Instant feedback, responsive UI. Implies: synchronous or fast async handling and responsive layout (no hard desktop-only or mobile-only assumption).

**Non-Functional Requirements:**

- **Performance (NFR-P1, P2):** Fast load and mutations; no blocking delay. Drives: lean API, efficient list fetch, and minimal round-trips.
- **Accessibility (NFR-A1, A2):** Zero critical WCAG violations; keyboard and assistive-tech support. Drives: semantic markup, focus management, and testability (e.g. axe/Lighthouse).
- **Reliability (NFR-R1, R2):** Stability across refresh/sessions; clear error when backend/network fails. Drives: durable storage, error boundaries, and explicit error state in UI and API.
- **Security (NFR-S1, S2):** No secrets in code; safe input handling; API design that does not block future auth. Drives: input validation, no hardcoded credentials, and an API shape that can later accept auth headers.

**Scale & Complexity:**

- **Primary domain:** Full-stack web (SPA frontend + backend API).
- **Complexity level:** Low (single user, single list, CRUD-only, no auth, no real-time).
- **Estimated architectural components:** Frontend app (pages/views, list + item components, state for list/empty/loading/error); backend API (CRUD endpoints, persistence layer); shared contract (todo schema, API shape). Optional: test harnesses (unit, integration, E2E) as first-class architectural concern per task brief.

### Technical Constraints & Dependencies

- **Backend required:** Persistence and durability are required; not a frontend-only or CLI-only app.
- **API contract:** A small, well-defined API for todos (list, create, update completion, delete) must be specified so frontend and backend (and tests) stay aligned.
- **Task brief alignment:** Test strategy (unit, integration, E2E) and tooling (e.g. Jest/Vitest, Playwright) are defined in Step 1 and implemented from day one; architecture should support testability (e.g. API testable in isolation, UI testable via E2E). Later: Docker/containerisation and QA activities (coverage, accessibility, security review) are out of scope for this document but the system must be containerisable and auditable.

### Cross-Cutting Concerns Identified

- **API contract:** Single source of truth for todo resource (fields, endpoints, errors) used by backend, frontend, and integration/E2E tests.
- **State and UI states:** List data, empty vs loading vs error, and per-action feedback must be consistent across components and network failures.
- **Accessibility:** WCAG and keyboard/AT support affect markup, components, and test strategy (e.g. axe in CI or Playwright).
- **Error handling:** Backend and network errors must surface as a clear error state (NFR-R2) without breaking the UI; drives error boundaries and API error format.

---

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web (SPA + backend API with persistence), based on PRD and project context.

### Starter Options Considered

- **create-next-app@latest:** Next.js 15, TypeScript, App Router, Tailwind. No built-in API layer or database; we would add API routes and a persistence layer manually.
- **create-t3-app@latest (T3 Stack):** Next.js, TypeScript, tRPC (type-safe API), Drizzle ORM, Tailwind, optional NextAuth. Single codebase, API + DB + UI scaffolded; actively maintained; supports minimal setup (e.g. no auth, SQLite).
- **Vite + Express/Fastify:** Separate frontend and backend apps; clear API boundary and good for multi-service Docker. No single official starter; more setup and wiring.

### Selected Starter: create-t3-app (T3 Stack)

**Rationale for Selection:**

- Aligns with PRD: full-stack, "well-defined API" (tRPC), and persistence (Drizzle + DB).
- One codebase for frontend and API simplifies development and still allows unit, integration, and E2E tests (task brief).
- Type-safe API (tRPC) keeps frontend, backend, and tests aligned with the todo schema.
- Can omit auth for MVP (`--nextAuth` not used) and use SQLite for simplicity (or Postgres for Docker later).
- Intermediate-friendly and well-documented.

**Initialization Command:**

```bash
pnpm dlx create-t3-app@latest zaffr --CI --trpc --tailwind --drizzle --dbProvider sqlite --appRouter --noInstall
```

(Omit `--noInstall` to install dependencies. Use `--dbProvider postgres` if preferring PostgreSQL for Docker. Add `--noGit` if initializing inside an existing repo.)

**Architectural Decisions Provided by Starter:**

**Language & Runtime:** TypeScript; Node.js for the Next.js server and API (tRPC).

**Styling Solution:** Tailwind CSS.

**Build Tooling:** Next.js (Turbopack in dev); production build via Next.js.

**Testing Framework:** Not included by default; we add Jest/Vitest (unit/integration) and Playwright (E2E) per task brief.

**Code Organization:** Next.js App Router; `src/server` for tRPC routers and Drizzle; `src/app` for pages and UI; shared types and schema via tRPC and Drizzle.

**Development Experience:** Dev server with hot reload; TypeScript throughout; tRPC client for type-safe API calls from the UI.

**Note:** Project initialization using this command (or equivalent with chosen options) should be the first implementation story.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- Data model: Todo resource and persistence (Drizzle + SQLite from starter).
- API surface: tRPC procedures for list, create, toggle complete, delete (tRPC from starter).
- Test tooling: Jest/Vitest (unit/integration) and Playwright (E2E) per task brief—add to T3 scaffold.

**Important Decisions (Shape Architecture):**

- No authentication for MVP; API and UI designed so auth can be added later (NFR-S2).
- Frontend state: server state via tRPC; local UI state for forms and empty/loading/error.
- Error handling: tRPC error format; client surfaces clear error state (NFR-R2).

**Deferred Decisions (Post-MVP):**

- Authentication and multi-user (out of scope per PRD).
- Rate limiting, advanced security middleware.
- Caching layer (not needed for single-user MVP).
- CI/CD pipeline and production monitoring (document when implementing Docker/QA steps).

### Data Architecture

- **Database:** SQLite via Drizzle (from starter). Option to switch to Postgres for Docker/production if needed.
- **Todo model:** `id` (PK), `description` (text), `completed` (boolean), `createdAt` (timestamp). No `updatedAt` required for MVP.
- **Validation:** Drizzle schema for DB; Zod (or tRPC input validator) for API input (description length, types).
- **Migrations:** Drizzle migrations; version-controlled.
- **Caching:** None for MVP.

### Authentication & Security

- **Authentication:** None for MVP (PRD). No NextAuth or session layer.
- **Authorization:** N/A (single user).
- **API security:** Input validation on all mutations; no hardcoded secrets; configuration via environment variables.
- **Future:** API and route structure must not block adding auth (e.g. middleware, protected procedures) later.

### API & Communication Patterns

- **API style:** tRPC (from starter). Type-safe procedures shared by server and client.
- **Todo procedures:** `todo.getAll` (list), `todo.create` (input: `{ description }`), `todo.toggle` (input: `{ id }`), `todo.delete` (input: `{ id }`). Schema and errors aligned with PRD FR1–FR6.
- **Error handling:** tRPC error codes and messages; client maps to UI error state (NFR-R2). Consistent error shape for integration and E2E tests.
- **Rate limiting:** Not required for MVP.
- **Documentation:** tRPC types and procedure names as contract; optional short API summary in docs for Postman/integration tests (task brief).

### Frontend Architecture

- **Framework:** Next.js App Router, React (from starter).
- **State:** Server state via tRPC queries (list data); local component state for form input, optimistic updates, and empty/loading/error UI states (FR1.2–FR1.4).
- **Styling:** Tailwind CSS (from starter). Semantic markup and keyboard/AT support for NFR-A1, A2.
- **Components:** Functional components; clear separation of list, item, form, and state views (empty/loading/error).
- **Routing:** App Router; single main route for todo list (no auth routes for MVP). No bundle optimization beyond Next default for MVP.

### Infrastructure & Deployment

- **Hosting:** Not decided for MVP. Application must be containerisable (task brief Step 3).
- **Containers:** Dockerfiles and docker-compose to be added in Step 3 (task brief); Next.js app as single service; DB (SQLite file or Postgres) per compose setup.
- **Environment:** `.env` for config (DB URL, etc.); no secrets in code (NFR-S1).
- **CI/CD, monitoring, scaling:** Deferred; document when implementing Docker and QA.

### Decision Impact Analysis

**Implementation Sequence:**

1. Initialize project (T3 command); add test tooling (Jest/Vitest, Playwright).
2. Define Drizzle todo schema and run initial migration.
3. Implement tRPC todo router (getAll, create, toggle, delete) and wire to Drizzle.
4. Build UI: list, item, create form, empty/loading/error states; wire to tRPC.
5. Add unit tests (router/DB, components); integration tests (tRPC/API); E2E (Playwright) per task brief.
6. Add Dockerfiles and docker-compose (Step 3); QA activities (Step 4).

**Cross-Component Dependencies:**

- Todo schema (Drizzle) drives tRPC procedure types and client types; single source of truth.
- tRPC error shape drives frontend error state and test assertions.
- Empty/loading/error states in UI depend on tRPC query/mutation status and error handling.

---

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical conflict points addressed:** Naming (DB, tRPC, code/files), structure (tests, components), formats (API/data), and process (errors, loading) so all agents implement consistently.

### Naming Patterns

**Database (Drizzle):**

- Table names: `snake_case` plural (e.g. `todos`).
- Column names: `snake_case` (e.g. `created_at`, `completed`).
- Primary key: `id` (auto-generated or uuid per Drizzle schema).
- No prefix on table names unless namespacing (e.g. `todos` not `app_todos`).

**API (tRPC):**

- Router name: `todo` (singular, matches resource).
- Procedure names: `getAll`, `create`, `toggle`, `delete` (camelCase). No REST-style paths; tRPC procedure names are the contract.
- Input fields: camelCase (e.g. `{ description }`, `{ id }`).

**Code & files:**

- React components: PascalCase (e.g. `TodoList`, `TodoItem`, `EmptyState`).
- File names for components: PascalCase to match component (e.g. `TodoList.tsx`) or kebab-case for non-components (e.g. `api-utils.ts`). Pick one and stick to it; T3/Next often use PascalCase for components.
- Functions/variables: camelCase. Constants: UPPER_SNAKE or camelCase for config objects.
- tRPC procedures and types: camelCase (e.g. `todo.create`, `TodoCreateInput`).

### Structure Patterns

**Project organization:**

- Tests: unit/integration co-located or in `__tests__` alongside source; E2E in top-level `e2e/` or `tests/e2e/` (per task brief Playwright). Document chosen layout in README.
- Components: under `src/app` for page-level; shared components in `src/components` (or `src/app/_components`). Group by feature when a feature grows (e.g. `components/todo/`).
- tRPC router: in `src/server/api/` (T3 default); todo router in `src/server/api/routers/todo.ts` or equivalent. Drizzle schema in `src/server/db/schema.ts` (or T3 default).
- Utilities: `src/utils/` or `src/lib/`; no scattering of one-off helpers in components without a reason.

**File structure:**

- Env: `.env` at repo root; `.env.example` (no secrets). Config loaded via env vars.
- Static assets: Next.js `public/` if needed.
- One main entry for API: tRPC root router in `src/server/api/root.ts` (or T3 equivalent) aggregating routers.

### Format Patterns

**API (tRPC):**

- Responses: return domain objects directly (e.g. `Todo[]`, `Todo`); no extra wrapper like `{ data: Todo }` unless required by client. tRPC handles transport.
- Errors: use tRPC procedures’ error APIs (e.g. `TRPCError` with code and message). Client maps to UI error state; same shape for tests.
- Dates: ISO 8601 strings in JSON (e.g. `createdAt: "2026-02-23T12:00:00.000Z"`). Store in DB as timestamp/datetime per Drizzle.

**Data exchange:**

- JSON: camelCase for frontend and tRPC input/output (TypeScript types). DB layer can use snake_case in schema; map in Drizzle if needed so API stays camelCase.
- Booleans: `true`/`false` in JSON and UI. No 1/0 for completion.

### Communication Patterns

**State (React + tRPC):**

- Server state: via tRPC hooks (e.g. `api.todo.getAll.useQuery()`). No duplicate client-side cache of the full list; tRPC cache is source of truth.
- Local UI state: for form input, optimistic toggles, and modal/open state. Prefer React `useState` or small local state; no global client store for MVP.
- Updates: use tRPC mutations (`todo.create`, `todo.toggle`, `todo.delete`); invalidate or refetch `todo.getAll` as needed so list stays in sync.

**Events / actions:**

- No custom event bus for MVP. User actions → tRPC mutations → cache invalidation/refetch. Naming: handler names reflect action (e.g. `handleCreate`, `handleToggle`, `handleDelete`).

### Process Patterns

**Error handling:**

- Server: throw `TRPCError` with appropriate code (e.g. `NOT_FOUND`, `BAD_REQUEST`, `INTERNAL_SERVER_ERROR`). Message safe for client when not sensitive.
- Client: use tRPC mutation/query error state; show a single, clear error state (NFR-R2). No silent failures for create/toggle/delete.
- Error boundary: at least one React error boundary above main content so unhandled errors show a fallback UI, not a blank screen.

**Loading states:**

- Naming: `isLoading` (query) or `isPending` (mutation) from tRPC; or local `isSubmitting` for forms. Use one convention in the codebase.
- List: show loading UI (skeleton or spinner) while `todo.getAll` is loading; empty state when `data?.length === 0`; error state when query errors.
- Mutations: optional optimistic updates; on error revert and show error. Buttons/inputs can show loading/disabled during mutation to avoid double submit.

### Enforcement Guidelines

**All agents MUST:**

- Use the agreed todo tRPC procedure names and input shapes; do not add REST endpoints for todo CRUD.
- Use the agreed DB table/column naming (snake_case, `todos` table) when adding or changing schema.
- Use tRPC errors for API failures and map them to the same UI error state pattern (no ad-hoc error formats).
- Place tests in the chosen structure (co-located or `e2e/`); add unit/integration/E2E per task brief.

**Pattern enforcement:**

- Code review and E2E tests verify list, create, toggle, delete, empty, loading, error.
- Any new tRPC procedure or DB column must follow naming and format rules above.
- Document pattern changes in this architecture doc or a short CONTRIBUTING/patterns section.

### Pattern Examples

**Good:**

- `todos` table with `id`, `description`, `completed`, `created_at`. tRPC `todo.getAll` returns `{ id, description, completed, createdAt }[]`.
- Component `TodoList` that uses `api.todo.getAll.useQuery()` and renders `TodoItem` for each; `EmptyState` when list length 0; loading spinner when `isLoading`; error message when `isError`.
- Mutation `todo.create.useMutation()` with `onSuccess` invalidating `todo.getAll`; form with `handleSubmit` that calls `create.mutate({ description })`.

**Avoid:**

- REST endpoints for todos alongside tRPC (single API surface).
- Mixing snake_case and camelCase in the same API response.
- Ignoring tRPC error state and leaving the UI in a loading or stale state.
- Storing the full todo list in React state duplicated from tRPC cache.

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
zaffr/                          # or project root after T3 init
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .env
├── .env.example
├── .gitignore
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # main todo list page
│   │   ├── globals.css
│   │   └── _components/        # or src/components/ - app-level UI
│   │       ├── TodoList.tsx
│   │       ├── TodoItem.tsx
│   │       ├── TodoForm.tsx
│   │       ├── EmptyState.tsx
│   │       ├── LoadingState.tsx
│   │       └── ErrorState.tsx
│   ├── server/
│   │   ├── api/
│   │   │   ├── root.ts         # tRPC root router
│   │   │   └── routers/
│   │   │       └── todo.ts     # todo.getAll, create, toggle, delete
│   │   └── db/
│   │       ├── index.ts       # Drizzle client
│   │       └── schema.ts      # todos table
│   ├── utils/
│   │   └── api.ts              # tRPC client (createTRPCReact or similar)
│   └── styles/
├── drizzle/                    # or db/ - Drizzle migrations
│   └── migrations/
├── e2e/                        # Playwright E2E (task brief)
│   ├── todo.spec.ts
│   └── playwright.config.ts
├── __tests__/                  # or co-located *.test.ts - unit/integration
│   ├── server/
│   │   └── api/routers/
│   │       └── todo.test.ts
│   └── app/_components/
│       └── TodoList.test.tsx
└── public/
```

(Exact paths may follow T3 scaffold; `src/server` and `src/app` are standard. Tests can be co-located or under `__tests__`/`e2e/` as chosen in patterns.)

### Architectural Boundaries

**API boundaries:**

- **External:** None for MVP. Only the browser talks to the app.
- **Internal:** tRPC defines the API boundary: `src/server/api/routers/todo.ts` implements procedures; frontend and tests call them via tRPC client. No REST routes for todo CRUD.

**Component boundaries:**

- **Pages:** `src/app/page.tsx` composes list, form, and state views; no business logic in page.
- **Components:** `TodoList` owns query and passes data to `TodoItem`; `TodoForm` owns mutation and invalidates list. Empty/loading/error are presentational; page or list decides which to show from query status.

**Service boundaries:**

- **Data:** Drizzle in `src/server/db`; only tRPC routers (and tests) access DB. No direct DB access from `src/app`.

**Data boundaries:**

- **Schema:** Single `todos` table; schema in `src/server/db/schema.ts`. tRPC procedures are the only way to read/write todos from the app.

### Requirements to Structure Mapping

**FR1 (List display and load):** `src/app/page.tsx` + `TodoList` + `EmptyState` / `LoadingState` / `ErrorState`; `todo.getAll` in `src/server/api/routers/todo.ts`.

**FR2 (Create todo):** `TodoForm` in `src/app`; `todo.create` in `src/server/api/routers/todo.ts`; schema in `src/server/db/schema.ts`.

**FR3 (View todo):** `TodoList` + `TodoItem`; data from `todo.getAll`.

**FR4 (Complete todo):** `TodoItem` (toggle UI); `todo.toggle` in todo router.

**FR5 (Delete todo):** `TodoItem` (delete control); `todo.delete` in todo router.

**FR6 (Persistence and API):** `src/server/db` + `src/server/api/routers/todo.ts` + Drizzle migrations.

**FR7 (Experience and feedback):** Tailwind in `src/app`; tRPC query/mutation states drive loading and feedback.

**Cross-cutting:** Error handling in tRPC router (TRPCError) and in UI (ErrorState, error boundaries). Tests: `__tests__` or co-located for unit/integration; `e2e/` for Playwright.

### Integration Points

**Internal:** App Router page → tRPC client (utils/api) → tRPC server (routers) → Drizzle → SQLite. No internal event bus.

**External:** None for MVP.

**Data flow:** User action → mutation → tRPC → Drizzle write → invalidate/refetch query → UI update. Read path: page load → query → tRPC → Drizzle read → UI render.

### File Organization Patterns

**Configuration:** Root: `next.config.js`, `tailwind.config.ts`, `tsconfig.json`. Env: `.env` and `.env.example` at root.

**Source:** `src/app` (UI), `src/server` (API + DB), `src/utils` (tRPC client and shared helpers).

**Tests:** Unit/integration next to source or under `__tests__`; E2E under `e2e/` with Playwright config.

**Assets:** Next.js `public/` for static files if needed.

### Development Workflow Integration

- **Dev server:** `pnpm dev` (or npm/yarn) runs Next.js dev server; single process (API and UI).
- **Build:** `pnpm build` produces Next.js output. DB migrations run separately (e.g. `pnpm db:migrate` or equivalent).
- **Test:** `pnpm test` (unit/integration); `pnpm test:e2e` or `pnpm exec playwright test` for E2E (task brief).

---

## Architecture Validation Results

### Coherence Validation

**Decision compatibility:** Technology choices are consistent: T3 (Next.js, tRPC, Drizzle, Tailwind, SQLite) with added test tooling (Jest/Vitest, Playwright). No conflicting versions or patterns.

**Pattern consistency:** Naming (DB snake_case, tRPC camelCase, components PascalCase), structure (server/app/utils, e2e/__tests__), and process (tRPC errors, loading states) align with the stack and PRD.

**Structure alignment:** Project tree and boundaries support the decisions; tRPC and Drizzle locations and FR-to-structure mapping are defined.

### Requirements Coverage Validation

**Functional requirements:** FR1–FR7 are mapped to components and procedures (list/load, create, view, complete, delete, persistence/API, experience). Empty/loading/error states and tRPC procedures are specified.

**Non-functional requirements:** Performance (lean API, tRPC); accessibility (Tailwind, semantic markup, WCAG); reliability (durable store, error handling, NFR-R2); security (input validation, env config, NFR-S1/S2). Task brief (tests, Docker later) is reflected.

### Implementation Readiness Validation

**Decision completeness:** Starter, data model, API (tRPC procedures), auth (none MVP), frontend state, and infra (Docker deferred) are documented with rationale.

**Structure completeness:** Directory tree and boundaries are defined; requirements-to-structure mapping is explicit.

**Pattern completeness:** Naming, structure, format, communication, and process patterns are documented with examples and anti-patterns.

### Gap Analysis Results

- **Critical gaps:** None. Implementation can proceed.
- **Important gaps:** Exact T3-generated paths may differ slightly from the tree; adjust during first implementation story (init + test setup).
- **Nice-to-have:** Optional API summary doc for Postman/integration tests when adding them.

### Architecture Completeness Checklist

**Requirements analysis:** Project context, scale, constraints, and cross-cutting concerns documented.

**Architectural decisions:** Critical and important decisions documented; technology stack and integration patterns specified.

**Implementation patterns:** Naming, structure, format, communication, and process patterns defined with enforcement guidelines.

**Project structure:** Directory structure, boundaries, requirements mapping, and integration points defined.

### Architecture Readiness Assessment

Architecture is **ready for implementation**. Epics and stories (Create Epics and Stories workflow) can use this document as the technical source of truth; then sprint planning and dev-story workflows can implement against it.
