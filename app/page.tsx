import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRightIcon, PlusIcon } from 'lucide-react'
import { getDirectory, getUpcoming, type DirectoryLeague, type UpcomingGame } from '@/lib/api'
import { HowItWorks } from '@/components/landing/how-it-works'
import { LeagueShowcase } from '@/components/landing/league-showcase'
import { PillButton, Tag } from '@/components/landing/tag'
import { MobileMenu } from '@/components/mobile-menu'
import { ShotclockMark } from '@/components/shotclock-logo'
import { siteLinks } from '@/components/site-header'
import { When } from '@/components/when'
import { seasonHref } from '@/lib/routes'
import { loginUrl, signupUrl } from '@/lib/site'
import heroPhoto from '@/assets/landing/hero-day.webp'
import ballPhoto from '@/assets/landing/ball.webp'
import fansPhoto from '@/assets/landing/fans.webp'
import gymPhoto from '@/assets/landing/gym.webp'
import huddlePhoto from '@/assets/landing/huddle.webp'
import organizerPhoto from '@/assets/landing/organizer.webp'
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

function HeroNav() {
  return (
    <div className="relative z-30 flex items-center gap-3 px-5 pt-5 sm:px-8 sm:pt-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-12">
      <Link href="/" className="flex items-center gap-2.5 rounded-lg text-lg font-semibold tracking-[-0.02em] text-white">
        <ShotclockMark className="size-8" />Shotclock
      </Link>
      <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
        {siteLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm font-medium text-white/85 transition-colors hover:text-white">{link.label}</Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2 lg:justify-self-end">
        <a href={loginUrl} className="hidden h-10 items-center rounded-full px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex">Log in</a>
        <PillButton href={signupUrl} tone="white" size="sm">Sign up</PillButton>
        <MobileMenu links={siteLinks} loginUrl={loginUrl} tone="dark" />
      </div>
    </div>
  )
}

function NextGameCard({ game }: { game: UpcomingGame | undefined }) {
  const ready = game?.scheduledAt ? game : undefined
  const rows = ready
    ? [
        ['Match', <span key="m" className="leading-snug">{ready.home.name} vs {ready.away.name}</span>],
        ['Date', <When key="d" iso={ready.scheduledAt!} timeZone={ready.league.timeZone} show="day" />],
        ['Time', <When key="t" iso={ready.scheduledAt!} timeZone={ready.league.timeZone} show="time" />],
        ['Venue', ready.venue?.name ?? 'To be announced'],
      ] as const
    : [
        ['Teams', 'Rosters and divisions'],
        ['Schedule', 'Generated in minutes'],
        ['Scores', 'Standings update on save'],
      ] as const
  const href = ready ? seasonHref(ready.league.slug, ready.season.slug, 'schedule', { division: ready.division.id }) : signupUrl
  return (
    <aside aria-labelledby="hero-next-game" className="w-full rounded-[22px] bg-white/15 p-2.5 ring-1 ring-white/25 backdrop-blur-xl sm:w-[21rem]">
      <div className="px-2.5 pt-1.5 pb-2.5">
        <h2 id="hero-next-game" className="text-[1.0625rem] font-semibold text-white">{ready ? 'Upcoming game' : 'Your league, published'}</h2>
        <p className="truncate text-[0.8125rem] text-white/80">{ready ? `${ready.league.name} · ${ready.division.name}` : 'Everything families check, in one place'}</p>
      </div>
      <div className="rounded-2xl bg-surface p-3.5 text-ink">
        <dl className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-[0.8125rem]">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-muted">{label}:</dt>
              <dd className="font-medium tabular">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="relative mt-3.5 h-24 overflow-hidden rounded-xl">
          <Image src={youthPhoto} alt="" fill sizes="320px" placeholder="blur" className="object-cover" />
          <a href={href} className="absolute right-2 bottom-2 inline-flex h-8 items-center rounded-full bg-orange px-3.5 text-[0.8125rem] font-semibold text-ink transition-colors hover:bg-orange-hover">{ready ? 'View schedule' : 'Get started'}</a>
        </div>
      </div>
    </aside>
  )
}

const familyPages = [
  { tag: 'Schedules', title: 'Game times, courts and venues', photo: gymPhoto, alt: 'A basketball resting on an empty gym floor' },
  { tag: 'Standings', title: 'Results and a table that follows your tiebreakers', photo: youthPhoto, alt: 'A young player dribbling past a defender' },
  { tag: 'Team stats', title: 'Points per game, margins and streaks', photo: outdoorPhoto, alt: 'A player shooting a jump shot on an outdoor court at sunset' },
  { tag: 'Follow', title: 'Star a team and see its games highlighted', photo: fansPhoto, alt: 'Families cheering in the bleachers at a youth game' },
]

const questions = [
  { q: 'Who can see my league?', a: 'Only leagues you choose to publish appear on the public website, and only their active and completed seasons. Draft seasons stay private, and player names, birth dates and rosters are never shown.' },
  { q: 'Do families need an account?', a: 'No. Anyone can open your league page to check schedules, results, standings and team stats without signing in. Only organizers need a Shotclock account.' },
  { q: 'Can I run more than one league?', a: 'Yes. An organization can hold several leagues, each with its own seasons and divisions, and one account can manage more than one organization.' },
  { q: 'How are standings calculated?', a: 'Standings come from final scores of regular-season games and use the same tiebreakers you see in the admin app. Forfeits count in win and loss records but not in scoring averages.' },
  { q: 'How quickly do scores show up?', a: 'As soon as you save a final score, the public league page refreshes, so families see the result on their next page load.' },
]

const balls = [
  'top-[-2.5rem] left-[-1.5rem] w-24 rotate-12 sm:w-28',
  'bottom-6 left-[6%] hidden w-12 -rotate-12 sm:block',
  'top-8 right-[8%] hidden w-10 rotate-45 md:block',
  'right-[-1.5rem] bottom-[-2rem] w-24 -rotate-6 sm:w-32',
]

export default async function LandingPage() {
  const [upcoming, directory] = await Promise.all([
    safely(() => getUpcoming(1), [] as UpcomingGame[]),
    safely(() => getDirectory(undefined, 1), { items: [] as DirectoryLeague[], page: 1, pageSize: 0, total: 0, totalPages: 0 }),
  ])

  return (
    <>
    <main className="bg-surface pb-20">
      <div className="mx-auto max-w-[90rem] px-2.5 pt-2.5 sm:px-4 sm:pt-4">
        <section aria-labelledby="hero-title" className="relative">
          <div className="absolute inset-0 overflow-hidden rounded-[24px] bg-ink sm:rounded-[32px]">
            <Image src={heroPhoto} alt="" fill preload placeholder="blur" sizes="(min-width: 1440px) 1408px, 100vw" className="object-cover object-[62%_center]" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-black/0" />
            <div aria-hidden="true" className="absolute inset-0 bg-black/35 lg:hidden" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/35 to-transparent" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/55 to-transparent" />
          </div>
          <HeroNav />
          <div className="relative grid gap-8 px-5 pt-16 pb-6 sm:px-8 sm:pt-24 sm:pb-10 lg:min-h-[38rem] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-12 lg:pt-24 lg:pb-12">
            <div className="flex max-w-xl flex-col lg:self-stretch">
              <h1 id="hero-title" className="text-[2.5rem] leading-[1.06] font-semibold tracking-[-0.025em] text-white sm:text-[3.5rem] lg:text-[4rem]">Built to run every game of your league</h1>
              <p className="mt-4 max-w-md text-base text-white/85 sm:text-lg">Teams, schedules, scores and standings in one place, with a public page families can check from the bleachers.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <PillButton href={signupUrl}>Get started today</PillButton>
                <Link href="/leagues" className="inline-flex h-12 items-center rounded-full bg-white/15 px-5 text-[0.9375rem] font-semibold text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/25">Find a league</Link>
              </div>
              <div className="mt-10 flex items-center gap-3 lg:mt-auto lg:pt-16">
                <div className="flex -space-x-2.5">
                  {[organizerPhoto, huddlePhoto, fansPhoto].map((photo, index) => (
                    <span key={index} className="relative size-10 overflow-hidden rounded-full ring-2 ring-white/90"><Image src={photo} alt="" fill sizes="40px" className="object-cover" /></span>
                  ))}
                </div>
                <p className="max-w-[16rem] text-sm leading-snug text-white/90">For organizers, coaches and the families who follow every game.</p>
              </div>
            </div>
            <div>
              <NextGameCard game={upcoming[0]} />
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-[90rem] px-7.5 sm:px-12 lg:px-16">
        <HowItWorks signupUrl={signupUrl} />
        <LeagueShowcase leagues={directory.items.slice(0, 6)} total={directory.total} signupUrl={signupUrl} />

        <section id="for-families" aria-labelledby="families-title" className="mt-20 scroll-mt-6 sm:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <Tag>For families</Tag>
              <h2 id="families-title" className="mt-4 max-w-md text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.02em] text-ink sm:text-[2.5rem]">Everything families look for, on any phone</h2>
            </div>
            <PillButton href="/leagues" size="sm">Browse leagues</PillButton>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {familyPages.map((item) => (
              <li key={item.tag} className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-3 text-white sm:aspect-[4/5] sm:p-4">
                <Image src={item.photo} alt={item.alt} fill placeholder="blur" sizes="(min-width: 1024px) 300px, 50vw" className="-z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
                <span aria-hidden="true" className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-orange text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-9"><ArrowUpRightIcon className="size-4" /></span>
                <Tag tone="dark" className="h-7 self-start px-3 text-xs">{item.tag}</Tag>
                <h3 className="mt-2 text-sm leading-snug font-semibold sm:text-base"><Link href="/leagues" className="after:absolute after:inset-0">{item.title}</Link></h3>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mx-auto mt-20 max-w-[90rem] px-2.5 sm:mt-28 sm:px-4">
      <section aria-labelledby="cta-title" className="relative overflow-hidden rounded-[24px] bg-ink px-6 py-16 text-center text-white sm:rounded-[32px] sm:py-20">
        {balls.map((position) => (
          <Image key={position} src={ballPhoto} alt="" aria-hidden="true" className={`pointer-events-none absolute h-auto ${position}`} sizes="128px" />
        ))}
        <div className="relative">
          <Tag tone="dark">Get started today</Tag>
          <h2 id="cta-title" className="mx-auto mt-4 max-w-xl text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[2.5rem]">Ready for tip-off? Set up your league today</h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">Create an account, add your teams and publish your first schedule.</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <PillButton href={signupUrl} size="sm">Sign up</PillButton>
            <a href={loginUrl} className="inline-flex h-10 items-center px-3 text-sm font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white">Log in to your account</a>
          </div>
        </div>
      </section>
      </div>

      <section id="faq" aria-labelledby="faq-title" className="mx-auto mt-20 max-w-[90rem] scroll-mt-6 px-7.5 sm:mt-28 sm:px-12 lg:px-16">
        <div className="text-center">
          <Tag>FAQ</Tag>
          <h2 id="faq-title" className="mx-auto mt-4 max-w-lg text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.02em] text-ink sm:text-[2.5rem]">Questions organizers ask before they start</h2>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
          <div className="relative pb-10 sm:pr-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-wash">
              <Image src={huddlePhoto} alt="A coach talking to his team in a huddle during a timeout" fill placeholder="blur" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
            <div className="absolute right-0 bottom-0 w-[min(17rem,80%)] rounded-2xl bg-surface p-4 shadow-[0_12px_32px_rgb(17_17_17/0.12)]">
              <ShotclockMark className="size-7" />
              <p className="mt-2.5 text-sm leading-relaxed text-ink">Every score you save shows up on your public league page, with standings recalculated for you.</p>
            </div>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {questions.map((item, index) => (
              <details key={item.q} open={index === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-open:border-orange group-open:bg-orange"><PlusIcon aria-hidden="true" className="size-4 transition-transform duration-200 group-open:rotate-45" /></span>
                </summary>
                <p className="-mt-1 pr-12 pb-5 text-[0.9375rem] text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
    <footer className="bg-surface">
      <div className="mx-auto max-w-[90rem] px-2.5 sm:px-4">
      <div className="flex flex-col gap-3 border-t border-line px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="flex items-center gap-2"><ShotclockMark className="size-5" />Basketball league management for organizers and the families who follow along.</p>
        <p className="flex gap-5">
          <Link href="/leagues" className="font-medium text-ink hover:underline">Find a league</Link>
          <a href={loginUrl} className="font-medium text-ink hover:underline">Log in</a>
          <a href={signupUrl} className="font-medium text-ink hover:underline">Sign up</a>
        </p>
      </div>
      </div>
    </footer>
    </>
  )
}
