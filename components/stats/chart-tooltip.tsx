"use client";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    dataKey?: string;
  }>;
  label?: string;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number, name: string) => [string, string];
}

export function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
}: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const labelValue = label || "";
  const formattedLabel = labelFormatter
    ? labelFormatter(labelValue)
    : new Date(labelValue).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return (
    <div className="rounded-lg border border-border bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="text-xs text-muted-foreground mb-2">{formattedLabel}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const value = entry.value as number;
          const name = entry.name as string;
          const [formattedValue, formattedName] = valueFormatter
            ? valueFormatter(value, name)
            : [value.toLocaleString(), name];

          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium">{formattedValue}</span>
              <span className="text-xs text-muted-foreground">
                {formattedName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
