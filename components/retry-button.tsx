import type { ComponentProps } from "react";

// Matches Button's outline variant. Error boundaries load on every page, so
// they avoid Button to keep cva, Radix Slot and tailwind-merge off pages that
// do not otherwise need them.
export function RetryButton(
	props: Omit<ComponentProps<"button">, "className">,
) {
	return (
		<button
			type="button"
			className="inline-flex h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs outline-none transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
			{...props}
		/>
	);
}
