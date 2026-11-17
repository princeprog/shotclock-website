'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRightIcon } from 'lucide-react'
import type { DirectoryLeague } from '@/lib/api'
import { StatusPill } from '@/components/status-pill'
import { seasonHref } from '@/lib/routes'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'all', label: 'All leagues' },
  { id: 'active', label: 'In season' },
  { id: 'completed', label: 'Completed' },
] as const

// Real published leagues from the directory, filtered by season status in the browser.
export function LeagueShowcase({ leagues, total, signupUrl }: { leagues: DirectoryLeague[]; total: number; signupUrl: string }) {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const shown = filter === 'all' ? leagues : leagues.filter((league) => league.season.status === filter)

  return (
    <section aria-labelledby="leagues-title" className="mt-16">
      <h2 id="leagues-title" className="mx-auto max-w-2xl text-center text-3xl leading-[1.12] font-extrabold tracking-[-0.03em] text-ink sm:text-[2.5rem]">Leagues already running on Shotclock</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-lg text-muted">Open any league to see the schedule, results and standings families see.</p>
      {leagues.length ? (
        <>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter leagues">
              {filters.map((item) => (
                <button key={item.id} type="button" onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} className={cn('h-9 rounded-full px-4 text-sm font-semibold transition-colors', filter === item.id ? 'bg-ink text-white' : 'bg-surface text-muted hover:text-ink')}>{item.label}</button>
              ))}
            </div>
            <Link href="/leagues" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">
              {total > leagues.length ? `View all ${total} leagues` : 'View all leagues'}<ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          </div>
          {shown.length ? (
            <ul className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((league) => (
                <li key={league.slug} className="group tile relative flex flex-col p-5 transition-shadow hover:shadow-[0_6px_20px_rgb(17_17_17/0.07)]">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg leading-snug font-extrabold text-ink">
                      <Link href={seasonHref(league.slug, league.season.slug)} className="after:absolute after:inset-0 after:rounded-[18px]">{league.name}</Link>
                    </h3>
                    <StatusPill status={league.season.status} className="shrink-0" />
                  </div>
                  <p className="mt-1 text-sm text-muted">{[league.location, league.organization].filter(Boolean).join(' · ')}</p>
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-ink">{league.season.name}</p>
                      <p className="mt-0.5 text-sm text-muted tabular">{league.teamCount} {league.teamCount === 1 ? 'team' : 'teams'} · {league.divisionCount} {league.divisionCount === 1 ? 'division' : 'divisions'}</p>
                    </div>
                    <span aria-hidden="true" className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full bg-wash px-3.5 text-sm font-semibold text-ink transition-colors group-hover:bg-ink group-hover:text-white">View<ArrowRightIcon className="size-3.5" /></span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="tile mt-5 px-6 py-10 text-center text-muted">No {filter === 'active' ? 'leagues are in season' : 'completed seasons'} among these leagues.</p>
          )}
        </>
      ) : (
        <div className="tile mt-8 px-6 py-12 text-center">
          <p className="text-lg font-bold text-ink">Published leagues appear here</p>
          <p className="mx-auto mt-2 max-w-md text-muted">Create your league, publish it from Website settings, and it shows up for everyone.</p>
          <a href={signupUrl} className="mt-6 inline-flex h-11 items-center gap-1.5 rounded-xl bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-black">Create your league<ArrowRightIcon aria-hidden="true" className="size-4" /></a>
        </div>
      )}
    </section>
  )
}
