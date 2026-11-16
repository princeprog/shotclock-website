'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronDownIcon } from 'lucide-react'
import type { Season } from '@/lib/api'
import { seasonHref } from '@/lib/routes'

// Switching seasons keeps the current tab; divisions differ between seasons, so the division resets.
export function SeasonSwitcher({ league, season, seasons }: { league: string; season: string; seasons: Season[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const tab = pathname.slice(`/leagues/${league}/${season}`.length).split('/')[1] ?? ''
  if (seasons.length < 2) return <span className="inline-flex h-10 items-center rounded-lg border border-line-strong bg-surface px-3 text-sm font-semibold text-ink">{seasons[0]?.name}</span>
  return (
    <div className="relative">
      <label htmlFor="season-switcher" className="sr-only">Season</label>
      <select id="season-switcher" value={season} onChange={(event) => router.push(seasonHref(league, event.target.value, tab === 'teams' ? 'teams' : tab))}
        className="h-10 appearance-none rounded-lg border border-line-strong bg-surface pr-9 pl-3 text-sm font-semibold text-ink hover:border-ink focus:border-orange-ink">
        {seasons.map((item) => <option key={item.slug} value={item.slug}>{item.name}{item.status === 'active' ? ' (active)' : ''}</option>)}
      </select>
      <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
    </div>
  )
}
