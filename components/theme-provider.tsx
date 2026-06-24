"use client";

import {
	createContext,
	useCallback,
	useContext,
	useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
	theme: Theme;
	toggleTheme: () => void;
}>({ theme: "dark", toggleTheme: () => {} });

// Same-tab listeners are notified via this custom event; the native "storage"
// event only fires in other tabs.
const THEME_CHANGE_EVENT = "themechange";

function subscribe(callback: () => void) {
	window.addEventListener("storage", callback);
	window.addEventListener(THEME_CHANGE_EVENT, callback);
	return () => {
		window.removeEventListener("storage", callback);
		window.removeEventListener(THEME_CHANGE_EVENT, callback);
	};
}

// On the client the current theme comes from localStorage. On the server (and
// during hydration) it falls back to "dark", matching the inline bootstrap
// script in the root layout that sets the initial <html> class before paint.
function getSnapshot(): Theme {
	return localStorage.getItem("theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
	return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	const toggleTheme = useCallback(() => {
		const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
		document.documentElement.classList.toggle("dark", next === "dark");
		localStorage.setItem("theme", next);
		window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
	}, []);

	return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
	return useContext(ThemeContext);
}
