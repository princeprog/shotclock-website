// Formatting shared by server and client components. Pass the league's IANA time zone when it is set.
export type Zone = string | null | undefined

const formatter = (options: Intl.DateTimeFormatOptions, timeZone: Zone) =>
  new Intl.DateTimeFormat('en-US', { ...options, ...(timeZone ? { timeZone } : {}) })

export function formatDay(iso: string, timeZone: Zone) {
  return formatter({ weekday: 'short', month: 'short', day: 'numeric' }, timeZone).format(new Date(iso))
}

export function formatLongDay(iso: string, timeZone: Zone) {
  return formatter({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }, timeZone).format(new Date(iso))
}

export function formatTime(iso: string, timeZone: Zone) {
  return formatter({ hour: 'numeric', minute: '2-digit' }, timeZone).format(new Date(iso))
}

// Calendar day in the given zone, for grouping games by date.
export function dayKey(iso: string, timeZone: Zone) {
  const parts = formatter({ year: 'numeric', month: '2-digit', day: '2-digit' }, timeZone).formatToParts(new Date(iso))
  const get = (type: string) => parts.find((part) => part.type === type)!.value
  return `${get('year')}-${get('month')}-${get('day')}`
}

// Season dates are plain calendar dates (YYYY-MM-DD) and never shift by time zone.
export function formatCalendarDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(year, month - 1, day))
}

export function seasonDates(start: string | null, end: string | null) {
  if (start && end) return `${formatCalendarDate(start)} – ${formatCalendarDate(end)}`
  if (start) return `Starts ${formatCalendarDate(start)}`
  if (end) return `Ends ${formatCalendarDate(end)}`
  return null
}

// Two or three letters for a team badge: the organizer's abbreviation, else initials.
export function initials(name: string, abbreviation?: string | null) {
  const short = abbreviation?.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 3)
  if (short) return short.toUpperCase()
  const words = name.split(/\s+/).map((word) => word.replace(/[^\p{L}\p{N}]/gu, '')).filter(Boolean)
  if (!words.length) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

// Baseball-style percentage: .875, 1.000, or a dash before any games.
export function formatPct(value: number | null) {
  if (value === null) return '–'
  return value === 1 ? '1.000' : value.toFixed(3).replace(/^0/, '')
}

export function formatSigned(value: number) {
  if (value > 0) return `+${value}`
  if (value < 0) return `−${Math.abs(value)}`
  return '0'
}

export function formatAverage(value: number | null) {
  return value === null ? '–' : value.toFixed(1)
}

export function formatSignedAverage(value: number | null) {
  if (value === null) return '–'
  return value > 0 ? `+${value.toFixed(1)}` : value < 0 ? `−${Math.abs(value).toFixed(1)}` : '0.0'
}

export function stageLabel(stage: string, round: number | null) {
  if (stage === 'semifinal') return 'Semifinal'
  if (stage === 'final') return 'Championship'
  if (stage === 'third_place') return 'Third place'
  return round ? `Round ${round}` : null
}

export function divisionAges(minAge: number | null, maxAge: number | null) {
  if (minAge !== null && maxAge !== null) return `Ages ${minAge}–${maxAge - 1}`
  if (minAge !== null) return `Ages ${minAge}+`
  if (maxAge !== null) return `Under ${maxAge}`
  return null
}
