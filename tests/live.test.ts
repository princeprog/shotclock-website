import { test } from 'node:test'
import assert from 'node:assert/strict'
import { clockRemaining, describePlay, formatClock, periodLabel } from '../lib/live.ts'

test('live clock and periods read like a scoreboard', () => {
  assert.equal(formatClock(600000), '10:00')
  assert.equal(formatClock(59999), '59.9')
  assert.equal(periodLabel(3, 4), 'Q3')
  assert.equal(periodLabel(2, 2), 'H2')
  assert.equal(periodLabel(5, 4), 'OT')
  assert.equal(clockRemaining({ remainingMs: 10000, running: true }, 1000, 4000), 7000)
  assert.equal(clockRemaining({ remainingMs: 10000, running: false }, 1000, 4000), 10000)
  assert.equal(describePlay({ kind: 'points', points: 3, player: 'Ana Cruz' }), 'Ana Cruz · 3 points')
  assert.equal(describePlay({ kind: 'timeout', points: null, player: null }), 'Timeout')
})

