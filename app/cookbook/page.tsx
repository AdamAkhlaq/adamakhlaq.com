import { ChefHat } from "lucide-react";
import { Suspense } from "react";
import { getAllRecipes } from "@/lib/recipes";
import { CookbookGrid } from "@/components/cookbook/cookbook-grid";

async function CookbookContent() {
  const recipes = await getAllRecipes();

  return (
    <>
      {/* Hero Section */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <ChefHat className="h-10 w-10 text-black dark:text-white" />
          <h1 className="font-geist text-4xl font-bold text-black sm:text-5xl dark:text-white">
            Cookbook
          </h1>
        </div>
        <p className="max-w-2xl font-inter text-lg text-neutral-600 dark:text-neutral-400">
          {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}{" "}
          I&apos;ve cooked and loved. From quick weeknight dinners to weekend
          experiments.
        </p>
      </div>

      {/* Interactive Grid Component */}
      <CookbookGrid initialRecipes={recipes} />
    </>
  );
}

export default function CookbookPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-12 sm:py-20">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <div className="text-center">
                <ChefHat className="mx-auto mb-4 h-12 w-12 animate-pulse text-neutral-400" />
                <p className="text-neutral-500">Loading recipes...</p>
              </div>
            </div>
          }
        >
          <CookbookContent />
        </Suspense>
      </main>
    </div>
  );
}
