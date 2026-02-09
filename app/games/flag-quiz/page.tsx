import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { SimpleNavbar } from "@/components/simple-navbar";

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
			<SimpleNavbar />
			<main className="container mx-auto px-4 pt-4 pb-6 sm:py-8">
				<FlagQuizGame />
			</main>
		</div>
	);
}
