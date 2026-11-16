'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { seasonHref } from '@/lib/routes'
import { cn } from '@/lib/utils'

const TABS = [['', 'Overview'], ['schedule', 'Schedule'], ['standings', 'Standings'], ['stats', 'Stats'], ['teams', 'Teams']] as const

// Tabs keep the selected division when moving between pages.
export function LeagueTabs({ league, season }: { league: string; season: string }) {
  const pathname = usePathname()
  const division = useSearchParams().get('division') ?? undefined
  const current = pathname.slice(`/leagues/${league}/${season}`.length).split('/')[1] ?? ''
  return (
    <nav aria-label="Season" className="scroll-rail">
      <ul className="flex w-max sm:gap-2">
        {TABS.map(([tab, label]) => {
          const active = current === tab
          return (
            <li key={tab}>
              <Link href={seasonHref(league, season, tab, { division })} aria-current={active ? 'page' : undefined}
                className={cn('relative inline-flex h-12 items-center px-2 text-sm font-semibold transition-colors sm:px-3 sm:text-[0.9375rem]',
                  active ? 'text-orange-ink after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-orange-ink sm:after:inset-x-3' : 'text-muted hover:text-ink')}>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
