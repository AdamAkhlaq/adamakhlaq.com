/**
 * Shared drawing helpers for post illustrations: an isometric projection, the
 * site's blue-to-violet accent, and the dotted backdrop. Everything is plain
 * SVG with no hooks, so the same art renders in the page and in next/og.
 */

export const S = 20;
const BLUE = [59, 130, 246];
const VIOLET = [168, 85, 247];

export function iso(x: number, y: number, z: number) {
	return { x: (x - y) * 0.866 * S, y: ((x + y) * 0.5 - z) * S };
}

/** Blue at 0, violet at 1. */
export function mix(t: number) {
	const c = BLUE.map((b, i) => Math.round(b + (VIOLET[i] - b) * t));
	return `rgb(${c.join(",")})`;
}

export function rhombus(half: number, z: number) {
	return [
		iso(-half, -half, z),
		iso(half, -half, z),
		iso(half, half, z),
		iso(-half, half, z),
	]
		.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
		.join(" ");
}

export type Box = { minX: number; minY: number; maxX: number; maxY: number };

/** The faint dot field and the two soft glows behind every illustration. */
export function Backdrop({ id, box }: { id: string; box: Box }) {
	const { minX, minY, maxX, maxY } = box;
	return (
		<>
			<defs>
				<pattern
					id={`${id}-field`}
					width="16"
					height="16"
					patternUnits="userSpaceOnUse"
				>
					<circle cx="8" cy="8" r="0.9" fill="currentColor" opacity="0.13" />
				</pattern>
				<radialGradient id={`${id}-glow-a`}>
					<stop offset="0%" stopColor={mix(0)} stopOpacity="0.22" />
					<stop offset="100%" stopColor={mix(0)} stopOpacity="0" />
				</radialGradient>
				<radialGradient id={`${id}-glow-b`}>
					<stop offset="0%" stopColor={mix(1)} stopOpacity="0.22" />
					<stop offset="100%" stopColor={mix(1)} stopOpacity="0" />
				</radialGradient>
			</defs>
			<rect
				x={minX - 2000}
				y={minY - 2000}
				width={maxX - minX + 4000}
				height={maxY - minY + 4000}
				fill={`url(#${id}-field)`}
			/>
			<circle
				cx={minX * 0.35}
				cy={maxY * 0.35}
				r={maxX * 1.1}
				fill={`url(#${id}-glow-a)`}
			/>
			<circle
				cx={maxX * 0.4}
				cy={minY * 0.55}
				r={maxX * 1.1}
				fill={`url(#${id}-glow-b)`}
			/>
		</>
	);
}

/** One dotted plane. Dots swell and take the accent where the ripple peaks. */
export function DotPlane({
	n,
	z,
	color,
	ripple,
}: {
	n: number;
	z: number;
	color: string;
	ripple: (x: number, y: number, d: number) => number;
}) {
	const half = (n - 1) / 2;
	const maxD = Math.hypot(half, half);
	const dots: React.ReactNode[] = [];
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const x = i - half;
			const y = j - half;
			const d = Math.hypot(x, y);
			const falloff = 1 - d / (maxD + 1.2);
			const strength = ripple(x, y, d) * Math.pow(Math.max(falloff, 0), 0.7);
			const p = iso(x, y, z);
			const r = S * (0.07 + 0.2 * strength);
			const accent = strength > 0.22;
			dots.push(
				<ellipse
					key={`${i}-${j}`}
					cx={p.x}
					cy={p.y}
					rx={r}
					ry={r * 0.58}
					fill={accent ? color : "currentColor"}
					opacity={accent ? 0.35 + 0.65 * strength : 0.16}
				/>,
			);
		}
	}
	return (
		<>
			<polygon
				points={rhombus(half + 0.7, z)}
				fill={color}
				fillOpacity={0.05}
				stroke="currentColor"
				strokeOpacity={0.18}
				strokeWidth={1}
				strokeLinejoin="round"
			/>
			{dots}
		</>
	);
}
