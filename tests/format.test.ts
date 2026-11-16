import assert from 'node:assert/strict'
import { test } from 'node:test'
import { dayKey, divisionAges, formatCalendarDate, formatPct, formatSigned, formatTime, initials, stageLabel } from '../lib/format.ts'

test('team badges use the abbreviation, else initials', () => {
  assert.equal(initials('Riverside Hawks', null), 'RH')
  assert.equal(initials('Riverside Hawks', 'rvh'), 'RVH')
  assert.equal(initials('Kings'), 'KI')
  assert.equal(initials('  St. Jude  Saints '), 'SJ')
  assert.equal(initials('!!!'), '?')
})

test('times follow the league time zone', () => {
  const tipOff = '2026-11-21T10:30:00.000Z'
  assert.equal(formatTime(tipOff, 'Asia/Manila'), '6:30 PM')
  assert.equal(dayKey('2026-11-21T17:00:00.000Z', 'Asia/Manila'), '2026-11-22')
  assert.equal(dayKey('2026-11-21T17:00:00.000Z', 'America/New_York'), '2026-11-21')
})

test('calendar dates never shift', () => {
  assert.equal(formatCalendarDate('2026-06-01'), 'Jun 1, 2026')
})

test('numbers read like a standings page', () => {
  assert.equal(formatPct(0.875), '.875')
  assert.equal(formatPct(1), '1.000')
  assert.equal(formatPct(null), '–')
  assert.equal(formatSigned(64), '+64')
  assert.equal(formatSigned(-18), '−18')
  assert.equal(stageLabel('final', null), 'Championship')
  assert.equal(stageLabel('preliminary', 3), 'Round 3')
  assert.equal(divisionAges(null, 18), 'Under 18')
  assert.equal(divisionAges(12, 15), 'Ages 12–14')
})
