import type { Metadata, Viewport } from 'next'
import { Inter_Tight } from 'next/font/google'
import { connection } from 'next/server'
import './globals.css'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { HideOnLanding } from '@/components/site-chrome'
import { FollowStyles } from '@/components/follow'
import { siteUrl } from '@/lib/site'

const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Shotclock leagues: schedules, results and standings', template: '%s · Shotclock' },
  description: 'Find your basketball league on Shotclock: game schedules, final scores, standings and team stats, published by league organizers.',
  icons: {
    icon: [{ url: '/shotclock-mark.svg', type: 'image/svg+xml' }, { url: '/shotclock-icon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/shotclock-apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = { themeColor: '#eef0f3' }

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Render per request so every page carries the proxy's CSP nonce; API data is still cached.
  await connection()
  return (
    <html lang="en" className={interTight.variable}>
      <body className="flex min-h-dvh flex-col antialiased">
        <FollowStyles />
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:font-semibold">Skip to content</a>
        <HideOnLanding><SiteHeader /></HideOnLanding>
        <div id="content" className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
