"use client";

import { useState } from "react";
import type { Ingredient } from "@/lib/recipe-types";

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
  defaultServings: number;
  servings: number;
}

// Unit conversion utilities
function convertUnit(
  amount: number,
  unit: string,
  ingredientName: string,
  toMetric: boolean,
): string {
  // List of liquid ingredients that should use ml for volume conversions
  const liquidKeywords = [
    "water",
    "milk",
    "cream",
    "oil",
    "sauce",
    "broth",
    "stock",
    "juice",
    "vinegar",
    "wine",
    "beer",
    "liquid",
    "syrup",
    "honey",
  ];

  const isLiquidIngredient = liquidKeywords.some((keyword) =>
    ingredientName.toLowerCase().includes(keyword),
  );

  const conversions: Record<
    string,
    {
      metricLiquid: string;
      metricSolid: string;
      imperial: string;
      factorLiquid: number;
      factorSolid: number;
    }
  > = {
    // Volume measurements - convert to ml for liquids, g for solids
    cup: {
      metricLiquid: "ml",
      metricSolid: "g",
      imperial: "cup",
      factorLiquid: 240,
      factorSolid: 120, // approximate for most vegetables/solids
    },
    cups: {
      metricLiquid: "ml",
      metricSolid: "g",
      imperial: "cups",
      factorLiquid: 240,
      factorSolid: 120,
    },
    tbsp: {
      metricLiquid: "ml",
      metricSolid: "g",
      imperial: "tbsp",
      factorLiquid: 15,
      factorSolid: 15,
    },
    tsp: {
      metricLiquid: "ml",
      metricSolid: "g",
      imperial: "tsp",
      factorLiquid: 5,
      factorSolid: 5,
    },
    // Weight measurements - convert between grams and ounces
    g: {
      metricLiquid: "g",
      metricSolid: "g",
      imperial: "oz",
      factorLiquid: 0.035274,
      factorSolid: 0.035274,
    },
    oz: {
      metricLiquid: "g",
      metricSolid: "g",
      imperial: "oz",
      factorLiquid: 28.35,
      factorSolid: 28.35,
    },
    lb: {
      metricLiquid: "g",
      metricSolid: "g",
      imperial: "lb",
      factorLiquid: 453.59,
      factorSolid: 453.59,
    },
    lbs: {
      metricLiquid: "g",
      metricSolid: "g",
      imperial: "lbs",
      factorLiquid: 453.59,
      factorSolid: 453.59,
    },
  };

  const unitLower = unit.toLowerCase();
  const conversion = conversions[unitLower];

  // Units that should have no space (measurements)
  const noSpaceUnits = [
    "g",
    "ml",
    "oz",
    "lb",
    "lbs",
    "tbsp",
    "tsp",
    "cup",
    "cups",
  ];
  const shouldHaveSpace = !noSpaceUnits.includes(unitLower);

  if (!conversion) {
    return shouldHaveSpace ? `${amount} ${unit}` : `${amount}${unit}`;
  }

  // Check if the unit is already metric (g, ml) or imperial (oz, lb, cup, tbsp, tsp)
  const isMetricUnit = unitLower === "g" || unitLower === "ml";
  const isImperialUnit = [
    "oz",
    "lb",
    "lbs",
    "cup",
    "cups",
    "tbsp",
    "tsp",
  ].includes(unitLower);

  // If showing metric and unit is already metric, just display it
  if (toMetric && isMetricUnit) {
    return `${Math.round(amount)}${unit}`;
  }

  // If showing imperial and unit is already imperial, just display it
  if (!toMetric && isImperialUnit) {
    return `${Math.round(amount)}${unit}`;
  }

  // Otherwise, perform conversion
  if (toMetric) {
    // Converting from imperial to metric
    const metricUnit = isLiquidIngredient
      ? conversion.metricLiquid
      : conversion.metricSolid;
    const factor = isLiquidIngredient
      ? conversion.factorLiquid
      : conversion.factorSolid;
    const convertedAmount = amount * factor;
    // Use one decimal place for small amounts, otherwise round
    const displayAmount =
      convertedAmount < 10
        ? Math.round(convertedAmount * 10) / 10
        : Math.round(convertedAmount);
    return `${displayAmount}${metricUnit}`;
  } else {
    // Converting from metric to imperial
    const factor = isLiquidIngredient
      ? conversion.factorLiquid
      : conversion.factorSolid;
    const convertedAmount = amount * factor;
    // Use one decimal place for small amounts, otherwise round
    const displayAmount =
      convertedAmount < 10
        ? Math.round(convertedAmount * 10) / 10
        : Math.round(convertedAmount);
    return `${displayAmount}${conversion.imperial}`;
  }
}

export function RecipeIngredients({
  ingredients,
  defaultServings,
  servings,
}: RecipeIngredientsProps) {
  const [unitPreferences, setUnitPreferences] = useState<
    Record<number, boolean>
  >({});

  const servingMultiplier = servings / defaultServings;
  const toggleUnit = (index: number) => {
    setUnitPreferences((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Group ingredients
  const groupedIngredients = ingredients.reduce(
    (acc, ingredient, index) => {
      const group = ingredient.group || "main";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push({ ...ingredient, originalIndex: index });
      return acc;
    },
    {} as Record<string, Array<Ingredient & { originalIndex: number }>>,
  );

  const renderIngredient = (
    ingredient: Ingredient & { originalIndex: number },
  ) => {
    const scaledAmount = ingredient.amount * servingMultiplier;
    // Default to metric (true), toggle shows imperial (false)
    const isMetric =
      unitPreferences[ingredient.originalIndex] !== undefined
        ? unitPreferences[ingredient.originalIndex]
        : true;
    const displayAmount = convertUnit(
      scaledAmount,
      ingredient.unit,
      ingredient.item,
      isMetric,
    );

    return (
      <li
        key={ingredient.originalIndex}
        className="flex items-start justify-between gap-2 text-neutral-700 dark:text-neutral-300"
      >
        <span>
          <button
            onClick={() => toggleUnit(ingredient.originalIndex)}
            className="font-medium text-black hover:underline dark:text-white"
          >
            {displayAmount}
          </button>{" "}
          {ingredient.item}
        </span>
      </li>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="font-geist text-2xl font-bold text-black dark:text-white">
        Ingredients
      </h2>

      <div className="space-y-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        {Object.entries(groupedIngredients).map(([group, items]) => (
          <div key={group}>
            {group !== "main" && (
              <h3 className="mb-2 font-geist text-lg font-semibold text-black dark:text-white">
                {group}
              </h3>
            )}
            <ul className="space-y-2">
              {items.map((ingredient) => renderIngredient(ingredient))}
            </ul>
          </div>
        ))}

        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          💡 Click on any measurement to convert between imperial and metric
          units
        </p>
      </div>
    </div>
  );
}
