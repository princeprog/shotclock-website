'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDownIcon } from 'lucide-react'
import type { Division } from '@/lib/api'
import { divisionAges } from '@/lib/format'

// Division picker in the league header. Hidden for single-division seasons and on team pages, where the team fixes the division.
export function DivisionSelect({ divisions, defaultDivision }: { divisions: Division[]; defaultDivision: string | null }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  if (divisions.length < 2 || /\/teams\/[^/]+$/.test(pathname)) return null
  const requested = params.get('division')
  const value = requested && divisions.some((division) => division.id === requested) ? requested : defaultDivision ?? divisions[0].id
  function change(id: string) {
    const next = new URLSearchParams(params.toString())
    next.set('division', id)
    next.delete('team')
    router.push(`${pathname}?${next}`, { scroll: false })
  }
  return (
    <div className="relative">
      <label htmlFor="division-select" className="sr-only">Division</label>
      <select id="division-select" value={value} onChange={(event) => change(event.target.value)}
        className="h-9 max-w-[14rem] appearance-none truncate rounded-[10px] bg-surface pr-9 pl-3 text-[0.9375rem] font-semibold text-ink hover:bg-wash">
        {divisions.map((division) => {
          const ages = divisionAges(division.minAge, division.maxAge)
          return <option key={division.id} value={division.id}>{division.name}{ages ? ` (${ages})` : ''}</option>
        })}
      </select>
      <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
    </div>
  )
}
