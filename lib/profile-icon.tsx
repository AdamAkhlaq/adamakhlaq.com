import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// Read at module scope so the icon routes prerender at build time; a read
// inside the handler counts as uncached data under Cache Components.
const photo = await readFile(join(process.cwd(), "public", profile.photo));
const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

export function profileIcon(size: number, { round }: { round: boolean }) {
	return new ImageResponse(
		(
			<div style={{ display: "flex", width: "100%", height: "100%" }}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={src}
					alt=""
					width={size}
					height={size}
					style={{ borderRadius: round ? "50%" : 0 }}
				/>
			</div>
		),
		{ width: size, height: size },
	);
}
