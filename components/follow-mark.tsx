import { StarIcon } from 'lucide-react'

// Hidden until FollowStyles reveals the marks for a followed team, so the highlight is never colour alone.
export function FollowMark({ teamId }: { teamId: string }) {
  return (
    <span data-mark={teamId} className="follow-mark hidden shrink-0 items-center text-orange-ink">
      <StarIcon aria-hidden="true" className="size-3.5 fill-orange" />
      <span className="sr-only">Followed team</span>
    </span>
  )
}
