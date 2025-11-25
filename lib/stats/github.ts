"use server";

import { GitHubData } from "@/lib/types/stats";

export async function getGitHubStats(): Promise<GitHubData> {
  return {
    type: "github",
    name: "GitHub",
    category: "development",
    logo: "https://github.githubassets.com/favicons/favicon.png",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    publicRepos: 0,
    followers: 0,
    contributionsHistory: [],
    error: "Coming Soon",
  };
}
