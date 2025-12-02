import { IconType } from "react-icons";

// Theme
export type Theme = "light" | "dark";

// Social Links
export interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
  color?: string;
  hoverColor?: string;
}

// Projects
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  url: string;
  isInternal: boolean;
  image?: string;
  techStack: string[];
  featured?: boolean;
  status?: "active" | "archived" | "in-progress";
  createdAt?: Date;
  updatedAt?: Date;
}

// Travel/Countries
export interface Country {
  code: string; // ISO country code (e.g., "US", "GB")
  name: string;
  visited: boolean;
  visitedDate?: Date;
  images?: string[];
  notes?: string;
}

export interface TravelStats {
  totalCountries: number;
  visitedCount: number;
  continents: {
    name: string;
    countries: Country[];
  }[];
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

// Recipes
export interface RecipeMetadata {
  title: string;
  slug: string;
  description: string;
  image: string;
  cuisine: string;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snack";
  complexity: "Easy" | "Medium" | "Hard";
  mainProtein: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  servings: number;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  appliances: string[];
  createdAt: string; // ISO date string
}

export interface Recipe extends RecipeMetadata {
  content: string;
}

// Metadata
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;
