import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getLeague } from '@/lib/api'
import { EmptyState } from '@/components/empty-state'
import { LeagueHeader } from '@/components/league-header'
import { seasonHref } from '@/lib/routes'

type Props = { params: Promise<{ league: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { league } = await getLeague((await params).league)
  return { title: league.name }
}

// Opens the active (or latest) season; a published league without one shows a placeholder.
export default async function LeaguePage({ params }: Props) {
  const slug = (await params).league
  const { league, seasons, defaultSeason } = await getLeague(slug)
  if (defaultSeason) redirect(seasonHref(league.slug, defaultSeason))
  return (
    <>
      <LeagueHeader league={league} seasons={seasons} />
      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <EmptyState title="Season coming soon">{league.name} hasn’t started a season yet. Schedules and standings will appear here once it does.</EmptyState>
      </main>
    </>
  )
}
