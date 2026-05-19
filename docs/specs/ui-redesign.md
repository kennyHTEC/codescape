# Spec — UI Redesign

## Overview
This feature redesigns the full application into a modern minimalist learning experience with a dedicated welcome entry point and a persistent left sidebar app shell. Navigation shifts from top headers to an always-available sidebar, while the main panel focuses on section concept cards and concept detail reading. The app defaults to dark mode and supports an in-app theme toggle.

## Features
- User lands on a dedicated welcome screen with logo, short engaging copy, and a single CTA to enter the app.
- User navigates the app inside a persistent left sidebar layout with section links, a logo header link to welcome, and a theme toggle in the footer.
- User can browse section concepts in the main panel with card-based presentation and no top navigation bar.
- User can open concept details from an Explore button on each concept card.
- User can read full concept details and a syntax-highlighted code example on the concept detail screen.
- App opens in dark mode by default and user can toggle to light mode globally.
- JavaScript section data is sourced from `src/data/javascript.json` with exactly two mock concepts: Inheritance and Abstraction.

## Acceptance Criteria
### Welcome Screen
- Given the app launches, when the first screen is rendered, then the user sees logo, welcome copy, and a CTA button.
- Given the user presses the CTA button, when navigation occurs, then the user enters the main app shell.
- Given the user is on any app screen, when the sidebar logo is pressed, then the app navigates back to welcome.

### Persistent Sidebar App Shell
- Given the user is in the app shell, when any screen renders, then a left sidebar remains visible with section items.
- Given the user is in the app shell, when viewing any route, then no top navigation bar is shown.
- Given the user opens the sidebar footer, when rendered, then a theme toggle control is visible and interactive.

### Section Concepts View
- Given a section is selected, when the section screen renders, then the main area shows concept cards for that section.
- Given a concept card renders, when displayed, then it includes title, short description, and an Explore button.
- Given description text exceeds two lines, when rendered on the card, then text is truncated to two lines.

### Concept Detail View
- Given the user presses Explore on a concept card, when navigation completes, then the concept detail screen opens for that concept.
- Given concept detail renders, when displayed, then it shows the concept title and full description.
- Given concept detail renders code content, when displayed, then code appears in a syntax-highlighted code block.

### Theme Behavior
- Given the app launches for a new session, when theme state initializes, then dark mode is active by default.
- Given the user toggles theme, when any app-shell screen is visible, then colors update to the selected theme.
- Given navigation occurs between app-shell routes, when theme is set, then the selected theme remains consistent.

### Data Requirements
- Given section data loads, when JavaScript concepts are requested, then data is read from `src/data/javascript.json`.
- Given JavaScript section data exists, when validated, then it contains exactly two concepts with ids `inheritance` and `abstraction`.
- Given each JavaScript concept is read, when inspected, then `id`, `title`, `description`, `content`, `codeExample`, and `tryItCode` are populated.

## Data Model
### Entity: Concept
- id: string
- title: string
- description: string
- content: string
- codeExample: string
- tryItCode: string

### Entity: Section
- id: string
- title: string
- color: string
- concepts: Concept[]

### Entity: ThemeState
- mode: 'dark' | 'light'

### Relationships
- Section has many Concept.
- ThemeState is global UI state applied across all rendered screens in the app shell.

## Function Contract
- getSections(): Section[]
  - Input: none
  - Output: array of all available sections
  - Error shape: no throw; returns empty array if no sections

- getSectionById(id: string): Section | undefined
  - Input: section id
  - Output: matching section or undefined
  - Error shape: no throw; undefined for unknown id

- getConceptById(sectionId: string, conceptId: string): Concept | undefined
  - Input: section id and concept id
  - Output: matching concept or undefined
  - Error shape: no throw; undefined for unknown section or concept

- useSections(): { sections: Section[]; getSectionById: (id: string) => Section | undefined; getConceptById: (sectionId: string, conceptId: string) => Concept | undefined }
  - Input: none
  - Output: section list and lookup helpers for UI consumption
  - Error shape: returns safe defaults; no thrown errors

- useTheme(): { theme: ThemeState['mode']; colors: ThemeColors; toggleTheme: () => void; setTheme: (mode: ThemeState['mode']) => void }
  - Input: none
  - Output: active theme mode, resolved color tokens, and mutators
  - Error shape: throws `Error { name: 'ThemeProviderMissingError', message: string }` if used outside provider

## Out of Scope
- Persisting theme choice across app restarts, because persistence is not requested.
- Adding new sections beyond JavaScript, because this request only specifies JavaScript mock content.
- Interactive code runner behavior, because this feature only requires display of example code.
- Search, filtering, and sorting for concepts, because discoverability changes are not requested.

## Decisions Made
- Open question: whether welcome screen should include sidebar. Decision: welcome is standalone without sidebar to preserve focused onboarding entry. Why: requirement says app opens on welcome and app shell behavior starts after CTA.
- Open question: where sidebar appears on small devices. Decision: sidebar remains left-side in app shell with responsive compact width instead of hidden drawer. Why: requirement explicitly asks for persistent sidebar.
- Open question: what route should CTA open. Decision: CTA opens the first available section concept-list route. Why: user should immediately enter content browsing.
- Open question: where no-navbar rule applies. Decision: no top navigation bar on all routes, including welcome and app shell. Why: requirement states no navbar anywhere.
- Open question: source of section list. Decision: sidebar section entries are derived from data layer `getSections()`. Why: avoids hardcoded navigation entries and keeps data-driven behavior.
