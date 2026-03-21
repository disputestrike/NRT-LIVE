import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NRT — Nigeria Real Time",
  description: "Nigeria's first AI-native 24/7 news network. Breaking news, sports, investigations, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
