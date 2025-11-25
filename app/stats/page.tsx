import { Suspense } from "react";
import { getAllStats } from "@/lib/stats";
import { StatsGrid } from "@/components/stats/stats-grid";
import { StatsPageSkeleton } from "@/components/stats/stats-skeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stats | Adam Akhlaq",
  description:
    "My life in verified stats - tracking various aspects of my personal and professional life through real-time data.",
};

export default async function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">My Life in Stats</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Real-time data from various services showing different aspects of my
          personal and professional life. All metrics are verified and pulled
          directly from their respective APIs.
        </p>
      </div>

      {/* Stats Content */}
      <Suspense fallback={<StatsPageSkeleton />}>
        <StatsContent />
      </Suspense>
    </div>
  );
}

async function StatsContent() {
  const data = await getAllStats();

  return <StatsGrid data={data} />;
}
