import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhishek S — Full Stack & ML Engineer",
  description:
    "Modern interactive portfolio showcasing projects, certifications, technical journey, and product-focused engineering expertise.",
  keywords: [
    "AI developer portfolio",
    "full stack engineer",
    "Next.js portfolio",
    "interactive portfolio",
    "software engineer",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
