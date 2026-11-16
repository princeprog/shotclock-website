import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeftIcon } from 'lucide-react'
import { getTeam } from '@/lib/api'
import { formatAverage, formatPct, formatSignedAverage } from '@/lib/format'
import { FollowButton } from '@/components/follow'
import { FormGuide, Streak } from '@/components/form-guide'
import { GameList } from '@/components/game-row'
import { SectionHeading } from '@/components/section-heading'
import { TeamBadge } from '@/components/team-badge'
import { ordinal } from '@/lib/ordinal'
import { seasonHref, teamHref } from '@/lib/routes'
import { getSeason } from '@/lib/api'
import { requestTime } from '@/lib/clock'

type Props = { params: Promise<{ league: string; season: string; team: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { league, season, team } = await params
  const [detail, data] = await Promise.all([getSeason(league, season), getTeam(league, season, team)])
  return { title: `${data.team.name} · ${detail.season.name} · ${detail.league.name}` }
}

export default async function TeamPage({ params }: Props) {
  const { league: leagueSlug, season: seasonSlug, team: teamId } = await params
  const [{ league, season, divisions }, data] = await Promise.all([getSeason(leagueSlug, seasonSlug), getTeam(leagueSlug, seasonSlug, teamId)])
  const { team, standing, stats, games, division } = data
  const now = requestTime()
  const upcoming = games.filter((game) => game.status === 'scheduled')
  const results = games.filter((game) => game.status === 'completed').reverse()
  const ranked = standing.gamesPlayed > 0
  const facts: [string, React.ReactNode][] = [
    ['Record', `${stats.wins}–${stats.losses}`],
    ['Win %', formatPct(stats.winPct)],
    ['Points per game', formatAverage(stats.pointsPerGame)],
    ['Allowed per game', formatAverage(stats.allowedPerGame)],
    ['Average margin', formatSignedAverage(stats.averageMargin)],
    ['Home', `${stats.home.wins}–${stats.home.losses}`],
    ['Away', `${stats.away.wins}–${stats.away.losses}`],
    ['Streak', <Streak key="streak" value={stats.streak} />],
  ]
  return (
    <div className="space-y-8">
      <Link href={seasonHref(league.slug, season.slug, 'teams', { division: divisions.length > 1 ? division.id : undefined })} className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink hover:underline">
        <ArrowLeftIcon aria-hidden="true" className="size-4" />All {division.name} teams
      </Link>
      <div className="flex flex-wrap items-center gap-4">
        <TeamBadge name={team.name} abbreviation={team.abbreviation} size="lg" />
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold text-ink sm:text-[2rem]">{team.name}</h2>
          <p className="mt-1 text-muted">{division.name}{ranked && <> · {ordinal(standing.rank)} of {division.teamCount}</>}</p>
        </div>
        <FollowButton teamId={team.teamId} teamName={team.name} />
      </div>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        {facts.map(([label, value]) => (
          <div key={label} className="bg-surface px-4 py-3.5">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-1 text-lg font-semibold text-ink tabular">{value}</dd>
          </div>
        ))}
      </dl>
      {stats.lastFive.length > 0 && <p className="flex items-center gap-3 text-sm text-muted">Last five games <FormGuide results={stats.lastFive} /></p>}
      <section aria-labelledby="team-upcoming">
        <SectionHeading id="team-upcoming" title="Upcoming games" />
        <GameList games={upcoming} timeZone={league.timeZone} now={now} teamHref={(id) => teamHref(league.slug, season.slug, id)} empty="No upcoming games are scheduled." />
      </section>
      <section aria-labelledby="team-results">
        <SectionHeading id="team-results" title="Results" />
        <GameList games={results} timeZone={league.timeZone} now={now} teamHref={(id) => teamHref(league.slug, season.slug, id)} empty="No final scores yet." />
      </section>
    </div>
  )
}
