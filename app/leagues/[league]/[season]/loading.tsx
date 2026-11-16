export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="grid animate-pulse gap-3.5 lg:grid-cols-4">
      <div className="h-48 rounded-[18px] bg-orange-wash lg:col-span-2" />
      <div className="tile h-48 lg:col-span-2" />
      <div className="tile h-44 lg:col-span-2" />
      <div className="tile h-80 lg:col-span-2" />
    </div>
  )
}
