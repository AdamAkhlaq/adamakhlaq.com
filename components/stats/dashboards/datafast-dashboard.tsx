"use client";

import { useState } from "react";
import { DataFastData, TimeRange } from "@/lib/types/stats";
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

interface DataFastDashboardProps {
  data: DataFastData;
}

export function DataFastDashboard({ data }: DataFastDashboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const filteredData = filterDataByTimeRange(data.pageViewsHistory, timeRange);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Page Views"
          value={data.totalPageViews.toLocaleString()}
        />
        <MetricCard
          label="Unique Visitors"
          value={data.uniqueVisitors.toLocaleString()}
        />
        <MetricCard label="Top Page" value={data.topPage} />
        <MetricCard label="Avg Session" value={data.avgSessionDuration} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Page Views</h4>
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
              <YAxis className="text-xs" />
              <Tooltip
                content={
                  <ChartTooltip
                    valueFormatter={(value) => [
                      value.toLocaleString(),
                      "Page Views",
                    ]}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="views"
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
  data: Array<{ date: string; views: number }>,
  range: TimeRange,
): Array<{ date: string; views: number }> {
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
