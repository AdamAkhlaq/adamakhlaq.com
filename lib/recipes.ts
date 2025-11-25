import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Recipe, RecipeMetadata } from "./recipe-types";

const recipesDirectory = path.join(process.cwd(), "data/recipes");

/**
 * Get all recipes from the recipes directory
 */
export function getAllRecipes(): Recipe[] {
	// Check if directory exists
	if (!fs.existsSync(recipesDirectory)) {
		return [];
	}

	const fileNames = fs.readdirSync(recipesDirectory);
	const recipes = fileNames
		.filter((fileName) => fileName.endsWith(".mdx"))
		.map((fileName) => {
			const slug = fileName.replace(/\.mdx$/, "");
			const fullPath = path.join(recipesDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");
			const { data, content } = matter(fileContents);

			return {
				...(data as RecipeMetadata),
				slug,
				content,
			} as Recipe;
		});

	// Sort by creation date (newest first)
	return recipes.sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});
}

/**
 * Get a single recipe by slug
 */
export function getRecipeBySlug(slug: string): Recipe | null {
	try {
		const fullPath = path.join(recipesDirectory, `${slug}.mdx`);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);

		return {
			...(data as RecipeMetadata),
			slug,
			content,
		} as Recipe;
	} catch {
		return null;
	}
}

/**
 * Get cookbook statistics
 */
export function getCookbookStats() {
	const recipes = getAllRecipes();

	// Count cuisines
	const cuisineCounts = recipes.reduce(
		(acc, recipe) => {
			acc[recipe.cuisine] = (acc[recipe.cuisine] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>
	);

	// Find most common cuisine
	const mostCommonCuisine =
		Object.entries(cuisineCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
		"N/A";

	return {
		totalRecipes: recipes.length,
		mostCommonCuisine,
		cuisines: Object.keys(cuisineCounts),
	};
}
