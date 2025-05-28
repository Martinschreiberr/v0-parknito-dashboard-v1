import { Skeleton } from "@/components/ui/skeleton"

export function ReservationsCalendarSkeleton() {
  return (
    <div className="space-y-4">
      {/* Toolbar skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-16 rounded-md" />
          <Skeleton className="h-9 w-16 rounded-md" />
          <Skeleton className="h-9 w-16 rounded-md" />
        </div>
      </div>

      {/* Calendar grid skeleton */}
      <div className="border rounded-md p-4">
        {/* Header row */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={`header-${i}`} className="h-8" />
            ))}
        </div>

        {/* Calendar body */}
        <div className="grid grid-cols-7 gap-1">
          {Array(35)
            .fill(0)
            .map((_, i) => (
              <div key={`cell-${i}`} className="aspect-square p-1 border">
                <Skeleton className="h-5 w-5 mb-1" />
                {Math.random() > 0.7 && <Skeleton className="h-4 w-full mb-1" />}
                {Math.random() > 0.8 && <Skeleton className="h-4 w-full" />}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
