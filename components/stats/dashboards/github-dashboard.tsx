"use client";

import { useState } from "react";
import { GitHubData, TimeRange } from "@/lib/types/stats";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TimeRangeSelector } from "../time-range-selector";
import { ChartTooltip } from "../chart-tooltip";

interface GitHubDashboardProps {
  data: GitHubData;
}

export function GitHubDashboard({ data }: GitHubDashboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

  const filteredData = filterDataByTimeRange(
    data.contributionsHistory,
    timeRange,
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Contributions"
          value={data.totalContributions}
        />
        <MetricCard
          label="Current Streak"
          value={`${data.currentStreak} days`}
        />
        <MetricCard label="Public Repos" value={data.publicRepos} />
        <MetricCard label="Followers" value={data.followers} />
      </div>

      {/* Contributions Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Contribution Activity</h4>
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis className="text-xs" />
              <Tooltip
                content={
                  <ChartTooltip
                    valueFormatter={(value) => [
                      value.toString(),
                      "Contributions",
                    ]}
                  />
                }
              />
              <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Streaks */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {data.currentStreak} days
          </div>
          <div className="text-sm text-muted-foreground">Current Streak</div>
        </div>
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {data.longestStreak} days
          </div>
          <div className="text-sm text-muted-foreground">Longest Streak</div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function filterDataByTimeRange(
  data: Array<{ date: string; count: number }>,
  range: TimeRange,
): Array<{ date: string; count: number }> {
  const now = new Date();
  const cutoffDate = new Date(now);

  switch (range) {
    case "24h":
      cutoffDate.setHours(now.getHours() - 24);
      break;
    case "7d":
      cutoffDate.setDate(now.getDate() - 7);
      break;
    case "30d":
      cutoffDate.setDate(now.getDate() - 30);
      break;
    case "all":
      return data;
  }

  return data.filter((item) => new Date(item.date) >= cutoffDate);
}
