import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Small outlined pill that names a landing section, as in the reference layout.
export function Tag({ children, tone = 'light', className }: { children: ReactNode; tone?: 'light' | 'white' | 'dark'; className?: string }) {
  return (
    <span className={cn(
      'inline-flex h-8 items-center rounded-full px-3.5 text-[0.8125rem] font-medium',
      tone === 'light' && 'border border-line-strong text-ink',
      tone === 'white' && 'bg-surface text-ink',
      tone === 'dark' && 'bg-white/15 text-white ring-1 ring-white/25 backdrop-blur',
      className,
    )}>{children}</span>
  )
}

// Pill call to action with the round arrow, the reference's primary button.
export function PillButton({ href, children, tone = 'orange', size = 'md', className }: { href: string; children: ReactNode; tone?: 'orange' | 'white' | 'ink'; size?: 'sm' | 'md'; className?: string }) {
  return (
    <a href={href} className={cn(
      'group inline-flex shrink-0 items-center gap-2.5 rounded-full font-semibold transition-colors',
      size === 'md' ? 'h-12 pr-1.5 pl-5 text-[0.9375rem]' : 'h-10 pr-1 pl-4 text-sm',
      tone === 'orange' && 'bg-orange text-ink hover:bg-orange-hover',
      tone === 'white' && 'bg-surface text-ink hover:bg-wash',
      tone === 'ink' && 'bg-ink text-white hover:bg-black',
      className,
    )}>
      {children}
      <span aria-hidden="true" className={cn('grid place-items-center rounded-full', size === 'md' ? 'size-9' : 'size-8', tone === 'ink' ? 'bg-orange text-ink' : 'bg-ink text-white')}>
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5 transition-transform group-hover:translate-x-0.5"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </a>
  )
}
