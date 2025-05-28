import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  header?: boolean
  footer?: boolean
  lines?: number
  className?: string
}

export function SkeletonCard({ header = true, footer = false, lines = 3, className = "" }: SkeletonCardProps) {
  return (
    <div className={`rounded-lg border ${className}`}>
      {header && (
        <div className="border-b p-4">
          <Skeleton className="h-6 w-[60%]" />
        </div>
      )}
      <div className="p-4 space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={`h-4 w-[${100 - i * 10}%]`} />
        ))}
      </div>
      {footer && (
        <div className="border-t p-4 flex justify-between items-center">
          <Skeleton className="h-5 w-[30%]" />
          <Skeleton className="h-9 w-[20%]" />
        </div>
      )}
    </div>
  )
}
