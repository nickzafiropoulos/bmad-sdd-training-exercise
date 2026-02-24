# AI Integration Log

*This document is the **consolidated AI integration log** called for in the project brief. It records agent usage, MCP usage (if any), test generation, debugging with AI, and limitations.*

**Location:** `docs/task-progress-documentation/ai-integration-log.md`  
**Related:** Session-level one-liners continue to be added to `cursor-updates.md` at repo root; this file is the single, named artefact that consolidates the AI integration narrative.

---

## 1. Agent usage

- **BMAD workflows (Cursor):** Product brief, PRD, architecture, UX design, and epics-and-stories were produced or guided by BMAD workflows/commands run in Cursor (e.g. create-product-brief, create-prd, create-architecture, create-epics-and-stories). Planning artifacts live in `_bmad-output/planning-artifacts/`.
- **Implementation (Cursor agent):** Development was done with Cursor’s AI agent: Sprint 1–4 implementation (T3 init, design tokens, backend, todo UI, E2E), accessibility fixes (contrast, touch targets, axe E2E), containerisation (Dockerfile, docker-compose, health endpoint), and Step 4 QA (coverage, a11y, security review). Code and config changes were applied by the agent; the human reviewed and ran tests/builds.
- **Decisions and narrative:** The “What we did” and “Why we did it” sections in `documentation-of-my-bmad-driven-to-do-list-app.md` reflect agent-assisted decisions (e.g. token-based theming, optimistic toggle, non-root Docker user).

---

## 2. MCP usage

- **This project:** No MCP (Model Context Protocol) servers or tools were used during the BMAD-driven build. All work was done via Cursor’s built-in agent, terminal, and file tools.
- **Optional future use:** Figma or browser MCP could be used for design-to-code or E2E debugging if introduced later.

---

## 3. Test generation

- **Unit and integration tests:** Vitest tests (API todo router, component tests for empty/loading/error/todo-item/todo-list) were written with AI assistance; mocks (tRPC, jest-dom) were added following existing patterns.
- **E2E tests:** Playwright tests in `zaffr/e2e/todo.spec.ts` (create, persist, toggle, delete, empty state) and `zaffr/e2e/a11y.spec.ts` (axe WCAG 2.1 AA for dark and light themes) were created with AI assistance.
- **Coverage:** Coverage setup (`@vitest/coverage-v8`, `npm run test:coverage`) and the ≥70% target were implemented with agent guidance.

---

## 4. Debugging with AI

- **Docker build failure (URL_INVALID):** Next.js “Collecting page data” failed in Docker because `DATABASE_URL` was undefined at build time. The agent identified the cause and added `ENV DATABASE_URL="file:/tmp/zaffr-build.sqlite"` in the build stage so the app could load without a real DB.
- **Toggle checkbox “flash”:** After the mutation completed, the UI briefly showed the old state before refetch. The agent switched to updating the query cache in the mutation `onSuccess` (setData) instead of only invalidating, so the UI stays correct without a flash.
- **Port conflicts:** When Docker or the dev server occupied port 3000, the agent suggested `docker compose down` or killing the process on 3000 so E2E (or the other service) could bind; port mapping in compose was also adjusted when requested.
- **Internal Server Error / env:** Earlier, `DATABASE_URL` validation (Zod `url()`) was relaxed to allow `file:` paths so `file:./db.sqlite` is valid; improved error logging in the tRPC route and todo router was added to surface DB errors in dev.

---

## 5. Limitations

- **Docker not available in agent environment:** The Docker image could not be built or run in the environment where the agent executed; the Dockerfile and docker-compose were written and verified by the user locally. The agent documented the steps and fixed the build-stage `DATABASE_URL` once the user reported the error.
- **A11y E2E and port 3000:** Playwright’s webServer expects to use or reuse port 3000. If the dev server or Docker is already using 3000, the user must run `docker compose down` (or stop the dev server) before running `npm run test:e2e -- e2e/a11y.spec.ts`.
- **drizzle-kit push in container:** The container startup runs `drizzle-kit push` then `node server.js`. If the TypeScript config or env loading failed in the container, the `|| true` allows the server to start anyway; schema might then need to be applied manually or via a different path (documented in process doc Section 4).

---

## 6. Session summary (chronological)

The following is a consolidated chronological list of agent-assisted changes, extracted from `cursor-updates.md` and the process narrative, for quick reference.

| Date       | Area / step        | Summary |
|------------|--------------------|--------|
| 2026-02-23 | BMAD setup         | BMAD 6 installed (BMM, Cursor); process doc and full-task-brief created; product brief and PRD workflows run; architecture and epics/stories produced; artifacts archived. |
| 2026-02-24 | Step 2 (Build)     | Epics/stories and execution guide; Sprint 1–4 completed (T3 app, tokens, backend, todo UI, E2E, coverage); sprint-status and process doc updated. |
| 2026-02-24 | A11y and UI        | axe E2E added; contrast tokens updated; primary button text-on-primary; shadows and heading font; delete icon (trash), 44px targets; toggle optimistic update and setData cache fix. |
| 2026-02-24 | Step 3 (Container) | Health endpoint, standalone build, Dockerfile (multi-stage, non-root), docker-compose, .dockerignore; DATABASE_URL at build time for Docker. |
| 2026-02-24 | Step 4 (QA)        | Coverage and a11y documented; security review; process doc Section 5 and Task complete table; a11y E2E run and passed by user. |

---

*End of AI integration log. Update this file when significant agent/MCP usage, test generation, debugging, or limitations are encountered.*
