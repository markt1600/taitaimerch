import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taitaimerch.com"),
  title: "Tai Tai Merch — Coming soon",
  description:
    "Tai Tai Merch is on the way. Merch for the ladies who lunch, and the rest of us who'd like to. Join the list for first access.",
  openGraph: {
    title: "Tai Tai Merch — Coming soon",
    description:
      "Merch for the ladies who lunch. Join the list for first access.",
    type: "website",
  },
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
