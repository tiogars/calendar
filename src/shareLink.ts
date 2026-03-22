import {
  type CalendarConfig,
  type FirstDayOfWeek,
  type GridLayout,
  type Orientation,
  type UiLanguage,
} from './types'

const SHARE_QUERY_PARAM = 'state'
const MAX_FREE_TEXT_LENGTH = 400

interface SharedState {
  language: UiLanguage
  config: CalendarConfig
}

const orientationValues = new Set<Orientation>(['portrait', 'landscape'])
const gridLayoutValues = new Set<GridLayout>(['4x3', '3x4'])
const firstDayOfWeekValues = new Set<FirstDayOfWeek>(['monday', 'sunday'])
const languageValues = new Set<UiLanguage>(['en', 'fr'])

function isYearMonth(value: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(value)
}

function clampText(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }

  return value.slice(0, MAX_FREE_TEXT_LENGTH)
}

function normalizeLanguage(value: unknown): UiLanguage | null {
  if (typeof value !== 'string') {
    return null
  }

  return languageValues.has(value as UiLanguage) ? (value as UiLanguage) : null
}

function isOrientation(value: unknown): value is Orientation {
  return typeof value === 'string' && orientationValues.has(value as Orientation)
}

function isGridLayout(value: unknown): value is GridLayout {
  return typeof value === 'string' && gridLayoutValues.has(value as GridLayout)
}

function isFirstDayOfWeek(value: unknown): value is FirstDayOfWeek {
  return typeof value === 'string' && firstDayOfWeekValues.has(value as FirstDayOfWeek)
}

function normalizeConfig(value: unknown, fallback: CalendarConfig): CalendarConfig {
  if (!value || typeof value !== 'object') {
    return fallback
  }

  const source = value as Partial<CalendarConfig>

  return {
    title: typeof source.title === 'string' && source.title.trim().length > 0
      ? source.title
      : fallback.title,
    freeText: clampText(source.freeText),
    freeTextBelowCalendars: clampText(source.freeTextBelowCalendars),
    fromDate: typeof source.fromDate === 'string' && isYearMonth(source.fromDate)
      ? source.fromDate
      : fallback.fromDate,
    toDate: typeof source.toDate === 'string' && isYearMonth(source.toDate)
      ? source.toDate
      : fallback.toDate,
    orientation: isOrientation(source.orientation)
      ? source.orientation
      : fallback.orientation,
    gridLayout: isGridLayout(source.gridLayout)
      ? source.gridLayout
      : fallback.gridLayout,
    firstDayOfWeek: isFirstDayOfWeek(source.firstDayOfWeek)
      ? source.firstDayOfWeek
      : fallback.firstDayOfWeek,
  }
}

function toBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''

  bytes.forEach((byte) => {
    binary += String.fromCodePoint(byte)
  })

  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll(/=+$/g, '')
}

function fromBase64Url(value: string): string {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.codePointAt(0) ?? 0)

  return new TextDecoder().decode(bytes)
}

export function buildShareUrl(config: CalendarConfig, language: UiLanguage): string {
  const state: SharedState = { config, language }
  const encodedState = toBase64Url(JSON.stringify(state))
  const shareUrl = new URL(globalThis.location.href)

  shareUrl.searchParams.set(SHARE_QUERY_PARAM, encodedState)

  return shareUrl.toString()
}

export function parseShareState(
  search: string,
  fallbackLanguage: UiLanguage,
  fallbackConfig: CalendarConfig,
): SharedState {
  const params = new URLSearchParams(search)
  const encodedState = params.get(SHARE_QUERY_PARAM)

  if (!encodedState) {
    return {
      language: fallbackLanguage,
      config: fallbackConfig,
    }
  }

  try {
    const parsed = JSON.parse(fromBase64Url(encodedState)) as {
      language?: unknown
      config?: unknown
    }

    return {
      language: normalizeLanguage(parsed.language) ?? fallbackLanguage,
      config: normalizeConfig(parsed.config, fallbackConfig),
    }
  } catch {
    return {
      language: fallbackLanguage,
      config: fallbackConfig,
    }
  }
}
