// Type definitions for stats services

export type TimeRange = "24h" | "7d" | "30d" | "all";

export interface BaseServiceData {
  name: string;
  category: ServiceCategory;
  logo: string; // URL or path to logo
  primaryMetric: {
    label: string;
    value: string | number;
    unit?: string;
  };
  lastUpdated: Date;
  error?: string;
}

export type ServiceCategory =
  | "social"
  | "development"
  | "fitness"
  | "entertainment"
  | "business";

// Chess.com
export interface ChessComData extends BaseServiceData {
  type: "chess";
  rating: number;
  wins: number;
  losses: number;
  draws: number;
  gamesPlayed: number;
  winRate: number;
  ratingHistory: Array<{ date: string; rating: number }>;
}

// GitHub
export interface GitHubData extends BaseServiceData {
  type: "github";
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  publicRepos: number;
  followers: number;
  contributionsHistory: Array<{ date: string; count: number }>;
}

// X/Twitter
export interface XData extends BaseServiceData {
  type: "x";
  followers: number;
  following: number;
  tweets: number;
  engagement: number;
  followersHistory: Array<{ date: string; count: number }>;
}

// Instagram
export interface InstagramData extends BaseServiceData {
  type: "instagram";
  followers: number;
  following: number;
  posts: number;
  avgLikes: number;
  engagementRate: number;
  followersHistory: Array<{ date: string; count: number }>;
}

// LinkedIn
export interface LinkedInData extends BaseServiceData {
  type: "linkedin";
  connections: number;
  profileViews: number;
  postImpressions: number;
  searchAppearances: number;
  viewsHistory: Array<{ date: string; count: number }>;
}

// Strava
export interface StravaData extends BaseServiceData {
  type: "strava";
  totalDistance: number; // in km
  totalActivities: number;
  totalElevation: number; // in meters
  avgPace: string; // e.g., "5:30/km"
  activitiesHistory: Array<{ date: string; distance: number }>;
}

// Apple Health
export interface AppleHealthData extends BaseServiceData {
  type: "appleHealth";
  stepsToday: number;
  stepsGoal: number;
  activeMinutes: number;
  caloriesBurned: number;
  avgHeartRate: number;
  stepsHistory: Array<{ date: string; steps: number }>;
}

// YouTube
export interface YouTubeData extends BaseServiceData {
  type: "youtube";
  subscribers: number;
  totalViews: number;
  totalVideos: number;
  avgViewDuration: string;
  subscribersHistory: Array<{ date: string; count: number }>;
}

// Spotify
export interface SpotifyData extends BaseServiceData {
  type: "spotify";
  topArtist: string;
  totalMinutes: number;
  topGenre: string;
  tracksPlayed: number;
  listeningHistory: Array<{ date: string; minutes: number }>;
}

// DataFast Analytics
export interface DataFastData extends BaseServiceData {
  type: "datafast";
  totalPageViews: number;
  uniqueVisitors: number;
  topPage: string;
  avgSessionDuration: string;
  pageViewsHistory: Array<{ date: string; views: number }>;
}

// Stripe
export interface StripeData extends BaseServiceData {
  type: "stripe";
  revenueThisMonth: number;
  totalCustomers: number;
  successfulPayments: number;
  avgTransactionValue: number;
  revenueHistory: Array<{ date: string; revenue: number }>;
}

export type ServiceData =
  | ChessComData
  | GitHubData
  | XData
  | InstagramData
  | LinkedInData
  | StravaData
  | AppleHealthData
  | YouTubeData
  | SpotifyData
  | DataFastData
  | StripeData;

export interface StatsResponse {
  services: ServiceData[];
  categories: {
    social: ServiceData[];
    development: ServiceData[];
    fitness: ServiceData[];
    entertainment: ServiceData[];
    business: ServiceData[];
  };
}
