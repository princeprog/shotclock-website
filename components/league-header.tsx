import Link from 'next/link'
import { MapPinIcon } from 'lucide-react'
import type { League, Season } from '@/lib/api'
import { seasonDates } from '@/lib/format'
import { CourtLines } from '@/components/court-lines'
import { SeasonSwitcher } from '@/components/season-switcher'
import { StatusPill } from '@/components/status-pill'

export function LeagueHeader({ league, season, seasons }: { league: League; season?: Season; seasons: Season[] }) {
  const dates = season && seasonDates(season.startDate, season.endDate)
  return (
    <section className="relative overflow-hidden border-b border-line bg-orange-wash/70">
      <CourtLines className="opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 pt-6 pb-7 sm:px-6 sm:pt-8 sm:pb-9">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-muted">
            <li><Link href="/" className="font-medium text-orange-ink hover:underline">Leagues</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{league.name}</li>
          </ol>
        </nav>
        <h1 className="mt-3 text-[2rem] leading-[1.1] font-bold text-ink sm:text-5xl">{league.name}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          {season && <SeasonSwitcher league={league.slug} season={season.slug} seasons={seasons} />}
          {season && <StatusPill status={season.status} />}
          {league.location && <span className="inline-flex items-center gap-1.5 text-[0.9375rem] text-ink"><MapPinIcon aria-hidden="true" className="size-4 text-orange-ink" />{league.location}</span>}
          <span className="text-[0.9375rem] text-muted">Run by {league.organization}</span>
        </div>
        {dates && <p className="mt-3 text-sm text-muted">{dates}</p>}
      </div>
    </section>
  )
}
