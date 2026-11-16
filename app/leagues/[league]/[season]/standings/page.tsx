import type { Metadata } from 'next'
import { getStandings } from '@/lib/api'
import { DivisionChips } from '@/components/division-chips'
import { EmptyState } from '@/components/empty-state'
import { StandingsTable } from '@/components/standings-table'
import { loadSeason, type SeasonParams, type SeasonSearch } from '@/lib/season-page'
import { seasonHref } from '@/lib/routes'

type Props = { params: SeasonParams; searchParams: SeasonSearch }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return { title: (await loadSeason(params, searchParams)).title('Standings') }
}

export default async function StandingsPage({ params, searchParams }: Props) {
  const { league, season, divisions, division } = await loadSeason(params, searchParams)
  if (!division) return <EmptyState title="No divisions yet">This season has no divisions to show.</EmptyState>
  const standings = await getStandings(league.slug, season.slug, division)
  return (
    <div className="space-y-6">
      <DivisionChips divisions={divisions} current={division} href={(id) => seasonHref(league.slug, season.slug, 'standings', { division: id })} />
      <h2 className="text-xl font-bold text-ink sm:text-[1.375rem]">{standings.division.name} standings</h2>
      {standings.rows.length ? (
        <>
          {!standings.hasResults && <p className="text-muted">Rankings update after the first final score.</p>}
          <StandingsTable rows={standings.rows} league={league.slug} season={season.slug} caption={`${standings.division.name} standings`} />
          <p className="max-w-[70ch] text-sm leading-relaxed text-muted">
            Ranked by wins. Teams tied on wins are separated by head-to-head wins, then head-to-head point difference, then overall point difference. Standings count regular-season games; playoff games appear in the schedule.
          </p>
        </>
      ) : <EmptyState title="No teams yet">Teams appear here once they register for this division.</EmptyState>}
    </div>
  )
}
