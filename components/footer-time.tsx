"use client";

import { useEffect, useState } from "react";

/** Renders the current year, kept correct without redeploys. */
export function CurrentYear() {
	const [year, setYear] = useState<number | null>(null);
	useEffect(() => {
		const update = () => setYear(new Date().getFullYear());
		update();
	}, []);
	return <span suppressHydrationWarning>{year ?? ""}</span>;
}

const londonTime = new Intl.DateTimeFormat("en-GB", {
	timeZone: "Europe/London",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
});

/** A live clock showing the local time in London, accurate to the second. */
export function LondonClock({ className }: { className?: string }) {
	const [time, setTime] = useState<string | null>(null);

	useEffect(() => {
		const tick = () => setTime(londonTime.format(new Date()));
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<span className={className} suppressHydrationWarning>
			{time ? `${time} · London` : null}
		</span>
	);
}
