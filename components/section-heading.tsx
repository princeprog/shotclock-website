import Link from 'next/link'
import type { ReactNode } from 'react'

// Page-level section heading on the grey ground (directory and team page).
export function SectionHeading({ title, href, linkLabel, children, id }: { title: string; href?: string; linkLabel?: string; children?: ReactNode; id?: string }) {
  return (
    <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <h2 id={id} className="text-xl font-extrabold text-ink sm:text-[1.375rem]">{title}</h2>
      {children}
      {href && <Link href={href} className="text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">{linkLabel}</Link>}
    </div>
  )
}
