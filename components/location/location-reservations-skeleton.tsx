import { Skeleton } from "@/components/ui/skeleton"

export function LocationReservationsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-[200px]" />
        <Skeleton className="h-9 w-[150px]" />
      </div>

      <div className="rounded-md border">
        <div className="border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-[600px]" />
          </div>
        </div>
        <div className="divide-y">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-4 w-[120px] mt-1" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-[100px]" />
                  <Skeleton className="h-5 w-[80px] rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
