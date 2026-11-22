import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGameDetail, uuidParam } from '@/lib/api'
import { teamHref } from '@/lib/routes'
import { LiveGame } from '@/components/live-game'

type Props = { params: Promise<{ league: string; season: string; game: string }> }

async function load(params: Props['params']) {
  const { league, season, game } = await params
  if (!uuidParam(game)) notFound()
  return getGameDetail(league, season, game)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { league, season, game } = await load(params)
  return { title: `${game.home.name} vs ${game.away.name} · ${season.name} · ${league.name}` }
}

export default async function GamePage({ params }: Props) {
  const { league, season, game } = await load(params)
  const teamHrefs = Object.fromEntries([game.home.seasonTeamId, game.away.seasonTeamId].filter((id): id is string => !!id).map((id) => [id, teamHref(league.slug, season.slug, id)]))
  return <LiveGame initial={game} teamHrefs={teamHrefs} />
}

