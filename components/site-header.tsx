import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { ShotclockLogo } from '@/components/shotclock-logo'
import { adminUrl } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <ShotclockLogo />
        <nav aria-label="Main" className="ml-2 hidden sm:block">
          <Link href="/" className="rounded-md px-2 py-1.5 text-[0.9375rem] font-medium text-ink hover:text-orange-ink">Leagues</Link>
        </nav>
        <form action="/" role="search" className="ml-auto hidden w-full max-w-xs md:block">
          <label htmlFor="header-search" className="sr-only">Search leagues or teams</label>
          <div className="relative">
            <SearchIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input id="header-search" name="q" type="search" placeholder="Search leagues or teams" maxLength={80} className="h-10 w-full rounded-lg border border-line-strong bg-surface pr-3 pl-9 text-sm text-ink placeholder:text-muted focus:border-orange-ink" />
          </div>
        </form>
        <Link href="/#league-search" aria-label="Search leagues" className="ml-auto inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-wash md:hidden">
          <SearchIcon aria-hidden="true" className="size-5" />
        </Link>
        <a href={adminUrl} className="inline-flex h-10 shrink-0 items-center rounded-lg border border-line-strong px-3 text-sm font-semibold text-ink hover:border-ink">
          For organizers
        </a>
      </div>
    </header>
  )
}
