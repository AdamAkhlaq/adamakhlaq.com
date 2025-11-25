// Recipe type definitions
// Shared between client and server components

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
	dietaryTags?: string[];
	createdAt: string; // ISO date string
}

export interface Recipe extends RecipeMetadata {
	content: string;
}

export interface RecipeWithBadges extends RecipeMetadata {
	isNew: boolean;
	isQuick: boolean;
}

/**
 * Calculate if a recipe is new (within 7 days)
 * Should be called on the server side
 */
export function isRecipeNew(createdAt: string): boolean {
	const recipeDate = new Date(createdAt);
	const now = new Date();
	const daysDiff = Math.floor(
		(now.getTime() - recipeDate.getTime()) / (1000 * 60 * 60 * 24)
	);
	return daysDiff <= 7;
}

/**
 * Calculate if a recipe is quick (under 30 minutes)
 */
export function isRecipeQuick(totalTime: number): boolean {
	return totalTime <= 30;
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
	complexity: RecipeMetadata["complexity"]
): string {
	const colors: Record<RecipeMetadata["complexity"], string> = {
		Easy: "emerald",
		Medium: "amber",
		Hard: "red",
	};
	return colors[complexity] || "gray";
}
