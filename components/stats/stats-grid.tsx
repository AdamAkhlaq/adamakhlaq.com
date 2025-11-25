"use client";

import { StatsResponse } from "@/lib/types/stats";
import { getCategoryLabel } from "@/lib/stats/utils";
import { StatsCard } from "./stats-card";

interface StatsGridProps {
  data: StatsResponse;
}

export function StatsGrid({ data }: StatsGridProps) {
  const categories = [
    "social",
    "development",
    "fitness",
    "entertainment",
    "business",
  ] as const;

  return (
    <div className="space-y-8">
      {/* Stats by Category */}
      {categories.map((category) => {
        const services = data.categories[category];
        if (services.length === 0) return null;

        return (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {getCategoryLabel(category)}
            </h2>

            <div className="space-y-3">
              {services.map((service) => (
                <StatsCard key={service.name} service={service} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
