import Image from "next/image";
import { MapPin } from "lucide-react";
import { externalLinkProps } from "@/lib/utils";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/links";

export function Sidebar() {
	return (
		<aside className="flex flex-col gap-5 lg:sticky lg:top-14">
			<div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5">
				<Image
					src={profile.photo}
					alt={profile.name}
					width={160}
					height={160}
					preload
					className="size-14 shrink-0 rounded-full border object-cover lg:size-20"
				/>
				<div className="flex min-w-0 flex-col gap-1 lg:gap-1.5">
					<h1 className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-foreground lg:text-3xl">
						{profile.name}
					</h1>
					<p className="text-sm font-medium text-foreground lg:text-[15px]">
						{profile.role}
					</p>
					<p className="flex items-center gap-1.5 text-[13px] text-muted-foreground lg:text-sm">
						<MapPin className="size-3.5 shrink-0" aria-hidden />
						{profile.location}
					</p>
				</div>
			</div>

			<p className="text-[15px] leading-relaxed text-muted-foreground">
				{profile.bio}
			</p>

			<nav aria-label="Social links" className="flex items-center gap-5">
				{socialLinks.map(({ id, label, handle, url, icon: Icon }) => (
					<a
						key={id}
						href={url}
						{...externalLinkProps(url)}
						aria-label={`${label}: ${handle}`}
						title={label}
						className="-m-2 p-2 text-foreground transition-colors hover:text-muted-foreground"
					>
						<Icon className="size-[18px]" />
					</a>
				))}
			</nav>
		</aside>
	);
}
