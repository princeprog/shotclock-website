import Link from 'next/link'
import type { StandingRow } from '@/lib/api'
import { formatPct, formatSigned } from '@/lib/format'
import { teamHref } from '@/lib/routes'
import { FormGuide, Streak } from '@/components/form-guide'
import { FollowMark } from '@/components/follow-mark'
import { ScrollTable } from '@/components/scroll-table'
import { TeamBadge } from '@/components/team-badge'
import { cn } from '@/lib/utils'

const th = 'px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.04em] text-muted'

// A borderless table that sits inside a tile.
export function StandingsTable({ rows, league, season, compact = false, caption }: { rows: StandingRow[]; league: string; season: string; compact?: boolean; caption: string }) {
  return (
    <ScrollTable>
      <table className="w-full min-w-max text-[0.9375rem]">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-line">
          <tr>
            <th scope="col" className={cn(th, 'w-10 pl-4 text-left')}><abbr title="Rank" className="no-underline">#</abbr></th>
            <th scope="col" className={cn(th, 'sticky left-0 bg-surface text-left')}>Team</th>
            {!compact && <th scope="col" className={cn(th, 'text-right')}><abbr title="Games played" className="no-underline">GP</abbr></th>}
            <th scope="col" className={cn(th, 'text-right')}><abbr title="Wins" className="no-underline">W</abbr></th>
            <th scope="col" className={cn(th, 'text-right')}><abbr title="Losses" className="no-underline">L</abbr></th>
            {!compact && <th scope="col" className={cn(th, 'text-right')}><abbr title="Win percentage" className="no-underline">PCT</abbr></th>}
            {!compact && <th scope="col" className={cn(th, 'text-right')}><abbr title="Points for" className="no-underline">PF</abbr></th>}
            {!compact && <th scope="col" className={cn(th, 'text-right')}><abbr title="Points against" className="no-underline">PA</abbr></th>}
            <th scope="col" className={cn(th, compact && 'pr-4', 'text-right')}><abbr title="Point difference" className="no-underline">Diff</abbr></th>
            {!compact && <th scope="col" className={cn(th, 'text-right')}><abbr title="Current streak" className="no-underline">Strk</abbr></th>}
            {!compact && <th scope="col" className={cn(th, 'pr-4 text-left')}>Last 5</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={row.team.id} data-team={row.team.teamId} className="bg-surface">
              <td className="py-3 pl-4 text-muted tabular">{row.rank}</td>
              <th scope="row" className="sticky left-0 bg-inherit px-3 py-2.5 text-left font-medium">
                <Link href={teamHref(league, season, row.team.id)} className="flex items-center gap-2.5 hover:underline">
                  <TeamBadge name={row.team.name} abbreviation={row.team.abbreviation} size="sm" />
                  <span className="max-w-[11rem] truncate sm:max-w-none">{row.team.name}</span>
                  <FollowMark teamId={row.team.teamId} />
                </Link>
              </th>
              {!compact && <td className="px-3 text-right tabular text-muted">{row.gamesPlayed}</td>}
              <td className="px-3 text-right font-bold tabular">{row.wins}</td>
              <td className="px-3 text-right tabular">{row.losses}</td>
              {!compact && <td className="px-3 text-right tabular">{formatPct(row.winPct)}</td>}
              {!compact && <td className="px-3 text-right tabular">{row.pointsFor}</td>}
              {!compact && <td className="px-3 text-right tabular">{row.pointsAgainst}</td>}
              <td className={cn('px-3 text-right tabular', compact && 'pr-4')}>{formatSigned(row.pointDifference)}</td>
              {!compact && <td className="px-3 text-right tabular"><Streak value={row.streak} /></td>}
              {!compact && <td className="px-3 pr-4"><FormGuide results={row.lastFive} /></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollTable>
  )
}
