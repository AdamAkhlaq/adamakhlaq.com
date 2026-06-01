"use client";

import Link from "next/link";

export default function FlagQuizError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-6">
			<div className="text-center space-y-6 max-w-md">
				<h1 className="text-2xl sm:text-3xl font-bold text-foreground">
					Quiz failed to load
				</h1>
				<p className="text-sm text-muted-foreground">
					Something went wrong loading the flag quiz. Please try again.
				</p>
				<div className="flex items-center justify-center gap-3">
					<button
						onClick={reset}
						className="text-sm font-medium border-2 border-foreground px-5 py-2.5 text-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-150 rounded-md"
					>
						Try Again
					</button>
					<Link
						href="/"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Back home
					</Link>
				</div>
			</div>
		</div>
	);
}
