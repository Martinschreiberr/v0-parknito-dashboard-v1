import { Skeleton } from "@/components/ui/skeleton"

export default function ReportsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-5 w-[350px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-xl" />
        ))}
      </div>

      <div className="rounded-md border p-4">
        <Skeleton className="h-8 w-[200px] mb-4" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[240px]" />
          <Skeleton className="h-10 w-[120px] ml-auto" />
        </div>
      </div>

      <div>
        <Skeleton className="h-10 w-[400px] mb-4" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    </div>
  )
}
