import Link from 'next/link'
import type { Division } from '@/lib/api'
import { divisionAges } from '@/lib/format'
import { cn } from '@/lib/utils'

// One chip per division; hidden when the season has a single division.
export function DivisionChips({ divisions, current, href }: { divisions: Division[]; current: string; href: (divisionId: string) => string }) {
  if (divisions.length < 2) return null
  return (
    <nav aria-label="Divisions" className="scroll-rail -mx-4 px-4 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2">
        {divisions.map((division) => {
          const active = division.id === current
          const ages = divisionAges(division.minAge, division.maxAge)
          return (
            <li key={division.id}>
              <Link href={href(division.id)} aria-current={active ? 'page' : undefined} title={ages ?? undefined} scroll={false}
                className={cn('inline-flex h-9 items-center rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors',
                  active ? 'border-orange bg-orange text-ink' : 'border-line-strong bg-surface text-ink hover:border-ink')}>
                {division.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
