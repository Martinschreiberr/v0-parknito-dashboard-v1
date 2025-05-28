import { Skeleton } from "@/components/ui/skeleton"

export function LocationsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-[60%]" />
              <Skeleton className="h-5 w-[30%]" />
            </div>
            <div className="mt-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <Skeleton className="h-5 w-[80px]" />
              <Skeleton className="h-5 w-[120px]" />
            </div>
          </div>
          <div className="border-t p-4 flex justify-between items-center">
            <div>
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-6 w-[80px] mt-1" />
            </div>
            <Skeleton className="h-9 w-[100px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
