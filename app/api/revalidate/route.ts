import { revalidateTag } from 'next/cache'
import { authorized, parseTags } from '@/lib/revalidate'

// Called by the Shotclock API after an organizer changes a published league.
export async function POST(request: Request) {
  if (!authorized(request.headers.get('authorization'), process.env.WEBSITE_REVALIDATE_SECRET)) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }
  const tags = parseTags(await request.json().catch(() => null))
  if (!tags) return Response.json({ message: 'Send { "tags": [...] } with directory or league:<slug> tags' }, { status: 400 })
  for (const tag of tags) revalidateTag(tag, { expire: 0 })
  return Response.json({ revalidated: tags })
}
