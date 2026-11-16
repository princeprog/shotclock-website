'use client'

import { useSyncExternalStore } from 'react'
import { formatDay, formatTime, type Zone } from '@/lib/format'

const subscribe = () => () => {}

// Game times in the league's zone. Without one, the server renders UTC and the browser switches to the visitor's zone.
export function When({ iso, timeZone, show = 'both' }: { iso: string; timeZone: Zone; show?: 'day' | 'time' | 'both' }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const zone = timeZone || (mounted ? undefined : 'UTC')
  const day = formatDay(iso, zone)
  const time = formatTime(iso, zone) + (!timeZone && !mounted ? ' UTC' : '')
  return <time dateTime={iso}>{show === 'day' ? day : show === 'time' ? time : `${day} · ${time}`}</time>
}
