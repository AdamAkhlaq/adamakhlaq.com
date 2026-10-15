import { Backdrop, DotPlane, iso, mix, type Box } from "./art-kit";

/** FNV-1a, so every slug always draws the same pattern. */
function hash(text: string) {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}

/** mulberry32: a small seeded random number generator. */
function random(seed: number) {
	let a = seed;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const N = 15;

/**
 * Art for posts without their own illustration: one dotted plane with
 * ripples from two points, both picked from the slug.
 */
export function FallbackArt({
	slug,
	title = "A field of dots rippling out from two points",
	color,
}: {
	slug: string;
	title?: string;
	color?: string;
}) {
	const rand = random(hash(slug));
	const wave = () => ({
		x: (rand() - 0.5) * 8,
		y: (rand() - 0.5) * 8,
		freq: 0.9 + rand() * 0.9,
		phase: rand() * Math.PI * 2,
	});
	const a = wave();
	const b = wave();
	const tint = rand();
	const id = `art-${hash(slug).toString(36)}`;

	const ripple = (x: number, y: number) => {
		const da = Math.hypot(x - a.x, y - a.y);
		const db = Math.hypot(x - b.x, y - b.y);
		return (
			0.5 +
			0.25 * Math.cos(da * a.freq + a.phase) +
			0.25 * Math.cos(db * b.freq + b.phase)
		);
	};

	const pad = 30;
	const edge = (N - 1) / 2 + 0.7;
	const minX = -iso(edge, -edge, 0).x - pad;
	const box: Box = {
		minX,
		maxX: -minX,
		minY: iso(-edge, -edge, 0).y - pad,
		maxY: iso(edge, edge, 0).y + pad,
	};

	return (
		<svg
			viewBox={`${box.minX} ${box.minY} ${box.maxX - box.minX} ${box.maxY - box.minY}`}
			preserveAspectRatio="xMidYMid meet"
			width="100%"
			height="100%"
			color={color}
			role="img"
			aria-label={title}
			style={{ display: "block" }}
		>
			<Backdrop id={id} box={box} />
			<DotPlane n={N} z={0} color={mix(tint)} ripple={ripple} />
		</svg>
	);
}
