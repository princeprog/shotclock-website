'use client'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-ink">League data didn’t load</h1>
      <p className="mt-3 text-muted">Shotclock couldn’t be reached just now. Try again in a moment.</p>
      <button type="button" onClick={reset} className="mt-8 inline-flex h-11 items-center rounded-lg bg-orange px-5 font-semibold text-ink hover:bg-orange-hover">Try again</button>
    </main>
  )
}
