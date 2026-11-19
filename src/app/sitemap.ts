import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { publishedLessons } from "@/lib/published-lessons";
import { articles } from "@/lib/articles";
import { simulations } from "@/lib/simulations";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV === "preview" || process.env.NEXT_PUBLIC_NOINDEX === "true") return [];
  return [
    { url: siteUrl.toString(), changeFrequency: "weekly", priority: 1 },
    { url: new URL("/curso", siteUrl).toString(), changeFrequency: "weekly", priority: 0.9 },
    { url: new URL("/diagnostico", siteUrl).toString(), changeFrequency: "monthly", priority: 0.8 },
    { url: new URL("/simulados", siteUrl).toString(), changeFrequency: "weekly", priority: 0.8 },
    ...simulations.map((simulation) => ({ url: new URL(`/simulados/${simulation.id}`, siteUrl).toString(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...publishedLessons.map((lesson) => ({ url: new URL(`/aula/${lesson.slug}`, siteUrl).toString(), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: new URL("/blog", siteUrl).toString(), changeFrequency: "weekly", priority: 0.8 },
    { url: new URL("/parceiros", siteUrl).toString(), changeFrequency: "monthly", priority: 0.6 },
    { url: new URL("/faq", siteUrl).toString(), changeFrequency: "monthly", priority: 0.6 },
    { url: new URL("/sobre", siteUrl).toString(), changeFrequency: "monthly", priority: 0.6 },
    ...articles.map((article) => ({
      url: new URL(`/blog/${article.slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
