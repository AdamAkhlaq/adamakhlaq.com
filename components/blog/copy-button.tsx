"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { clsx } from "clsx";

/** Copies `text`, or the response body of `src`, fetched on click. */
export function CopyButton({
	text,
	src,
	label = "Copy",
	className,
	showLabel = false,
}: {
	text?: string;
	src?: string;
	label?: string;
	className?: string;
	showLabel?: boolean;
}) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		if (src) {
			const body = fetch(src).then((res) => res.text());
			try {
				// Safari only allows a clipboard write that starts inside the click,
				// so the download is handed over as a promise rather than awaited.
				await navigator.clipboard.write([
					new ClipboardItem({
						"text/plain": body.then(
							(t) => new Blob([t], { type: "text/plain" }),
						),
					}),
				]);
			} catch {
				await navigator.clipboard.writeText(await body);
			}
		} else {
			await navigator.clipboard.writeText(text ?? "");
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1600);
	};

	return (
		<button
			type="button"
			onClick={copy}
			aria-label={copied ? "Copied" : label}
			className={clsx(
				"inline-flex cursor-pointer items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2",
				showLabel && "gap-2",
				className,
			)}
		>
			{copied ? (
				<Check className="size-3.5" aria-hidden />
			) : (
				<Copy className="size-3.5" aria-hidden />
			)}
			{showLabel && <span>{copied ? "Copied" : label}</span>}
		</button>
	);
}
