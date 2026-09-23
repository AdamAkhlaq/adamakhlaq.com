"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="cursor-pointer text-sm leading-8 text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
		>
			{theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
		</button>
	);
}
