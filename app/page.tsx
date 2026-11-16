import Link from 'next/link'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { getDirectory, getUpcoming, type DirectoryLeague, type UpcomingGame } from '@/lib/api'
import { CourtLines } from '@/components/court-lines'
import { EmptyState } from '@/components/empty-state'
import { SectionHeading } from '@/components/section-heading'
import { StatusPill } from '@/components/status-pill'
import { TeamBadge } from '@/components/team-badge'
import { FollowMark } from '@/components/follow-mark'
import { When } from '@/components/when'
import { adminUrl } from '@/lib/site'
import { seasonHref } from '@/lib/routes'

type Props = { searchParams: Promise<{ q?: string | string[]; page?: string | string[] }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const q = (await searchParams).q
  return typeof q === 'string' && q.trim() ? { title: `Search: ${q.trim()}`, robots: { index: false } } : {}
}

function LeagueCard({ league }: { league: DirectoryLeague }) {
  return (
    <li className="group relative flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg leading-snug font-bold text-ink">
          <Link href={seasonHref(league.slug, league.season.slug)} className="after:absolute after:inset-0 after:rounded-2xl">{league.name}</Link>
        </h3>
        <StatusPill status={league.season.status} className="mt-0.5" />
      </div>
      <p className="mt-1 text-sm text-muted">{[league.location, league.organization].filter(Boolean).join(' · ')}</p>
      <p className="mt-4 text-[0.9375rem] font-medium text-ink">{league.season.name}</p>
      <p className="mt-0.5 text-sm text-muted tabular">{league.teamCount} {league.teamCount === 1 ? 'team' : 'teams'} · {league.divisionCount} {league.divisionCount === 1 ? 'division' : 'divisions'}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-orange-ink">View league<ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
    </li>
  )
}

function UpcomingCard({ game }: { game: UpcomingGame }) {
  return (
    <li className="relative w-72 shrink-0 rounded-xl border border-line bg-surface p-4">
      <p className="truncate text-xs font-semibold text-orange-ink">
        <Link href={seasonHref(game.league.slug, game.season.slug, 'schedule', { division: game.division.id })} className="after:absolute after:inset-0 after:rounded-xl">{game.league.name}</Link>
      </p>
      <p className="mt-1 text-sm text-muted tabular">{game.scheduledAt && <When iso={game.scheduledAt} timeZone={game.league.timeZone} />}</p>
      <div className="mt-3 space-y-2">
        {[game.home, game.away].map((side) => (
          <p key={side.id} data-team={side.teamId} className="-mx-2 flex items-center gap-2.5 rounded-md px-2 py-0.5 text-[0.9375rem] font-medium text-ink"><TeamBadge name={side.name} abbreviation={side.abbreviation} size="sm" /><span className="truncate">{side.name}</span><FollowMark /></p>
        ))}
      </div>
      <p className="mt-3 truncate text-sm text-muted">{game.division.name}{game.venue ? ` · ${game.venue.name}` : ''}</p>
    </li>
  )
}

export default async function DirectoryPage({ searchParams }: Props) {
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q.trim().slice(0, 80) : ''
  const page = Math.max(1, Math.min(10000, Number.parseInt(typeof params.page === 'string' ? params.page : '1', 10) || 1))
  const [directory, upcoming] = await Promise.all([getDirectory(q || undefined, page), !q && page === 1 ? getUpcoming(8) : Promise.resolve([])])
  const pageHref = (target: number) => `/?${new URLSearchParams({ ...(q ? { q } : {}), ...(target > 1 ? { page: String(target) } : {}) })}`
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line bg-orange-wash/70">
        <CourtLines className="opacity-30 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <h1 className="text-[2.5rem] leading-[1.05] font-bold text-ink sm:text-6xl">Find your league</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/80">Game times, final scores and standings, published by your league organizers.</p>
          <form action="/" role="search" className="mx-auto mt-8 flex max-w-xl gap-2">
            <label htmlFor="league-search" className="sr-only">Search leagues or teams</label>
            <div className="relative flex-1">
              <SearchIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
              <input id="league-search" name="q" type="search" defaultValue={q} maxLength={80} placeholder="League, team or city" className="h-13 w-full rounded-xl border border-line-strong bg-surface pr-4 pl-12 text-base text-ink shadow-[0_2px_10px_rgb(24_19_16/0.06)] placeholder:text-muted focus:border-orange-ink" />
            </div>
            <button type="submit" className="h-13 rounded-xl bg-orange px-5 text-base font-semibold text-ink transition-colors hover:bg-orange-hover">Search</button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {upcoming.length > 0 && (
          <section aria-labelledby="coming-up" className="mt-10">
            <SectionHeading id="coming-up" title="Coming up this week" />
            <ul className="scroll-rail -mx-4 flex gap-3 px-4 pb-1 sm:mx-0 sm:px-0">{upcoming.map((game) => <UpcomingCard key={game.id} game={game} />)}</ul>
          </section>
        )}

        <section aria-labelledby="leagues" className="mt-10">
          <SectionHeading id="leagues" title={q ? `Leagues matching “${q}”` : 'Leagues'}>
            {q && <Link href="/" className="text-sm font-semibold text-orange-ink hover:underline">Clear search</Link>}
          </SectionHeading>
          {directory.items.length ? (
            <>
              <p className="mb-4 text-sm text-muted">{directory.total} {directory.total === 1 ? 'league' : 'leagues'}</p>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{directory.items.map((league) => <LeagueCard key={league.slug} league={league} />)}</ul>
              {directory.totalPages > 1 && (
                <nav aria-label="Pages" className="mt-8 flex items-center justify-between gap-4 text-sm">
                  {page > 1 ? <Link href={pageHref(page - 1)} className="rounded-lg border border-line-strong bg-surface px-4 py-2 font-semibold hover:border-ink">Previous</Link> : <span />}
                  <span className="text-muted tabular">Page {page} of {directory.totalPages}</span>
                  {page < directory.totalPages ? <Link href={pageHref(page + 1)} className="rounded-lg border border-line-strong bg-surface px-4 py-2 font-semibold hover:border-ink">Next</Link> : <span />}
                </nav>
              )}
            </>
          ) : q ? (
            <EmptyState title="No leagues found">Check the spelling, or search for a team or city instead.</EmptyState>
          ) : (
            <EmptyState title="No leagues are published yet">
              Organizers can publish a league from <a href={adminUrl} className="font-semibold text-orange-ink underline">Shotclock</a> under Leagues → Website settings.
            </EmptyState>
          )}
        </section>
      </div>
    </main>
  )
}
