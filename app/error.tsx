"use client";

import { RetryButton } from "@/components/retry-button";

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex min-h-svh items-center justify-center bg-background px-6">
			<div className="flex flex-col items-center gap-6 text-center">
				<h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Something went wrong
				</h1>
				<p className="text-muted-foreground">An unexpected error occurred.</p>
				<RetryButton onClick={reset}>Try again</RetryButton>
			</div>
		</div>
	);
}
