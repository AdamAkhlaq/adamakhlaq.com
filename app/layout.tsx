import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { CommandPaletteProvider } from "@/components/command-palette-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Adam Akhlaq",
	description:
		"Full-stack software engineer and indie hacker. I build products that matter to me, whether they're useful tools or just fun experiments.",
	keywords: [
		"Adam Akhlaq",
		"software engineer",
		"developer",
		"web development",
		"software development",
	],
	authors: [{ name: "Adam Akhlaq" }],
	creator: "Adam Akhlaq",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://adamakhlaq.com",
		title: "Adam Akhlaq",
		description:
			"Full-stack software engineer and indie hacker. I build products that matter to me, whether they're useful tools or just fun experiments.",
		siteName: "Adam Akhlaq",
	},
	twitter: {
		card: "summary_large_image",
		title: "Adam Akhlaq",
		description:
			"Full-stack software engineer and indie hacker. I build products that matter to me, whether they're useful tools or just fun experiments.",
		creator: "@adamakhlaq",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	metadataBase: new URL("https://adamakhlaq.com"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
				/>
				<Script
					data-website-id={process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID}
					data-domain="www.adamakhlaq.com"
					data-disable-console="true"
					src="/js/script.js"
					strategy="afterInteractive"
				/>
			</head>
			<body
				className={`${geist.variable} ${geistMono.variable} ${inter.variable} antialiased`}
			>
				<ThemeProvider>
					<CommandPaletteProvider>{children}</CommandPaletteProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
