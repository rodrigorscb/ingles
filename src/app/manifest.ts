import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Curso de Inglês Grátis — do A1 ao C2",
    short_name: "Inglês Grátis",
    description: "Aprenda inglês de graça, do A1 ao C2: aulas com áudio, exercícios, teste de nível e simulados.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["education"],
    background_color: "#f5f8fc",
    theme_color: "#0a2463",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Continuar o curso", short_name: "Curso", url: "/curso" },
      { name: "Teste de nível", short_name: "Diagnóstico", url: "/diagnostico" },
      { name: "Simulados", short_name: "Simulados", url: "/simulados" },
    ],
  };
}
