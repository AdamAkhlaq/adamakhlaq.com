import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative flex min-h-svh flex-col">
			<main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-10 sm:pb-24 sm:pt-16">
				{children}
			</main>
			<SiteFooter />
		</div>
	);
}
