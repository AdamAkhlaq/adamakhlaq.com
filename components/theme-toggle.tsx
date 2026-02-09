"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
		</button>
	);
}
