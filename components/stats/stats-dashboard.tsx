"use client";

import { ServiceData } from "@/lib/types/stats";
import { ChessComDashboard } from "./dashboards/chess-com-dashboard";
import { GitHubDashboard } from "./dashboards/github-dashboard";
import { XDashboard } from "./dashboards/x-dashboard";
import { InstagramDashboard } from "./dashboards/instagram-dashboard";
import { LinkedInDashboard } from "./dashboards/linkedin-dashboard";
import { StravaDashboard } from "./dashboards/strava-dashboard";
import { AppleHealthDashboard } from "./dashboards/apple-health-dashboard";
import { YouTubeDashboard } from "./dashboards/youtube-dashboard";
import { SpotifyDashboard } from "./dashboards/spotify-dashboard";
import { DataFastDashboard } from "./dashboards/datafast-dashboard";
import { StripeDashboard } from "./dashboards/stripe-dashboard";

interface StatsDashboardProps {
  service: ServiceData;
}

export function StatsDashboard({ service }: StatsDashboardProps) {
  switch (service.type) {
    case "chess":
      return <ChessComDashboard data={service} />;
    case "github":
      return <GitHubDashboard data={service} />;
    case "x":
      return <XDashboard data={service} />;
    case "instagram":
      return <InstagramDashboard data={service} />;
    case "linkedin":
      return <LinkedInDashboard data={service} />;
    case "strava":
      return <StravaDashboard data={service} />;
    case "appleHealth":
      return <AppleHealthDashboard data={service} />;
    case "youtube":
      return <YouTubeDashboard data={service} />;
    case "spotify":
      return <SpotifyDashboard data={service} />;
    case "datafast":
      return <DataFastDashboard data={service} />;
    case "stripe":
      return <StripeDashboard data={service} />;
    default:
      // This should never happen with proper typing, but TypeScript needs this
      return null;
  }
}
