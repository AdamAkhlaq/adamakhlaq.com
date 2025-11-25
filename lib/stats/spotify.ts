"use server";

import { SpotifyData } from "@/lib/types/stats";

export async function getSpotifyStats(): Promise<SpotifyData> {
  return {
    type: "spotify",
    name: "Spotify",
    category: "entertainment",
    logo: "https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png",
    primaryMetric: {
      label: "Status",
      value: "Coming Soon",
    },
    lastUpdated: new Date(),
    topArtist: "N/A",
    totalMinutes: 0,
    topGenre: "N/A",
    tracksPlayed: 0,
    listeningHistory: [],
    error: "Coming Soon",
  };
}
