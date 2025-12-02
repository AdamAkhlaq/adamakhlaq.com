import { Suspense } from "react";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { ChefHat } from "lucide-react";
import { getRecipeBySlug, getAllRecipes } from "@/lib/recipes";
import { RecipeHeader } from "@/components/cookbook/recipe-header";
import { RecipeCarousel } from "@/components/cookbook/recipe-carousel";
import { RecipeContentWrapper } from "@/components/cookbook/recipe-content-wrapper";
import { RecipeNotes } from "@/components/cookbook/recipe-notes";
import { RecipeInstructions } from "@/components/cookbook/recipe-instructions";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

async function RecipeContent({ slug }: { slug: string }) {
  // Access headers to opt out of static rendering
  await headers();

  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <RecipeHeader slug={slug} />

      <article className="space-y-8">
        {/* Image Carousel */}
        <RecipeCarousel images={recipe.images} title={recipe.title} />

        {/* Metadata, Description, and Ingredients with shared servings state */}
        <RecipeContentWrapper recipe={recipe} />

        {/* Notes (if available) */}
        {recipe.notes && <RecipeNotes notes={recipe.notes} />}

        {/* Instructions */}
        <RecipeInstructions instructions={recipe.instructions} />
      </article>
    </div>
  );
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-12 sm:py-20">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <div className="text-center">
                <ChefHat className="mx-auto mb-4 h-12 w-12 animate-pulse text-neutral-400" />
                <p className="text-neutral-500">Loading recipe...</p>
              </div>
            </div>
          }
        >
          <RecipeContent slug={slug} />
        </Suspense>
      </main>
    </div>
  );
}

// Generate static params for all recipes
export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}
