import Link from 'next/link'
import type { Metadata } from 'next'
import { getGames, getTeams, uuidParam, type Game } from '@/lib/api'
import { dayKey, formatLongDay } from '@/lib/format'
import { requestTime } from '@/lib/clock'
import { EmptyState } from '@/components/empty-state'
import { GameRow } from '@/components/game-row'
import { TeamFilter } from '@/components/team-filter'
import { loadSeason, type SeasonParams, type SeasonSearch } from '@/lib/season-page'
import { gameHref, seasonHref, teamHref } from '@/lib/routes'
import { cn } from '@/lib/utils'

type Props = { params: SeasonParams; searchParams: SeasonSearch }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return { title: (await loadSeason(params, searchParams)).title('Schedule') }
}

function groupByDay(games: Game[], timeZone: string | null) {
  const groups: { key: string; label: string; games: Game[] }[] = []
  for (const game of games) {
    const key = game.scheduledAt ? dayKey(game.scheduledAt, timeZone ?? 'UTC') : 'unscheduled'
    let group = groups.at(-1)
    if (!group || group.key !== key) {
      group = { key, label: game.scheduledAt ? formatLongDay(game.scheduledAt, timeZone ?? 'UTC') : 'Date to be set', games: [] }
      groups.push(group)
    }
    group.games.push(game)
  }
  return groups
}

export default async function SchedulePage({ params, searchParams }: Props) {
  const { league, season, division, search } = await loadSeason(params, searchParams)
  if (!division) return <EmptyState title="No divisions yet">This season has no divisions to show.</EmptyState>
  const view = search.view === 'results' ? 'results' : 'upcoming'
  const teams = await getTeams(league.slug, season.slug, division)
  const requestedTeam = uuidParam(search.team)
  const team = requestedTeam && teams.teams.some((item) => item.id === requestedTeam) ? requestedTeam : undefined
  const { games } = await getGames(league.slug, season.slug, { division, team, view })
  const now = requestTime()
  const href = (next: { view?: string; team?: string }) => seasonHref(league.slug, season.slug, 'schedule', { division, view: next.view === 'results' ? 'results' : undefined, team: next.team })
  const teamLinks = Object.fromEntries([['all', href({ view })], ...teams.teams.map((item) => [item.id, href({ view, team: item.id })])])
  const groups = groupByDay(games, league.timeZone)
  const teamName = team && teams.teams.find((item) => item.id === team)?.name
  return (
    <div className="space-y-3.5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Schedule view" className="inline-flex w-fit gap-1 rounded-xl bg-surface p-1">
          {(['upcoming', 'results'] as const).map((item) => (
            <Link key={item} href={href({ view: item, team })} aria-current={view === item ? 'page' : undefined} scroll={false}
              className={cn('inline-flex h-9 items-center rounded-[9px] px-4 text-[0.9375rem] font-semibold transition-colors', view === item ? 'bg-ink text-white' : 'text-muted hover:bg-wash hover:text-ink')}>
              {item === 'upcoming' ? 'Upcoming' : 'Results'}
            </Link>
          ))}
        </nav>
        {teams.teams.length > 0 && <TeamFilter teams={teams.teams} value={team ?? 'all'} hrefFor={teamLinks as { [teamId: string]: string } & { all: string }} />}
      </div>
      {groups.length ? groups.map((group) => (
        <section key={group.key} aria-label={group.label} className="tile overflow-hidden pt-4">
          <h2 className="px-4 text-[0.8125rem] font-semibold tracking-normal text-muted sm:px-5">{group.label}</h2>
          <ul className="mt-1 divide-y divide-line">
            {group.games.map((game) => <GameRow key={game.id} game={game} timeZone={league.timeZone} showDay={false} now={now} teamHref={(id) => teamHref(league.slug, season.slug, id)} gameHref={(id) => gameHref(league.slug, season.slug, id)} />)}
          </ul>
        </section>
      )) : (
        <EmptyState title={view === 'results' ? 'No results yet' : 'No upcoming games'}>
          {view === 'results' ? `Final scores${teamName ? ` for ${teamName}` : ''} appear here once they’re recorded.` : `There are no games scheduled${teamName ? ` for ${teamName}` : ''} right now.`}
        </EmptyState>
      )}
      {groups.length > 0 && !league.timeZone && <p className="text-sm text-muted">Times are shown in your device’s time zone.</p>}
    </div>
  )
}
