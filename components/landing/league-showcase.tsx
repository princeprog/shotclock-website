'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRightIcon, CalendarDaysIcon, UsersIcon } from 'lucide-react'
import type { DirectoryLeague } from '@/lib/api'
import { PillButton, Tag } from '@/components/landing/tag'
import { seasonHref } from '@/lib/routes'
import { cn } from '@/lib/utils'
import fansPhoto from '@/assets/landing/fans.webp'
import gymPhoto from '@/assets/landing/gym.webp'
import huddlePhoto from '@/assets/landing/huddle.webp'
import outdoorPhoto from '@/assets/landing/outdoor.webp'
import scorerPhoto from '@/assets/landing/scorer.webp'
import youthPhoto from '@/assets/landing/youth.webp'

// Decorative game-day photos; leagues have no photos of their own.
const covers = [youthPhoto, huddlePhoto, outdoorPhoto, fansPhoto, gymPhoto, scorerPhoto]

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
    <section aria-labelledby="leagues-title" className="mt-20 rounded-[28px] bg-wash px-4 py-10 sm:mt-28 sm:px-8 sm:py-14">
      <div className="text-center">
        <Tag tone="white">Live on Shotclock</Tag>
        <h2 id="leagues-title" className="mx-auto mt-4 max-w-xl text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.02em] text-ink sm:text-[2.5rem]">Leagues already running every game here</h2>
      </div>
      {leagues.length ? (
        <>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="scroll-rail -mx-4 flex gap-2 px-4 sm:mx-0 sm:px-0" role="group" aria-label="Filter leagues">
              {filters.map((item) => (
                <button key={item.id} type="button" onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} className={cn('h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-colors', filter === item.id ? 'bg-ink text-white' : 'bg-surface text-ink hover:bg-line')}>{item.label}</button>
              ))}
            </div>
            <Link href="/leagues" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-surface px-4 text-sm font-medium text-ink transition-colors hover:bg-line">
              {total > leagues.length ? `View all ${total}` : 'View all leagues'}<ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          </div>
          {shown.length ? (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((league, index) => (
                <li key={league.slug} className="group relative flex flex-col rounded-2xl bg-surface p-2.5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-wash">
                    <Image src={covers[index % covers.length]} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                    <span className={cn('absolute top-2.5 left-2.5 inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold', league.season.status === 'active' ? 'bg-win-wash text-win' : 'bg-surface text-muted')}>{league.season.status === 'active' ? 'In season' : 'Completed'}</span>
                  </div>
                  <div className="flex flex-1 flex-col px-1.5 pt-3.5 pb-1.5">
                    <h3 className="text-base font-semibold text-ink">
                      <Link href={seasonHref(league.slug, league.season.slug)} className="after:absolute after:inset-0 after:rounded-2xl">{league.name}</Link>
                    </h3>
                    <p className="mt-1 text-[0.8125rem] text-muted">{[league.location, league.organization].filter(Boolean).join(' · ')}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="space-y-1 text-[0.8125rem] text-ink">
                        <p className="flex items-center gap-1.5"><CalendarDaysIcon aria-hidden="true" className="size-3.5 text-muted" />{league.season.name}</p>
                        <p className="flex items-center gap-1.5 tabular"><UsersIcon aria-hidden="true" className="size-3.5 text-muted" />{league.teamCount} {league.teamCount === 1 ? 'team' : 'teams'} · {league.divisionCount} {league.divisionCount === 1 ? 'division' : 'divisions'}</p>
                      </div>
                      <span aria-hidden="true" className="inline-flex h-9 shrink-0 items-center rounded-full border border-line-strong px-4 text-[0.8125rem] font-semibold text-ink transition-colors group-hover:border-orange group-hover:bg-orange">View league</span>
                    </div>
                  </div>
                </li>
              ))}
              {filter === 'all' && shown.length < 3 && (
                <li className={cn('flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line-strong px-6 py-10 text-center', shown.length === 1 && 'lg:col-span-2')}>
                  <p className="text-lg font-semibold text-ink">Your league here</p>
                  <p className="mt-1.5 max-w-xs text-sm text-muted">Publish your schedule, results and standings for every family to follow.</p>
                  <PillButton href={signupUrl} size="sm" className="mt-5">Create your league</PillButton>
                </li>
              )}
            </ul>
          ) : (
            <p className="mt-6 rounded-2xl bg-surface px-6 py-10 text-center text-muted">No {filter === 'active' ? 'leagues are in season' : 'completed seasons'} among these leagues.</p>
          )}
        </>
      ) : (
        <div className="mt-8 rounded-2xl bg-surface px-6 py-12 text-center">
          <p className="text-lg font-semibold text-ink">Published leagues appear here</p>
          <p className="mx-auto mt-2 max-w-md text-muted">Create your league, publish it from Website settings, and it shows up for everyone.</p>
          <PillButton href={signupUrl} size="sm" className="mt-6">Create your league</PillButton>
        </div>
      )}
    </section>
  )
}
