// Live game formatting shared by the game page and its tests.
export function formatClock(ms: number) {
  if (ms < 60_000) return `${Math.floor(ms / 1000)}.${Math.floor((ms % 1000) / 100)}`
  const seconds = Math.ceil(ms / 1000)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export function periodLabel(period: number, periodCount: number) {
  if (period > periodCount) return `OT${period - periodCount > 1 ? period - periodCount : ''}`
  return `${periodCount === 4 ? 'Q' : periodCount === 2 ? 'H' : 'P'}${period}`
}

// Time left now. A running clock counts down from when its reading arrived.
export function clockRemaining(clock: { remainingMs: number; running: boolean } | null, readAt: number, now: number) {
  if (!clock) return 0
  return clock.running ? Math.max(0, clock.remainingMs - (now - readAt)) : clock.remainingMs
}

const playCopy: { [kind: string]: string } = { rebound: 'Rebound', assist: 'Assist', steal: 'Steal', block: 'Block', turnover: 'Turnover', foul: 'Foul', timeout: 'Timeout', period_end: 'End of period' }
export function describePlay(play: { kind: string; points: number | null; player: string | null }) {
  const action = play.kind === 'points' ? `${play.points} ${play.points === 1 ? 'point' : 'points'}` : playCopy[play.kind] ?? play.kind
  return play.player ? `${play.player} · ${action}` : action
}

