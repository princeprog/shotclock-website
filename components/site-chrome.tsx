'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// The landing page draws its own navigation inside the hero, so the shared header steps aside there.
export function HideOnLanding({ children }: { children: ReactNode }) {
  return usePathname() === '/' ? null : children
}
