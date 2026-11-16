'use client'

import Link from 'next/link'
import { StarIcon } from 'lucide-react'
import type { Game } from '@/lib/api'
import { stageLabel, type Zone } from '@/lib/format'
import { seasonHref, teamHref } from '@/lib/routes'
import { useFollow } from '@/components/follow'
import { When } from '@/components/when'

// The one orange tile: the followed team's next game when a team is followed, otherwise the division's next game.
export function NextGame({ games, timeZone, league, season, className = '' }: { games: Game[]; timeZone: Zone; league: string; season: string; className?: string }) {
  const { teamId } = useFollow()
  const followed = teamId ? games.find((game) => game.home.teamId === teamId || game.away.teamId === teamId) : undefined
  const game = followed ?? games[0]
  if (!game?.scheduledAt) {
    return (
      <section aria-labelledby="next-game" className={`tile p-5 sm:p-6 ${className}`}>
        <h2 id="next-game" className="text-[0.8125rem] font-semibold tracking-normal text-muted">Next game</h2>
        <p className="mt-3 text-lg font-bold">No upcoming games are scheduled in this division.</p>
        {!teamId && <p className="mt-2 text-sm text-muted">Follow your team on the <Link href={seasonHref(league, season, 'teams')} className="font-semibold text-orange-ink underline">Teams</Link> tab to see its games first.</p>}
      </section>
    )
  }
  const stage = stageLabel(game.stage, game.round)
  const label = followed ? "Your team's next game" : 'Next game'
  const name = (side: Game['home']) => (
    <Link href={teamHref(league, season, side.id)} className="hover:underline">
      {side.name}{side.teamId === teamId && <StarIcon aria-label="Followed team" className="ml-1.5 inline size-[0.8em] fill-ink align-[-0.05em]" />}
    </Link>
  )
  return (
    <section aria-labelledby="next-game" className={`rounded-[18px] bg-orange p-5 text-ink sm:p-6 ${className}`}>
      <h2 id="next-game" className="text-[0.8125rem] font-bold tracking-normal">{label}{stage && ` · ${stage}`}</h2>
      <p className="mt-3 text-[1.625rem] leading-[1.15] font-extrabold tracking-[-0.025em] sm:text-[1.875rem]">
        {name(game.home)} <span className="text-[0.7em] font-semibold opacity-80">vs</span> {name(game.away)}
      </p>
      <p className="mt-3 font-semibold tabular">
        <When iso={game.scheduledAt} timeZone={timeZone} />{game.venue && <> · {game.venue.name}</>}
      </p>
      {!teamId && <p className="mt-4 text-sm font-medium">Following a team? <Link href={seasonHref(league, season, 'teams')} className="font-bold underline">Pick yours</Link> to see its next game here.</p>}
    </section>
  )
}
