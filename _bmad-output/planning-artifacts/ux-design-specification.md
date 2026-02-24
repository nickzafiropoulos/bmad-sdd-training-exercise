---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-bmad-training-to-do-app-2026-02-23.md
  - _bmad-output/planning-artifacts/architecture.md
---

# UX Design Specification Zaffr

**Author:** Nickzafiropoulos
**Date:** 2026-02-24

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

Zaffr is a minimal, reliable full-stack Todo application for individuals who want a single list that works: create, view, complete, and delete todos with no sign-up, no onboarding, and clear empty, loading, and error states. The product vision is clarity and dependability over feature count—a list that feels solid and complete without extra complexity.

### Target Users

Primary user: an individual managing one personal todo list. They care about clarity and dependability, not extra features. They need to add, view, complete, and delete items; see the list immediately on open; have it persist across refresh and sessions; and get clear empty, loading, and error states. Success means completing all core actions without instructions and feeling the list is reliable and "just works." No named persona for MVP; design must work across desktop and mobile.

### Key Design Challenges

- **State clarity:** Empty, loading, and error states must be obvious and reassuring so the app never feels broken or confusing.
- **Empty state as entry point:** The first thing many users see is an empty list; discoverability of the first action (e.g. add first todo) must be obvious without feeling noisy—treat this as both a challenge and an opportunity.
- **Minimal but complete:** Deliver a full-feeling experience with very few controls (no priorities, dates, or accounts) so the product doesn't feel bare or unfinished.
- **Cross-device consistency:** Same clarity and instant feedback on mobile and desktop without over-optimising for one platform.

### Design Opportunities

- **Trust through consistency:** Predictable behaviour and clear states so users quickly learn they can rely on the list.
- **Low cognitive load:** No setup or modes—open and use; UX can reinforce "no thinking required."
- **Accessibility as baseline:** Meeting WCAG and keyboard/AT support as a differentiator for a minimal product.
- **Error copy that explains and suggests next step:** One clear error state (per architecture) with copy that explains what went wrong and what to do next (e.g. "Couldn't load your list. Check your connection and try again.").

## Core User Experience

### Defining Experience

The core experience is the list-first loop: open → see list (or empty/loading/error) → add, complete, or delete todos. The primary interaction is viewing and managing the list; the critical moment is adding the first todo when the list is empty. The experience must feel effortless: no sign-up, no onboarding, no modes—just the list and clear, instant feedback on every action.

### Platform Strategy

Web application (Next.js), responsive for desktop and mobile. Support both touch and mouse/keyboard; target modern evergreen browsers. WCAG and keyboard/assistive-tech support are required. No native app or offline requirement for MVP; single codebase serves all devices.

### Effortless Interactions

- **List on load:** List (or empty/loading/error state) visible immediately; no gates or setup.
- **Add todo:** Single input + submit; new item appears in the list and persists.
- **Complete todo:** Single toggle per item; instant visual feedback and persisted state.
- **Delete todo:** Single clear action; item removed and removal persisted.
- No multi-step wizards or settings for core actions; every action is one step with immediate feedback.

### Critical Success Moments

- **First load:** User sees the list or a clear empty state with an obvious path to add the first todo.
- **First add:** New todo appears immediately and persists after refresh.
- **First complete:** Toggle feels instant; state persists.
- **Error moment:** If load or mutation fails, one clear error state with copy that explains what happened and suggests next step (e.g. retry, check connection).

### Experience Principles

1. **List first.** The list (or empty/loading/error) is the primary view; minimise competing chrome.
2. **One action, one result.** Each core action has one obvious control and immediate feedback.
3. **State is visible.** Empty, loading, and error are first-class screens, not afterthoughts.
4. **Zero setup.** Open and use; the empty state is the only entry point.

## Desired Emotional Response

### Primary Emotional Goals

- **In control and reassured:** Users should feel the list is dependable and that their actions (add, complete, delete) work and persist—no doubt or second-guessing.
- **Calm and focused:** The product stays out of the way; minimal UI and zero setup so users can focus on their tasks, not on the app.
- **Accomplishment:** Completing and clearing tasks feels satisfying without needing celebration or gamification—simple, quiet accomplishment.

### Emotional Journey Mapping

- **First discovery:** "I can use this right away"—no sign-up or onboarding; empty state or list is immediately understandable.
- **Core experience:** "It does what I expect"—every action has immediate, visible feedback; no surprises.
- **After completing a task:** "Done"—the list reflects the new state; user can move on.
- **When something goes wrong:** "I know what happened and what to do"—one clear error message that explains and suggests next step; no confusion or helplessness.
- **Returning:** "My list is still here; I can rely on it"—persistence and consistency build trust.

### Micro-Emotions

- **Confidence over confusion:** Clear empty, loading, and error states and an obvious next action (e.g. add first todo) so users never wonder what to do.
- **Trust over skepticism:** Persistence and consistent feedback so users believe the list will be there next time.
- **Satisfaction over frustration:** Instant feedback and no dead ends; actions complete or fail clearly.
- **Avoid:** Anxiety ("Did it save?"), confusion (unclear states), helplessness (errors with no guidance).

### Design Implications

- **Confidence and trust:** One clear error state with copy that explains and suggests next step; visible loading and empty states so the app never feels broken.
- **Calm and focus:** List-first layout; minimal chrome; no setup or modes.
- **Control:** Obvious "add first todo" in empty state; one action, one result; immediate feedback on every mutation.
- **Avoid in design:** Hidden state, silent failures, vague error messages, unnecessary steps or friction.

### Emotional Design Principles

1. **Reassure, don't surprise.** Predictable behaviour and visible state so users never wonder if something worked.
2. **Clarity over cleverness.** Clear copy and states over minimal or ambiguous UI.
3. **Quiet accomplishment.** Support satisfaction without adding drama or gamification.
4. **One moment of truth.** When something fails, one place, one message, one suggested next step.

## Stakeholder UX/UI Inspiration

*Captured from stakeholder input so it can be referenced in epics and stories.*

### Gold Standard: To-Do List UX

- **Todoist** — [https://www.todoist.com/](https://www.todoist.com/)  
  **Reference for:** Simplicity and hierarchy of information and features. Use as the gold standard for to-do list UX: clear information hierarchy, minimal chrome, and features that stay out of the way until needed.

### UI Direction: Theme and Colour

- **Default theme:** Dark mode. The primary experience should be dark (deep charcoal/black background, light text) by default.
- **Accent colours:** Use a small, distinct accent palette to highlight key actions and states (e.g. primary action button, completion, destructive action, optional status). Avoid clutter; accents should aid hierarchy and scannability.
- **Theme switcher:** Provide an optional light mode via a theme switcher (user preference). Dark remains the default.

### Visual Reference (Stakeholder Image)

- **Style:** Minimalist, modern dark UI with strong accent colour choices. Dark gray backgrounds with subtle separation between cards/sections; white/light gray text; accent colours applied consistently for primary actions (e.g. "Add" FAB), status, and emphasis.
- **Hierarchy:** Clean layouts, clear typography, and strategic use of colour to create simplicity and hierarchy. List-first; primary action (add task) prominent (e.g. FAB or always-visible input).
- **Patterns to align with:** Task list with clear checkboxes; simple cards or list rows; one prominent add control; restrained motion and visual noise so the list stays primary.

### Trickle-Down to Epics and Stories

- **Epics/stories** must reference: (1) Todoist-level simplicity and hierarchy, (2) dark mode by default with theme switcher for light, (3) accent colour system for primary action and key states, (4) minimalist dark UI patterns above.

### Branding: Logo

- **Asset:** `zaffr/public/brand/logo-zaffr.svg` (SVG, 430×279 viewBox; fill white—suitable for dark background). Reference in app as `/brand/logo-zaffr.svg`.
- **Placement:** **Desktop:** sidebar (e.g. top of sidebar). **Mobile:** header (e.g. left side of header).
- **Implementation:** Use path `/brand/logo-zaffr.svg` in layout/shell; ensure logo scales for container and respects theme (e.g. invert or swap fill for light mode if needed).

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

- **Todoist** (see Stakeholder UX/UI Inspiration): Gold standard for simplicity and hierarchy; clear information hierarchy, minimal chrome, features that stay out of the way.
- **Minimal list-first products:** Patterns from apps that put the list front and centre with little navigation: single primary view, strong empty state, instant feedback. Supports "list first" and "calm and focused" goals.
- **Dark-mode accent UI** (see Stakeholder UX/UI Inspiration): Dark by default, distinct accent palette for primary action and key states; minimalist, modern aesthetic with clear typography and hierarchy.

### Transferable UX Patterns

- **Single primary view:** List (or empty/loading/error) as the only main view; no dashboards or tabs for MVP.
- **Inline actions:** Complete (toggle) and delete on each item; add at top or bottom of list.
- **One clear CTA in empty state:** e.g. "Add your first todo" with visible input or button—no discovery required.
- **Explicit loading and error:** Dedicated loading state (skeleton or spinner); one error state with copy that explains and suggests next step.
- **Dark default + theme switcher:** Default dark theme with optional light mode; accent colours for primary action and states (per Stakeholder inspiration).

### Anti-Patterns to Avoid

- **Silent loading:** User sees blank or stale content with no indication of loading—always show loading state.
- **Vague or multiple error messages:** One error state, one message, one suggested action (e.g. retry or check connection).
- **Heavy onboarding:** No sign-up gates, tours, or tooltips for core use; empty state is the only entry.
- **Buried primary action:** Add-todo must be visible or one click away (e.g. always in view or clearly in empty state).
- **Unclear empty state:** Empty state that looks like a broken or empty screen—always explain "no items" and what to do next.

### Design Inspiration Strategy

- **Adopt:** List-first layout; inline complete and delete; obvious empty-state CTA; one loading and one error state with clear, actionable copy; dark mode by default with theme switcher; accent colour system for primary action and key states (per Stakeholder UX/UI Inspiration).
- **Adapt:** Keep patterns minimal for MVP (no priorities, dates, or extra features); ensure accessibility (WCAG, keyboard) is built in; align accent palette and components with dark-first, Todoist-level hierarchy.
- **Avoid:** Onboarding flows; multiple or vague error UIs; hidden loading; empty state that doesn't guide the user; light-only or ignoring theme preference.

## Design System Foundation

### 1.1 Design System Choice

**Themeable utility-first system: Tailwind CSS** (per architecture) with a **design-token layer** for theming and accents. No separate heavy component library; Tailwind utilities plus a small set of custom or minimal components (list, item, form, empty/loading/error) that follow the token system.

### Rationale for Selection

- **Alignment with architecture:** Tailwind is already specified; this step formalises it from a UX perspective and adds theme and accent structure.
- **Stakeholder UX/UI inspiration:** Dark default, accent colours, and theme switcher are best implemented via a single token/theme layer (e.g. Tailwind theme extension or CSS custom properties) so dark/light and accents stay consistent.
- **Simplicity and hierarchy:** Utility-first supports minimal chrome and list-first layout; tokens keep primary action, states, and backgrounds consistent without visual noise.
- **Speed and maintainability:** One styling system, one theme file, clear mapping from UX spec (dark default, accent palette, light option) to implementation.

### Implementation Approach

- **Theme layer:** Define design tokens (or Tailwind `theme` extension) for: background (dark default, light alternate), text, borders, and accent set (primary action, completion, destructive, optional status). Default theme = dark; second theme = light.
- **Theme switcher:** User preference (e.g. control in UI) toggles between dark and light; preference persisted (e.g. localStorage) and applied on load.
- **Components:** Build only what's needed (list, item, form, empty/loading/error, primary button/FAB) using tokens; avoid pulling in a large component library for MVP.

### Customization Strategy

- **Colour:** All UI colours driven by tokens (no hardcoded hex in components). Accent palette small and distinct; primary action uses one accent; completion/destructive/status use the rest.
- **Dark first:** Default token set is dark; light set is the alternate. New components and screens use tokens so they respect theme switcher automatically.
- **Future:** If brand guidelines appear later, only token values change; structure (dark default, theme switcher, accent roles) stays.
