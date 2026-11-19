import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article ? { title: article.title, description: article.excerpt, alternates: { canonical: `/blog/${article.slug}` }, keywords: article.keywords, openGraph: { type: "article", title: article.title, description: article.excerpt, url: `/blog/${article.slug}` } } : { title: "Artigo não encontrado", robots: { index: false, follow: false } };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return <main className="inner-page article-detail"><div className="wrap inner-wrap"><Link className="back-link" href="/blog">← Voltar ao caderno</Link><article><span className="blog-category">{article.category} · {article.time}</span><h1>{article.title}</h1><p className="article-dek">{article.excerpt}</p><div className="article-body">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{article.sections?.map((section) => <section className="article-section" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.examples && <ul className="article-examples">{section.examples.map((example) => { const source = example.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/); return <li key={example}>{source ? <a href={source[2]} target="_blank" rel="noopener noreferrer">{source[1]}</a> : example}</li>; })}</ul>}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{section.links && <ul className="article-source-links">{section.links.map((link) => <li key={link.url}><a href={link.url} target={link.url.startsWith("http") ? "_blank" : undefined} rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}>{link.label}</a></li>)}</ul>}</section>)}</div><aside className="editorial-note">Este material é educativo e introdutório. Os níveis e exercícios da plataforma não representam certificação oficial.</aside></article></div></main>;
}
