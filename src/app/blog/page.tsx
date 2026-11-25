import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs } from "@/lib/site";

export const metadata: Metadata = { title: { absolute: "Dicas de Inglês Grátis: Gramática, Vocabulário e Pronúncia" }, description: "Guias gratuitos para aprender inglês: gramática com exemplos, vocabulário do dia a dia, pronúncia para brasileiros, rotina de estudos e dicas para exames.", alternates: { canonical: "/blog" }, openGraph: { title: "Dicas de inglês: gramática, vocabulário e pronúncia", description: "Guias gratuitos com exemplos e tradução para aprender inglês no seu ritmo.", url: "/blog" } };

export default function BlogPage() {
  return <main className="inner-page"><JsonLd data={breadcrumbs([["Início", "/"], ["Dicas de inglês", "/blog"]])} /><div className="wrap inner-wrap"><div className="inner-heading"><p className="section-kicker">CADERNO DE APRENDIZAGEM</p><h1>Dicas de inglês<br/>para aprender no seu ritmo</h1><p>Guias práticos para dúvidas reais de quem aprende inglês — de frases para começar a conversar a explicações de gramática, vocabulário, leitura, pronúncia e exames de certificação. Cada artigo responde a um tema específico com exemplos, fontes e próximos passos.</p></div><div className="blog-list">{articles.map((article, index) => <Link href={`/blog/${article.slug}`} className={`blog-row blog-${index + 1}`} key={article.slug}><span className="blog-icon">{article.icon}</span><div><span className="blog-category">{article.category} · {article.time}</span><h2>{article.title}</h2><p>{article.excerpt}</p></div><span className="blog-arrow">↗</span></Link>)}</div><p className="draft-notice">Os artigos são materiais educativos introdutórios. Consulte exemplos e fontes de referência ao aprofundar seus estudos.</p></div></main>;
}
