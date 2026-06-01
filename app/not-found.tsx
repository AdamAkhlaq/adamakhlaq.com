import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex min-h-svh items-center justify-center bg-background px-6">
			<div className="flex flex-col items-center gap-6 text-center">
				<h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
					404
				</h1>
				<p className="text-muted-foreground">Page not found.</p>
				<Button asChild variant="outline">
					<Link href="/">Go home</Link>
				</Button>
			</div>
		</div>
	);
}
