import Link from 'next/link'
import type { Metadata } from 'next'
import { getTeams } from '@/lib/api'
import { EmptyState } from '@/components/empty-state'
import { FollowButton } from '@/components/follow'
import { Streak } from '@/components/form-guide'
import { TeamBadge } from '@/components/team-badge'
import { TileHeader } from '@/components/tile-header'
import { ordinal } from '@/lib/ordinal'
import { loadSeason, type SeasonParams, type SeasonSearch } from '@/lib/season-page'
import { teamHref } from '@/lib/routes'

type Props = { params: SeasonParams; searchParams: SeasonSearch }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return { title: (await loadSeason(params, searchParams)).title('Teams') }
}

export default async function TeamsPage({ params, searchParams }: Props) {
  const { league, season, division } = await loadSeason(params, searchParams)
  if (!division) return <EmptyState title="No divisions yet">This season has no divisions to show.</EmptyState>
  const { teams, hasResults, division: current } = await getTeams(league.slug, season.slug, division)
  if (!teams.length) return <EmptyState title="No teams yet">Teams appear here once they register for this division.</EmptyState>
  return (
    <div className="space-y-3.5">
      <div className="tile p-5 sm:p-6">
        <TileHeader title={`${current.name} teams`} />
        <p className="mt-1 text-[0.9375rem]">Follow your team with the star to see its games first and spot it in every table on this device.</p>
      </div>
      <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <li key={team.id} data-team={team.teamId} className="tile flex items-center gap-3.5 p-4">
            <TeamBadge name={team.name} abbreviation={team.abbreviation} size="lg" />
            <div className="min-w-0 flex-1">
              <Link href={teamHref(league.slug, season.slug, team.id)} className="block truncate text-[1.0625rem] font-bold text-ink hover:underline">{team.name}</Link>
              <p className="mt-0.5 text-sm text-muted tabular">
                {team.wins}–{team.losses}{hasResults && <> · {ordinal(team.rank)}</>}
                {team.streak && <> · <Streak value={team.streak} /></>}
              </p>
            </div>
            <FollowButton teamId={team.teamId} teamName={team.name} compact />
          </li>
        ))}
      </ul>
    </div>
  )
}
