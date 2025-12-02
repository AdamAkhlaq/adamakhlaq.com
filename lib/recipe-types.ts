// Recipe type definitions
// Shared between client and server components

export interface Ingredient {
  item: string;
  amount: number;
  unit: string;
  group?: string; // Optional grouping like "For the sauce:", "For topping:"
}

export interface Instruction {
  step: number;
  text: string;
  timer?: number; // Optional timer in minutes
}

export interface RecipeMetadata {
  title: string;
  slug: string;
  description: string;
  images: string[]; // Changed from single image to array
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
  ingredients: Ingredient[];
  instructions: Instruction[];
  notes?: string[]; // Optional cooking notes/tips
}

export interface Recipe extends RecipeMetadata {
  content: string;
}

/**
 * Calculate if a recipe is new (within 7 days)
 * Should be called on the server side
 */
export function isRecipeNew(createdAt: string): boolean {
  const recipeDate = new Date(createdAt);
  const now = new Date();
  const daysDiff = Math.floor(
    (now.getTime() - recipeDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysDiff <= 7;
}

/**
 * Get meal type color for styling
 */
export function getMealTypeColor(mealType: RecipeMetadata["mealType"]): string {
  const colors: Record<RecipeMetadata["mealType"], string> = {
    Breakfast: "amber",
    Lunch: "emerald",
    Dinner: "blue",
    Dessert: "pink",
    Snack: "gray",
  };
  return colors[mealType] || "gray";
}

/**
 * Get complexity badge color
 */
export function getComplexityColor(
  complexity: RecipeMetadata["complexity"],
): string {
  const colors: Record<RecipeMetadata["complexity"], string> = {
    Easy: "emerald",
    Medium: "amber",
    Hard: "red",
  };
  return colors[complexity] || "gray";
}
