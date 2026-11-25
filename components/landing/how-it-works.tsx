'use client'

import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react'
import { PillButton, Tag } from '@/components/landing/tag'
import fansPhoto from '@/assets/landing/fans.webp'
import gymPhoto from '@/assets/landing/gym.webp'
import heroPhoto from '@/assets/landing/hero.webp'
import huddlePhoto from '@/assets/landing/huddle.webp'
import organizerPhoto from '@/assets/landing/organizer.webp'
import outdoorPhoto from '@/assets/landing/outdoor.webp'
import scorerPhoto from '@/assets/landing/scorer.webp'
import youthPhoto from '@/assets/landing/youth.webp'

type Slide = { step: string; title: string; text: string; points: string[]; photo: StaticImageData; alt: string; label: string; side: StaticImageData; sideAlt: string; sideLabel: string }

const slides: Slide[] = [
  {
    step: 'Set up', title: 'Set up your league once',
    text: 'Create your organization, then add leagues, seasons and divisions with age limits. Register teams, add players and build each roster.',
    points: ['Several leagues under one organization', 'Divisions with age limits', 'Venues saved for scheduling'],
    photo: organizerPhoto, alt: 'A league organizer checking a tablet courtside', label: 'Organizers',
    side: huddlePhoto, sideAlt: 'A coach talking to his team in a huddle', sideLabel: 'Teams',
  },
  {
    step: 'Schedule', title: 'Generate the whole season',
    text: 'Pick a single or double round robin, add playoffs, and set courts, blackout dates and team availability. Shotclock places every game and flags conflicts.',
    points: ['Drag games to another day', 'Per-team daily limits', 'Optional top-four or top-eight playoffs'],
    photo: youthPhoto, alt: 'A young player dribbling past a defender', label: 'Game day',
    side: gymPhoto, sideAlt: 'A basketball resting on an empty gym floor', sideLabel: 'Courts',
  },
  {
    step: 'Score', title: 'Enter scores, standings follow',
    text: 'Record final scores and forfeits after each game. Standings, tiebreakers and team stats update on their own, and playoff rounds are created as results come in.',
    points: ['Tiebreakers applied for you', 'Forfeits tracked in records', 'Team stats from every final'],
    photo: scorerPhoto, alt: 'A volunteer entering a final score on a laptop at the scorer’s table', label: 'Scorer’s table',
    side: outdoorPhoto, sideAlt: 'A player shooting a jump shot on an outdoor court', sideLabel: 'Results',
  },
  {
    step: 'Publish', title: 'Share it with every family',
    text: 'Turn on your league’s public page with one switch. Families and fans check schedules, results and standings from any phone, with no account needed.',
    points: ['Your own league web address', 'No player names or rosters shown', 'Updates as soon as a score is saved'],
    photo: fansPhoto, alt: 'Families cheering in the bleachers, one checking a phone', label: 'Families',
    side: heroPhoto, sideAlt: 'A player rising for a layup in a packed arena', sideLabel: 'Fans',
  },
]

function Photo({ src, alt, label, sizes, className }: { src: StaticImageData; alt: string; label: string; sizes: string; className: string }) {
  return (
    <div className={`relative overflow-clip rounded-2xl bg-wash ${className}`}>
      <div className="parallax absolute inset-0">
        <Image src={src} alt={alt} fill placeholder="blur" quality={85} sizes={sizes} className="step-photo object-cover" />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent" />
      <span className="absolute bottom-3 left-3.5 text-[0.8125rem] font-medium text-white">{label}</span>
    </div>
  )
}

export function HowItWorks({ signupUrl }: { signupUrl: string }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<'next' | 'prev'>()
  const slide = slides[index]
  const go = (step: number) => {
    setDir(step > 0 ? 'next' : 'prev')
    setIndex((current) => (current + step + slides.length) % slides.length)
  }
  const arrow = 'grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white'

  return (
    <section id="how-it-works" aria-labelledby="how-title" data-dir={dir} className="mt-16 scroll-mt-6 sm:mt-20 lg:mt-24">
      <div className="reveal grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="flex items-center justify-between gap-4">
          <Tag>How Shotclock works</Tag>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous step" className={arrow}><ArrowLeftIcon aria-hidden="true" className="size-4" /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next step" className={arrow}><ArrowRightIcon aria-hidden="true" className="size-4" /></button>
          </div>
        </div>
        <h2 id="how-title" className="text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.02em] text-ink sm:text-[2.5rem] 2xl:text-[3.25rem]">Everything you need to run a season, in four steps</h2>
      </div>

      <p className="sr-only" aria-live="polite">Step {index + 1} of {slides.length}: {slide.title}</p>
      <div className="reveal mt-8">
      <div key={index} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] lg:items-center lg:gap-10">
        <Photo src={slide.photo} alt={slide.alt} label={slide.label} sizes="(min-width: 1024px) 36vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3]" />
        <div className="step-copy">
          <p className="text-sm font-medium text-muted tabular">Step {index + 1} · {slide.step}</p>
          <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.015em] text-ink sm:text-2xl">{slide.title}</h3>
          <p className="mt-3 text-[0.9375rem] text-muted">{slide.text}</p>
          <ul className="mt-4 space-y-2">
            {slide.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-orange-wash text-orange-ink"><CheckIcon aria-hidden="true" className="size-3" strokeWidth={3} /></span>{point}
              </li>
            ))}
          </ul>
          <PillButton href={signupUrl} size="sm" className="mt-6">Get started</PillButton>
        </div>
        <div className="hidden items-end gap-4 lg:flex">
          <p className="pb-1 text-sm text-muted tabular"><span className="font-semibold text-ink">{index + 1}</span> / {slides.length}</p>
          <Photo src={slide.side} alt={slide.sideAlt} label={slide.sideLabel} sizes="(min-width: 1024px) 26vw, 100vw" className="aspect-[5/4] flex-1" />
        </div>
      </div>
      </div>
      <p className="mt-4 text-sm text-muted tabular lg:hidden"><span className="font-semibold text-ink">{index + 1}</span> / {slides.length}</p>
    </section>
  )
}


