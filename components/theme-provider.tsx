"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
	theme: Theme;
	toggleTheme: () => void;
}>({ theme: "dark", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("dark");

	useEffect(() => {
		const stored = localStorage.getItem("theme") as Theme | null;
		if (stored === "light" || stored === "dark") {
			setTheme(stored);
			document.documentElement.classList.toggle("dark", stored === "dark");
		}
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			document.documentElement.classList.toggle("dark", next === "dark");
			localStorage.setItem("theme", next);
			return next;
		});
	}, []);

	return (
		<ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
