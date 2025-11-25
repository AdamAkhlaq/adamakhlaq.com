"use client";

import { useState } from "react";
import { ChessComData, TimeRange } from "@/lib/types/stats";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TimeRangeSelector } from "../time-range-selector";
import { ChartTooltip } from "../chart-tooltip";

interface ChessComDashboardProps {
  data: ChessComData;
}

export function ChessComDashboard({ data }: ChessComDashboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

  // Filter data based on time range
  const filteredData = filterDataByTimeRange(data.ratingHistory, timeRange);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Rating" value={data.rating} />
        <MetricCard label="Win Rate" value={`${data.winRate}%`} />
        <MetricCard label="Games Played" value={data.gamesPlayed} />
        <MetricCard label="Wins" value={data.wins} />
      </div>

      {/* Record */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {data.wins}
          </div>
          <div className="text-sm text-muted-foreground">Wins</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-gray-500/10 border border-gray-500/20">
          <div className="text-2xl font-bold">{data.draws}</div>
          <div className="text-sm text-muted-foreground">Draws</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {data.losses}
          </div>
          <div className="text-sm text-muted-foreground">Losses</div>
        </div>
      </div>

      {/* Rating History Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Rating History</h4>
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
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
              <YAxis
                className="text-xs"
                domain={["dataMin - 50", "dataMax + 50"]}
              />
              <Tooltip
                content={
                  <ChartTooltip
                    valueFormatter={(value) => [value.toString(), "Rating"]}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
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
  data: Array<{ date: string; rating: number }>,
  range: TimeRange,
): Array<{ date: string; rating: number }> {
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
