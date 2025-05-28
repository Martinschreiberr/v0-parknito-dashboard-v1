import { Skeleton } from "@/components/ui/skeleton"

export function ReportsOverviewSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <Skeleton className="h-8 w-[80px]" />
          <Skeleton className="h-4 w-[120px] mt-1" />
          <Skeleton className="h-1 w-full mt-4" />
        </div>
      ))}
    </div>
  )
}
