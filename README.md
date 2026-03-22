# Calendar Print

A web application for configuring and printing custom calendars, built with
Vite, React, TypeScript, MUI Material, and MUI X Date Pickers.

## Features

- **Edition Mode**: Configure your calendar via a form:
  - Header title
  - Optional free text shown under the title in preview and print
  - Optional free text shown below the calendars in preview and print
  - Date range (from/to month & year)
  - Orientation: Portrait or Landscape
  - Grid layout: 4 columns × 3 rows or 3 columns × 4 rows
- **Preview Mode**: See an A4-sized preview of the calendar grid with all
  configured months
- **Print Support**: Click Print to print the calendar; action buttons are
  hidden and the current datetime appears in the footer

## Setup

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm build
```

## Deployment

This project is automatically deployed to GitHub Pages on every push to the
`main` branch using GitHub Actions. The workflow also:

- Validates code and documentation with linting
- Manages semantic versioning automatically
- Creates releases with versioned archives
- Publishes built site to GitHub Pages

For detailed deployment configuration and instructions, see
[CI/CD Deployment](./docs/05-ci-cd-deployment/index.md).

## Documentation

- Full project documentation is available in the [docs](./docs/index.md)
  folder.

## Tech Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) +
  [TypeScript](https://www.typescriptlang.org/)
- [MUI Material](https://mui.com/material-ui/) for UI components
- [MUI X Date Pickers](https://mui.com/x/react-date-pickers/) for month/year
  selection
- [React Hook Form](https://react-hook-form.com/) for form state management
- [Day.js](https://day.js.org/) for date manipulation
