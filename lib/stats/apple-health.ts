"use server";

import { AppleHealthData } from "@/lib/types/stats";

export async function getAppleHealthStats(): Promise<AppleHealthData> {
  return {
    type: "appleHealth",
    name: "Apple Health",
    category: "fitness",
    logo: "https://www.apple.com/v/apple-events/home/ac/images/overview/icon-health__dpvgv6f4ccuu_large.png",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    stepsToday: 0,
    stepsGoal: 0,
    activeMinutes: 0,
    caloriesBurned: 0,
    avgHeartRate: 0,
    stepsHistory: [],
    error: "Coming Soon",
  };
}
