"use client";

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="min-h-svh bg-background flex items-center justify-center px-6">
			<div className="text-center space-y-6">
				<h1 className="font-pixel text-4xl sm:text-5xl font-bold text-foreground">
					Something went wrong
				</h1>
				<p className="font-pixel text-sm text-foreground/60">
					An unexpected error occurred.
				</p>
				<button
					onClick={reset}
					className="font-pixel text-sm font-bold border-2 border-foreground px-6 py-3 text-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-150"
				>
					Try Again
				</button>
			</div>
		</div>
	);
}
