import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRightIcon, ArrowUpRightIcon, CalendarDaysIcon, ClockIcon, MapPinIcon, PlusIcon } from 'lucide-react'
import { getDirectory, getUpcoming, type DirectoryLeague, type UpcomingGame } from '@/lib/api'
import { HowItWorks } from '@/components/landing/how-it-works'
import { LeagueShowcase } from '@/components/landing/league-showcase'
import { TeamBadge } from '@/components/team-badge'
import { When } from '@/components/when'
import { seasonHref } from '@/lib/routes'
import { loginUrl, signupUrl } from '@/lib/site'
import heroPhoto from '@/assets/landing/hero.webp'
import fansPhoto from '@/assets/landing/fans.webp'
import gymPhoto from '@/assets/landing/gym.webp'
import huddlePhoto from '@/assets/landing/huddle.webp'
import outdoorPhoto from '@/assets/landing/outdoor.webp'
import youthPhoto from '@/assets/landing/youth.webp'

export const metadata: Metadata = {
  title: { absolute: 'Shotclock: basketball league management for organizers' },
  description: 'Run your basketball league in one place: teams, rosters, schedules, scores and standings, with a public league page families can follow from any phone.',
}

// The landing page still renders when the API is down; its live sections fall back to sign-up prompts.
async function safely<T>(load: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await load()
  } catch {
    return fallback
  }
}

function NextGameCard({ game }: { game: UpcomingGame | undefined }) {
  const rows = game?.scheduledAt
    ? [
        { icon: CalendarDaysIcon, label: 'Date', value: <When iso={game.scheduledAt} timeZone={game.league.timeZone} show="day" /> },
        { icon: ClockIcon, label: 'Time', value: <When iso={game.scheduledAt} timeZone={game.league.timeZone} show="time" /> },
        { icon: MapPinIcon, label: 'Venue', value: game.venue?.name ?? 'To be announced' },
      ]
    : null
  return (
    <aside aria-labelledby="hero-next-game" className="w-full rounded-[22px] bg-white/12 p-3 ring-1 ring-white/20 backdrop-blur-xl lg:max-w-[22rem] lg:self-end">
      <div className="px-2 pt-1 pb-3">
        <h2 id="hero-next-game" className="text-lg font-bold text-white">{rows ? 'Next game on Shotclock' : 'Your league, published'}</h2>
        <p className="text-sm text-white/75">{rows ? `${game!.league.name} · ${game!.division.name}` : 'Schedules, scores and standings on one page.'}</p>
      </div>
      <div className="rounded-2xl bg-surface p-4 text-ink">
        {game && rows ? (
          <>
            <div className="space-y-1.5">
              {[game.home, game.away].map((side) => (
                <p key={side.id} className="flex items-center gap-2.5 text-[0.9375rem] font-bold">
                  <TeamBadge name={side.name} abbreviation={side.abbreviation} size="sm" /><span className="truncate">{side.name}</span>
                </p>
              ))}
            </div>
            <dl className="mt-4 space-y-2 border-t border-line pt-3 text-sm">
              {rows.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon aria-hidden="true" className="size-4 text-muted" />
                  <dt className="w-12 text-muted">{label}</dt>
                  <dd className="min-w-0 truncate font-semibold tabular">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href={seasonHref(game.league.slug, game.season.slug, 'schedule', { division: game.division.id })} className="mt-4 flex h-11 items-center justify-center gap-1.5 rounded-xl bg-ink text-sm font-semibold text-white transition-colors hover:bg-black">
              View schedule<ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          </>
        ) : (
          <>
            <ul className="space-y-2 text-sm">
              {['Generate a full season schedule', 'Enter final scores after each game', 'Standings update on their own'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-semibold"><span className="grid size-6 place-items-center rounded-full bg-wash"><PlusIcon aria-hidden="true" className="size-3.5" /></span>{item}</li>
              ))}
            </ul>
            <a href={signupUrl} className="mt-4 flex h-11 items-center justify-center gap-1.5 rounded-xl bg-ink text-sm font-semibold text-white transition-colors hover:bg-black">
              Create your league<ArrowRightIcon aria-hidden="true" className="size-4" />
            </a>
          </>
        )}
      </div>
    </aside>
  )
}

const familyPages = [
  { title: 'Schedules', text: 'Every game time, court and venue, in the league’s own time zone.', photo: gymPhoto, alt: 'A basketball resting on an empty gym floor' },
  { title: 'Results and standings', text: 'Final scores and a standings table that follows your tiebreakers.', photo: youthPhoto, alt: 'A young player dribbling past a defender' },
  { title: 'Team stats', text: 'Points per game, margins, streaks and home and away records.', photo: outdoorPhoto, alt: 'A player shooting a jump shot on an outdoor court at sunset' },
  { title: 'Follow your team', text: 'Fans star one team and see its games highlighted on every page.', photo: fansPhoto, alt: 'Families cheering in the bleachers at a youth game' },
]

const questions = [
  { q: 'Who can see my league?', a: 'Only leagues you choose to publish appear on the public website, and only their active and completed seasons. Draft seasons stay private, and player names, birth dates and rosters are never shown.' },
  { q: 'Do families need an account?', a: 'No. Anyone can open your league page to check schedules, results, standings and team stats without signing in. Only organizers need a Shotclock account.' },
  { q: 'Can I run more than one league?', a: 'Yes. An organization can hold several leagues, each with its own seasons and divisions, and one account can manage more than one organization.' },
  { q: 'How are standings calculated?', a: 'Standings come from final scores of regular-season games and use the same tiebreakers you see in the admin app. Forfeits count in win and loss records but not in scoring averages.' },
  { q: 'How quickly do scores show up?', a: 'As soon as you save a final score, the public league page refreshes, so families see the result on their next page load.' },
]

export default async function LandingPage() {
  const [upcoming, directory] = await Promise.all([
    safely(() => getUpcoming(1), [] as UpcomingGame[]),
    safely(() => getDirectory(undefined, 1), { items: [] as DirectoryLeague[], page: 1, pageSize: 0, total: 0, totalPages: 0 }),
  ])

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <section aria-labelledby="hero-title" className="relative mt-4 overflow-hidden rounded-[28px] bg-ink sm:mt-6">
        <Image src={heroPhoto} alt="" fill preload placeholder="blur" sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover object-[68%_center]" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent" />
        <div className="relative grid gap-10 px-6 pt-14 pb-6 sm:px-10 sm:pt-20 sm:pb-10 lg:min-h-[40rem] lg:grid-cols-[minmax(0,1fr)_auto] lg:px-12 lg:pt-24 lg:pb-12">
          <div className="flex max-w-2xl flex-col">
            <h1 id="hero-title" className="text-[2.75rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.5rem]">Run your league from tip-off to title</h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">Teams, rosters, schedules, scores and standings in one place, with a public league page families can check from the bleachers.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={signupUrl} className="group inline-flex h-13 items-center gap-3 rounded-xl bg-orange pr-2 pl-5 text-base font-bold text-ink transition-colors hover:bg-orange-hover">
                Create your league
                <span className="grid size-9 place-items-center rounded-lg bg-ink text-white"><ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
              </a>
              <Link href="/leagues" className="inline-flex h-13 items-center rounded-xl bg-white/10 px-5 text-base font-semibold text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/20">Find a league</Link>
            </div>
            <p className="mt-auto pt-12 text-sm text-white/75">Already organizing on Shotclock? <a href={loginUrl} className="font-semibold text-white underline decoration-white/40 hover:decoration-white">Log in</a></p>
          </div>
          <NextGameCard game={upcoming[0]} />
        </div>
      </section>

      <HowItWorks signupUrl={signupUrl} />

      <LeagueShowcase leagues={directory.items.slice(0, 6)} total={directory.total} signupUrl={signupUrl} />

      <section id="for-families" aria-labelledby="families-title" className="tile mt-16 scroll-mt-20 p-6 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="families-title" className="max-w-lg text-3xl leading-[1.12] font-extrabold tracking-[-0.03em] text-ink sm:text-[2.5rem]">Everything families look for, on any phone</h2>
          <Link href="/leagues" className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-wash px-4 text-sm font-semibold text-ink transition-colors hover:bg-line">Browse leagues<ArrowRightIcon aria-hidden="true" className="size-4" /></Link>
        </div>
        <ul className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {familyPages.map((item) => (
            <li key={item.title} className="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-4 text-white sm:aspect-[4/5]">
              <Image src={item.photo} alt={item.alt} fill placeholder="blur" sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
              <span aria-hidden="true" className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-orange text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><ArrowUpRightIcon className="size-4" /></span>
              <h3 className="text-lg font-bold"><Link href="/leagues" className="after:absolute after:inset-0">{item.title}</Link></h3>
              <p className="mt-1 text-sm text-white/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cta-title" className="mt-16 rounded-[28px] bg-orange px-6 py-14 text-center text-ink sm:py-16">
        <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl leading-[1.12] font-extrabold tracking-[-0.03em] sm:text-[2.5rem]">Ready for tip-off? Set up your league today.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg">Create an account, add your teams and publish your first schedule.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={signupUrl} className="inline-flex h-13 items-center gap-2 rounded-xl bg-ink px-6 text-base font-bold text-white transition-colors hover:bg-black">Sign up<ArrowRightIcon aria-hidden="true" className="size-4" /></a>
          <a href={loginUrl} className="inline-flex h-13 items-center rounded-xl px-5 text-base font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">Log in to your account</a>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="tile mt-16 grid scroll-mt-20 gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div className="relative min-h-72 overflow-hidden rounded-2xl bg-ink">
          <Image src={huddlePhoto} alt="A coach talking to his team in a huddle during a timeout" fill placeholder="blur" sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
        </div>
        <div>
          <h2 id="faq-title" className="text-3xl leading-[1.12] font-extrabold tracking-[-0.03em] text-ink sm:text-[2.5rem]">Questions organizers ask</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {questions.map((item, index) => (
              <details key={item.q} open={index === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.0625rem] font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <PlusIcon aria-hidden="true" className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="-mt-1 pb-5 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
