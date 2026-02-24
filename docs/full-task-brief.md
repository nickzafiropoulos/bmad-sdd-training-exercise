# Full Task Brief

This document is the **master reference** for the BMAD-driven Todo app project (product name: **Zaffr**). It supports all stages (analysis, specification, build, containerisation, QA) without duplicating detail in the process documentation.

---

## Overall goal

Apply Spec-Driven Development to build a complete, well-tested, and deployable application. Use the BMAD framework to drive development of the full-stack Todo app (or equivalent) so that PM, Architect, Developer, QA, and DevOps roles converge with comprehensive coverage.

## Planning emphasis

We must plan and set up the **right infrastructure and dependencies** for **backend** and **QA** from the start—architecture, API contracts, test strategy, and test tooling (unit, integration, E2E) are defined in Step 1 and implemented from day one in Step 2.

---

## Step 1: Initialize BMAD and generate specifications

| Activity | BMAD persona | Output |
|----------|--------------|--------|
| **Project brief & PRD refinement** | PM | Refined PRD + detailed project brief |
| **Architecture design** | Architect | Technical architecture, **API contracts**, component structure |
| **Story creation** | — | Well-defined stories with acceptance criteria |
| **Test strategy** | — | Test scenarios for **unit, integration, E2E** as part of story definitions |

---

## Step 2: Build the application (QA integrated from day one)

| Component | Implementation task | QA integration |
|-----------|---------------------|----------------|
| **Project setup** | Initialize structure: frontend, backend, tests | Set up test infra: **Jest/Vitest** (unit), **Playwright** (E2E); test commands in package.json |
| **Backend** | API for CRUD on todos; endpoints, validation, error handling per BMAD specs | **Integration tests** per endpoint; **Postman MCP or similar** to validate API contracts |
| **Frontend** | UI for todo management; components and state per BMAD specs | **Component tests** as we build; **Chrome DevTools MCP** for debug/inspect |
| **E2E tests** | End-to-end tests for all user journeys from stories | **Playwright MCP**; cover: create, complete, delete todo, empty state, error handling |

---

## Step 3: Containerize with Docker Compose

| Task | Description |
|------|-------------|
| **Dockerfiles** | Frontend and backend; multi-stage builds, non-root users, health checks |
| **Docker Compose** | `docker-compose.yml`: app, database if needed; networking, volumes, env config |
| **Health checks** | Health check endpoints; containers report status; logs via `docker-compose logs` |
| **Environment config** | Dev/test via env vars and compose profiles |

---

## Step 4: Quality assurance activities

| QA task | Description |
|---------|-------------|
| **Test coverage** | Analyze coverage, identify gaps; **minimum 70% meaningful coverage** |
| **Performance testing** | Chrome DevTools MCP; document issues |
| **Accessibility testing** | Lighthouse or axe-core (e.g. via Playwright); **WCAG AA** |
| **Security review** | AI review for XSS, injection, etc.; document findings and remediations |

---

## Deliverables (checklist)

- [ ] BMAD artifacts: project brief, architecture docs, stories with acceptance criteria
- [ ] Working Todo application (frontend + backend or CLI)
- [ ] Unit, integration, and E2E test suites
- [ ] Dockerfiles and `docker-compose.yml` (app runs with `docker-compose up`)
- [ ] QA reports: coverage, accessibility, security review
- [ ] Documentation of how BMAD guided the implementation
- [ ] **AI integration log:** agent usage, MCP usage, test generation, debugging with AI, limitations
- [ ] README with setup instructions + AI integration log
- [ ] (If applicable) Framework comparison: Spec-kit vs BMAD

---

## Success criteria

| Criterion | Target |
|-----------|--------|
| Phase 1–2 deliverables | All activities completed with documented learnings |
| Working application | Todo app fully functional; all CRUD operations |
| Test coverage | Minimum **70%** meaningful code coverage |
| E2E tests | Minimum **5 passing** Playwright tests |
| Docker deployment | Application runs via `docker-compose up` |
| Accessibility | **Zero critical** WCAG violations |
| Documentation | README with setup instructions, AI integration log |
