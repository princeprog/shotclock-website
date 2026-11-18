import Link from 'next/link'
import type { Game, Side } from '@/lib/api'
import { stageLabel, type Zone } from '@/lib/format'
import { FollowMark } from '@/components/follow-mark'
import { TeamBadge } from '@/components/team-badge'
import { When } from '@/components/when'
import { cn } from '@/lib/utils'

function TeamLine({ side, won, completed, forfeited, href }: { side: Side; won: boolean; completed: boolean; forfeited: boolean; href?: string }) {
  const name = <span className={cn('truncate', (completed && !won) || !side.teamId ? 'text-muted' : 'text-ink', won && 'font-bold')}>{side.name}</span>
  return (
    <div className="flex min-w-0 items-center gap-2.5 py-1">
      {side.teamId ? <TeamBadge name={side.name} abbreviation={side.abbreviation} size="sm" /> : <span aria-hidden="true" className="size-7 shrink-0 rounded-full border border-dashed border-line" />}
      {href ? <Link href={href} className="min-w-0 truncate hover:underline">{name}</Link> : name}
      <FollowMark teamId={side.teamId} />
      {forfeited && <span className="text-xs font-semibold text-loss">Forfeit</span>}
      {completed && <span className={cn('ml-auto pl-3 text-lg tabular', won ? 'font-extrabold text-ink' : 'text-muted')}>{side.score}</span>}
    </div>
  )
}

// A full game row inside a tile: time, both teams with scores, venue and status. The whole row tints when either team is followed.
export function GameRow({ game, timeZone, showDay = true, teamHref, now }: { game: Game; timeZone: Zone; showDay?: boolean; teamHref?: (teamId: string) => string; now: number }) {
  const completed = game.status === 'completed'
  const homeWon = completed && (game.home.score ?? 0) > (game.away.score ?? 0)
  const stage = stageLabel(game.stage, game.round)
  const pending = !completed && game.scheduledAt !== null && new Date(game.scheduledAt).getTime() < now
  return (
    <li data-team={game.home.teamId} data-team-away={game.away.teamId} className="grid gap-x-6 gap-y-2 px-4 py-3.5 sm:grid-cols-[7.5rem_minmax(0,1fr)_minmax(0,13rem)] sm:items-center sm:px-5">
      <div className="flex items-baseline justify-between gap-3 text-sm sm:block">
        <p className="text-ink tabular">
          {game.scheduledAt ? <>
            {showDay && <span className="font-semibold sm:block"><When iso={game.scheduledAt} timeZone={timeZone} show="day" /><span className="sm:hidden"> · </span></span>}
            <span className={cn(showDay ? 'text-muted' : 'font-semibold')}><When iso={game.scheduledAt} timeZone={timeZone} show="time" /></span>
          </> : 'Time to be set'}
        </p>
        {stage && <p className={cn('text-xs sm:mt-0.5', game.stage === 'preliminary' ? 'text-muted' : 'font-bold text-ink')}>{stage}</p>}
      </div>
      <div className="min-w-0">
        <TeamLine side={game.home} won={homeWon} completed={completed} forfeited={game.forfeit === 'home'} href={game.home.id ? teamHref?.(game.home.id) : undefined} />
        <TeamLine side={game.away} won={completed && !homeWon} completed={completed} forfeited={game.forfeit === 'away'} href={game.away.id ? teamHref?.(game.away.id) : undefined} />
      </div>
      <div className="flex items-center justify-between gap-3 text-sm text-muted sm:flex-col sm:items-end sm:text-right">
        <p className="min-w-0 truncate">{game.venue ? game.venue.name : 'Venue to be announced'}</p>
        {completed ? <span className="rounded-full bg-wash px-2.5 py-0.5 text-xs font-bold text-ink">Final</span>
          : pending ? <span className="text-xs">Result pending</span> : null}
      </div>
    </li>
  )
}

export function GameList({ games, timeZone, teamHref, now, empty }: { games: Game[]; timeZone: Zone; teamHref?: (teamId: string) => string; now: number; empty?: string }) {
  if (!games.length) return empty ? <p className="px-5 py-8 text-center text-muted">{empty}</p> : null
  return <ul className="divide-y divide-line">{games.map((game) => <GameRow key={game.id} game={game} timeZone={timeZone} teamHref={teamHref} now={now} />)}</ul>
}

// A compact one-line matchup, used in overview tiles. The row tints when either team is followed.
export function MatchRow({ game, timeZone, href }: { game: Game; timeZone: Zone; href?: string }) {
  const content = (
    <>
      <span className="min-w-0 font-semibold text-ink sm:truncate">
        {game.home.name}<span className="ml-1 inline-flex align-[-0.1em]"><FollowMark teamId={game.home.teamId} /></span> <span className="font-normal text-muted">vs</span> {game.away.name}<span className="ml-1 inline-flex align-[-0.1em]"><FollowMark teamId={game.away.teamId} /></span>
      </span>
      <span className="shrink-0 text-sm text-muted tabular">{game.scheduledAt ? <When iso={game.scheduledAt} timeZone={timeZone} /> : 'Time to be set'}</span>
    </>
  )
  return (
    <li data-team={game.home.teamId} data-team-away={game.away.teamId} className="-mx-5 border-t border-line px-5 first:border-t-0">
      {href ? <Link href={href} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 hover:[&>span:first-child]:underline">{content}</Link>
        : <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">{content}</div>}
    </li>
  )
}
