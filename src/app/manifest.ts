import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Curso de Inglês Gratuito",
    short_name: "Inglês Grátis",
    description: "Aprenda inglês gratuitamente, do A1 ao C2.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f8fc",
    theme_color: "#315eea",
    icons: [
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
