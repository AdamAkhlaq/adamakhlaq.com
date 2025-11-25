"use server";

import { YouTubeData } from "@/lib/types/stats";

export async function getYouTubeStats(): Promise<YouTubeData> {
  return {
    type: "youtube",
    name: "YouTube",
    category: "entertainment",
    logo: "https://www.youtube.com/s/desktop/f506bd45/img/favicon_96x96.png",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    subscribers: 0,
    totalViews: 0,
    totalVideos: 0,
    avgViewDuration: "0:00",
    subscribersHistory: [],
    error: "Coming Soon",
  };
}
