# 04 - Technical Dependencies

This document summarizes the runtime and development dependencies currently
declared in `package.json`.

## Runtime Dependencies

- `react` / `react-dom`:
  Core UI rendering and component model.
- `@mui/material`:
  Material UI components used for layout and controls.
- `@mui/icons-material`:
  Icon set used in action buttons and app bar.
- `@emotion/react` / `@emotion/styled`:
  Styling engine used by Material UI.
- `@mui/x-date-pickers`:
  Month/year picker components for date range selection.
- `dayjs`:
  Date parsing and formatting used for month generation and display.
- `i18next`:
  Core internationalization engine used for runtime language resources.
- `react-i18next`:
  React bindings for translation hooks and UI re-render on language switch.
- `react-hook-form`:
  Form state management and validation in Edition Mode.

## Development Dependencies

- `vite` and `@vitejs/plugin-react`:
  Development server and production bundling.
- `typescript` and `@types/*` packages:
  Type-safe development and tooling support.
- `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`,
  `eslint-plugin-react-refresh`, `globals`:
  Linting and code quality checks.
- `@types/node`:
  Node.js type declarations for tooling/config files.

## Tooling Scripts

- `pnpm dev` or `npm run dev`:
  Start local development server.
- `pnpm build` or `npm run build`:
  Type-check and create production build.
- `pnpm lint` or `npm run lint`:
  Run linting rules.
- `pnpm preview` or `npm run preview`:
  Preview production build locally.

## Integration Notes

- Date pickers are wrapped with `LocalizationProvider` and the Day.js adapter.
- App text translations are handled by `i18next` and `react-i18next`.
- Print behavior is controlled primarily by CSS `@media print` rules.
- The current `@page` print size rule is set to A4 landscape in CSS.
