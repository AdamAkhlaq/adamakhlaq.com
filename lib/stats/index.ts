"use server";

import { connection } from "next/server";
import { StatsResponse } from "@/lib/types/stats";
import { getChessComStats } from "./chess";
import { getGitHubStats } from "./github";
import { getXStats } from "./x";
import { getInstagramStats } from "./instagram";
import { getLinkedInStats } from "./linkedin";
import { getStravaStats } from "./strava";
import { getAppleHealthStats } from "./apple-health";
import { getYouTubeStats } from "./youtube";
import { getSpotifyStats } from "./spotify";
import { getDataFastStats } from "./datafast";
import { getStripeStats } from "./stripe";

export async function getAllStats(): Promise<StatsResponse> {
  // Opt into dynamic rendering to use Date() - required for Next.js 16
  await connection();

  // Fetch all stats in parallel
  const services = await Promise.all([
    // Social Media
    getXStats(),
    getInstagramStats(),
    getLinkedInStats(),
    // Development
    getGitHubStats(),
    // Fitness & Health
    getStravaStats(),
    getAppleHealthStats(),
    // Entertainment
    getYouTubeStats(),
    getSpotifyStats(),
    getChessComStats(),
    // Business
    getStripeStats(),
    getDataFastStats(),
  ]);

  // Categorize services
  const categories = {
    social: services.filter((s) => s.category === "social"),
    development: services.filter((s) => s.category === "development"),
    fitness: services.filter((s) => s.category === "fitness"),
    entertainment: services.filter((s) => s.category === "entertainment"),
    business: services.filter((s) => s.category === "business"),
  };

  return {
    services,
    categories,
  };
}
