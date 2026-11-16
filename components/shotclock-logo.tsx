import Link from 'next/link'

export function ShotclockMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <rect width="64" height="64" rx="18" fill="#E67145" />
      <path d="M25 10.5h14" stroke="#181310" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="32" cy="35" r="20" stroke="#181310" strokeWidth="3.5" />
      <path d="M12.5 35h39M32 15.5v39M18.5 21.5c7.5 5.5 10.5 17.5 0 27M45.5 21.5c-7.5 5.5-10.5 17.5 0 27" stroke="#181310" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 35l8-9" stroke="#FFF5E9" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="32" cy="35" r="2.5" fill="#FFF5E9" />
    </svg>
  )
}

export function ShotclockLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-lg text-[1.1875rem] font-bold tracking-[-0.03em] text-ink">
      <ShotclockMark className="size-8" />
      Shotclock
    </Link>
  )
}
