import { getSeason, uuidParam } from '@/lib/api'

export type SeasonParams = Promise<{ league: string; season: string }>
export type SeasonSearch = Promise<{ [key: string]: string | string[] | undefined }>

// Resolves the season and the division chosen in the address bar, falling back to the season's default division.
export async function loadSeason(params: SeasonParams, searchParams: SeasonSearch) {
  const [{ league, season }, search] = await Promise.all([params, searchParams])
  const detail = await getSeason(league, season)
  const requested = uuidParam(search.division)
  const division = requested && detail.divisions.some((item) => item.id === requested) ? requested : detail.defaultDivision
  return { ...detail, search, division, title: (tab: string) => `${tab} · ${detail.season.name} · ${detail.league.name}` }
}
