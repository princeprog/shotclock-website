import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export function SectionHeading({ title, href, linkLabel, children, id }: { title: string; href?: string; linkLabel?: string; children?: ReactNode; id?: string }) {
  return (
    <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <h2 id={id} className="text-xl font-bold text-ink sm:text-[1.375rem]">{title}</h2>
      {children}
      {href && <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-orange-ink hover:underline">{linkLabel}<ArrowRightIcon aria-hidden="true" className="size-4" /></Link>}
    </div>
  )
}
