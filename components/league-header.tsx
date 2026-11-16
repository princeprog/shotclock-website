import { Suspense } from 'react'
import type { Division, League, Season } from '@/lib/api'
import { seasonDates } from '@/lib/format'
import { DivisionSelect } from '@/components/division-select'
import { LeagueTabs } from '@/components/league-tabs'
import { SeasonSwitcher } from '@/components/season-switcher'
import { StatusPill } from '@/components/status-pill'

// One header row: league title, season, status and division on the left; section tabs on the right.
export function LeagueHeader({ league, season, seasons, divisions = [], defaultDivision = null }: { league: League; season?: Season; seasons: Season[]; divisions?: Division[]; defaultDivision?: string | null }) {
  const details = [league.location, `Run by ${league.organization}`, season && seasonDates(season.startDate, season.endDate)].filter(Boolean).join(' · ')
  return (
    <section className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-3">
          <h1 className="mr-1.5 text-[1.75rem] leading-tight font-extrabold tracking-[-0.03em] text-ink">{league.name}</h1>
          {season && <SeasonSwitcher league={league.slug} season={season.slug} seasons={seasons} />}
          {season && <StatusPill status={season.status} />}
          {season && <Suspense fallback={null}><DivisionSelect divisions={divisions} defaultDivision={defaultDivision} /></Suspense>}
        </div>
        {details && <p className="mt-2 text-sm text-muted">{details}</p>}
        </div>
        {season && <div className="min-w-0 shrink-0"><Suspense fallback={<div className="h-11" />}><LeagueTabs league={league.slug} season={season.slug} /></Suspense></div>}
      </div>
    </section>
  )
}
