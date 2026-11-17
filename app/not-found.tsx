import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 text-muted">This league or season isn’t published, or the address has changed.</p>
      <Link href="/leagues" className="mt-8 inline-flex h-11 items-center rounded-lg bg-orange px-5 font-semibold text-ink hover:bg-orange-hover">Find your league</Link>
    </main>
  )
}
