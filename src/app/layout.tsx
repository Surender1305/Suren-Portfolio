import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surender S | Creative Developer & Flutter Engineer",
  description:
    "Portfolio of Surender S — Creative Developer, Flutter Engineer, Full Stack Developer, and AI Product Engineer based in Puducherry, India. Building premium digital experiences.",
  keywords: [
    "Surender S",
    "Creative Developer",
    "Flutter Developer",
    "Full Stack Developer",
    "AI Product Engineer",
    "Portfolio",
    "Puducherry",
    "India",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Surender S" }],
  creator: "Surender S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://surender.dev",
    title: "Surender S | Creative Developer & Flutter Engineer",
    description:
      "Building premium digital experiences. Flutter, Full Stack, AI-powered products.",
    siteName: "Surender S Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Surender S — Creative Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surender S | Creative Developer",
    description:
      "Building premium digital experiences. Flutter, Full Stack, AI-powered products.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#121212" />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
