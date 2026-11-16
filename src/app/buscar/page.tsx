import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { searchableItems } from "@/lib/search";

export const metadata: Metadata = { title: "Busca", robots: { index: false, follow: true } };
type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  if (!query) notFound();
  const normalized = query.toLocaleLowerCase("pt-BR");
  const results = searchableItems.filter((item) => `${item.title} ${item.description} ${item.keywords}`.toLocaleLowerCase("pt-BR").includes(normalized));
  return <main className="inner-page"><div className="wrap inner-wrap"><div className="inner-heading"><p className="section-kicker">BUSCA DO SITE</p><h1>Resultados para<br/>“{query}”.</h1><p>{results.length ? `${results.length} resultado${results.length === 1 ? "" : "s"} encontrado${results.length === 1 ? "" : "s"}.` : "Nenhum resultado por enquanto. Experimente “A1”, “pronúncia” ou “diagnóstico”."}</p></div><div className="search-results">{results.map((item) => <Link href={item.href} key={item.href + item.title}><span>{item.title}</span><p>{item.description}</p><b>↗</b></Link>)}</div></div></main>;
}
