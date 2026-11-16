'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronDownIcon } from 'lucide-react'
import type { Season } from '@/lib/api'
import { seasonHref } from '@/lib/routes'

const pill = 'h-9 appearance-none rounded-[10px] bg-surface pr-9 pl-3 text-[0.9375rem] font-semibold text-ink hover:bg-wash'

// Switching seasons keeps the current tab; divisions differ between seasons, so the division resets.
export function SeasonSwitcher({ league, season, seasons }: { league: string; season: string; seasons: Season[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const tab = pathname.slice(`/leagues/${league}/${season}`.length).split('/')[1] ?? ''
  if (seasons.length < 2) return <span className="inline-flex h-9 items-center rounded-[10px] bg-surface px-3 text-[0.9375rem] font-semibold text-ink">{seasons[0]?.name}</span>
  return (
    <div className="relative">
      <label htmlFor="season-switcher" className="sr-only">Season</label>
      <select id="season-switcher" value={season} onChange={(event) => router.push(seasonHref(league, event.target.value, tab))} className={pill}>
        {seasons.map((item) => <option key={item.slug} value={item.slug}>{item.name}{item.status === 'active' ? ' (active)' : ''}</option>)}
      </select>
      <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
    </div>
  )
}
