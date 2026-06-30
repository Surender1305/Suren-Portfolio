import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Surender S | Creative Developer",
  description: "A cinematic portfolio for Surender S, Creative Developer & Flutter Developer. Building premium digital experiences.",
  openGraph: {
    title: "Surender S | Creative Developer",
    description: "Cinematic portfolio of a creative developer and engineer.",
    siteName: "Surender S Portfolio",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col selection:bg-[#0070f3] selection:text-white">
        <Cursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
