const defaultSiteUrl = "http://localhost:3000";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;

if (process.env.NODE_ENV === "production" && configuredSiteUrl === defaultSiteUrl) {
  throw new Error("Set NEXT_PUBLIC_SITE_URL to the verified production origin before building for production.");
}

export const siteUrl = new URL(configuredSiteUrl);

if (!["http:", "https:"].includes(siteUrl.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
}

if (process.env.NODE_ENV === "production" && !siteUrl.hostname.includes(".")) {
  throw new Error("NEXT_PUBLIC_SITE_URL must use a public, verified hostname in production.");
}

export const siteName = "Curso de Inglês Gratuito";
export const siteDescription =
  "Aprenda inglês gratuitamente com aulas, exercícios de pronúncia e simulados.";
