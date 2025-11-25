"use server";

import { XData } from "@/lib/types/stats";

export async function getXStats(): Promise<XData> {
  return {
    type: "x",
    name: "X (Twitter)",
    category: "social",
    logo: "https://abs.twimg.com/favicons/twitter.3.ico",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    followers: 0,
    following: 0,
    tweets: 0,
    engagement: 0,
    followersHistory: [],
    error: "Coming Soon",
  };
}
