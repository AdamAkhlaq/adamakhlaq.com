"use client";

import Link from "next/link";
import { ChefHat, Share2, Check } from "lucide-react";
import { useState } from "react";

interface RecipeHeaderProps {
  slug: string;
}

export function RecipeHeader({ slug }: RecipeHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/cookbook/${slug}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      <Link
        href="/cookbook"
        className="flex items-center gap-2 text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        <ChefHat className="h-5 w-5" />
        <span className="text-sm">Cookbook</span>
      </Link>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
        aria-label="Share recipe"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </>
        )}
      </button>
    </div>
  );
}
