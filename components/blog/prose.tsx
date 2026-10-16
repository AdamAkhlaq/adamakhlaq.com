import { Link2 } from "lucide-react";
import { cn, externalLinkProps } from "@/lib/utils";

/** Styles for the post body. Elements come from MDX via mdx-components.tsx. */

export function H2({
	id,
	className,
	children,
}: {
	id?: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<h2
			id={id}
			className={cn(
				"group mt-6 scroll-mt-32 text-[1.75rem] font-bold leading-tight tracking-[-0.03em] text-foreground first:mt-0 sm:text-3xl",
				className,
			)}
		>
			<a href={`#${id}`} className="relative">
				{children}
				<Link2
					className="absolute -left-7 top-1/2 hidden size-4.5 -translate-y-1/2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 lg:block"
					aria-hidden
				/>
			</a>
		</h2>
	);
}

export function H3({
	id,
	children,
}: {
	id?: string;
	children: React.ReactNode;
}) {
	return (
		<h3
			id={id}
			className="mt-2 scroll-mt-32 text-xl font-semibold tracking-[-0.02em] text-foreground"
		>
			{children}
		</h3>
	);
}

export function A({
	href = "",
	children,
}: {
	href?: string;
	children: React.ReactNode;
}) {
	return (
		<a
			href={href}
			{...externalLinkProps(href)}
			className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
		>
			{children}
		</a>
	);
}

export function UL({ children }: { children: React.ReactNode }) {
	return (
		<ul className="flex flex-col gap-2.5 pl-5 marker:text-muted-foreground [&>li]:list-disc [&>li]:pl-1.5">
			{children}
		</ul>
	);
}

export function OL({ children }: { children: React.ReactNode }) {
	return (
		<ol className="flex flex-col gap-2.5 pl-5 marker:text-muted-foreground [&>li]:list-decimal [&>li]:pl-1.5">
			{children}
		</ol>
	);
}

export function Table({ children }: { children: React.ReactNode }) {
	return (
		<div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
			<table className="w-full border-collapse text-left text-[14.5px] leading-snug [&_td]:border-b [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_td:first-child]:font-medium [&_td:first-child]:text-foreground [&_td:last-child]:pr-0 [&_td:last-child]:text-muted-foreground [&_th]:border-b [&_th]:py-2.5 [&_th]:pr-4 [&_th]:font-medium [&_th]:text-muted-foreground [&_td_code]:border-0 [&_td_code]:bg-transparent [&_td_code]:p-0 [&_td_code]:text-[13px]">
				{children}
			</table>
		</div>
	);
}

/** The wrapper every post body renders inside. */
export function Prose({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-6 text-[17px] leading-[1.75] text-foreground/90 [&_strong]:font-semibold [&_strong]:text-foreground">
			{children}
		</div>
	);
}
