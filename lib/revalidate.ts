import { createHash, timingSafeEqual } from 'node:crypto'

// Tag names shared with shotclock-api/src/public/website-revalidation.service.ts.
const TAG = /^(directory|league:[a-z0-9]+(?:-[a-z0-9]+)*)$/
const MAX_TAGS = 50

const digest = (value: string) => createHash('sha256').update(value).digest()

export function authorized(header: string | null, secret: string | undefined) {
  if (!secret || Buffer.byteLength(secret) < 32 || !header?.startsWith('Bearer ')) return false
  return timingSafeEqual(digest(header.slice(7)), digest(secret))
}

// Returns the requested tags, or null when the body is not a valid list.
export function parseTags(body: unknown): string[] | null {
  if (!body || typeof body !== 'object' || !Array.isArray((body as { tags?: unknown }).tags)) return null
  const tags = (body as { tags: unknown[] }).tags
  if (!tags.length || tags.length > MAX_TAGS) return null
  if (!tags.every((tag) => typeof tag === 'string' && tag.length <= 70 && TAG.test(tag))) return null
  return [...new Set(tags as string[])]
}
