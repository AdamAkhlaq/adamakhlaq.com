"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { InlineText } from "./inline-text";

// Answers stay in the DOM when collapsed so crawlers and AI search can read
// them; only their height animates.
function Collapse({
	open,
	id,
	children,
}: {
	open: boolean;
	id: string;
	children: React.ReactNode;
}) {
	return (
		<div
			id={id}
			role="region"
			className={cn(
				"grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
				open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
			)}
		>
			<div className="overflow-hidden" inert={!open}>
				{children}
			</div>
		</div>
	);
}

/** Separate cards, one open at a time. */
export function FaqCards({ faqs }: { faqs: { q: string; a: string }[] }) {
	const base = useId();
	const [open, setOpen] = useState<number | null>(0);
	return (
		<div className="flex flex-col gap-2">
			{faqs.map((f, i) => {
				const isOpen = open === i;
				return (
					<div
						key={f.q}
						className={cn(
							"rounded-xl border transition-colors",
							isOpen ? "bg-muted/45" : "hover:border-foreground/25",
						)}
					>
						<h3>
							<button
								type="button"
								aria-expanded={isOpen}
								aria-controls={`${base}-${i}`}
								onClick={() => setOpen(isOpen ? null : i)}
								className="flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-4 text-left text-[16px] font-medium leading-snug text-foreground"
							>
								{f.q}
								<ChevronDown
									className={cn(
										"size-4 shrink-0 text-muted-foreground transition-transform duration-300",
										isOpen && "rotate-180",
									)}
									aria-hidden
								/>
							</button>
						</h3>
						<Collapse open={isOpen} id={`${base}-${i}`}>
							<p className="px-5 pb-5 text-[15.5px] leading-relaxed text-muted-foreground">
								<InlineText text={f.a} />
							</p>
						</Collapse>
					</div>
				);
			})}
		</div>
	);
}
