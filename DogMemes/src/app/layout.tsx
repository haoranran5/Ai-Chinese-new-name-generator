import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/auth/session-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${
    process.env.NEXT_PUBLIC_BRAND_NAME || "Raven"
  } - Modern Website Template`,
  description: `A modern website template built with component-based UI architecture for ${
    process.env.NEXT_PUBLIC_BRAND_NAME || "Raven"
  }`,
  keywords:
    "website template, component UI, modern website, SaaS template, responsive design, React, Next.js",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_WEB_URL || "https://www.raven.com"
  ),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <Toaster />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
