# Calendar Project Copilot Instructions

## Project Overview

Calendar Print is a React + TypeScript + Vite web application for configuring
and printing custom calendars. It uses MUI Material, MUI X Date Pickers,
React Hook Form, Day.js, and i18next for internationalization.

## Key Commands

- **Install dependencies**: `pnpm install`
- **Start dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint (code)**: `pnpm lint`
- **Lint (markdown)**: `pnpm dlx markdownlint-cli2 "README.md" "docs/**/*.md" ".github/**/*.md"`
- **Preview production build**: `pnpm preview`

Always run `pnpm lint` and `pnpm build` before marking a task complete to
verify there are no errors.

## Code Style and Conventions

- Use TypeScript with strict typing; avoid `any`.
- Use React functional components and hooks only (no class components).
- Follow the existing ESLint configuration (`eslint.config.js`).
- Use `pnpm` as the package manager (not `npm` or `yarn`).
- Translation strings go in `src/locales/` using i18next JSON files.
- CSS-in-JS via MUI `sx` prop or `@emotion/styled` for component styling.
- Print-specific styles use CSS `@media print` rules.

## Source Structure

- `src/` — Application source code (React components, hooks, utils, locales)
- `public/` — Static assets
- `docs/` — Project documentation (MkDocs, numbered hierarchical structure)
- `pdf_event_hook/` — Hook script used in MkDocs PDF generation
- `.github/` — GitHub Actions workflows and Copilot instructions
- `VERSION` — Semantic version file kept in sync with `package.json`

## Documentation Rule For New Features

When implementing or changing a feature, update documentation using the
numbered hierarchical structure in the docs folder.

## Markdownlint Rule

After editing Markdown files, run markdownlint and fix all reported warnings in
repository-authored Markdown files.

Recommended command:

- `pnpm dlx markdownlint-cli2 "README.md" "docs/**/*.md" ".github/**/*.md"`

## Required Docs Structure

Keep documentation organized exactly like this pattern:

- `docs/index.md`
- `docs/01-features/index.md`
- `docs/02-edition-modes/index.md`
- `docs/03-pages-and-screen-captures/index.md`
- `docs/03-pages-and-screen-captures/01-screenshots/index.md`
- `docs/04-technical-dependencies/index.md`
- `docs/05-ci-cd-deployment/index.md`

## How To Add New Documentation Topics

1. Create a new numbered topic folder at docs root using two digits.
2. Add one `index.md` file inside that folder.
3. Add the new topic to `docs/index.md` table of contents.
4. Keep folder numbering sequential (for example: `06-...`, `07-...`).

Example for a new topic:

- `docs/06-print-settings/index.md`

## How To Update Existing Topics

- Feature behavior changes: update `docs/01-features/index.md`.
- Flow or mode changes: update `docs/02-edition-modes/index.md`.
- UI/page changes and captures: update `docs/03-pages-and-screen-captures/index.md`.
- Dependency or tooling changes: update `docs/04-technical-dependencies/index.md`.
- CI/CD or deployment changes: update `docs/05-ci-cd-deployment/index.md`.

## Screen Capture Convention

For page-related captures:

1. Store captures under the topic screenshot subfolder.
2. Use descriptive lowercase file names with hyphens.
3. Keep screenshot references relative in markdown.

Current screenshot location:

- `docs/03-pages-and-screen-captures/01-screenshots/`

## Language Requirement

Write documentation in English.

## Consistency Requirements

- Use one `index.md` per topic folder.
- Do not reintroduce legacy flat files in docs root.
- Keep all links relative and valid after renaming or adding folders.
- Prefer short, task-oriented sections and bullet lists for readability.
