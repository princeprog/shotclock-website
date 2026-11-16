import type { ReactNode } from 'react'

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="tile px-6 py-12 text-center">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {children && <div className="mx-auto mt-2 max-w-md text-muted">{children}</div>}
    </div>
  )
}
