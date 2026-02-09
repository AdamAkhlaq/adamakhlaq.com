export default function FlagQuizLoading() {
	return (
		<div className="min-h-screen bg-background">
			{/* Navbar skeleton */}
			<nav className="w-full px-4 py-3 sm:px-6">
				<div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center">
					<div className="h-5 w-28 rounded bg-muted animate-pulse" />
					<div className="hidden sm:flex items-center gap-6">
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								key={i}
								className="h-4 w-14 rounded bg-muted animate-pulse"
							/>
						))}
					</div>
					<div className="flex justify-end">
						<div className="h-8 w-8 rounded bg-muted animate-pulse" />
					</div>
				</div>
			</nav>

			{/* Quiz skeleton */}
			<main className="container mx-auto px-4 pt-4 pb-6 sm:py-8">
				<div className="mx-auto max-w-2xl min-h-[calc(100dvh-8rem)] flex flex-col items-center justify-center space-y-6">
					<div className="w-16 h-16 rounded-2xl bg-primary/10 animate-pulse" />
					<div className="space-y-2 text-center">
						<div className="h-8 w-40 rounded bg-muted animate-pulse mx-auto" />
						<div className="h-4 w-60 rounded bg-muted animate-pulse mx-auto" />
					</div>
					<div className="w-full max-w-md space-y-3">
						<div className="h-10 rounded-lg bg-muted animate-pulse" />
						<div className="grid grid-cols-2 gap-3">
							{Array.from({ length: 4 }).map((_, i) => (
								<div
									key={i}
									className="h-20 rounded-xl bg-muted animate-pulse"
								/>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
