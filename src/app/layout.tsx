import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: "CodiLay — Your Codebase, Finally Understood",
  description:
    "An AI agent that reads your entire codebase and produces living, structured documentation — so any human or AI can understand what's happening, where, and why things connect.",
  keywords: [
    "codebase documentation",
    "AI agent",
    "code understanding",
    "developer tools",
    "documentation generator",
  ],
  openGraph: {
    title: "CodiLay — Your Codebase, Finally Understood",
    description:
      "An AI agent that reads your entire codebase and produces living, structured documentation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen overflow-x-hidden">{children}<Analytics/></body>
    </html>
  );
}