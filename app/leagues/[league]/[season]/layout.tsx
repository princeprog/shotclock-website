import { Suspense, type ReactNode } from 'react'
import { getSeason } from '@/lib/api'
import { FollowProvider } from '@/components/follow'
import { LeagueHeader } from '@/components/league-header'
import { LeagueTabs } from '@/components/league-tabs'

export default async function SeasonLayout({ children, params }: { children: ReactNode; params: Promise<{ league: string; season: string }> }) {
  const { league: leagueSlug, season: seasonSlug } = await params
  const { league, season, seasons } = await getSeason(leagueSlug, seasonSlug)
  return (
    <FollowProvider league={league.slug}>
      <LeagueHeader league={league} season={season} seasons={seasons} />
      <div className="sticky top-16 z-20 border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-1 sm:px-3">
          <Suspense fallback={<div className="h-12" />}><LeagueTabs league={league.slug} season={season.slug} /></Suspense>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </FollowProvider>
  )
}
