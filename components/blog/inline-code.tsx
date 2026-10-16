// Kept out of prose.tsx because the client FAQ renders it. Importing prose.tsx
// there would ship tailwind-merge and its icons to the browser.
export function InlineCode({ children }: { children: React.ReactNode }) {
	return (
		<code className="rounded-[5px] border bg-muted/60 px-1.5 py-px font-mono text-[0.84em] text-foreground">
			{children}
		</code>
	);
}
