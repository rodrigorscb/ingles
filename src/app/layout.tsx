import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { absoluteUrl, organizationId, siteDescription, siteName, siteTitleBrand, siteUrl, websiteId } from "@/lib/site";
import "./globals.css";

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": organizationId,
      name: siteName,
      alternateName: siteTitleBrand,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/brand/curso-ingles-logo.jpg"),
      description: siteDescription,
      areaServed: "BR",
      knowsLanguage: ["pt-BR", "en"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteName,
      alternateName: siteTitleBrand,
      url: absoluteUrl("/"),
      inLanguage: "pt-BR",
      publisher: { "@id": organizationId },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/buscar")}?q={search_term_string}` }, "query-input": "required name=search_term_string" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteTitleBrand} Online: do Básico ao Avançado`,
    template: `%s | ${siteTitleBrand}`,
  },
  description: siteDescription,
  applicationName: siteName,
  category: "education",
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
      <body><JsonLd data={siteGraph} /><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
