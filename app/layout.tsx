import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingActions from "@/components/floating-actions";
import PageBackdrop from "@/components/page-backdrop";
import SiteFooter from "@/components/site-footer";
import Splash from "@/components/splash";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  weight: "100 900",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  weight: "100 900",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Riichi Rusdiana", url: siteUrl }],
  creator: "Riichi Rusdiana",
  keywords: [
    "Riichi Rusdiana",
    "Sabily Rusyda",
    "web developer",
    "interface design",
    "TypeScript",
    "Go",
    "Linux",
    "East Java",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
    url: "/",
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/web/icon.svg", type: "image/svg+xml" },
      { url: "/web/favicon.ico", sizes: "16x16 32x32", type: "image/x-icon" },
    ],
    apple: "/web/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <PageBackdrop />
          {children}
          <SiteFooter />
          <FloatingActions />
          <Splash />
        </ThemeProvider>
      </body>
    </html>
  );
}
