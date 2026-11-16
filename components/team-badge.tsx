import { initials } from '@/lib/format'
import { cn } from '@/lib/utils'

export function TeamBadge({ name, abbreviation, size = 'md', className }: { name: string; abbreviation?: string | null; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const text = initials(name, abbreviation)
  return (
    <span aria-hidden="true" className={cn(
      'inline-flex shrink-0 items-center justify-center rounded-full bg-badge font-semibold tracking-[-0.02em] text-ink',
      size === 'sm' && 'size-7 text-[0.6875rem]', size === 'md' && 'size-9 text-xs', size === 'lg' && 'size-14 text-base',
      text.length > 2 && size !== 'lg' && 'text-[0.625rem]',
      className,
    )}>{text}</span>
  )
}
