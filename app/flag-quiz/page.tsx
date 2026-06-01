import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
	title: "Flag Quiz | Adam Akhlaq",
	description: "Test your knowledge of world flags.",
	openGraph: {
		title: "Flag Quiz | Adam Akhlaq",
		description: "Test your knowledge of world flags.",
	},
};

const FlagQuizGame = dynamic(() => import("./flag-quiz-game"), {
	loading: () => (
		<div className="mx-auto max-w-2xl min-h-[calc(100dvh-4rem)] flex items-center justify-center">
			<div className="text-center space-y-4">
				<div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto animate-pulse" />
				<p className="text-muted-foreground">Loading quiz...</p>
			</div>
		</div>
	),
});

export default function FlagQuizPage() {
	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto w-full max-w-2xl px-4 pt-4 sm:px-6 sm:pt-6">
				<Link
					href="/"
					className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowLeft className="size-4" aria-hidden />
					Adam Akhlaq
				</Link>
			</div>
			<main className="container mx-auto px-4 pt-4 pb-6 sm:py-8">
				<FlagQuizGame />
			</main>
		</div>
	);
}
