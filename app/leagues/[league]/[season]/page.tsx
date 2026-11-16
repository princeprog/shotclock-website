import type { Metadata } from 'next'
import { getGames, getStandings } from '@/lib/api'
import { DivisionChips } from '@/components/division-chips'
import { EmptyState } from '@/components/empty-state'
import { GameList } from '@/components/game-row'
import { NextGame } from '@/components/next-game'
import { SectionHeading } from '@/components/section-heading'
import { StandingsTable } from '@/components/standings-table'
import { loadSeason, type SeasonParams, type SeasonSearch } from '@/lib/season-page'
import { seasonHref, teamHref } from '@/lib/routes'
import { requestTime } from '@/lib/clock'

type Props = { params: SeasonParams; searchParams: SeasonSearch }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { league, season } = await loadSeason(params, searchParams)
  return { title: `${season.name} · ${league.name}`, description: `Schedule, results and standings for ${league.name}, ${season.name}.` }
}

export default async function OverviewPage({ params, searchParams }: Props) {
  const { league, season, divisions, division } = await loadSeason(params, searchParams)
  if (!division) return <EmptyState title="No divisions yet">This season has no divisions to show.</EmptyState>
  const [games, standings] = await Promise.all([getGames(league.slug, season.slug, { division }), getStandings(league.slug, season.slug, division)])
  const now = requestTime()
  const upcoming = games.games.filter((game) => game.status === 'scheduled' && game.scheduledAt && Date.parse(game.scheduledAt) >= now)
  const recent = games.games.filter((game) => game.status === 'completed').reverse().slice(0, 5)
  const link = (tab: string) => seasonHref(league.slug, season.slug, tab, { division: divisions.length > 1 ? division : undefined })
  return (
    <div className="space-y-6">
      <DivisionChips divisions={divisions} current={division} href={(id) => seasonHref(league.slug, season.slug, '', { division: id })} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_25rem]">
        <div className="space-y-8">
          <NextGame games={upcoming.slice(0, 50)} timeZone={league.timeZone} league={league.slug} season={season.slug} />
          <section aria-labelledby="recent">
            <SectionHeading id="recent" title="Recent results" href={recent.length ? link('schedule') + (link('schedule').includes('?') ? '&' : '?') + 'view=results' : undefined} linkLabel="All results" />
            <GameList games={recent} timeZone={league.timeZone} now={now} teamHref={(id) => teamHref(league.slug, season.slug, id)} empty="No final scores yet. Results appear here as soon as they’re recorded." />
          </section>
        </div>
        <section aria-labelledby="standings-preview">
          <SectionHeading id="standings-preview" title="Standings" href={link('standings')} linkLabel="Full standings" />
          {standings.rows.length
            ? <StandingsTable compact rows={standings.rows.slice(0, 8)} league={league.slug} season={season.slug} caption={`${standings.division.name} standings`} />
            : <EmptyState title="No teams yet" />}
          {!standings.hasResults && standings.rows.length > 0 && <p className="mt-3 text-sm text-muted">Rankings update after the first final score.</p>}
        </section>
      </div>
    </div>
  )
}
