"use server";

import { InstagramData } from "@/lib/types/stats";

export async function getInstagramStats(): Promise<InstagramData> {
  return {
    type: "instagram",
    name: "Instagram",
    category: "social",
    logo: "https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    followers: 0,
    following: 0,
    posts: 0,
    avgLikes: 0,
    engagementRate: 0,
    followersHistory: [],
    error: "Coming Soon",
  };
}
