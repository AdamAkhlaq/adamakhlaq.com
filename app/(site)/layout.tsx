import { Sidebar } from "@/components/sidebar";
import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-svh flex-col">
			<div className="mx-auto grid w-full max-w-6xl flex-1 gap-12 px-6 pb-24 pt-10 sm:px-10 sm:pt-14 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-16 xl:grid-cols-[19rem_minmax(0,1fr)]">
				<Sidebar />
				<main className="min-w-0">{children}</main>
			</div>
			<SiteFooter />
		</div>
	);
}
