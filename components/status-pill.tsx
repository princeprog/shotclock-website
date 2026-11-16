import { cn } from '@/lib/utils'

export function StatusPill({ status, className }: { status: 'active' | 'completed'; className?: string }) {
  return (
    <span className={cn('inline-flex h-7 items-center rounded-full px-3 text-[0.8125rem] font-bold', status === 'active' ? 'bg-win-wash text-win' : 'bg-wash text-muted', className)}>
      {status === 'active' ? 'Active' : 'Completed'}
    </span>
  )
}
