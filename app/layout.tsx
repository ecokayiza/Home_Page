import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import FancyParticlesBG from "@/components/FancyParticlesBG";

export const metadata: Metadata = {
  title: "Ecokayiza's web",
  description: "Record and Explore All Your Interests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <FancyParticlesBG />
        <div className="fancy-bg fixed inset-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
