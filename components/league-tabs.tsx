'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { seasonHref } from '@/lib/routes'
import { cn } from '@/lib/utils'

const TABS = [['', 'Overview'], ['schedule', 'Schedule'], ['standings', 'Standings'], ['stats', 'Stats'], ['teams', 'Teams']] as const

// A segmented control; tabs keep the selected division when moving between pages.
export function LeagueTabs({ league, season }: { league: string; season: string }) {
  const pathname = usePathname()
  const division = useSearchParams().get('division') ?? undefined
  const current = pathname.slice(`/leagues/${league}/${season}`.length).split('/')[1] ?? ''
  return (
    <div className="relative -mx-4 sm:mx-0">
    <nav aria-label="Season" className="scroll-rail px-4 sm:px-0 xl:overflow-visible">
      <ul className="flex w-max gap-1 rounded-xl bg-surface p-1">
        {TABS.map(([tab, label]) => {
          const active = current === tab
          return (
            <li key={tab}>
              <Link href={seasonHref(league, season, tab, { division })} aria-current={active ? 'page' : undefined}
                className={cn('inline-flex h-9 items-center rounded-[9px] px-3.5 text-[0.9375rem] font-semibold transition-colors duration-150',
                  active ? 'bg-ink text-white' : 'text-muted hover:bg-wash hover:text-ink')}>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
    {/* On phones the last tabs scroll; the fade shows there is more. */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ground to-transparent sm:hidden" />
    </div>
  )
}
