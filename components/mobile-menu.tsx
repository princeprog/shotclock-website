'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'

// Phone navigation. It closes after a tap so same-page anchors (FAQ, How it works) do not leave it open.
export function MobileMenu({ links, loginUrl }: { links: { href: string; label: string }[]; loginUrl: string }) {
  const menu = useRef<HTMLDetailsElement>(null)
  const close = () => menu.current?.removeAttribute('open')
  return (
    <details ref={menu} className="group relative lg:hidden">
      <summary className="inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-xl bg-surface text-ink transition-colors hover:bg-wash [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Menu</span>
        <MenuIcon aria-hidden="true" className="size-5 group-open:hidden" />
        <XIcon aria-hidden="true" className="hidden size-5 group-open:block" />
      </summary>
      <nav aria-label="Mobile" onClick={close} className="absolute top-12 right-0 w-60 rounded-[14px] bg-surface p-2 shadow-[0_12px_32px_rgb(17_17_17/0.12)]">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2.5 text-[0.9375rem] font-semibold text-ink hover:bg-wash">{link.label}</Link>
        ))}
        <a href={loginUrl} className="mt-1 block rounded-lg border-t border-line px-3 py-2.5 text-[0.9375rem] font-semibold text-ink hover:bg-wash sm:hidden">Log in</a>
      </nav>
    </details>
  )
}
