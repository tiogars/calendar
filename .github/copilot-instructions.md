# Calendar Project Copilot Instructions

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

## How To Add New Documentation Topics

1. Create a new numbered topic folder at docs root using two digits.
2. Add one `index.md` file inside that folder.
3. Add the new topic to `docs/index.md` table of contents.
4. Keep folder numbering sequential (for example: `05-...`, `06-...`).

Example for a new topic:

- `docs/05-print-settings/index.md`

## How To Update Existing Topics

- Feature behavior changes: update `docs/01-features/index.md`.
- Flow or mode changes: update `docs/02-edition-modes/index.md`.
- UI/page changes and captures: update `docs/03-pages-and-screen-captures/index.md`.
- Dependency or tooling changes: update `docs/04-technical-dependencies/index.md`.

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
