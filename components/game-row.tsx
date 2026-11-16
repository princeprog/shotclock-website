import Link from 'next/link'
import type { Game, Side } from '@/lib/api'
import { stageLabel, type Zone } from '@/lib/format'
import { TeamBadge } from '@/components/team-badge'
import { When } from '@/components/when'
import { FollowMark } from '@/components/follow-mark'
import { cn } from '@/lib/utils'

function TeamLine({ side, won, completed, forfeited, href }: { side: Side; won: boolean; completed: boolean; forfeited: boolean; href?: string }) {
  const name = <span className={cn('truncate', completed && !won ? 'text-muted' : 'text-ink', won && 'font-semibold')}>{side.name}</span>
  return (
    <div data-team={side.teamId} className="-mx-2 flex min-w-0 items-center gap-2.5 rounded-md px-2 py-1">
      <TeamBadge name={side.name} abbreviation={side.abbreviation} size="sm" />
      {href ? <Link href={href} className="min-w-0 truncate hover:underline">{name}</Link> : name}
      <FollowMark />
      {forfeited && <span className="text-xs font-medium text-loss">Forfeit</span>}
      {completed && <span className={cn('ml-auto pl-3 text-base tabular', won ? 'font-bold text-ink' : 'text-muted')}>{side.score}</span>}
    </div>
  )
}

export function GameRow({ game, timeZone, showDay = true, teamHref, now }: { game: Game; timeZone: Zone; showDay?: boolean; teamHref?: (teamId: string) => string; now: number }) {
  const completed = game.status === 'completed'
  const homeWon = completed && (game.home.score ?? 0) > (game.away.score ?? 0)
  const stage = stageLabel(game.stage, game.round)
  const pending = !completed && game.scheduledAt !== null && new Date(game.scheduledAt).getTime() < now
  return (
    <li className="grid gap-x-6 gap-y-2 px-4 py-3.5 sm:grid-cols-[7.5rem_minmax(0,1fr)_minmax(0,13rem)] sm:items-center sm:px-5">
      <div className="flex items-baseline justify-between gap-3 text-sm sm:block">
        <p className="text-ink tabular">
          {game.scheduledAt ? <>
            {showDay && <span className="font-medium sm:block"><When iso={game.scheduledAt} timeZone={timeZone} show="day" /><span className="sm:hidden"> · </span></span>}
            <span className={cn(showDay ? 'text-muted' : 'font-medium')}><When iso={game.scheduledAt} timeZone={timeZone} show="time" /></span>
          </> : 'Time to be set'}
        </p>
        {stage && <p className={cn('text-xs sm:mt-0.5', game.stage === 'preliminary' ? 'text-muted' : 'font-semibold text-orange-ink')}>{stage}</p>}
      </div>
      <div className="min-w-0">
        <TeamLine side={game.home} won={homeWon} completed={completed} forfeited={game.forfeit === 'home'} href={teamHref?.(game.home.id)} />
        <TeamLine side={game.away} won={completed && !homeWon} completed={completed} forfeited={game.forfeit === 'away'} href={teamHref?.(game.away.id)} />
      </div>
      <div className="flex items-center justify-between gap-3 text-sm text-muted sm:flex-col sm:items-end sm:text-right">
        <p className="min-w-0 truncate">{game.venue ? game.venue.name : 'Venue to be announced'}</p>
        {completed ? <span className="rounded-full bg-wash px-2 py-0.5 text-xs font-semibold text-ink">Final</span>
          : pending ? <span className="text-xs">Result pending</span> : null}
      </div>
    </li>
  )
}

export function GameList({ games, timeZone, teamHref, now, empty }: { games: Game[]; timeZone: Zone; teamHref?: (teamId: string) => string; now: number; empty?: string }) {
  if (!games.length) return empty ? <p className="rounded-xl border border-line bg-surface px-5 py-8 text-center text-muted">{empty}</p> : null
  return <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">{games.map((game) => <GameRow key={game.id} game={game} timeZone={timeZone} teamHref={teamHref} now={now} />)}</ul>
}
