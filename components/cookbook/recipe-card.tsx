"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Share2, Check } from "lucide-react";
import { RecipeWithBadges } from "@/lib/recipe-types";

interface RecipeCardProps {
	recipe: RecipeWithBadges;
	index: number;
}

export function RecipeCard({ recipe, index }: RecipeCardProps) {
	const [copied, setCopied] = useState(false);
	const [imageError, setImageError] = useState(false);

	const handleShare = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const url = `${window.location.origin}/cookbook/${recipe.slug}`;

		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
		>
			<Link href={`/cookbook/${recipe.slug}`}>
				<div className="group relative overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
					{/* Thumbnail Image */}
					<div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
						{!imageError ? (
							<Image
								src={recipe.image}
								alt={recipe.title}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105"
								onError={() => setImageError(true)}
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
								<span className="text-6xl">🍽️</span>
							</div>
						)}

						{/* Badges overlay */}
						<div className="absolute left-2 top-2 flex flex-wrap gap-1">
							{recipe.isNew && (
								<span className="rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-md">
									New
								</span>
							)}
							{recipe.isQuick && (
								<span className="rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-md">
									Quick
								</span>
							)}
						</div>

						{/* Share button */}
						<button
							onClick={handleShare}
							className="absolute right-2 top-2 rounded-full border border-white/20 bg-black/60 p-2 text-white backdrop-blur-md opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
							aria-label="Share recipe"
						>
							{copied ? (
								<Check className="h-4 w-4" />
							) : (
								<Share2 className="h-4 w-4" />
							)}
						</button>
					</div>

					{/* Content */}
					<div className="p-4">
						{/* Title */}
						<div className="mb-2">
							<h3 className="font-geist text-lg font-semibold text-black dark:text-white">
								{recipe.title}
							</h3>
						</div>

						{/* Description */}
						<p className="mb-3 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
							{recipe.description}
						</p>

						{/* Time, complexity, cuisine, and meal type */}
						<div className="mb-3 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500">
							<Clock className="h-4 w-4" />
							<span>{recipe.totalTime} min</span>
							<span>•</span>
							<span>{recipe.complexity}</span>
							<span>•</span>
							<span>{recipe.cuisine}</span>
							<span>•</span>
							<span>{recipe.mealType}</span>
						</div>

						{/* Macros */}
						<div className="flex gap-3 border-t border-neutral-200 pt-3 dark:border-neutral-800">
							<div className="flex-1">
								<div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
									Calories
								</div>
								<div className="font-geist text-sm font-semibold text-black dark:text-white">
									{recipe.calories}
								</div>
							</div>
							<div className="flex-1">
								<div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
									Protein
								</div>
								<div className="font-geist text-sm font-semibold text-black dark:text-white">
									{recipe.protein}g
								</div>
							</div>
							<div className="flex-1">
								<div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
									Carbs
								</div>
								<div className="font-geist text-sm font-semibold text-black dark:text-white">
									{recipe.carbs}g
								</div>
							</div>
							<div className="flex-1">
								<div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
									Fat
								</div>
								<div className="font-geist text-sm font-semibold text-black dark:text-white">
									{recipe.fat}g
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
