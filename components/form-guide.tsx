import type { Outcome } from '@/lib/api'
import { cn } from '@/lib/utils'

export function FormGuide({ results }: { results: Outcome[] }) {
  if (!results.length) return <span className="text-muted">–</span>
  return (
    <span className="inline-flex gap-1" aria-label={`Last ${results.length}, most recent first: ${results.map((r) => (r === 'W' ? 'win' : 'loss')).join(', ')}`}>
      {results.map((result, index) => (
        <span key={index} aria-hidden="true" className={cn('inline-flex size-5 items-center justify-center rounded text-[0.6875rem] font-bold', result === 'W' ? 'bg-win-wash text-win' : 'bg-loss-wash text-loss')}>{result}</span>
      ))}
    </span>
  )
}

export function Streak({ value }: { value: string | null }) {
  if (!value) return <span className="text-muted">–</span>
  return <span className={cn('font-semibold', value.startsWith('W') ? 'text-win' : 'text-loss')}>{value}</span>
}
