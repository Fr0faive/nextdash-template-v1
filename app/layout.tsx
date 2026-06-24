import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // Replace with your production domain
  title: {
    default: "NextDash - Premium Dashboard Template",
    template: "%s | NextDash",
  },
  description: "A premium, high-performance Next.js dashboard template built with App Router and Tailwind CSS.",
  keywords: ["Next.js", "Dashboard", "Template", "React", "Tailwind CSS", "Admin Panel"],
  authors: [{ name: "NextDash Team" }],
  creator: "NextDash Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "NextDash - Premium Dashboard Template",
    description: "A premium, high-performance Next.js dashboard template built with App Router and Tailwind CSS.",
    siteName: "NextDash",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextDash - Premium Dashboard Template",
    description: "A premium, high-performance Next.js dashboard template built with App Router and Tailwind CSS.",
    creator: "@nextdash",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
