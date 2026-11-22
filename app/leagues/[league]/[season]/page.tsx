import type { Metadata } from 'next'
import Link from 'next/link'
import { getGames, getStandings, getStats, type Game, type Leader } from '@/lib/api'
import { formatAverage, type Zone } from '@/lib/format'
import { requestTime } from '@/lib/clock'
import { EmptyState } from '@/components/empty-state'
import { FollowMark } from '@/components/follow-mark'
import { LiveBadge, MatchRow } from '@/components/game-row'
import { NextGame } from '@/components/next-game'
import { StandingsTable } from '@/components/standings-table'
import { TileHeader } from '@/components/tile-header'
import { When } from '@/components/when'
import { loadSeason, type SeasonParams, type SeasonSearch } from '@/lib/season-page'
import { gameHref, seasonHref, teamHref } from '@/lib/routes'
import { cn } from '@/lib/utils'

type Props = { params: SeasonParams; searchParams: SeasonSearch }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { league, season } = await loadSeason(params, searchParams)
  return { title: `${season.name} · ${league.name}`, description: `Schedule, results and standings for ${league.name}, ${season.name}.` }
}

function LatestResult({ game, timeZone, league, season }: { game?: Game; timeZone: Zone; league: string; season: string }) {
  if (!game) return <p className="mt-3 text-muted">No final scores yet. Results appear here as soon as they’re recorded.</p>
  const homeWon = (game.home.score ?? 0) > (game.away.score ?? 0)
  // Final results always have both teams.
  const line = (side: Game['home'], won: boolean) => (
    <Link href={teamHref(league, season, side.id!)} data-team={side.teamId} className={cn('-mx-2 flex items-center gap-2 rounded-lg px-2 py-1 text-lg hover:underline', won ? 'font-extrabold text-ink' : 'text-muted')}>
      <span className="truncate">{side.name}</span><FollowMark teamId={side.teamId} />
      <span className="ml-auto pl-4 text-[1.375rem] tabular">{side.score}</span>
    </Link>
  )
  return (
    <>
      <div className="mt-3">{line(game.home, homeWon)}{line(game.away, !homeWon)}</div>
      <p className="mt-3 text-sm text-muted">Final{game.forfeit && ' (forfeit)'}{game.scheduledAt && <> · <When iso={game.scheduledAt} timeZone={timeZone} show="day" /></>}{game.venue && <> · {game.venue.name}</>}</p>
    </>
  )
}

function LeaderTile({ value, label, leader }: { value: string; label: string; leader: Leader }) {
  return (
    <div className="rounded-xl bg-wash p-3.5">
      <p className="text-[1.75rem] leading-none font-extrabold tracking-[-0.03em] tabular">{value}</p>
      <p className="mt-2 text-sm text-muted">{label}{leader && <> · <span className="text-ink">{leader.team.name}</span></>}</p>
    </div>
  )
}

export default async function OverviewPage({ params, searchParams }: Props) {
  const { league, season, division } = await loadSeason(params, searchParams)
  if (!division) return <EmptyState title="No divisions yet">This season has no divisions to show.</EmptyState>
  const [games, standings, stats] = await Promise.all([getGames(league.slug, season.slug, { division }), getStandings(league.slug, season.slug, division), getStats(league.slug, season.slug, division)])
  const now = requestTime()
  const upcoming = games.games.filter((game) => game.status === 'scheduled' && game.scheduledAt && Date.parse(game.scheduledAt) >= now)
  const recent = games.games.filter((game) => game.status === 'completed').reverse()
  const live = games.games.filter((game) => game.status === 'live')
  const params2 = { division }
  const { offense, defense, winStreak } = stats.leaders
  return (
    <div className="grid gap-3.5 lg:grid-cols-4">
      {live.length > 0 && <section aria-labelledby="live-now" className="tile p-5 sm:p-6 lg:col-span-4">
        <h2 id="live-now" className="flex items-center gap-2 text-lg font-bold text-ink">Live now</h2>
        <ul className="mt-2 divide-y divide-line">{live.map((game) => <li key={game.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5">
          <span className="min-w-0 font-semibold text-ink">{game.home.name} <span className="font-normal text-muted">vs</span> {game.away.name}</span>
          <span className="flex items-center gap-3"><LiveBadge href={gameHref(league.slug, season.slug, game.id)} /><Link href={gameHref(league.slug, season.slug, game.id)} className="text-sm font-semibold text-ink hover:underline">Watch live</Link></span>
        </li>)}</ul>
      </section>}
      <NextGame className="lg:col-span-2" games={upcoming.slice(0, 50)} timeZone={league.timeZone} league={league.slug} season={season.slug} />
      <section aria-labelledby="latest" className="tile p-5 sm:p-6 lg:col-span-2">
        <TileHeader id="latest" title="Latest result" href={recent.length ? seasonHref(league.slug, season.slug, 'schedule', { ...params2, view: 'results' }) : undefined} linkLabel="All results" />
        <LatestResult game={recent[0]} timeZone={league.timeZone} league={league.slug} season={season.slug} />
      </section>
      <section aria-labelledby="coming-up" className="tile overflow-hidden p-5 sm:p-6 lg:col-span-2">
        <TileHeader id="coming-up" title="Coming up" href={seasonHref(league.slug, season.slug, 'schedule', params2)} linkLabel="Schedule" />
        {upcoming.length
          ? <ul className="mt-2">{upcoming.slice(0, 5).map((game) => <MatchRow key={game.id} game={game} timeZone={league.timeZone} href={seasonHref(league.slug, season.slug, 'schedule', params2)} />)}</ul>
          : <p className="mt-3 text-muted">No upcoming games are scheduled.</p>}
      </section>
      <section aria-labelledby="standings-tile" className="tile overflow-hidden py-5 sm:py-6 lg:col-span-2 lg:row-span-2">
        <TileHeader id="standings-tile" title={`${standings.division.name} standings`} href={seasonHref(league.slug, season.slug, 'standings', params2)} linkLabel="Full table" className="mb-2 px-5 sm:px-6" />
        {standings.rows.length
          ? <StandingsTable compact rows={standings.rows} league={league.slug} season={season.slug} caption={`${standings.division.name} standings`} />
          : <p className="px-6 text-muted">No teams yet.</p>}
        {!standings.hasResults && standings.rows.length > 0 && <p className="mt-3 px-5 text-sm text-muted sm:px-6">Rankings update after the first final score.</p>}
      </section>
      <section aria-labelledby="leaders" className="tile p-5 sm:p-6 lg:col-span-2">
        <TileHeader id="leaders" title="Team leaders" href={seasonHref(league.slug, season.slug, 'stats', params2)} linkLabel="Team stats" />
        {stats.hasResults ? (
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            <LeaderTile value={formatAverage(offense?.value ?? null)} label="Points per game" leader={offense} />
            <LeaderTile value={formatAverage(defense?.value ?? null)} label="Allowed per game" leader={defense} />
            <LeaderTile value={winStreak ? String(winStreak.value) : '–'} label="Win streak" leader={winStreak} />
          </div>
        ) : <p className="mt-3 text-muted">Leaders appear after the first final score.</p>}
      </section>
    </div>
  )
}
