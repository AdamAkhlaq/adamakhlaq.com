"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { RecipeCard } from "@/components/cookbook/recipe-card";
import { RecipeWithBadges } from "@/lib/recipe-types";

interface CookbookGridProps {
	initialRecipes: RecipeWithBadges[];
}

export function CookbookGrid({ initialRecipes }: CookbookGridProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<"newest" | "quickest" | "name">(
		"newest"
	);

	// Filter and sort recipes
	const filteredRecipes = useMemo(() => {
		const filtered = initialRecipes.filter(
			(recipe) =>
				recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
		);

		// Sort
		switch (sortBy) {
			case "newest":
				return filtered.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			case "quickest":
				return filtered.sort((a, b) => a.totalTime - b.totalTime);
			case "name":
				return filtered.sort((a, b) => a.title.localeCompare(b.title));
			default:
				return filtered;
		}
	}, [initialRecipes, searchQuery, sortBy]);

	return (
		<>
			{/* Search and Sort */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="mb-8 flex flex-col gap-4 sm:flex-row"
			>
				{/* Search Bar */}
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
					<input
						type="text"
						placeholder="Search recipes, cuisines, ingredients..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-10 pr-4 font-inter text-sm text-black placeholder-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white dark:focus:ring-white"
					/>
				</div>

				{/* Sort Dropdown */}
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
					className="rounded-lg border border-neutral-200 bg-white px-4 py-2 font-inter text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white dark:focus:ring-white"
				>
					<option value="newest">Newest First</option>
					<option value="quickest">Quickest First</option>
					<option value="name">Alphabetical</option>
				</select>
			</motion.div>

			{/* Results count */}
			{searchQuery && (
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="mb-4 font-inter text-sm text-neutral-500 dark:text-neutral-500"
				>
					Found {filteredRecipes.length} recipe
					{filteredRecipes.length !== 1 ? "s" : ""}
				</motion.p>
			)}

			{/* Recipe Grid */}
			{filteredRecipes.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredRecipes.map((recipe, index) => (
						<RecipeCard key={recipe.slug} recipe={recipe} index={index} />
					))}
				</div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="flex flex-col items-center justify-center py-20 text-center"
				>
					<span className="mb-4 text-6xl">🔍</span>
					<h3 className="mb-2 font-geist text-xl font-semibold text-black dark:text-white">
						No recipes found
					</h3>
					<p className="font-inter text-sm text-neutral-500 dark:text-neutral-500">
						Try adjusting your search or filters
					</p>
				</motion.div>
			)}
		</>
	);
}
