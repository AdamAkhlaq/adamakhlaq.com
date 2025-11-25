"use server";

import { LinkedInData } from "@/lib/types/stats";

export async function getLinkedInStats(): Promise<LinkedInData> {
  return {
    type: "linkedin",
    name: "LinkedIn",
    category: "social",
    logo: "https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    connections: 0,
    profileViews: 0,
    postImpressions: 0,
    searchAppearances: 0,
    viewsHistory: [],
    error: "Coming Soon",
  };
}
