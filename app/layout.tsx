import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taitaimerch.com"),
  title: "Tai Tai Merch — Modern, cute art by Mel",
  description:
    "Tai Tai Merch is the home of Mel's modern-but-cute art: everyday objects set by hand with crystals and beads. One-of-a-kind creations for the ladies who lunch, and the rest of us who'd like to.",
  openGraph: {
    title: "Tai Tai Merch — Modern, cute art by Mel",
    description:
      "Everyday objects, set by hand with crystals and beads. One-of-a-kind creations by Mel.",
    type: "website",
    images: ["/art/napa-confetti.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e332b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
