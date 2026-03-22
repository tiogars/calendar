# 01 - Features

This document describes the main capabilities of the Calendar Print application.

## Main Features

1. Calendar configuration form

- Set a custom calendar title
- Add optional free text displayed after the title (max 250 characters)
- Add optional free text displayed below calendars (max 250 characters)
- Select a month range using from/to month and year
- Choose page orientation: portrait or landscape
- Choose month grid layout: `4x3` or `3x4`

1. Dynamic calendar generation

- Builds all months between the selected start and end month (inclusive)
- Renders each month with weekday headers and date cells
- Displays month names with an uppercase first letter in both English and French

1. A4 print preview

- Displays the calendar in an A4-sized page container
- Adjusts width and height based on selected orientation

1. Printing workflow

- One-click print action from preview mode
- Hides edition and action controls in print media
- Shows a footer with the printing date/time

1. Edit and iterate loop

- Users can switch from preview back to edition mode
- Existing configuration is preserved for quick adjustments

1. UI language behavior

- Detects the browser language at startup (`en` or `fr`, with `en` fallback)
- Applies the active language to MUI date picker localization
- Lets users change language from Edition Mode to update translated app labels
  and calendar labels

## Functional Notes

- Date values are stored in `YYYY-MM` format.
- Month generation is inclusive of both `fromDate` and `toDate`.
- The app currently trusts user input order and does not block `fromDate > toDate`.
- Free text fields are limited to 250 characters and show a live counter.
