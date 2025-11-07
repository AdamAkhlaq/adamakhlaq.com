import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adam Akhlaq | Personal Website',
  description: 'Projects, builds, cool ideas, and random thoughts by Adam Akhlaq',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
