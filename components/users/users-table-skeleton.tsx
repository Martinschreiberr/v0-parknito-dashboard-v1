import { Skeleton } from "@/components/ui/skeleton"

export function UsersTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-[700px]" />
        </div>
      </div>
      <div className="divide-y">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-4 w-[120px] mt-1" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-5 w-[80px] rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
