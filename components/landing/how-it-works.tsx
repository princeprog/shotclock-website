'use client'

import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import fansPhoto from '@/assets/landing/fans.webp'
import gymPhoto from '@/assets/landing/gym.webp'
import heroPhoto from '@/assets/landing/hero.webp'
import huddlePhoto from '@/assets/landing/huddle.webp'
import organizerPhoto from '@/assets/landing/organizer.webp'
import outdoorPhoto from '@/assets/landing/outdoor.webp'
import scorerPhoto from '@/assets/landing/scorer.webp'
import youthPhoto from '@/assets/landing/youth.webp'

type Slide = { step: string; title: string; text: string; points: string[]; photo: StaticImageData; alt: string; side: StaticImageData; sideAlt: string }

const slides: Slide[] = [
  {
    step: 'Set up', title: 'Set up your league once',
    text: 'Create your organization, then add leagues, seasons and divisions with age limits. Register teams, add players and build each roster.',
    points: ['Several leagues under one organization', 'Divisions with minimum and maximum ages', 'Venues and courts saved for scheduling'],
    photo: organizerPhoto, alt: 'A league organizer checking a tablet courtside', side: huddlePhoto, sideAlt: 'A coach talking to his team in a huddle',
  },
  {
    step: 'Schedule', title: 'Generate the whole season',
    text: 'Pick a single or double round robin, add playoffs, and set courts, blackout dates and team availability. Shotclock places every game and flags conflicts before you save.',
    points: ['Drag games to another day on a calendar', 'Per-team daily limits and court changeover', 'Optional top-four playoffs'],
    photo: youthPhoto, alt: 'A young player dribbling past a defender', side: gymPhoto, sideAlt: 'A basketball resting on an empty gym floor',
  },
  {
    step: 'Score', title: 'Enter scores, standings follow',
    text: 'Record final scores and forfeits after each game. Standings, tiebreakers and team stats update on their own, and the next playoff round is created when the last one is final.',
    points: ['Tiebreakers applied automatically', 'Forfeits tracked in records', 'Team stats from every final game'],
    photo: scorerPhoto, alt: 'A volunteer entering a final score on a laptop at the scorer’s table', side: outdoorPhoto, sideAlt: 'A player shooting a jump shot on an outdoor court',
  },
  {
    step: 'Publish', title: 'Share it with every family',
    text: 'Turn on your league’s public page with one switch. Families and fans check schedules, results and standings from any phone, with no account needed.',
    points: ['Your own league web address', 'No player names or rosters shown', 'Updates as soon as a score is saved'],
    photo: fansPhoto, alt: 'Families cheering in the bleachers, one checking a phone', side: heroPhoto, sideAlt: 'A player rising for a layup in a packed arena',
  },
]

export function HowItWorks({ signupUrl }: { signupUrl: string }) {
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  const go = (step: number) => setIndex((current) => (current + step + slides.length) % slides.length)

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="tile mt-16 scroll-mt-20 p-6 sm:p-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-end">
        <h2 id="how-title" className="text-3xl leading-[1.12] font-extrabold tracking-[-0.03em] text-ink sm:text-[2.5rem] lg:order-2">Everything you need to run a season, in four steps</h2>
        <div className="flex flex-wrap items-center gap-2 lg:order-1">
          <button type="button" onClick={() => go(-1)} aria-label="Previous step" className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink"><ArrowLeftIcon aria-hidden="true" className="size-4" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next step" className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink"><ArrowRightIcon aria-hidden="true" className="size-4" /></button>
          <div className="ml-1 flex flex-wrap gap-1.5">
            {slides.map((item, i) => (
              <button key={item.step} type="button" onClick={() => setIndex(i)} aria-pressed={i === index} className={cn('h-9 rounded-full px-3.5 text-sm font-semibold transition-colors', i === index ? 'bg-ink text-white' : 'bg-wash text-muted hover:text-ink')}>{item.step}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">Step {index + 1} of {slides.length}: {slide.title}</p>
      <div key={index} className="slide-in mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.7fr)] lg:items-center lg:gap-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-wash">
          <Image src={slide.photo} alt={slide.alt} fill placeholder="blur" sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.8125rem] font-semibold text-ink backdrop-blur">Step {index + 1} · {slide.step}</span>
        </div>
        <div>
          <h3 className="text-2xl font-extrabold tracking-[-0.025em] text-ink">{slide.title}</h3>
          <p className="mt-3 text-muted">{slide.text}</p>
          <ul className="mt-5 space-y-2.5">
            {slide.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] font-semibold text-ink">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-orange-wash text-orange-ink"><CheckIcon aria-hidden="true" className="size-3.5" strokeWidth={3} /></span>{point}
              </li>
            ))}
          </ul>
          <a href={signupUrl} className="group mt-7 inline-flex h-12 items-center gap-3 rounded-xl bg-ink pr-1.5 pl-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-black">
            Get started
            <span className="grid size-9 place-items-center rounded-lg bg-orange text-ink"><ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
          </a>
        </div>
        <div className="hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-wash">
            <Image src={slide.side} alt={slide.sideAlt} fill placeholder="blur" sizes="260px" className="object-cover" />
          </div>
          <p className="mt-3 text-right text-sm text-muted tabular"><span className="font-bold text-ink">{index + 1}</span> / {slides.length}</p>
        </div>
      </div>
    </section>
  )
}
