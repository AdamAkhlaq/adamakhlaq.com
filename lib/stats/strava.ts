"use server";

import { StravaData } from "@/lib/types/stats";

export async function getStravaStats(): Promise<StravaData> {
  return {
    type: "strava",
    name: "Strava",
    category: "fitness",
    logo: "https://d3nn82uaxijpm6.cloudfront.net/favicon-96x96.png",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    totalDistance: 0,
    totalActivities: 0,
    totalElevation: 0,
    avgPace: "0:00/km",
    activitiesHistory: [],
    error: "Coming Soon",
  };
}
