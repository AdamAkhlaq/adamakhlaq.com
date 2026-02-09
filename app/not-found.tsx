import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-svh bg-background flex items-center justify-center px-6">
			<div className="text-center space-y-6">
				<h1 className="font-pixel text-6xl sm:text-7xl font-bold text-foreground">
					404
				</h1>
				<p className="font-pixel text-sm text-foreground/60">
					Page not found.
				</p>
				<Link
					href="/"
					className="inline-block font-pixel text-sm font-bold border-2 border-foreground px-6 py-3 text-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-150"
				>
					Go Home
				</Link>
			</div>
		</div>
	);
}
