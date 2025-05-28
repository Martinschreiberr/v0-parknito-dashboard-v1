import { Skeleton } from "@/components/ui/skeleton"

export default function CompaniesLoading() {
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

      <div className="rounded-md border">
        <div className="p-1">
          <div className="flex items-center border-b px-4 py-3">
            <Skeleton className="h-5 w-[300px]" />
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b px-4 py-4 last:border-0">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-5 w-[200px]" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-[50px]" />
                <Skeleton className="h-5 w-[50px]" />
                <Skeleton className="h-6 w-[80px] rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
