'use client'

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react'
import { StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// One followed team per league, stored in this browser only by league team ID (stable across seasons).
const PREFIX = 'shotclock:follow:'
const EVENT = 'shotclock:follow'
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
type FollowState = { teamId: string | null; setTeam: (teamId: string | null) => void }
const FollowContext = createContext<FollowState>({ teamId: null, setTeam: () => {} })

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener(EVENT, onChange)
  return () => { window.removeEventListener('storage', onChange); window.removeEventListener(EVENT, onChange) }
}

function read(key: string) {
  try { const value = window.localStorage.getItem(key); return value && UUID.test(value) ? value : null } catch { return null }
}

// Every followed team across leagues, so pages listing several leagues can highlight them too.
function followedIds() {
  try {
    const ids: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (key?.startsWith(PREFIX)) { const value = read(key); if (value) ids.push(value) }
    }
    return ids.sort().join(',')
  } catch { return '' }
}

// Tints and stars every element marked with a followed team's data-team, site-wide.
export function FollowStyles() {
  const ids = useSyncExternalStore(subscribe, followedIds, () => '')
  if (!ids) return null
  const teams = ids.split(',')
  const css = `${teams.map((id) => `[data-team="${id}"]`).join(',')}{background-color:var(--follow)}`
    + `${teams.map((id) => `[data-team="${id}"] .follow-mark`).join(',')}{display:inline-flex}`
  return <style>{css}</style>
}

export function FollowProvider({ league, children }: { league: string; children: ReactNode }) {
  const key = `${PREFIX}${league}`
  const teamId = useSyncExternalStore(subscribe, () => read(key), () => null)
  const setTeam = useCallback((next: string | null) => {
    try { if (next) window.localStorage.setItem(key, next); else window.localStorage.removeItem(key) } catch { /* Storage can be unavailable in private browsing. */ }
    window.dispatchEvent(new Event(EVENT))
  }, [key])
  const value = useMemo(() => ({ teamId, setTeam }), [teamId, setTeam])
  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
}

export const useFollow = () => useContext(FollowContext)

export function FollowButton({ teamId, teamName, compact = false }: { teamId: string; teamName: string; compact?: boolean }) {
  const { teamId: followed, setTeam } = useFollow()
  const active = followed === teamId
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={compact ? (active ? `Stop following ${teamName}` : `Follow ${teamName}`) : undefined}
      onClick={() => setTeam(active ? null : teamId)}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg text-sm font-semibold transition-[background-color,color,transform] duration-200 ease-out active:scale-95',
        compact ? 'size-10' : 'h-10 px-3.5',
        active ? 'bg-orange text-ink hover:bg-orange-hover' : compact ? 'text-muted hover:bg-wash hover:text-ink' : 'border border-line-strong bg-surface text-ink hover:border-ink',
      )}
    >
      <StarIcon aria-hidden="true" className={cn('size-4 transition-transform duration-300 ease-out', active && 'scale-110 fill-ink')} />
      {!compact && (active ? 'Following' : 'Follow team')}
    </button>
  )
}
