import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { create, type Font } from "fontkit";
import type { SVGProps } from "react";

// Read at module scope so the art prerenders at build time, like the fonts in
// app/blog/[slug]/opengraph-image.tsx. The fonts are copied into assets/
// because Vercel drops pnpm's node_modules symlinks, so a node_modules path
// is missing when a bot's request renders the page at runtime.
const dir = join(process.cwd(), "assets/fonts");
const [mono, pixel] = await Promise.all([
	readFile(join(dir, "GeistMono-Regular.woff2")),
	readFile(join(dir, "GeistPixel-Square.woff2")),
]);
const FONTS = { mono: create(mono) as Font, pixel: create(pixel) as Font };

export type ArtFont = keyof typeof FONTS;

export function textWidth(text: string, font: ArtFont, size: number) {
	const f = FONTS[font];
	return (f.layout(text).advanceWidth * size) / f.unitsPerEm;
}

const round = (n: number) => Math.round(n * 100) / 100;

/** Numbers joined with as few separators as SVG path syntax allows. */
function numbers(values: number[]) {
	let out = "";
	for (const value of values) {
		const s = String(value).replace(/^(-?)0\./, "$1.");
		const glued = s[0] === "-" || (s[0] === "." && /\.\d*$/.test(out));
		out += (out && !glued ? " " : "") + s;
	}
	return out;
}

const LETTER = {
	moveTo: "m",
	lineTo: "l",
	quadraticCurveTo: "q",
	bezierCurveTo: "c",
} as const;

/**
 * Outlines of a run laid out from (0, 0), in relative commands, so the same
 * text at the same size gives the same string wherever it is drawn. Repeats
 * then gzip to almost nothing, where absolute coordinates never match.
 */
function outline(text: string, font: ArtFont, size: number) {
	const f = FONTS[font];
	const scale = size / f.unitsPerEm;
	const run = f.layout(text);
	let d = "";
	let pen = 0;
	let [x, y, startX, startY] = [0, 0, 0, 0];
	for (let i = 0; i < run.glyphs.length; i++) {
		const { xAdvance, xOffset, yOffset } = run.positions[i];
		const left = pen + xOffset * scale;
		const base = -yOffset * scale;
		for (const { command, args } of run.glyphs[i].path.commands) {
			if (command === "closePath") {
				d += "z";
				[x, y] = [startX, startY];
				continue;
			}
			const points: number[] = [];
			for (let j = 0; j < args.length; j += 2) {
				points.push(
					round(left + args[j] * scale),
					round(base - args[j + 1] * scale),
				);
			}
			const deltas = points.map((p, j) => round(p - (j % 2 ? y : x)));
			const [dx, dy] = deltas.slice(-2);
			if (command === "lineTo" && dy === 0) d += `h${numbers([dx])}`;
			else if (command === "lineTo" && dx === 0) d += `v${numbers([dy])}`;
			else d += LETTER[command] + numbers(deltas);
			[x, y] = points.slice(-2);
			if (command === "moveTo") [startX, startY] = [x, y];
		}
		pen += xAdvance * scale;
	}
	return { d, width: run.advanceWidth * scale };
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
	transform,
	...props
}: {
	children: string;
	font: ArtFont;
	size: number;
	x: number;
	y: number;
	anchor?: "start" | "middle" | "end";
} & Omit<SVGProps<SVGPathElement>, "d" | "x" | "y">) {
	const { d, width } = outline(children, font, size);
	const left =
		x - (anchor === "start" ? 0 : anchor === "middle" ? width / 2 : width);
	const place = `translate(${round(left)} ${round(y)})`;

	return (
		<path
			d={d}
			transform={transform ? `${transform} ${place}` : place}
			{...props}
		/>
	);
}
