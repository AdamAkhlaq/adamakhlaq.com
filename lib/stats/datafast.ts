"use server";

import { DataFastData } from "@/lib/types/stats";

export async function getDataFastStats(): Promise<DataFastData> {
  return {
    type: "datafast",
    name: "DataFast Analytics",
    category: "business",
    logo: "https://datafast.io/favicon.ico",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    totalPageViews: 0,
    uniqueVisitors: 0,
    topPage: "N/A",
    avgSessionDuration: "0:00",
    pageViewsHistory: [],
    error: "Coming Soon",
  };
}
