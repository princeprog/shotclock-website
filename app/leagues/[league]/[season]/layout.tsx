import type { ReactNode } from 'react'
import { getSeason } from '@/lib/api'
import { FollowProvider } from '@/components/follow'
import { LeagueHeader } from '@/components/league-header'

export default async function SeasonLayout({ children, params }: { children: ReactNode; params: Promise<{ league: string; season: string }> }) {
  const { league: leagueSlug, season: seasonSlug } = await params
  const { league, season, seasons, divisions, defaultDivision } = await getSeason(leagueSlug, seasonSlug)
  return (
    <FollowProvider league={league.slug}>
      <LeagueHeader league={league} season={season} seasons={seasons} divisions={divisions} defaultDivision={defaultDivision} />
      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">{children}</main>
    </FollowProvider>
  )
}
