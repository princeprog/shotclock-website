import { cn } from '@/lib/utils'

export function StatusPill({ status, className }: { status: 'active' | 'completed'; className?: string }) {
  return (
    <span className={cn('inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold', status === 'active' ? 'bg-win-wash text-win' : 'bg-wash text-muted', className)}>
      {status === 'active' ? 'Active' : 'Completed'}
    </span>
  )
}
