import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { MobileMenu } from '@/components/mobile-menu'
import { ShotclockLogo } from '@/components/shotclock-logo'
import { loginUrl, signupUrl } from '@/lib/site'

const links = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#for-families', label: 'For families' },
  { href: '/leagues', label: 'Leagues' },
  { href: '/#faq', label: 'FAQ' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-ground/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:px-6">
        <ShotclockLogo />
        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg px-3 py-1.5 text-[0.9375rem] font-semibold text-muted transition-colors hover:text-ink">{link.label}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/leagues#league-search" aria-label="Search leagues" className="inline-flex size-10 items-center justify-center rounded-xl bg-surface text-ink transition-colors hover:bg-wash">
            <SearchIcon aria-hidden="true" className="size-[18px]" />
          </Link>
          <a href={loginUrl} className="hidden h-10 items-center rounded-xl bg-surface px-4 text-sm font-semibold text-ink transition-colors hover:bg-wash sm:inline-flex">Log in</a>
          <a href={signupUrl} className="inline-flex h-10 shrink-0 items-center rounded-xl bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-black">Sign up</a>
          <MobileMenu links={links} loginUrl={loginUrl} />
        </div>
      </div>
    </header>
  )
}
