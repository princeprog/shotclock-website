import { notFound } from 'next/navigation'

// Server-only access to the Shotclock API's public endpoints. Responses are cached for up to five minutes
// and refreshed sooner when the API calls /api/revalidate with a matching tag.
const REVALIDATE_SECONDS = 300

export type SeasonStatus = 'active' | 'completed'
export type League = { slug: string; name: string; location: string | null; timeZone: string | null; organization: string }
export type Season = { slug: string; name: string; status: SeasonStatus; startDate: string | null; endDate: string | null }
export type Division = { id: string; name: string; minAge: number | null; maxAge: number | null; teamCount: number }
export type Team = { id: string; teamId: string; name: string; abbreviation: string | null }
// A playoff side waiting for a semifinal has no team yet; its name says which result it takes, such as "Lions / Rockets winner".
export type Side = Omit<Team, 'id' | 'teamId'> & { id: string | null; teamId: string | null; score: number | null }
export type Game = {
  id: string; scheduledAt: string | null; status: 'scheduled' | 'live' | 'completed'; stage: string; round: number | null; durationMinutes: number | null
  venue: { name: string; address: string | null } | null; home: Side; away: Side; forfeit: 'home' | 'away' | null
}
// A game's live state: score, clock, team fouls, each player's line and the latest plays.
export type LivePlayerLine = { rosterId: string; name: string; jersey: number | null; points: number; rebounds: number; assists: number; steals: number; blocks: number; turnovers: number; fouls: number }
export type LiveSide = { seasonTeamId: string | null; name: string; score: number; teamFouls: number; timeouts: number; inBonus: boolean; players: LivePlayerLine[] }
export type LivePlay = { id: string; sequence: number; kind: string; points: number | null; seasonTeamId: string | null; player: string | null; period: number; clockMs: number | null; voided: boolean }
export type LiveGameState = {
  gameId: string; status: 'scheduled' | 'live' | 'completed'; version: number; stage: string; scheduledAt: string | null; venueName: string | null; timeZone: string | null
  format: { periodCount: number; periodMinutes: number; overtimeMinutes: number; bonusFouls: number }; period: number
  clock: { remainingMs: number; running: boolean; serverTime: string } | null; home: LiveSide; away: LiveSide; plays: LivePlay[]
}
export type Outcome = 'W' | 'L'
export type StandingRow = {
  rank: number; team: Team; gamesPlayed: number; wins: number; losses: number; winPct: number | null
  pointsFor: number; pointsAgainst: number; pointDifference: number; streak: string | null; lastFive: Outcome[]
}
export type Record = { wins: number; losses: number }
export type TeamStats = {
  team: Team; gamesPlayed: number; wins: number; losses: number; winPct: number | null; scoredGames: number
  pointsFor: number; pointsAgainst: number; pointsPerGame: number | null; allowedPerGame: number | null; averageMargin: number | null
  home: Record; away: Record; forfeitWins: number; forfeitLosses: number; streak: string | null; lastFive: Outcome[]
}
export type Leader = { team: Team; value: number } | null

export type DirectoryLeague = League & { season: Season; teamCount: number; divisionCount: number }
export type Directory = { items: DirectoryLeague[]; page: number; pageSize: number; total: number; totalPages: number }
export type UpcomingGame = Game & { league: { slug: string; name: string; timeZone: string | null }; season: { slug: string }; division: { id: string; name: string } }
export type LeagueDetail = { league: League; seasons: Season[]; defaultSeason: string | null }
export type SeasonDetail = { league: League; seasons: Season[]; season: Season; divisions: Division[]; defaultDivision: string | null }
export type GamesResponse = { division: Division; games: Game[] }
export type StandingsResponse = { division: Division; hasResults: boolean; rows: StandingRow[] }
export type StatsResponse = { division: Division; hasResults: boolean; teams: TeamStats[]; leaders: { offense: Leader; defense: Leader; margin: Leader; winStreak: Leader } }
export type TeamsResponse = { division: Division; hasResults: boolean; teams: (Team & { rank: number; wins: number; losses: number; pointDifference: number; streak: string | null })[] }
// A player's totals and per-game averages from final games with recorded stats.
type StatLine = { points: number; rebounds: number; assists: number; steals: number; blocks: number; turnovers: number; fouls: number }
export type PlayerStatLine = { player: { rosterId: string; name: string; jersey: number | null }; team: Team; games: number; totals: StatLine; perGame: StatLine }
export type PlayerStatsResponse = { division: Division; players: PlayerStatLine[] }
export type TeamResponse = { division: Division; team: Team; standing: StandingRow; stats: TeamStats; games: Game[]; players: PlayerStatLine[] }

// Tagged responses are cached; 'live' responses change by the second and are never cached.
async function get<T>(path: string, tags: string[] | 'live'): Promise<T> {
  const base = process.env.SHOTCLOCK_API_URL
  if (!base) throw new Error('SHOTCLOCK_API_URL is not set')
  const headers: HeadersInit = process.env.PUBLIC_SITE_KEY ? { 'x-shotclock-site-key': process.env.PUBLIC_SITE_KEY } : {}
  const response = await fetch(`${base.replace(/\/$/, '')}/public${path}`, tags === 'live' ? { headers, cache: 'no-store' } : { headers, next: { revalidate: REVALIDATE_SECONDS, tags } })
  if (response.status === 404) notFound()
  if (!response.ok) throw new Error(`The Shotclock API returned ${response.status}`)
  return response.json() as Promise<T>
}

const query = (params: { [key: string]: string | number | undefined }) => {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) if (value !== undefined && value !== '') search.set(key, String(value))
  const text = search.toString()
  return text ? `?${text}` : ''
}
const leagueTag = (slug: string) => [`league:${slug}`]
const seasonPath = (league: string, season: string) => `/leagues/${encodeURIComponent(league)}/seasons/${encodeURIComponent(season)}`

export const getDirectory = (search?: string, page?: number) => get<Directory>(`/leagues${query({ search, page })}`, ['directory'])
export const getUpcoming = (limit = 8) => get<UpcomingGame[]>(`/games/upcoming${query({ limit })}`, ['directory'])
export const getLeague = (league: string) => get<LeagueDetail>(`/leagues/${encodeURIComponent(league)}`, leagueTag(league))
export const getSeason = (league: string, season: string) => get<SeasonDetail>(seasonPath(league, season), leagueTag(league))
export const getGames = (league: string, season: string, params: { division?: string; team?: string; view?: 'upcoming' | 'results' | 'all' }) =>
  get<GamesResponse>(`${seasonPath(league, season)}/games${query(params)}`, leagueTag(league))
export const getStandings = (league: string, season: string, division?: string) => get<StandingsResponse>(`${seasonPath(league, season)}/standings${query({ division })}`, leagueTag(league))
export const getStats = (league: string, season: string, division?: string) => get<StatsResponse>(`${seasonPath(league, season)}/stats${query({ division })}`, leagueTag(league))
export const getPlayerStats = (league: string, season: string, division?: string) => get<PlayerStatsResponse>(`${seasonPath(league, season)}/stats/players${query({ division })}`, leagueTag(league))
export const getTeams = (league: string, season: string, division?: string) => get<TeamsResponse>(`${seasonPath(league, season)}/teams${query({ division })}`, leagueTag(league))
export const getTeam = (league: string, season: string, team: string) => get<TeamResponse>(`${seasonPath(league, season)}/teams/${encodeURIComponent(team)}`, leagueTag(league))

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
// Query values from the address bar; anything malformed falls back to the default instead of erroring.
export const uuidParam = (value: string | string[] | undefined) => (typeof value === 'string' && UUID.test(value) ? value : undefined)
export const getGameDetail = (league: string, season: string, game: string) =>
  get<{ league: League; season: Season; game: LiveGameState }>(`${seasonPath(league, season)}/games/${encodeURIComponent(game)}`, 'live')
