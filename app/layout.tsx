import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
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

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

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

// Inline script to prevent FOUC by reading theme from localStorage before first paint.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark");else document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{ __html: themeScript }}
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
				className={`${geist.variable} ${geistMono.variable} ${GeistPixelSquare.variable} antialiased`}
			>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
