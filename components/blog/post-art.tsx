import { loadPostModule } from "@/lib/blog/posts";
import { FallbackArt } from "./fallback-art";

/** A post's own illustration, or a pattern drawn from its slug. */
export async function PostArt({
	slug,
	color,
}: {
	slug: string;
	color?: string;
}) {
	const { Illustration } = await loadPostModule(slug);
	return Illustration ? (
		<Illustration color={color} />
	) : (
		<FallbackArt slug={slug} color={color} />
	);
}
