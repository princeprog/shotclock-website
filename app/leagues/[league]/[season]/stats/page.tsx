import Link from 'next/link'
import type { Metadata } from 'next'
import { getStats, type Leader, type TeamStats } from '@/lib/api'
import { formatAverage, formatPct, formatSignedAverage } from '@/lib/format'
import { DivisionChips } from '@/components/division-chips'
import { EmptyState } from '@/components/empty-state'
import { FormGuide, Streak } from '@/components/form-guide'
import { TeamBadge } from '@/components/team-badge'
import { FollowMark } from '@/components/follow-mark'
import { ScrollTable } from '@/components/scroll-table'
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

function SortHeader({ id, sort, href, children }: { id: Sort; sort: Sort; href: string; children: string }) {
  return (
    <th scope="col" aria-sort={sort === id ? (SORTS[id].direction < 0 ? 'descending' : 'ascending') : undefined} className={cn(th, 'text-right')}>
      <Link href={href} scroll={false} title={`Sort by ${SORTS[id].label.toLowerCase()}`} className={cn('hover:text-ink', sort === id && 'text-orange-ink underline decoration-2 underline-offset-4')}>{children}</Link>
    </th>
  )
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return { title: (await loadSeason(params, searchParams)).title('Team stats') }
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

function LeaderItem({ label, leader, unit, league, season, format = formatAverage }: { label: string; leader: Leader; unit: string; league: string; season: string; format?: (value: number) => string }) {
  return (
    <div className="bg-surface px-5 py-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-2">
        {leader ? (
          <Link href={teamHref(league, season, leader.team.id)} className="flex items-center gap-2.5 hover:underline">
            <TeamBadge name={leader.team.name} abbreviation={leader.team.abbreviation} size="sm" />
            <span className="min-w-0 truncate font-semibold text-ink">{leader.team.name}</span>
          </Link>
        ) : <span className="text-muted">–</span>}
        {leader && <p className="mt-1 text-sm text-ink tabular">{format(leader.value)} {unit}</p>}
      </dd>
    </div>
  )
}

export default async function StatsPage({ params, searchParams }: Props) {
  const { league, season, divisions, division, search } = await loadSeason(params, searchParams)
  if (!division) return <EmptyState title="No divisions yet">This season has no divisions to show.</EmptyState>
  const stats = await getStats(league.slug, season.slug, division)
  const sort: Sort = typeof search.sort === 'string' && search.sort in SORTS ? search.sort as Sort : 'pct'
  const rows = sortRows(stats.teams, sort)
  const divisionParam = divisions.length > 1 ? division : undefined
  const sortHref = (next: Sort) => seasonHref(league.slug, season.slug, 'stats', { division: divisionParam, sort: next === 'pct' ? undefined : next })
  return (
    <div className="space-y-6">
      <DivisionChips divisions={divisions} current={division} href={(id) => seasonHref(league.slug, season.slug, 'stats', { division: id, sort: sort === 'pct' ? undefined : sort })} />
      <h2 className="text-xl font-bold text-ink sm:text-[1.375rem]">{stats.division.name} team stats</h2>
      {!stats.teams.length ? <EmptyState title="No teams yet">Teams appear here once they register for this division.</EmptyState> : (
        <>
          {stats.hasResults ? (
            <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              <LeaderItem label="Best offense" leader={stats.leaders.offense} unit="points per game" league={league.slug} season={season.slug} />
              <LeaderItem label="Best defense" leader={stats.leaders.defense} unit="points allowed per game" league={league.slug} season={season.slug} />
              <LeaderItem label="Best average margin" leader={stats.leaders.margin} unit="points per game" format={formatSignedAverage} league={league.slug} season={season.slug} />
              <LeaderItem label="Longest win streak" leader={stats.leaders.winStreak} unit={stats.leaders.winStreak?.value === 1 ? 'win in a row' : 'wins in a row'} format={String} league={league.slug} season={season.slug} />
            </dl>
          ) : <p className="text-muted">Stats fill in after the first final score.</p>}
          <ScrollTable>
            <table className="w-full min-w-max text-[0.9375rem]">
              <caption className="sr-only">{stats.division.name} team stats, sorted by {SORTS[sort].label.toLowerCase()}</caption>
              <thead className="border-b border-line bg-wash">
                <tr>
                  <th scope="col" className={cn(th, 'sticky left-0 bg-wash pl-4 text-left sm:static sm:bg-transparent')}>Team</th>
                  <th scope="col" className={cn(th, 'text-right')}>W–L</th>
                  <SortHeader id="ppg" sort={sort} href={sortHref('ppg')}>PPG</SortHeader>
                  <SortHeader id="opp" sort={sort} href={sortHref('opp')}>OPP</SortHeader>
                  <SortHeader id="margin" sort={sort} href={sortHref('margin')}>Margin</SortHeader>
                  <SortHeader id="pct" sort={sort} href={sortHref('pct')}>PCT</SortHeader>
                  <th scope="col" className={cn(th, 'text-right')}><abbr title="Games played" className="no-underline">GP</abbr></th>
                  <th scope="col" className={cn(th, 'text-right')}>Home</th>
                  <th scope="col" className={cn(th, 'text-right')}>Away</th>
                  <th scope="col" className={cn(th, 'text-right')}><abbr title="Current streak" className="no-underline">Strk</abbr></th>
                  <th scope="col" className={cn(th, 'pr-4 text-left')}>Last 5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row) => (
                  <tr key={row.team.id} data-team={row.team.teamId} className="bg-surface">
                    <th scope="row" className="sticky left-0 bg-inherit py-2.5 pr-3 pl-4 text-left font-medium">
                      <Link href={teamHref(league.slug, season.slug, row.team.id)} className="flex items-center gap-2.5 hover:underline">
                        <TeamBadge name={row.team.name} abbreviation={row.team.abbreviation} size="sm" />
                        <span className="max-w-[11rem] truncate sm:max-w-none">{row.team.name}</span>
                        <FollowMark />
                      </Link>
                    </th>
                    <td className="px-3 text-right font-semibold tabular">{row.wins}–{row.losses}</td>
                    <td className="px-3 text-right tabular">{formatAverage(row.pointsPerGame)}</td>
                    <td className="px-3 text-right tabular">{formatAverage(row.allowedPerGame)}</td>
                    <td className="px-3 text-right tabular">{formatSignedAverage(row.averageMargin)}</td>
                    <td className="px-3 text-right tabular">{formatPct(row.winPct)}</td>
                    <td className="px-3 text-right text-muted tabular">{row.gamesPlayed}</td>
                    <td className="px-3 text-right tabular">{row.home.wins}–{row.home.losses}</td>
                    <td className="px-3 text-right tabular">{row.away.wins}–{row.away.losses}</td>
                    <td className="px-3 text-right tabular"><Streak value={row.streak} /></td>
                    <td className="px-3 pr-4"><FormGuide results={row.lastFive} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollTable>
          <p className="max-w-[70ch] text-sm leading-relaxed text-muted">
            Stats include every final game in the division, playoffs too. Forfeits count as wins and losses but are left out of points and averages. PPG is points scored per game, OPP is points allowed per game.
          </p>
        </>
      )}
    </div>
  )
}
