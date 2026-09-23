import { Sidebar } from "@/components/sidebar";
import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col gap-14 px-6 pb-16 pt-12 sm:px-10 sm:pt-16 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-x-24 lg:px-16 lg:pt-24 xl:px-28">
			<Sidebar />
			<div className="flex min-w-0 flex-col">
				<main className="flex-1">{children}</main>
				<SiteFooter />
			</div>
		</div>
	);
}
