import type { Metadata } from 'next'
import { getStandings } from '@/lib/api'
import { EmptyState } from '@/components/empty-state'
import { StandingsTable } from '@/components/standings-table'
import { TileHeader } from '@/components/tile-header'
import { loadSeason, type SeasonParams, type SeasonSearch } from '@/lib/season-page'

type Props = { params: SeasonParams; searchParams: SeasonSearch }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return { title: (await loadSeason(params, searchParams)).title('Standings') }
}

export default async function StandingsPage({ params, searchParams }: Props) {
  const { league, season, division } = await loadSeason(params, searchParams)
  if (!division) return <EmptyState title="No divisions yet">This season has no divisions to show.</EmptyState>
  const standings = await getStandings(league.slug, season.slug, division)
  if (!standings.rows.length) return <EmptyState title="No teams yet">Teams appear here once they register for this division.</EmptyState>
  return (
    <section aria-labelledby="standings" className="tile overflow-hidden py-5 sm:py-6">
      <TileHeader id="standings" title={`${standings.division.name} standings`} className="mb-2 px-5 sm:px-6">
        {!standings.hasResults && <span className="text-sm text-muted">Rankings update after the first final score.</span>}
      </TileHeader>
      <StandingsTable rows={standings.rows} league={league.slug} season={season.slug} caption={`${standings.division.name} standings`} />
      <p className="mt-4 max-w-[70ch] px-5 text-sm leading-relaxed text-muted sm:px-6">
        Ranked by wins. Teams tied on wins are separated by head-to-head wins, then head-to-head point difference, then overall point difference. Standings count regular-season games; playoff games appear in the schedule.
      </p>
    </section>
  )
}
