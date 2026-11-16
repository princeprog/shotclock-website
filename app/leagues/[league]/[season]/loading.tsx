export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse space-y-6">
      <div className="h-9 w-56 rounded-full bg-wash" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_25rem]">
        <div className="h-52 rounded-2xl bg-wash" />
        <div className="h-72 rounded-xl bg-wash" />
      </div>
    </div>
  )
}
