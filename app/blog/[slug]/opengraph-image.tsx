import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { FallbackArt } from "@/components/blog/fallback-art";
import { getPost, getPostSlugs, loadPostModule } from "@/lib/blog/posts";
import { svgDataUri } from "@/lib/blog/svg";
import { profile } from "@/data/profile";

export const alt = `A blog post by ${profile.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read at module scope so the image prerenders at build time; a read inside
// the handler counts as uncached data under Cache Components.
const fonts = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");
const [bold, medium, photo] = await Promise.all([
	readFile(join(fonts, "Geist-Bold.ttf")).then(withoutKerning),
	readFile(join(fonts, "Geist-Medium.ttf")).then(withoutKerning),
	readFile(join(process.cwd(), "public", profile.photo)),
]);
const avatar = `data:image/jpeg;base64,${photo.toString("base64")}`;

// Satori lays out words by summing unkerned glyph widths but draws them
// kerned, so every kerned word leaves an extra gap after it. Renaming the GPOS
// table tag hides the kerning from it, making layout and drawing agree.
function withoutKerning(font: Buffer) {
	const out = Buffer.from(font);
	const tables = out.readUInt16BE(4);
	for (let i = 0; i < tables; i++) {
		const at = 12 + i * 16;
		if (out.toString("latin1", at, at + 4) === "GPOS") {
			out.write("XPOS", at, "latin1");
		}
	}
	return out;
}

export async function generateStaticParams() {
	const slugs = await getPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

/** Split layout: title top-left, the post's art on the right. X overlays its domain label bottom-left, so that corner stays empty. */
export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getPost(slug);
	const { Illustration } = await loadPostModule(slug);
	const title = post?.title ?? profile.name;
	const artSize = { width: 552, height: 630 };
	const art = Illustration ? <Illustration /> : <FallbackArt slug={slug} />;

	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					width: "100%",
					height: "100%",
					background: "#fff",
					color: "#000",
					fontFamily: "Geist",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: 648,
						padding: 60,
						gap: 60,
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
						<img
							src={avatar}
							alt=""
							width={40}
							height={40}
							style={{ borderRadius: 999, border: "1px solid #e5e5e5" }}
						/>
						<span style={{ fontSize: 26, fontWeight: 500 }}>
							{profile.name}
						</span>
					</div>
					<span
						style={{
							fontSize: title.length > 40 ? 64 : 76,
							fontWeight: 700,
							lineHeight: 0.98,
							letterSpacing: "-0.045em",
						}}
					>
						{title}
					</span>
				</div>
				<div
					style={{
						display: "flex",
						...artSize,
						borderLeft: "1px solid rgba(0,0,0,0.1)",
					}}
				>
					<img
						src={svgDataUri(art, { color: "#000", ...artSize })}
						alt=""
						{...artSize}
					/>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{ name: "Geist", data: bold, weight: 700, style: "normal" },
				{ name: "Geist", data: medium, weight: 500, style: "normal" },
			],
		},
	);
}
