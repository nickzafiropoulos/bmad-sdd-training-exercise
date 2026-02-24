# Architecture Decision Document: Todo Application

**Project:** Zaffr  
**Date:** 2026-02-23  
**Role:** Architect – technical architecture, API contracts, component structure (aligned to full task brief and QA from day one)  
**Status:** Archived – architecture will be (re)produced by BMAD create-architecture workflow after PRD.

---

## 1. Overview

- **Stack:** Frontend (e.g. React/Next or similar SPA), Backend (Node/Express or equivalent REST API), in-memory or file-based persistence for v1 (upgradable to DB later).
- **Deployment:** Docker Compose; separate containers for frontend, backend; optional DB container when added.
- **Testing:** Unit (Jest/Vitest), integration (API tests), E2E (Playwright). Test infra and scenarios defined here and in stories so Step 2 can implement from day one.

---

## 2. API contract (backend)

All endpoints return JSON. Base path for API: `/api` (e.g. `http://localhost:3001/api` or as configured).

### 2.1 Todo resource

| Field       | Type    | Required | Description                          |
|------------|---------|----------|--------------------------------------|
| `id`       | string  | yes      | Unique identifier (e.g. UUID).       |
| `title`    | string  | yes      | Short description; max length TBD (e.g. 500). |
| `completed`| boolean | yes      | Completion status.                   |
| `createdAt`| string  | yes      | ISO 8601 datetime.                   |

### 2.2 Endpoints

| Method | Path           | Description                    | Request body       | Response (2xx)     |
|--------|----------------|--------------------------------|--------------------|--------------------|
| GET    | `/api/todos`   | List all todos                 | —                  | `{ todos: Todo[] }`|
| POST   | `/api/todos`   | Create todo                    | `{ title: string }`| `{ todo: Todo }`    |
| GET    | `/api/todos/:id` | Get one todo                | —                  | `{ todo: Todo }`    |
| PATCH  | `/api/todos/:id` | Update todo (e.g. completed) | `{ title?, completed? }` | `{ todo: Todo }` |
| DELETE | `/api/todos/:id` | Delete todo                 | —                  | `204 No Content` or `{ success: true }` |

### 2.3 Error responses

- **400 Bad Request:** Validation failure (e.g. missing/invalid `title`).
- **404 Not Found:** Todo `id` not found.
- **500 Internal Server Error:** Server error; body may include a safe message.

Consistent shape for 4xx/5xx (e.g. `{ error: string, code?: string }`) so frontend and integration tests can assert predictably.

### 2.4 Health check (for Docker and QA)

- **GET** `/api/health` or `/health`: Returns `200` with body e.g. `{ status: "ok" }` when the app is running. Used by container health checks and smoke tests.

---

## 3. Component structure

### 3.1 Frontend (high level)

- **App / root:** Layout, routing (if any), global state or API client.
- **Todo list:** Fetches and displays todos; handles empty, loading, error; delegates actions to API.
- **Todo item:** Single row/card: title, completed toggle, delete; calls API for PATCH/DELETE.
- **Add todo:** Input + submit; calls API POST.
- **Shared:** Buttons, inputs, loading/error UI; ensure accessible and testable (e.g. data-testid or roles).

### 3.2 Backend (high level)

- **Routes:** Mount under `/api`; map to handlers.
- **Handlers:** Validate input, call service, return status + JSON.
- **Service / store:** CRUD for todos; in-memory or file store for v1.
- **Middleware:** JSON body parsing, CORS (if SPA on different origin), error handler that returns consistent error JSON.
- **Health:** Dedicated route for `/api/health` or `/health`.

### 3.3 Test layout (for Step 2)

- **Unit:** Frontend components (e.g. React Testing Library), backend service/handlers (Jest/Vitest).
- **Integration:** API tests (e.g. supertest or Postman) per endpoint; validate request/response against this contract.
- **E2E:** Playwright; user flows: create todo, complete todo, delete todo, empty state, error handling (≥5 scenarios per full task brief).

---

## 4. Test strategy (unit, integration, E2E)

- **Unit:** Component logic and pure functions; backend service and validation. Target: high coverage on business logic.
- **Integration:** Each API endpoint tested against the contract above; validation and error paths included. Run against a running server or in-process app.
- **E2E:** Playwright; cover: create todo, complete todo, delete todo, empty state, error handling; WCAG/accessibility checks where applicable.
- **Coverage:** Aim for ≥70% meaningful coverage (exclude trivial glue where appropriate).
- **CI:** Test commands in `package.json`; runnable in Docker for consistency.

---

## 5. Infrastructure and deployment

- **Docker:** Separate Dockerfiles for frontend and backend; multi-stage builds, non-root user, health checks where applicable.
- **Docker Compose:** Orchestrate frontend, backend; volumes and env for dev/test; `docker-compose up` runs the app.
- **Environment:** Config via env vars (e.g. API base URL, port); support dev and test profiles.

---

## 6. Out of scope for v1

- Database (optional in a later phase); auth; multi-user; real-time sync.

This architecture and API contract are the single source of truth for backend implementation and for integration/E2E test expectations.
