export type Orientation = 'portrait' | 'landscape';
export type GridLayout = '4x3' | '3x4';
export type UiLanguage = 'en' | 'fr';

export interface CalendarConfig {
  title: string;
  fromDate: string; // YYYY-MM format
  toDate: string;   // YYYY-MM format
  orientation: Orientation;
  gridLayout: GridLayout;
}
