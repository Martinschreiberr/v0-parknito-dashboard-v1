import { Skeleton } from "@/components/ui/skeleton"

export default function LocationsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="mt-2 h-5 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full md:w-96" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-5 w-[150px]" />
      </div>

      {/* Grid view skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-[80%]" />
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
              <div className="mt-4 flex justify-between">
                <Skeleton className="h-6 w-[40%]" />
                <Skeleton className="h-9 w-[30%]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
