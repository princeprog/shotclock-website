import { cn } from '@/lib/utils'

// Basketball court linework for page headers: center circle, half-court line, both keys and three-point arcs.
export function CourtLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 940 500" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true" className={cn('pointer-events-none absolute inset-0 hidden h-full w-full text-orange sm:block [mask-image:linear-gradient(to_right,transparent_5%,black_60%)]', className)}>
      <g stroke="currentColor" strokeWidth="2">
        <rect x="1" y="1" width="938" height="498" />
        <path d="M470 1v498" />
        <circle cx="470" cy="250" r="60" />
        <circle cx="470" cy="250" r="20" />
        <rect x="1" y="170" width="190" height="160" />
        <path d="M191 190a60 60 0 0 1 0 120" />
        <path d="M191 190a60 60 0 0 0 0 120" strokeDasharray="10 10" />
        <path d="M1 30h140a220 220 0 0 1 0 440H1" />
        <path d="M52 250h-12" />
        <rect x="749" y="170" width="190" height="160" />
        <path d="M749 190a60 60 0 0 0 0 120" />
        <path d="M749 190a60 60 0 0 1 0 120" strokeDasharray="10 10" />
        <path d="M939 30H799a220 220 0 0 0 0 440h140" />
        <path d="M888 250h12" />
      </g>
    </svg>
  )
}
