"use client";

import { useState } from "react";
import type { Recipe } from "@/lib/recipe-types";
import { RecipeMetadataDisplay } from "./recipe-metadata-display";
import { RecipeIngredients } from "./recipe-ingredients";

interface RecipeContentWrapperProps {
  recipe: Recipe;
}

export function RecipeContentWrapper({ recipe }: RecipeContentWrapperProps) {
  const [servings, setServings] = useState(recipe.servings);

  return (
    <>
      {/* Recipe Metadata */}
      <RecipeMetadataDisplay
        recipe={recipe}
        servings={servings}
        setServings={setServings}
      />

      {/* Ingredients */}
      <RecipeIngredients
        ingredients={recipe.ingredients}
        defaultServings={recipe.servings}
        servings={servings}
      />
    </>
  );
}
