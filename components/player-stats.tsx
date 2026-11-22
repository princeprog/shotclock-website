import Link from 'next/link'
import type { PlayerStatLine } from '@/lib/api'
import { ScrollTable } from '@/components/scroll-table'
import { TeamBadge } from '@/components/team-badge'
import { TileHeader } from '@/components/tile-header'
import { teamHref } from '@/lib/routes'
import { cn } from '@/lib/utils'

const th = 'px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.04em] text-muted'
const categories = [
  { key: 'points', label: 'Points per game' },
  { key: 'rebounds', label: 'Rebounds per game' },
  { key: 'assists', label: 'Assists per game' },
] as const

// The top five players per game in points, rebounds and assists.
export function PlayerLeaders({ players, league, season, title }: { players: PlayerStatLine[]; league: string; season: string; title: string }) {
  return (
    <section aria-labelledby="player-leaders" className="tile p-5 sm:p-6">
      <TileHeader id="player-leaders" title={title} />
      <div className="mt-3 grid gap-2.5 md:grid-cols-3">
        {categories.map(({ key, label }) => {
          const top = [...players].filter((row) => row.perGame[key] > 0).sort((a, b) => b.perGame[key] - a.perGame[key] || a.player.name.localeCompare(b.player.name)).slice(0, 5)
          return (
            <div key={key} className="rounded-xl bg-wash p-4">
              <h3 className="text-sm text-muted">{label}</h3>
              {top.length ? <ol className="mt-2 space-y-2">{top.map((row, index) => (
                <li key={row.player.rosterId} className="flex items-center gap-3 text-sm">
                  <span className="w-4 shrink-0 text-muted tabular">{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className={cn('block truncate text-ink', index === 0 && 'font-bold')}>{row.player.name}</span>
                    <Link href={teamHref(league, season, row.team.id)} className="block truncate text-xs text-muted hover:underline">{row.team.name}</Link>
                  </span>
                  <span className={cn('shrink-0 tabular', index === 0 ? 'text-lg font-extrabold text-ink' : 'font-semibold text-ink')}>{row.perGame[key].toFixed(1)}</span>
                </li>
              ))}</ol> : <p className="mt-2 text-sm text-muted">No stats yet.</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// Per-game averages for each player, best scorers first.
export function PlayerStatsTable({ players, league, season, title, showTeam = true }: { players: PlayerStatLine[]; league: string; season: string; title: string; showTeam?: boolean }) {
  return (
    <section aria-labelledby="player-stats" className="tile overflow-hidden py-5 sm:py-6">
      <TileHeader id="player-stats" title={title} className="mb-2 px-5 sm:px-6" />
      <ScrollTable>
        <table className="w-full min-w-max text-[0.9375rem]">
          <caption className="sr-only">{title}, per-game averages</caption>
          <thead className="border-b border-line"><tr>
            <th scope="col" className={cn(th, 'sticky left-0 bg-surface pl-5 text-left sm:pl-6')}>Player</th>
            {showTeam && <th scope="col" className={cn(th, 'text-left')}>Team</th>}
            <th scope="col" className={cn(th, 'text-right')}><abbr title="Games played" className="no-underline">GP</abbr></th>
            {['PTS', 'REB', 'AST', 'STL', 'BLK', 'TO', 'PF'].map((label) => <th key={label} scope="col" className={cn(th, 'text-right last:pr-5 sm:last:pr-6')}>{label}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-line">{players.map((row) => (
            <tr key={row.player.rosterId} data-team={row.team.teamId} className="bg-surface">
              <th scope="row" className="sticky left-0 bg-inherit py-2.5 pr-3 pl-5 text-left font-medium sm:pl-6"><span className="mr-2 font-mono text-xs text-muted">{row.player.jersey ?? '–'}</span>{row.player.name}</th>
              {showTeam && <td className="px-3"><Link href={teamHref(league, season, row.team.id)} className="flex items-center gap-2 hover:underline"><TeamBadge name={row.team.name} abbreviation={row.team.abbreviation} size="sm" /><span className="max-w-[10rem] truncate">{row.team.name}</span></Link></td>}
              <td className="px-3 text-right text-muted tabular">{row.games}</td>
              {[row.perGame.points, row.perGame.rebounds, row.perGame.assists, row.perGame.steals, row.perGame.blocks, row.perGame.turnovers, row.perGame.fouls].map((value, index) => (
                <td key={index} className={cn('px-3 text-right tabular last:pr-5 sm:last:pr-6', index === 0 ? 'font-bold' : '')}>{value.toFixed(1)}</td>
              ))}
            </tr>
          ))}</tbody>
        </table>
      </ScrollTable>
      <p className="mt-4 max-w-[70ch] px-5 text-sm leading-relaxed text-muted sm:px-6">Per-game averages from final games scored live. GP counts games with recorded stats.</p>
    </section>
  )
}

