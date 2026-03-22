# 02 - Edition Modes

The application has two modes controlled by internal UI state.

## 1) Edition Mode

Purpose: configure calendar content and layout.

Main UI elements:

- UI language selector (English/French)
- Calendar title text field
- From month/year picker
- To month/year picker
- Orientation selector (portrait or landscape)
- Grid layout selector (`4x3` or `3x4`)
- Preview button

Behavior:

- On app load, the initial UI language is detected from the browser language.
- Users can change language in Edition Mode, and MUI picker labels update immediately.
- Form data is managed with React Hook Form.
- Required field validation is applied to title and date fields.
- Clicking Preview stores the current configuration and switches to Preview Mode.

## 2) Preview Mode

Purpose: validate the rendered calendar before printing.

Main UI elements:

- Back to Edit button
- Print button
- Calendar page preview (A4 dimensions)
- Footer with print timestamp

Behavior:

- The month list is recalculated from the selected date range.
- Grid columns/rows are derived from the selected layout.
- Clicking Back to Edit returns to Edition Mode while keeping existing values.
- Clicking Print updates timestamp and opens the browser print dialog.

## Mode Transition Rules

- Default mode at app start: Edition Mode.
- Transition `edition -> preview`: user submits the settings form.
- Transition `preview -> edition`: user clicks Back to Edit.
