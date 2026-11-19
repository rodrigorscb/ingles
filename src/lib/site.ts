const defaultSiteUrl = "http://localhost:3000";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;

if (process.env.NODE_ENV === "production" && configuredSiteUrl === defaultSiteUrl) {
  throw new Error("Set NEXT_PUBLIC_SITE_URL to the verified production origin before building for production.");
}

const parsedSiteUrl = new URL(configuredSiteUrl);

if (!["http:", "https:"].includes(parsedSiteUrl.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
}

if (process.env.NODE_ENV === "production" && !parsedSiteUrl.hostname.includes(".")) {
  throw new Error("NEXT_PUBLIC_SITE_URL must use a public, verified hostname in production.");
}

// Vercel serves the site on www and 308-redirects the bare domain to it. Canonicals, the sitemap and
// Open Graph URLs must point at the address that actually answers, so always use the www host.
if (parsedSiteUrl.hostname === "cursoinglesgratis.com.br") {
  parsedSiteUrl.hostname = "www.cursoinglesgratis.com.br";
  parsedSiteUrl.protocol = "https:";
}

export const siteUrl = parsedSiteUrl;

export const siteName = "Curso de Inglês Gratuito";
/** Short brand used in page titles; matches the domain and the most searched phrasing. */
export const siteTitleBrand = "Curso de Inglês Grátis";
export const siteDescription =
  "Curso de inglês grátis e online, do básico ao avançado (A1 a C2): aulas com áudio, exercícios com correção, teste de nível e simulados de ENEM, TOEFL, IELTS, TOEIC e Cambridge.";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

export const organizationId = absoluteUrl("/#organization");
export const websiteId = absoluteUrl("/#website");

/** Provider block reused by Course, LearningResource and Article markup. */
export const organizationRef = { "@type": "Organization", "@id": organizationId, name: siteName, url: absoluteUrl("/") };

export function breadcrumbs(items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, item: absoluteUrl(path) })),
  };
}
