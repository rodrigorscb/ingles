import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = { title: "Caderno de aprendizagem", description: "Guias práticos de inglês: gramática, vocabulário, pronúncia e estudo para diferentes níveis.", alternates: { canonical: "/blog" }, openGraph: { title: "Caderno de aprendizagem", description: "Guias práticos de inglês: gramática, vocabulário, pronúncia e estudo para diferentes níveis.", url: "/blog" } };

export default function BlogPage() {
  return <main className="inner-page"><div className="wrap inner-wrap"><div className="inner-heading"><p className="section-kicker">CADERNO DE APRENDIZAGEM</p><h1>Pequenas ideias.<br/>Novas possibilidades.</h1><p>Guias práticos para dúvidas reais de quem aprende inglês — de frases para começar a conversar a explicações de gramática, vocabulário, leitura e pronúncia. Cada artigo responde a um tema específico com exemplos e passos para praticar.</p></div><div className="blog-list">{articles.map((article, index) => <Link href={`/blog/${article.slug}`} className={`blog-row blog-${index + 1}`} key={article.slug}><span className="blog-icon">{article.icon}</span><div><span className="blog-category">{article.category} · {article.time}</span><h2>{article.title}</h2><p>{article.excerpt}</p></div><span className="blog-arrow">↗</span></Link>)}</div><p className="draft-notice">Os artigos são materiais educativos introdutórios. Consulte exemplos e fontes de referência ao aprofundar seus estudos.</p></div></main>;
}
