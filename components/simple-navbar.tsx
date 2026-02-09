"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/games", label: "Games" },
	{ href: "/links", label: "Links" },
] as const;

export function SimpleNavbar() {
	const pathname = usePathname();

	return (
		<nav className="w-full px-4 py-3 sm:px-6">
			<div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center">
				{/* Left: Brand */}
				<Link
					href="/"
					className="font-pixel text-lg font-bold text-foreground hover:text-foreground/80 transition-colors"
				>
					Adam Akhlaq
				</Link>

				{/* Center: Nav links (hidden on mobile) */}
				<div className="hidden sm:flex items-center gap-6">
					{NAV_LINKS.map(({ href, label }) => {
						const isActive =
							href === "/"
								? pathname === "/"
								: pathname.startsWith(href);

						return (
							<Link
								key={href}
								href={href}
								className={cn(
									"text-sm transition-colors",
									isActive
										? "text-foreground font-medium"
										: "text-foreground/60 hover:text-foreground/80"
								)}
							>
								{label}
							</Link>
						);
					})}
				</div>

				{/* Right: Theme toggle */}
				<div className="flex justify-end">
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
