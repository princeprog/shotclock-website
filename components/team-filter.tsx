'use client'

import { useRouter } from 'next/navigation'
import { ChevronDownIcon } from 'lucide-react'
import type { Team } from '@/lib/api'

export function TeamFilter({ teams, value, hrefFor }: { teams: Team[]; value: string; hrefFor: { [teamId: string]: string } & { all: string } }) {
  const router = useRouter()
  return (
    <div className="relative">
      <label htmlFor="team-filter" className="sr-only">Team</label>
      <select id="team-filter" value={value} onChange={(event) => router.push(hrefFor[event.target.value] ?? hrefFor.all, { scroll: false })}
        className="h-11 w-full appearance-none rounded-xl bg-surface pr-9 pl-3.5 text-[0.9375rem] font-semibold text-ink hover:bg-wash sm:w-64">
        <option value="all">All teams</option>
        {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
      </select>
      <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
    </div>
  )
}
