'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

// Wide tables scroll sideways on phones; a fade at the right edge shows only while more columns are hidden.
export function ScrollTable({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [more, setMore] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const measure = () => setMore(element.scrollLeft + element.clientWidth < element.scrollWidth - 1)
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    element.addEventListener('scroll', measure, { passive: true })
    return () => { observer.disconnect(); element.removeEventListener('scroll', measure) }
  }, [])
  return (
    <div className="relative">
      <div ref={ref} className="overflow-x-auto">{children}</div>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface to-transparent transition-opacity duration-200 ${more ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}
