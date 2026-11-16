"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SiteSearch({ mobile = false }: { mobile?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value) router.push(`/buscar?q=${encodeURIComponent(value)}`);
  }
  return <form className={mobile ? "site-search mobile-search" : "site-search"} role="search" onSubmit={submit}><label className="sr-only" htmlFor={mobile ? "mobile-site-search" : "site-search-input"}>Buscar aulas e artigos</label><span aria-hidden="true">⌕</span><input id={mobile ? "mobile-site-search" : "site-search-input"} type="search" placeholder="Buscar aulas e artigos" value={query} onChange={(event) => setQuery(event.target.value)} /><button type="submit" aria-label="Buscar">↗</button></form>;
}
