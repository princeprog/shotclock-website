export type Tab = '' | 'schedule' | 'standings' | 'stats' | 'teams'

export const leagueHref = (league: string) => `/leagues/${league}`

export function seasonHref(league: string, season: string, tab: Tab | string = '', params: { [key: string]: string | undefined } = {}) {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) if (value) search.set(key, value)
  const text = search.toString()
  return `/leagues/${league}/${season}${tab ? `/${tab}` : ''}${text ? `?${text}` : ''}`
}

export const teamHref = (league: string, season: string, team: string) => `/leagues/${league}/${season}/teams/${team}`
export const gameHref = (league: string, season: string, game: string) => `/leagues/${league}/${season}/games/${game}`
