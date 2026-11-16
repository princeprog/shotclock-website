import { ShotclockMark } from '@/components/shotclock-logo'
import { adminUrl } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2"><ShotclockMark className="size-5" />Schedules, results and standings published by league organizers with Shotclock.</p>
        <a href={adminUrl} className="font-medium text-ink underline decoration-line-strong hover:decoration-ink">Run a league? Sign in to Shotclock</a>
      </div>
    </footer>
  )
}
