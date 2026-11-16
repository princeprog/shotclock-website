import assert from 'node:assert/strict'
import { test } from 'node:test'
import { authorized, parseTags } from '../lib/revalidate.ts'

const secret = 'a-test-secret-that-is-at-least-32-bytes-long'

test('only the shared secret is accepted', () => {
  assert.equal(authorized(`Bearer ${secret}`, secret), true)
  assert.equal(authorized('Bearer wrong', secret), false)
  assert.equal(authorized(secret, secret), false)
  assert.equal(authorized(null, secret), false)
  assert.equal(authorized('Bearer short', 'short'), false)
  assert.equal(authorized(`Bearer ${secret}`, undefined), false)
})

test('only directory and league tags are accepted', () => {
  assert.deepEqual(parseTags({ tags: ['directory', 'league:metro-hoops', 'league:metro-hoops'] }), ['directory', 'league:metro-hoops'])
  assert.equal(parseTags({ tags: [] }), null)
  assert.equal(parseTags({ tags: ['league:Metro'] }), null)
  assert.equal(parseTags({ tags: ['other'] }), null)
  assert.equal(parseTags({ tags: 'directory' }), null)
  assert.equal(parseTags(null), null)
  assert.equal(parseTags({ tags: Array.from({ length: 51 }, (_, i) => `league:l${i}x`) }), null)
})
