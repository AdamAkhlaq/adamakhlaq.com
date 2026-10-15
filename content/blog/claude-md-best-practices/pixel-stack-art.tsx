import { ArtText, textWidth } from "@/components/blog/art-text";

const WORD = "CLAUDE.md";
const SIZE = 62;
const TOP = 118;
const ROW_GAP = 76;
const LABEL_RISE = 52;
const WIDTH = 480;
const HEIGHT = 400;

const LAYERS = [
	{ where: "~/.claude", scope: "user", opacity: 0.1 },
	{ where: ".", scope: "project", opacity: 0.22 },
	{ where: ".local", scope: "local", opacity: 0.45 },
	{ where: "src/db", scope: "nested", opacity: 1 },
];

/**
 * CLAUDE.md set in Geist Pixel, once per layer. The broadest layer sits at the
 * top and fades furthest, so the file read last is the one in full.
 */
export function PixelStackArt({
	title = "The word CLAUDE.md in a pixel typeface, stacked four times and fading towards the top",
	color,
	id = "pixel-stack-art",
}: {
	title?: string;
	color?: string;
	id?: string;
}) {
	const half = textWidth(WORD, "pixel", SIZE) / 2;
	const left = WIDTH / 2 - half;
	const right = WIDTH / 2 + half;

	return (
		<svg
			viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
			preserveAspectRatio="xMidYMid meet"
			width="100%"
			height="100%"
			color={color}
			role="img"
			aria-label={title}
			style={{ display: "block" }}
		>
			<defs>
				<pattern
					id={`${id}-grid`}
					width="8"
					height="8"
					patternUnits="userSpaceOnUse"
				>
					<rect
						x="3.5"
						y="3.5"
						width="1"
						height="1"
						fill="currentColor"
						opacity="0.12"
					/>
				</pattern>
			</defs>
			<rect
				x={-2000}
				y={-2000}
				width={WIDTH + 4000}
				height={HEIGHT + 4000}
				fill={`url(#${id}-grid)`}
			/>
			{LAYERS.map((layer, k) => {
				const y = TOP + k * ROW_GAP;
				const labelOpacity = Math.max(layer.opacity, 0.35);
				return (
					<g key={layer.scope}>
						<ArtText
							font="mono"
							size={9.5}
							x={left}
							y={y - LABEL_RISE}
							fill="currentColor"
							fillOpacity={labelOpacity}
						>
							{layer.where}
						</ArtText>
						<ArtText
							font="mono"
							size={9.5}
							x={right}
							y={y - LABEL_RISE}
							anchor="end"
							fill="currentColor"
							fillOpacity={labelOpacity}
						>
							{layer.scope}
						</ArtText>
						<ArtText
							font="pixel"
							size={SIZE}
							x={left}
							y={y}
							fill="currentColor"
							fillOpacity={layer.opacity}
						>
							{WORD}
						</ArtText>
					</g>
				);
			})}
		</svg>
	);
}
