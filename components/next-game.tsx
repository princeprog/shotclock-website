'use client'

import Link from 'next/link'
import { CalendarDaysIcon, ClockIcon, MapPinIcon, StarIcon } from 'lucide-react'
import type { Game, Side } from '@/lib/api'
import { stageLabel, type Zone } from '@/lib/format'
import { seasonHref, teamHref } from '@/lib/routes'
import { useFollow } from '@/components/follow'
import { TeamBadge } from '@/components/team-badge'
import { When } from '@/components/when'

function Team({ side, href, followed }: { side: Side; href: string; followed: boolean }) {
  return (
    <Link href={href} className="flex min-w-0 items-center gap-3 py-1.5 hover:underline">
      <TeamBadge name={side.name} abbreviation={side.abbreviation} />
      <span className="min-w-0 text-lg font-bold tracking-[-0.02em] text-ink sm:text-xl">{side.name}</span>
      {followed && <StarIcon aria-label="Followed team" className="size-4 shrink-0 fill-orange text-orange-ink" />}
    </Link>
  )
}

function FollowPrompt({ league, season }: { league: string; season: string }) {
  return <p className="mt-4 text-sm text-ink/80">Follow your team on the <Link href={seasonHref(league, season, 'teams')} className="font-semibold text-orange-ink underline">Teams</Link> tab to see its next game here first.</p>
}

// Shows the followed team's next game when a team is followed, otherwise the division's next game.
export function NextGame({ games, timeZone, league, season }: { games: Game[]; timeZone: Zone; league: string; season: string }) {
  const { teamId } = useFollow()
  const followed = teamId ? games.find((game) => game.home.teamId === teamId || game.away.teamId === teamId) : undefined
  const game = followed ?? games[0]
  if (!game?.scheduledAt) {
    return (
      <section aria-labelledby="next-game" className="rounded-2xl border border-line bg-surface p-6">
        <h2 id="next-game" className="text-xl font-bold text-ink">Next game</h2>
        <p className="mt-2 text-muted">No upcoming games are scheduled in this division.</p>
        {!teamId && <FollowPrompt league={league} season={season} />}
      </section>
    )
  }
  const followedName = followed && (followed.home.teamId === teamId ? followed.home.name : followed.away.name)
  const stage = stageLabel(game.stage, game.round)
  return (
    <section aria-labelledby="next-game" className="rounded-2xl border border-orange/50 bg-orange-wash p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="next-game" className="text-xl font-bold text-orange-ink">{followedName ? `Next game for ${followedName}` : 'Next game'}</h2>
        {stage && <p className="text-sm font-semibold text-ink">{stage}</p>}
      </div>
      <div className="mt-4 grid items-center gap-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-4">
        <Team side={game.home} href={teamHref(league, season, game.home.id)} followed={game.home.teamId === teamId} />
        <span className="pl-12 text-sm font-medium text-muted sm:pl-0">vs</span>
        <Team side={game.away} href={teamHref(league, season, game.away.id)} followed={game.away.teamId === teamId} />
      </div>
      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-orange/30 pt-4 text-[0.9375rem] text-ink">
        <div className="flex items-center gap-2"><dt><CalendarDaysIcon aria-label="Date" className="size-4 text-orange-ink" /></dt><dd><When iso={game.scheduledAt} timeZone={timeZone} show="day" /></dd></div>
        <div className="flex items-center gap-2"><dt><ClockIcon aria-label="Tip-off" className="size-4 text-orange-ink" /></dt><dd className="tabular"><When iso={game.scheduledAt} timeZone={timeZone} show="time" /></dd></div>
        <div className="flex min-w-0 items-center gap-2"><dt><MapPinIcon aria-label="Venue" className="size-4 text-orange-ink" /></dt><dd className="min-w-0">{game.venue ? <>{game.venue.name}{game.venue.address && <span className="text-muted">, {game.venue.address}</span>}</> : 'Venue to be announced'}</dd></div>
      </dl>
      {!teamId && <FollowPrompt league={league} season={season} />}
    </section>
  )
}
