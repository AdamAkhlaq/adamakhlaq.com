import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { create, type Font } from "fontkit";
import type { SVGProps } from "react";

// Read at module scope so the art prerenders at build time, like the fonts in
// app/blog/[slug]/opengraph-image.tsx.
const dir = join(process.cwd(), "node_modules/geist/dist/fonts");
const [mono, pixel] = await Promise.all([
	readFile(join(dir, "geist-mono/GeistMono-Regular.woff2")),
	readFile(join(dir, "geist-pixel/GeistPixel-Square.woff2")),
]);
const FONTS = { mono: create(mono) as Font, pixel: create(pixel) as Font };

export type ArtFont = keyof typeof FONTS;

export function textWidth(text: string, font: ArtFont, size: number) {
	const f = FONTS[font];
	return (f.layout(text).advanceWidth * size) / f.unitsPerEm;
}

/**
 * Text drawn as outlines. The share image draws the art through resvg, which
 * has no fonts, so an SVG <text> would come out blank there.
 */
export function ArtText({
	children,
	font,
	size,
	x,
	y,
	anchor = "start",
	...props
}: {
	children: string;
	font: ArtFont;
	size: number;
	x: number;
	y: number;
	anchor?: "start" | "middle" | "end";
} & Omit<SVGProps<SVGPathElement>, "d" | "x" | "y">) {
	const f = FONTS[font];
	const scale = size / f.unitsPerEm;
	const run = f.layout(children);
	const width = run.advanceWidth * scale;
	let pen =
		x - (anchor === "start" ? 0 : anchor === "middle" ? width / 2 : width);
	let d = "";
	for (let i = 0; i < run.glyphs.length; i++) {
		const { xAdvance, xOffset, yOffset } = run.positions[i];
		d += run.glyphs[i].path
			.transform(
				scale,
				0,
				0,
				-scale,
				pen + xOffset * scale,
				y - yOffset * scale,
			)
			.toSVG();
		pen += xAdvance * scale;
	}

	return <path d={d} {...props} />;
}
