import Link from 'next/link'
import type { Metadata } from 'next'
import { getTeams } from '@/lib/api'
import { DivisionChips } from '@/components/division-chips'
import { EmptyState } from '@/components/empty-state'
import { FollowButton } from '@/components/follow'
import { Streak } from '@/components/form-guide'
import { TeamBadge } from '@/components/team-badge'
import { ordinal } from '@/lib/ordinal'
import { loadSeason, type SeasonParams, type SeasonSearch } from '@/lib/season-page'
import { seasonHref, teamHref } from '@/lib/routes'

type Props = { params: SeasonParams; searchParams: SeasonSearch }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return { title: (await loadSeason(params, searchParams)).title('Teams') }
}

export default async function TeamsPage({ params, searchParams }: Props) {
  const { league, season, divisions, division } = await loadSeason(params, searchParams)
  if (!division) return <EmptyState title="No divisions yet">This season has no divisions to show.</EmptyState>
  const { teams, hasResults, division: current } = await getTeams(league.slug, season.slug, division)
  return (
    <div className="space-y-6">
      <DivisionChips divisions={divisions} current={division} href={(id) => seasonHref(league.slug, season.slug, 'teams', { division: id })} />
      <div>
        <h2 className="text-xl font-bold text-ink sm:text-[1.375rem]">{current.name} teams</h2>
        <p className="mt-1 text-sm text-muted">Follow a team to highlight its games and rows across this league on this device.</p>
      </div>
      {teams.length ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <li key={team.id} data-team={team.teamId} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
              <TeamBadge name={team.name} abbreviation={team.abbreviation} />
              <div className="min-w-0 flex-1">
                <Link href={teamHref(league.slug, season.slug, team.id)} className="block truncate font-semibold text-ink hover:underline">{team.name}</Link>
                <p className="mt-0.5 text-sm text-muted tabular">
                  {team.wins}–{team.losses}{hasResults && <> · {ordinal(team.rank)}</>}
                  {team.streak && <> · <Streak value={team.streak} /></>}
                </p>
              </div>
              <FollowButton teamId={team.teamId} teamName={team.name} compact />
            </li>
          ))}
        </ul>
      ) : <EmptyState title="No teams yet">Teams appear here once they register for this division.</EmptyState>}
    </div>
  )
}
