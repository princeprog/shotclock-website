import type { NextRequest } from 'next/server'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// Streams a live game's updates through the website's own origin, so the API address and site key stay on the server.
export async function GET(request: NextRequest, { params }: { params: Promise<{ game: string }> }) {
  const { game } = await params
  const base = process.env.SHOTCLOCK_API_URL
  if (!UUID.test(game) || !base) return Response.json({ error: 'Not found' }, { status: 404 })
  const headers: HeadersInit = { accept: 'text/event-stream', ...(process.env.PUBLIC_SITE_KEY ? { 'x-shotclock-site-key': process.env.PUBLIC_SITE_KEY } : {}) }
  try {
    const upstream = await fetch(`${base.replace(/\/$/, '')}/public/games/${game}/live`, { headers, cache: 'no-store', signal: request.signal })
    if (!upstream.ok || !upstream.body) return Response.json({ error: upstream.status === 404 ? 'Not found' : 'Live updates are unavailable' }, { status: upstream.status === 404 ? 404 : 503 })
    return new Response(upstream.body, { headers: { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache, no-transform', 'X-Accel-Buffering': 'no' } })
  } catch {
    return Response.json({ error: 'Live updates are unavailable' }, { status: 503 })
  }
}

export const dynamic = 'force-dynamic'

