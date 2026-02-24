---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-bmad-training-to-do-app-2026-02-23.md
workflowType: prd
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 0
---

# Product Requirements Document - Zaffr

**Author:** Nickzafiropoulos  
**Date:** 2026-02-23

---

## Executive Summary

Zaffr is a full-stack Todo application for individual users who need to manage personal tasks in a clear, reliable, and intuitive way. The product delivers a single list: create, view, complete, and delete todos; the list is visible immediately on open with no sign-up or onboarding. Success means users can complete all core task actions without guidance and the experience feels complete and stable. The project is delivered against a task brief that requires full response (analysis, spec, build, backend, QA, containerisation, documentation); the builder’s aim is to learn the AI-native dev process and produce a step-by-step guide. Those are project aims, not features of the todo app.

### What Makes This Special

- **Minimal and focused:** Only create, view, complete, delete—no accounts, collaboration, or priorities/deadlines in v1.
- **Reliable and durable:** List on load, instant feedback, persistence across sessions, clear empty/loading/error states.
- **Clear and accessible:** Fast, responsive UI across devices; architecture that does not block future extension (e.g. auth, multi-user).

### Project Classification

| Attribute | Value |
|-----------|--------|
| Project type | Web application (full-stack, SPA + backend API) |
| Domain | General (personal productivity / task management) |
| Complexity | Low |
| Project context | Greenfield |

---

## Success Criteria

### User Success

Users succeed when the product is quick and reliable: they can add and manage tasks without having to think or put in lots of effort. Concretely: users can complete all core actions (add, view, complete, delete) without guidance; the list persists across refresh and sessions; and users return to the app because it is dependable. “Worth it” means minimal friction, no confusion, and clear states (empty, loading, error) so the app never feels broken.

### Business Success

Not applicable for the product itself (no commercial business). Project-level success is defined by the task brief: working app, test coverage, Docker deployment, documentation.

### Technical Success

- Backend API provides CRUD and durability for todo data.
- Frontend remains stable across refresh and sessions.
- Clear empty, loading, and error states implemented and testable.

### Measurable Outcomes

- **Core actions completable:** User can add, view, complete, and delete todos without instructions (demonstrable via E2E and manual use).
- **Persistence and return:** List survives refresh and sessions; users can rely on it and choose to come back.
- **Quality bar:** No critical bugs; clear empty, loading, and error states; zero critical WCAG violations; meaningful test coverage.
- **Stability:** App remains stable across refresh and sessions.

---

## Product Scope

### MVP - Minimum Viable Product

- Single list: one user, one list of todos; list visible immediately on open; no sign-up or onboarding.
- CRUD: create, view, complete, delete todo items; each item has short text description, completion status, basic metadata (e.g. creation time).
- Persistence: data survives refresh and sessions via a small, well-defined backend API (CRUD, durability).
- Clear states: empty (no tasks), loading, error so the app never feels broken or confusing.
- Experience: fast, responsive UI; instant feedback on actions; works across desktop and mobile.

### Growth Features (Post-MVP)

- Not defined for MVP; architecture should not block future additions.

### Vision (Future)

If the product evolves: user accounts and multi-user support, additional list or organization features, prioritization or deadlines, without changing the core “minimal, reliable list” promise. No commitment to timeline.

---

## User Journeys

### Primary user: single-list todo user

**Who:** An individual managing a personal list of tasks (one list). They care about clarity and dependability, not extra features.

**Opening scene:** User opens the app or returns to it. List is visible immediately; no sign-up or onboarding.

**Rising action:** User adds tasks, marks them complete, deletes as needed. Feedback is instant; list persists across sessions.

**Climax:** User realises they can rely on the list—data is there after refresh, actions do what they expect, and empty/loading/error states are clear.

**Resolution:** The app becomes the default place for their single todo list because it is minimal and reliable.

**Journey-derived capabilities:** List display on load; add todo; mark complete; delete todo; persistence; empty/loading/error states; responsive UI.

---

## Domain Requirements

Domain complexity is **low** (general productivity). No domain-specific compliance or regulatory requirements for MVP. Standard software practices apply (security, accessibility, performance as captured in NFRs).

---

## Innovation Focus

No distinct innovation step required. Product is a focused, minimal todo app; differentiation is execution (reliability, clarity, persistence), not novel technology or paradigm.

---

## Project-Type Requirements (Web App)

- **Browser support:** Target modern evergreen browsers; responsive design for desktop and mobile.
- **Performance:** Fast initial load and instant feedback on user actions.
- **Accessibility:** Zero critical WCAG violations (per task brief); meaningful accessibility level for broad use.
- **Architecture:** SPA frontend + well-defined backend API; no SEO requirement for MVP (single-user app).

---

## Scoping Summary

| Phase | Scope |
|-------|--------|
| Phase 1 (MVP) | Single list, CRUD, persistence, clear states, responsive UI, backend API. |
| Phase 2 (Growth) | Out of scope for this PRD. |
| Phase 3 (Vision) | Optional future: auth, multi-user, multiple lists, priorities/deadlines. |

**Out of scope for MVP:** User accounts, authentication, multi-user, collaboration; task prioritization, deadlines, reminders, notifications; multiple lists, categories, or tags.

---

## Functional Requirements

### FR1: List display and load

- **FR1.1** User can see the todo list immediately when opening the app (no onboarding).
- **FR1.2** User can see an empty state when there are no tasks.
- **FR1.3** User can see a loading state while the list is being fetched.
- **FR1.4** User can see an error state when list load fails, with clear feedback.

### FR2: Create todo

- **FR2.1** User can create a new todo with a short text description.
- **FR2.2** User can have basic metadata (e.g. creation time) associated with each todo.
- **FR2.3** New todos are persisted via the backend and appear in the list after creation.

### FR3: View todo

- **FR3.1** User can view all todos in the list.
- **FR3.2** User can see completion status and description (and basic metadata as defined) for each todo.

### FR4: Complete todo

- **FR4.1** User can mark a todo as complete (and optionally revert to incomplete).
- **FR4.2** Completion state is persisted and survives refresh and sessions.

### FR5: Delete todo

- **FR5.1** User can delete a todo from the list.
- **FR5.2** Deletion is persisted; the todo does not reappear after refresh.

### FR6: Persistence and API

- **FR6.1** Backend exposes a small, well-defined API for CRUD on todo items.
- **FR6.2** All list data survives refresh and sessions (durability).

### FR7: Experience and feedback

- **FR7.1** User receives instant feedback on create, complete, and delete actions.
- **FR7.2** UI is responsive and usable across desktop and mobile.

---

## Non-Functional Requirements

### Performance

- **NFR-P1** Initial list load and user actions (add, complete, delete) feel instant; no unnecessary delay that blocks the user.
- **NFR-P2** List fetch and mutations are completed in a reasonable time (e.g. within a few seconds under normal conditions).

### Accessibility

- **NFR-A1** Zero critical WCAG violations (per task brief).
- **NFR-A2** UI is operable via keyboard and compatible with common assistive technologies for core flows.

### Reliability

- **NFR-R1** App remains stable across refresh and sessions; no data loss under normal use when backend is available.
- **NFR-R2** Clear error state when backend or network fails; user is not left with a broken or confusing screen.

### Security and data

- **NFR-S1** No sensitive personal data beyond task text and metadata; standard hygiene (no hardcoded secrets, safe handling of input).
- **NFR-S2** API is suitable for single-user use; architecture does not preclude adding auth later.

---

## Document History

| Date | Change |
|------|--------|
| 2026-02-23 | PRD created from BMAD Create PRD workflow; source: product brief `product-brief-bmad-training-to-do-app-2026-02-23.md`. |
