'use client'

import Link from 'next/link'
import { StarIcon } from 'lucide-react'
import type { UpcomingGame } from '@/lib/api'
import { seasonHref } from '@/lib/routes'
import { useFollowedTeams } from '@/components/follow'
import { When } from '@/components/when'

// On the directory, the orange tile leads with a followed team's next game this week. Nothing renders when no followed team plays.
export function FollowedNextGame({ games }: { games: UpcomingGame[] }) {
  const followed = useFollowedTeams()
  const game = games.find((item) => followed.includes(item.home.teamId ?? '') || followed.includes(item.away.teamId ?? ''))
  if (!game?.scheduledAt) return null
  const mine = followed.includes(game.home.teamId ?? '') ? game.home : game.away
  const name = (side: UpcomingGame['home']) => <>{side.name}{side.teamId === mine.teamId && <StarIcon aria-label="Followed team" className="ml-1.5 inline size-[0.8em] fill-ink align-[-0.05em]" />}</>
  return (
    <section aria-labelledby="your-next-game" className="relative mt-3.5 rounded-[18px] bg-orange p-5 text-ink sm:p-6">
      <h2 id="your-next-game" className="text-[0.8125rem] font-bold tracking-normal">Your team&rsquo;s next game · {game.league.name}</h2>
      <p className="mt-3 text-[1.625rem] leading-[1.15] font-extrabold tracking-[-0.025em] sm:text-[1.875rem]">
        <Link href={seasonHref(game.league.slug, game.season.slug, '', { division: game.division.id })} className="after:absolute after:inset-0 after:rounded-[18px] hover:underline">
          {name(game.home)} <span className="text-[0.7em] font-semibold opacity-80">vs</span> {name(game.away)}
        </Link>
      </p>
      <p className="mt-3 font-semibold tabular"><When iso={game.scheduledAt} timeZone={game.league.timeZone} />{game.venue && <> · {game.venue.name}</>}</p>
    </section>
  )
}
