export function LegendCardSkeleton() {
  return (
    <div className="glass-card flex flex-col overflow-hidden rounded-xl">
      <div className="flex flex-col gap-4 p-5">
        {/* Category Badge Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>

        {/* Title Skeleton */}
        <div className="h-6 w-full animate-pulse rounded bg-muted" />

        {/* Excerpt Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>

        {/* Location Skeleton */}
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}
