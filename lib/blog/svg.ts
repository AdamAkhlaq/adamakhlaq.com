import { Fragment, isValidElement, type ReactNode } from "react";

// React's camelCase props that SVG spells in kebab-case. Others, like viewBox
// and gradientUnits, are camelCase in SVG too.
const KEBAB = new Set([
	"strokeWidth",
	"strokeLinecap",
	"strokeLinejoin",
	"strokeOpacity",
	"fillOpacity",
	"stopColor",
	"stopOpacity",
]);
const SKIPPED = new Set(["children", "style", "role", "key"]);

const escape = (value: string) =>
	value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * Serialises an SVG React tree (plain elements and function components, no
 * hooks) to markup. next/og can't draw SVG built from components, but it can
 * draw this string as an image.
 */
export function svgToString(node: ReactNode, color: string): string {
	if (node == null || typeof node === "boolean") return "";
	if (typeof node === "string" || typeof node === "number")
		return escape(String(node));
	if (Array.isArray(node))
		return node.map((n) => svgToString(n, color)).join("");
	if (!isValidElement<Record<string, unknown>>(node)) return "";

	const { type, props } = node;
	if (type === Fragment) return svgToString(props.children as ReactNode, color);
	if (typeof type === "function")
		return svgToString((type as (p: unknown) => ReactNode)(props), color);
	if (typeof type !== "string") return "";

	const attrs = Object.entries(props)
		.filter(([key, value]) => !SKIPPED.has(key) && value != null)
		.map(([key, value]) => {
			const name = KEBAB.has(key)
				? key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
				: key;
			const text = String(value).replace(/currentColor/g, color);
			return ` ${name}="${escape(text)}"`;
		})
		.join("");
	const xmlns = type === "svg" ? ' xmlns="http://www.w3.org/2000/svg"' : "";
	const children = svgToString(props.children as ReactNode, color);
	return `<${type}${xmlns}${attrs}>${children}</${type}>`;
}

/** The art as an image source at a fixed pixel size. */
export function svgDataUri(
	node: ReactNode,
	{ color, width, height }: { color: string; width: number; height: number },
) {
	const markup = svgToString(node, color).replace(
		/^<svg([^>]*?) width="[^"]*" height="[^"]*"/,
		`<svg$1 width="${width}" height="${height}"`,
	);
	return `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
}
