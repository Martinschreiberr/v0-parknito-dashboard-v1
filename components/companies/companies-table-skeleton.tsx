import { Skeleton } from "@/components/ui/skeleton"

export function CompaniesTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-[700px]" />
        </div>
      </div>
      <div className="divide-y">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-5 w-[200px]" />
              </div>
              <div className="flex items-center gap-6">
                <Skeleton className="h-5 w-[50px]" />
                <Skeleton className="h-5 w-[50px]" />
                <Skeleton className="h-6 w-[80px] rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
