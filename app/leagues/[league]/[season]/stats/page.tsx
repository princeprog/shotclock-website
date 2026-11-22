import Link from 'next/link'
import type { Metadata } from 'next'
import { getPlayerStats, getStats, type Leader, type TeamStats } from '@/lib/api'
import { formatAverage, formatPct, formatSignedAverage } from '@/lib/format'
import { EmptyState } from '@/components/empty-state'
import { FollowMark } from '@/components/follow-mark'
import { FormGuide, Streak } from '@/components/form-guide'
import { PlayerLeaders, PlayerStatsTable } from '@/components/player-stats'
import { ScrollTable } from '@/components/scroll-table'
import { TeamBadge } from '@/components/team-badge'
import { TileHeader } from '@/components/tile-header'
import { loadSeason, type SeasonParams, type SeasonSearch } from '@/lib/season-page'
import { seasonHref, teamHref } from '@/lib/routes'
import { cn } from '@/lib/utils'

type Props = { params: SeasonParams; searchParams: SeasonSearch }
const SORTS = {
  pct: { label: 'Win percentage', value: (row: TeamStats) => row.winPct, direction: -1 },
  ppg: { label: 'Points per game', value: (row: TeamStats) => row.pointsPerGame, direction: -1 },
  opp: { label: 'Points allowed per game', value: (row: TeamStats) => row.allowedPerGame, direction: 1 },
  margin: { label: 'Average margin', value: (row: TeamStats) => row.averageMargin, direction: -1 },
} as const
type Sort = keyof typeof SORTS
const th = 'px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.04em] text-muted'

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return { title: (await loadSeason(params, searchParams)).title('Stats') }
}

// Teams without the stat sort last; ties fall back to wins and name.
function sortRows(rows: TeamStats[], sort: Sort) {
  const { value, direction } = SORTS[sort]
  return [...rows].sort((a, b) => {
    const x = value(a), y = value(b)
    if (x === null || y === null) return x === y ? a.team.name.localeCompare(b.team.name) : x === null ? 1 : -1
    return (x - y) * direction || b.wins - a.wins || a.team.name.localeCompare(b.team.name)
  })
}

function SortHeader({ id, sort, href, children }: { id: Sort; sort: Sort; href: string; children: string }) {
  return (
    <th scope="col" aria-sort={sort === id ? (SORTS[id].direction < 0 ? 'descending' : 'ascending') : undefined} className={cn(th, 'text-right')}>
      <Link href={href} scroll={false} title={`Sort by ${SORTS[id].label.toLowerCase()}`} className={cn('hover:text-ink', sort === id && 'text-orange-ink underline decoration-2 underline-offset-4')}>{children}</Link>
    </th>
  )
}

function LeaderTile({ label, leader, value, league, season }: { label: string; leader: Leader; value: string; league: string; season: string }) {
  return (
    <div className="rounded-xl bg-wash p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1.5 text-[1.75rem] leading-none font-extrabold tracking-[-0.03em] tabular">{leader ? value : '–'}</p>
      {leader && <Link href={teamHref(league, season, leader.team.id)} className="mt-2 flex items-center gap-2 text-sm font-semibold hover:underline"><TeamBadge name={leader.team.name} abbreviation={leader.team.abbreviation} size="sm" /><span className="truncate">{leader.team.name}</span></Link>}
    </div>
  )
}

export default async function StatsPage({ params, searchParams }: Props) {
  const { league, season, division, search } = await loadSeason(params, searchParams)
  if (!division) return <EmptyState title="No divisions yet">This season has no divisions to show.</EmptyState>
  const [stats, playerStats] = await Promise.all([getStats(league.slug, season.slug, division), getPlayerStats(league.slug, season.slug, division)])
  if (!stats.teams.length) return <EmptyState title="No teams yet">Teams appear here once they register for this division.</EmptyState>
  const sort: Sort = typeof search.sort === 'string' && search.sort in SORTS ? search.sort as Sort : 'pct'
  const rows = sortRows(stats.teams, sort)
  const sortHref = (next: Sort) => seasonHref(league.slug, season.slug, 'stats', { division, sort: next === 'pct' ? undefined : next })
  const { offense, defense, margin, winStreak } = stats.leaders
  return (
    <div className="space-y-3.5">
      <section aria-labelledby="leaders" className="tile p-5 sm:p-6">
        <TileHeader id="leaders" title={`${stats.division.name} team leaders`} />
        {stats.hasResults ? (
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <LeaderTile label="Best offense, points per game" leader={offense} value={formatAverage(offense?.value ?? null)} league={league.slug} season={season.slug} />
            <LeaderTile label="Best defense, allowed per game" leader={defense} value={formatAverage(defense?.value ?? null)} league={league.slug} season={season.slug} />
            <LeaderTile label="Best average margin" leader={margin} value={formatSignedAverage(margin?.value ?? null)} league={league.slug} season={season.slug} />
            <LeaderTile label="Longest win streak" leader={winStreak} value={String(winStreak?.value ?? '–')} league={league.slug} season={season.slug} />
          </div>
        ) : <p className="mt-3 text-muted">Stats fill in after the first final score.</p>}
      </section>
      <section aria-labelledby="stats-table" className="tile overflow-hidden py-5 sm:py-6">
        <TileHeader id="stats-table" title="Team stats" className="mb-2 px-5 sm:px-6" />
        <ScrollTable>
          <table className="w-full min-w-max text-[0.9375rem]">
            <caption className="sr-only">{stats.division.name} team stats, sorted by {SORTS[sort].label.toLowerCase()}</caption>
            <thead className="border-b border-line">
              <tr>
                <th scope="col" className={cn(th, 'sticky left-0 bg-surface pl-5 text-left sm:pl-6')}>Team</th>
                <th scope="col" className={cn(th, 'text-right')}>W–L</th>
                <SortHeader id="ppg" sort={sort} href={sortHref('ppg')}>PPG</SortHeader>
                <SortHeader id="opp" sort={sort} href={sortHref('opp')}>OPP</SortHeader>
                <SortHeader id="margin" sort={sort} href={sortHref('margin')}>Margin</SortHeader>
                <SortHeader id="pct" sort={sort} href={sortHref('pct')}>PCT</SortHeader>
                <th scope="col" className={cn(th, 'text-right')}><abbr title="Games played" className="no-underline">GP</abbr></th>
                <th scope="col" className={cn(th, 'text-right')}>Home</th>
                <th scope="col" className={cn(th, 'text-right')}>Away</th>
                <th scope="col" className={cn(th, 'text-right')}><abbr title="Current streak" className="no-underline">Strk</abbr></th>
                <th scope="col" className={cn(th, 'pr-5 text-left sm:pr-6')}>Last 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => (
                <tr key={row.team.id} data-team={row.team.teamId} className="bg-surface">
                  <th scope="row" className="sticky left-0 bg-inherit py-2.5 pr-3 pl-5 text-left font-medium sm:pl-6">
                    <Link href={teamHref(league.slug, season.slug, row.team.id)} className="flex items-center gap-2.5 hover:underline">
                      <TeamBadge name={row.team.name} abbreviation={row.team.abbreviation} size="sm" />
                      <span className="max-w-[11rem] truncate sm:max-w-none">{row.team.name}</span>
                      <FollowMark teamId={row.team.teamId} />
                    </Link>
                  </th>
                  <td className="px-3 text-right font-bold tabular">{row.wins}–{row.losses}</td>
                  <td className="px-3 text-right tabular">{formatAverage(row.pointsPerGame)}</td>
                  <td className="px-3 text-right tabular">{formatAverage(row.allowedPerGame)}</td>
                  <td className="px-3 text-right tabular">{formatSignedAverage(row.averageMargin)}</td>
                  <td className="px-3 text-right tabular">{formatPct(row.winPct)}</td>
                  <td className="px-3 text-right text-muted tabular">{row.gamesPlayed}</td>
                  <td className="px-3 text-right tabular">{row.home.wins}–{row.home.losses}</td>
                  <td className="px-3 text-right tabular">{row.away.wins}–{row.away.losses}</td>
                  <td className="px-3 text-right tabular"><Streak value={row.streak} /></td>
                  <td className="px-3 pr-5 sm:pr-6"><FormGuide results={row.lastFive} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollTable>
        <p className="mt-4 max-w-[70ch] px-5 text-sm leading-relaxed text-muted sm:px-6">
          Stats include every final game in the division, playoffs too. Forfeits count as wins and losses but are left out of points and averages. PPG is points scored per game, OPP is points allowed per game.
        </p>
      </section>
      {playerStats.players.length > 0 && <>
        <PlayerLeaders players={playerStats.players} league={league.slug} season={season.slug} title={`${stats.division.name} player leaders`} />
        <PlayerStatsTable players={playerStats.players} league={league.slug} season={season.slug} title="Player stats" />
      </>}
    </div>
  )
}
