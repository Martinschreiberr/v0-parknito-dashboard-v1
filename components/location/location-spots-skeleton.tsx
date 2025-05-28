import { Skeleton } from "@/components/ui/skeleton"

export function LocationSpotsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[120px]" />
          <Skeleton className="h-9 w-[120px]" />
        </div>
        <Skeleton className="h-9 w-[150px]" />
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="rounded-md border p-3">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-5 w-[60px]" />
              <Skeleton className="h-5 w-[60px] rounded-full" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[40px]" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
