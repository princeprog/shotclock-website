import type { MetadataRoute } from 'next'
import { getDirectory, type DirectoryLeague } from '@/lib/api'
import { seasonHref } from '@/lib/routes'
import { siteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

// Every published league's current season, with its main tabs.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const leagues: DirectoryLeague[] = []
  try {
    for (let page = 1; page <= 50; page++) {
      const directory = await getDirectory(undefined, page)
      leagues.push(...directory.items)
      if (page >= directory.totalPages) break
    }
  } catch {
    // The sitemap still lists the home page when the API is unavailable.
  }
  return [
    { url: siteUrl, changeFrequency: 'daily', priority: 1 },
    ...leagues.flatMap((league) => ['', 'schedule', 'standings', 'stats', 'teams'].map((tab) => ({
      url: `${siteUrl}${seasonHref(league.slug, league.season.slug, tab)}`,
      changeFrequency: 'daily' as const,
      priority: tab ? 0.6 : 0.8,
    }))),
  ]
}
