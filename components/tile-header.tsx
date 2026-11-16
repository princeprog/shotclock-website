import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// The quiet label at the top of every tile, with an optional link on the right.
export function TileHeader({ title, href, linkLabel, id, children, className }: { title: string; href?: string; linkLabel?: string; id?: string; children?: ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-x-4 gap-y-2', className)}>
      <h2 id={id} className="text-[0.8125rem] font-semibold tracking-normal text-muted">{title}</h2>
      {children}
      {href && <Link href={href} className="text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">{linkLabel}</Link>}
    </div>
  )
}
