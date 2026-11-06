"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const Icon = theme === "dark" ? Sun : Moon;

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted sm:h-8 sm:px-3"
		>
			<Icon className="size-3.5" aria-hidden />
			{theme === "dark" ? "Light theme" : "Dark theme"}
		</button>
	);
}
