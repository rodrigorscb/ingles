import type { Metadata, Viewport } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [{ url: "/brand/curso-ingles-poster.webp", width: 900, height: 900, alt: "Curso de Inglês Gratuito — curso online, interativo e para todas as idades" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: process.env.VERCEL_ENV === "preview" || process.env.NEXT_PUBLIC_NOINDEX === "true" ? { index: false, follow: false } : { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
