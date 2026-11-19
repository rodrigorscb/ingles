import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSimulation, simulations } from "@/lib/simulations";
import { SimulationRunner } from "@/components/simulation-runner";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() { return simulations.map(({ id }) => ({ id })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const simulation = getSimulation(id);
  if (!simulation) return { title: "Simulado não encontrado", robots: { index: false, follow: false } };
  return { title: `${simulation.exam}: ${simulation.title}`, description: simulation.subtitle, alternates: { canonical: `/simulados/${simulation.id}` }, openGraph: { title: `${simulation.exam}: ${simulation.title}`, description: simulation.subtitle, url: `/simulados/${simulation.id}` } };
}

export default async function SimulationPage({ params }: Props) {
  const { id } = await params;
  const simulation = getSimulation(id);
  if (!simulation) notFound();
  return <main className="inner-page simulations-page"><div className="wrap inner-wrap simulation-detail-wrap">
    <Link className="back-link" href="/simulados">← Todos os simulados</Link>
    <header className="simulation-detail-heading"><div className="simulation-detail-level"><span>{simulation.exam}</span><span>{simulation.level}</span></div><h1>{simulation.title}</h1><p>{simulation.subtitle}</p><div className="simulation-facts"><span>{simulation.questions.length} questões autorais · {simulation.format}</span><span>tempo sugerido: {simulation.duration >= 60 ? `${Math.floor(simulation.duration / 60)}h${String(simulation.duration % 60).padStart(2, "0")}` : `${simulation.duration} min`}</span><span>cronômetro opcional · correção comentada</span></div></header>
    <section className="simulation-instructions"><h2>Antes de começar</h2><p>{simulation.scoringNote}</p><a href={simulation.officialUrl} target="_blank" rel="noopener noreferrer">{simulation.officialLabel} <span aria-hidden="true">↗</span></a></section>
    <SimulationRunner simulation={simulation}/>
  </div></main>;
}
