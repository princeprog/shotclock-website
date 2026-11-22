'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AwardIcon } from 'lucide-react'
import type { LiveGameState, LiveSide } from '@/lib/api'
import { clockRemaining, describePlay, formatClock, periodLabel } from '@/lib/live'
import { When } from '@/components/when'
import { cn } from '@/lib/utils'

// A live game updates over Server-Sent Events. If the stream keeps failing, the page refreshes every 15 seconds instead.
export function LiveGame({ initial, teamHrefs }: { initial: LiveGameState; teamHrefs: { [seasonTeamId: string]: string } }) {
  const router = useRouter()
  const [streamed, setStreamed] = useState<{ game: LiveGameState; readAt: number } | null>(null)
  const [loadedAt] = useState(() => Date.now())
  const [now, setNow] = useState(() => Date.now())
  const game = streamed && streamed.game.version >= initial.version && streamed.game.status === initial.status ? streamed.game : streamed?.game.status === 'completed' ? streamed.game : initial
  const readAt = streamed && game === streamed.game ? streamed.readAt : loadedAt
  const remaining = clockRemaining(game.clock, readAt, now)
  const running = game.status === 'live' && !!game.clock?.running && remaining > 0

  useEffect(() => {
    if (initial.status !== 'live') return
    let failures = 0
    let poll: ReturnType<typeof setInterval> | undefined
    const source = new EventSource(`/api/live/${initial.gameId}`)
    source.addEventListener('snapshot', (event) => {
      failures = 0
      const next = JSON.parse((event as MessageEvent<string>).data) as LiveGameState
      setStreamed({ game: next, readAt: Date.now() })
      if (next.status === 'completed') { source.close(); router.refresh() }
    })
    source.onerror = () => {
      failures += 1
      if (failures < 3 || poll) return
      source.close()
      poll = setInterval(() => router.refresh(), 15_000)
    }
    return () => { source.close(); clearInterval(poll) }
  }, [initial.gameId, initial.status, router])

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(timer)
  }, [running])

  const plays = game.plays.filter((play) => !play.voided && play.kind !== 'period_end')
  const teamName = (id: string | null) => id === game.home.seasonTeamId ? game.home.name : game.away.name
  return (
    <div className="space-y-3.5">
      <section aria-label="Scoreboard" className="tile grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 p-5 sm:p-7">
        <Score side={game.home} href={game.home.seasonTeamId ? teamHrefs[game.home.seasonTeamId] : undefined} lost={game.status === 'completed' && game.home.score < game.away.score} />
        <div className="flex flex-col items-center gap-1.5 text-center">
          {game.status === 'live' ? <>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-loss px-2.5 py-0.5 text-xs font-bold text-white"><span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-white" />LIVE</span>
            <span className="text-sm font-semibold text-muted">{periodLabel(game.period, game.format.periodCount)}</span>
            <span className="font-mono text-3xl font-bold tabular text-ink sm:text-4xl">{formatClock(remaining)}</span>
          </> : game.status === 'completed' ? <span className="rounded-full bg-wash px-3 py-1 text-xs font-bold text-ink">Final</span>
            : <span className="text-sm text-muted">{game.scheduledAt ? <When iso={game.scheduledAt} timeZone={game.timeZone} /> : 'Time to be set'}</span>}
        </div>
        <Score side={game.away} align="end" href={game.away.seasonTeamId ? teamHrefs[game.away.seasonTeamId] : undefined} lost={game.status === 'completed' && game.away.score < game.home.score} />
      </section>
      {game.status === 'scheduled' ? <p className="tile px-5 py-8 text-center text-muted">This game hasn’t started. The live score and player stats appear here when it begins.</p> : <>
        <div className="grid gap-3.5 lg:grid-cols-2">
          {game.status === 'completed' && game.bestPlayer && <BestPlayer player={game.bestPlayer} />}
          <BoxScore side={game.home} bestRosterId={game.bestPlayer?.rosterId} />
          <BoxScore side={game.away} bestRosterId={game.bestPlayer?.rosterId} />
        </div>
        <section aria-labelledby="plays" className="tile overflow-hidden pt-4">
          <h2 id="plays" className="px-5 text-[0.8125rem] font-semibold text-muted">{game.status === 'live' ? 'Latest plays' : 'Last plays'}</h2>
          {plays.length ? <ul className="mt-1 divide-y divide-line">{plays.slice(0, 15).map((play) => (
            <li key={play.id} className="flex items-center gap-4 px-5 py-2.5 text-sm">
              <span className="w-20 shrink-0 font-mono text-xs text-muted tabular">{periodLabel(play.period, game.format.periodCount)} {play.clockMs !== null ? formatClock(play.clockMs) : ''}</span>
              <span className="min-w-0 flex-1 truncate text-ink">{describePlay(play)}</span>
              <span className="shrink-0 truncate text-muted">{teamName(play.seasonTeamId)}</span>
            </li>
          ))}</ul> : <p className="px-5 py-6 text-muted">Plays appear here as they happen.</p>}
        </section>
      </>}
    </div>
  )
}

function Score({ side, align = 'start', href, lost }: { side: LiveSide; align?: 'start' | 'end'; href?: string; lost: boolean }) {
  const name = <span className="truncate">{side.name}</span>
  return (
    <div className={cn('flex min-w-0 flex-col gap-1', align === 'end' && 'items-end text-right')}>
      <span className="max-w-full truncate text-base font-semibold text-ink sm:text-lg">{href ? <Link href={href} className="hover:underline">{name}</Link> : name}</span>
      <span className={cn('text-5xl font-extrabold tabular sm:text-6xl', lost ? 'text-muted' : 'text-ink')}>{side.score}</span>
      {side.inBonus && <span className="text-xs font-semibold text-loss">Bonus</span>}
    </div>
  )
}

// The winning team's best player, picked when the game finished.
function BestPlayer({ player }: { player: NonNullable<LiveGameState['bestPlayer']> }) {
  const stats = [['PTS', player.points], ['REB', player.rebounds], ['AST', player.assists], ['STL', player.steals], ['BLK', player.blocks]] as const
  return (
    <section aria-labelledby="best-player" className="tile flex flex-wrap items-center gap-x-6 gap-y-4 p-5 lg:col-span-2">
      <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-wash text-orange-ink"><AwardIcon className="size-6" /></span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h2 id="best-player" className="text-[0.8125rem] font-semibold text-muted">Best player</h2>
        <p className="truncate text-lg font-bold text-ink">{player.name}{player.jersey !== null && <span className="ml-2 font-mono text-sm font-normal text-muted">#{player.jersey}</span>}</p>
        <p className="truncate text-sm text-muted">{player.teamName}</p>
      </div>
      <dl className="flex gap-5">{stats.map(([label, value]) => (
        <div key={label} className="flex flex-col-reverse items-center gap-0.5">
          <dt className="text-xs font-semibold text-muted">{label}</dt>
          <dd className="text-xl font-extrabold tabular text-ink">{value}</dd>
        </div>
      ))}</dl>
    </section>
  )
}

function BoxScore({ side, bestRosterId }: { side: LiveSide; bestRosterId?: string }) {
  return (
    <section aria-label={`${side.name} box score`} className="tile overflow-hidden pt-4">
      <h2 className="px-5 font-semibold text-ink">{side.name}</h2>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[28rem] text-sm">
          <thead><tr className="border-b border-line text-xs text-muted">
            <th scope="col" className="py-2 pl-5 text-left font-semibold">Player</th>
            {['PTS', 'REB', 'AST', 'STL', 'BLK', 'TO', 'PF'].map((label) => <th key={label} scope="col" className="w-11 py-2 text-right font-semibold last:pr-5">{label}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-line">{side.players.map((player) => (
            <tr key={player.rosterId}>
              <td className="max-w-0 truncate py-2 pl-5 text-ink"><span className="mr-2 font-mono text-xs text-muted">{player.jersey ?? '–'}</span>{player.name}{player.rosterId === bestRosterId && <><AwardIcon aria-hidden="true" className="ml-1.5 inline size-3.5 align-[-2px] text-orange" /><span className="sr-only"> (best player)</span></>}</td>
              {[player.points, player.rebounds, player.assists, player.steals, player.blocks, player.turnovers, player.fouls].map((value, index) => <td key={index} className={cn('py-2 text-right tabular last:pr-5', index === 0 ? 'font-semibold text-ink' : 'text-muted')}>{value}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  )
}

