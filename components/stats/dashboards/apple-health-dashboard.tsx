"use client";

import { useState } from "react";
import { AppleHealthData, TimeRange } from "@/lib/types/stats";
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

interface AppleHealthDashboardProps {
  data: AppleHealthData;
}

export function AppleHealthDashboard({ data }: AppleHealthDashboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const filteredData = filterDataByTimeRange(data.stepsHistory, timeRange);

  const goalProgress = (data.stepsToday / data.stepsGoal) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Steps Today"
          value={data.stepsToday.toLocaleString()}
        />
        <MetricCard label="Active Minutes" value={data.activeMinutes} />
        <MetricCard
          label="Calories Burned"
          value={data.caloriesBurned.toLocaleString()}
        />
        <MetricCard label="Avg Heart Rate" value={`${data.avgHeartRate} bpm`} />
      </div>

      {/* Goal Progress */}
      <div className="p-4 rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Daily Goal Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round(goalProgress)}%
          </span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-green-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${Math.min(goalProgress, 100)}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {data.stepsToday.toLocaleString()} / {data.stepsGoal.toLocaleString()}{" "}
          steps
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Steps History</h4>
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
                      value.toLocaleString(),
                      "Steps",
                    ]}
                  />
                }
              />
              <Bar dataKey="steps" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
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
  data: Array<{ date: string; steps: number }>,
  range: TimeRange,
): Array<{ date: string; steps: number }> {
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
