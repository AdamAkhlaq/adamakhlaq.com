"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardSkeleton() {
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>
        <Skeleton className="w-5 h-5 rounded" />
      </div>
    </div>
  );
}

export function StatsPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Controls Skeleton */}
      <Skeleton className="h-10 w-32" />

      {/* Category Sections Skeleton */}
      {[1, 2, 3, 4, 5].map((category) => (
        <div key={category} className="space-y-4">
          <Skeleton className="h-7 w-48" />
          <div className="space-y-3">
            {[1, 2].map((card) => (
              <StatsCardSkeleton key={card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
