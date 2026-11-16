import { StarIcon } from 'lucide-react'

// Hidden until FollowStyles reveals it inside the followed team's elements, so the highlight is not color alone.
export function FollowMark() {
  return (
    <span className="follow-mark hidden shrink-0 items-center text-orange-ink">
      <StarIcon aria-hidden="true" className="size-3.5 fill-orange" />
      <span className="sr-only">Followed team</span>
    </span>
  )
}
