// Service worker do Curso de Inglês Grátis (PWA).
// Estratégia: network-first para navegação (conteúdo sempre fresco, com
// fallback para cache e página offline) e cache-first para assets estáticos.

const VERSION = "v1";
const CACHE = `cig-${VERSION}`;
const OFFLINE_URL = "/offline";
const PRECACHE = ["/", "/offline", "/curso", "/manifest.webmanifest", "/icon-192x192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Nunca cachear rotas de API/autenticação/progresso.
  if (url.pathname.startsWith("/api") || url.pathname.startsWith("/auth")) return;

  // Navegações entre páginas: rede primeiro.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))),
    );
    return;
  }

  // Assets estáticos: cache primeiro.
  const isStatic = url.pathname.startsWith("/_next/static")
    || url.pathname.startsWith("/brand")
    || /\.(?:png|jpg|jpeg|webp|svg|ico|woff2?|ttf)$/.test(url.pathname);
  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cached) => cached
        || fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
          return response;
        }).catch(() => cached)),
    );
  }
});
