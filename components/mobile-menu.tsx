'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Phone navigation. It closes after a tap so same-page anchors (FAQ, How it works) do not leave it open.
export function MobileMenu({ links, loginUrl, tone = 'light' }: { links: { href: string; label: string }[]; loginUrl: string; tone?: 'light' | 'dark' }) {
  const menu = useRef<HTMLDetailsElement>(null)
  const close = () => menu.current?.removeAttribute('open')
  return (
    <details ref={menu} className="group relative lg:hidden">
      <summary className={cn(
        'inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-full transition-colors [&::-webkit-details-marker]:hidden',
        tone === 'dark' ? 'bg-white/15 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/25' : 'rounded-xl bg-surface text-ink hover:bg-wash',
      )}>
        <span className="sr-only">Menu</span>
        <MenuIcon aria-hidden="true" className="size-5 group-open:hidden" />
        <XIcon aria-hidden="true" className="hidden size-5 group-open:block" />
      </summary>
      <nav aria-label="Mobile" onClick={close} className="menu-panel absolute top-12 right-0 z-40 w-60 rounded-[14px] bg-surface p-2 shadow-[0_12px_32px_rgb(17_17_17/0.12)]">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2.5 text-[0.9375rem] font-semibold text-ink hover:bg-wash">{link.label}</Link>
        ))}
        <a href={loginUrl} className="mt-1 block rounded-lg border-t border-line px-3 py-2.5 text-[0.9375rem] font-semibold text-ink hover:bg-wash sm:hidden">Log in</a>
      </nav>
    </details>
  )
}
