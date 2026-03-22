import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NRT — Nigeria Real Time",
  description: "Nigeria's first AI-native 24/7 news network. Breaking news, sports, investigations, and more.",
  keywords: ["Nigeria news", "breaking news", "Africa news", "NRT", "sports", "politics"],
  authors: [{ name: "NRT Newsroom" }],
  openGraph: {
    title: "NRT — Nigeria Real Time",
    description: "Nigeria's first AI-native 24/7 news network.",
    url: "https://nrt.ng",
    siteName: "NRT Nigeria Real Time",
    locale: "en_NG",
    type: "website",
    images: [{ url: "https://nrt.ng/og-image.png", width: 1200, height: 630, alt: "NRT Nigeria Real Time" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRT — Nigeria Real Time",
    description: "Nigeria's first AI-native 24/7 news network.",
    site: "@NRTNigeria",
    images: ["https://nrt.ng/og-image.png"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://nrt.ng"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for faster font load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inter — CNN Sans equivalent | Bebas Neue — NRT logo | JetBrains Mono — data */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=JetBrains+Mono:wght@400;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
