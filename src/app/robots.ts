import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview" || process.env.NEXT_PUBLIC_NOINDEX === "true") {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/progresso/", "/admin/", "/conta/", "/api/", "/auth/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
