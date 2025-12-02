"use client";

import { Clock, Users, ChefHat, Utensils } from "lucide-react";
import type { Recipe } from "@/lib/recipe-types";

interface RecipeMetadataDisplayProps {
  recipe: Recipe;
  servings: number;
  setServings: (servings: number) => void;
}

export function RecipeMetadataDisplay({
  recipe,
  servings,
  setServings,
}: RecipeMetadataDisplayProps) {
  const increaseServings = () => setServings(servings + 1);
  const decreaseServings = () => setServings(Math.max(1, servings - 1));

  // Nutritional values remain per serving (no scaling)
  const caloriesPerServing = Math.round(recipe.calories);
  const proteinPerServing = Math.round(recipe.protein);
  const carbsPerServing = Math.round(recipe.carbs);
  const fatPerServing = Math.round(recipe.fat);

  return (
    <div className="space-y-6">
      {/* Title and Description */}
      <div className="space-y-3">
        <h1 className="font-geist text-4xl font-bold text-black dark:text-white">
          {recipe.title}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {recipe.description}
        </p>
      </div>

      {/* Main Metadata Box */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {/* Prep Time */}
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <Clock className="h-4 w-4" />
              <span>Prep Time</span>
            </div>
            <div className="font-geist text-xl font-semibold text-black dark:text-white">
              {recipe.prepTime} min
            </div>
          </div>

          {/* Cook Time */}
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <ChefHat className="h-4 w-4" />
              <span>Cook Time</span>
            </div>
            <div className="font-geist text-xl font-semibold text-black dark:text-white">
              {recipe.cookTime} min
            </div>
          </div>

          {/* Total Time */}
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <Utensils className="h-4 w-4" />
              <span>Total</span>
            </div>
            <div className="font-geist text-xl font-semibold text-black dark:text-white">
              {recipe.totalTime} min
            </div>
          </div>

          {/* Servings with Adjuster */}
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <Users className="h-4 w-4" />
              <span>Servings</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseServings}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 text-black transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                aria-label="Decrease servings"
              >
                −
              </button>
              <span className="font-geist text-xl font-semibold text-black dark:text-white">
                {servings}
              </span>
              <button
                onClick={increaseServings}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 text-black transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                aria-label="Increase servings"
              >
                +
              </button>
            </div>
          </div>

          {/* Complexity */}
          <div className="flex flex-col">
            <div className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
              Complexity
            </div>
            <div className="font-geist text-xl font-semibold text-black dark:text-white">
              {recipe.complexity}
            </div>
          </div>

          {/* Cuisine */}
          <div className="flex flex-col">
            <div className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
              Cuisine
            </div>
            <div className="font-geist text-xl font-semibold text-black dark:text-white">
              {recipe.cuisine}
            </div>
          </div>

          {/* Meal Type */}
          <div className="flex flex-col">
            <div className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
              Meal Type
            </div>
            <div className="font-geist text-xl font-semibold text-black dark:text-white">
              {recipe.mealType}
            </div>
          </div>

          {/* Main Protein */}
          {recipe.mainProtein && (
            <div className="flex flex-col">
              <div className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
                Main Protein
              </div>
              <div className="font-geist text-xl font-semibold text-black dark:text-white">
                {recipe.mainProtein}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nutrition Information */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black">
        <div className="mb-4">
          <h2 className="font-geist text-xl font-semibold text-black dark:text-white">
            Nutrition per serving
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Calories
            </span>
            <span className="mt-1 font-geist text-3xl font-bold text-black dark:text-white">
              {caloriesPerServing}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Protein
            </span>
            <span className="mt-1 font-geist text-3xl font-bold text-black dark:text-white">
              {proteinPerServing}
              <span className="text-lg">g</span>
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Carbs
            </span>
            <span className="mt-1 font-geist text-3xl font-bold text-black dark:text-white">
              {carbsPerServing}
              <span className="text-lg">g</span>
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Fat
            </span>
            <span className="mt-1 font-geist text-3xl font-bold text-black dark:text-white">
              {fatPerServing}
              <span className="text-lg">g</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
