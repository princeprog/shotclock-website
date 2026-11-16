import type { ReactNode } from 'react'

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {children && <div className="mx-auto mt-2 max-w-md text-muted">{children}</div>}
    </div>
  )
}
