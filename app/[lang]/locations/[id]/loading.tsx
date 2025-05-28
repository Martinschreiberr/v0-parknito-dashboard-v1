import { Skeleton } from "@/components/ui/skeleton"

export default function LocationDetailLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="rounded-lg border p-4">
            <Skeleton className="h-6 w-[60%] mb-4" />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-md" />
                <div>
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="mt-1 h-4 w-[100px]" />
                </div>
              </div>
              <div>
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="mt-1 h-5 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-[60px]" />
                  <Skeleton className="mt-1 h-6 w-[40px]" />
                </div>
                <div>
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="mt-1 h-6 w-[40px]" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="mt-6 rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-[120px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between rounded-md px-2 py-1.5">
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="h-5 w-[60px] rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <Skeleton className="h-10 w-full" />
          <div className="mt-4">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
