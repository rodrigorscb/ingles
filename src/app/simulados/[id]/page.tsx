import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { examSearchLabel, getSimulation, simulationParts, simulations, simulationsByFamily, type Simulation } from "@/lib/simulations";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbs, organizationRef } from "@/lib/site";
import { SimulationRunner } from "@/components/simulation-runner";

type Props = { params: Promise<{ id: string }> };

const formatDuration = (minutes: number) => (minutes >= 60 ? `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, "0")}` : `${minutes} min`);

function seo(simulation: Simulation) {
  const label = examSearchLabel(simulation);
  const { number, theme } = simulationParts(simulation);
  const heading = `Simulado ${label} ${number}: ${theme}`;
  const title = `Simulado ${label} Grátis ${number}: ${theme}`;
  const full = `Simulado de ${label} grátis e online, prova ${number}: ${theme.toLowerCase()}. ${simulation.questions.length} questões no formato oficial, tempo sugerido de ${formatDuration(simulation.duration)} e correção comentada.`;
  const description = full.length > 160 ? `${full.slice(0, 157).replace(/\s+\S*$/, "")}…` : full;
  return { label, number, theme, heading, title, description };
}

export function generateStaticParams() { return simulations.map(({ id }) => ({ id })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const simulation = getSimulation(id);
  if (!simulation) return { title: "Simulado não encontrado", robots: { index: false, follow: false } };
  const meta = seo(simulation);
  return { title: { absolute: meta.title }, description: meta.description, alternates: { canonical: `/simulados/${simulation.id}` }, openGraph: { title: meta.title, description: meta.description, url: `/simulados/${simulation.id}` } };
}

export default async function SimulationPage({ params }: Props) {
  const { id } = await params;
  const simulation = getSimulation(id);
  if (!simulation) notFound();
  const meta = seo(simulation);
  const siblings = (simulationsByFamily.find((family) => family.simulations.some((item) => item.id === simulation.id))?.simulations ?? []).filter((item) => item.id !== simulation.id);
  const resource = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: meta.heading,
    description: meta.description,
    url: absoluteUrl(`/simulados/${simulation.id}`),
    inLanguage: ["pt-BR", "en"],
    learningResourceType: "Practice test",
    educationalUse: "assessment",
    educationalLevel: simulation.level,
    timeRequired: `PT${simulation.duration}M`,
    isAccessibleForFree: true,
    about: { "@type": "Thing", name: meta.label },
    provider: organizationRef,
  };
  return <main className="inner-page simulations-page"><JsonLd data={[resource, breadcrumbs([["Início", "/"], ["Simulados de inglês", "/simulados"], [meta.heading, `/simulados/${simulation.id}`]])]} /><div className="wrap inner-wrap simulation-detail-wrap">
    <Link className="back-link" href="/simulados">← Todos os simulados</Link>
    <header className="simulation-detail-heading"><div className="simulation-detail-level"><span>{simulation.exam}</span><span>{simulation.level}</span></div><h1>{meta.heading}</h1><p>{simulation.subtitle}</p><div className="simulation-facts"><span>{simulation.questions.length} questões autorais · {simulation.format}</span><span>tempo sugerido: {simulation.duration >= 60 ? `${Math.floor(simulation.duration / 60)}h${String(simulation.duration % 60).padStart(2, "0")}` : `${simulation.duration} min`}</span><span>cronômetro opcional · correção comentada</span></div></header>
    <section className="simulation-instructions"><h2>Como é a prova {meta.label}</h2><p>{simulation.durationNote}</p><h2>Antes de começar</h2><p>{simulation.scoringNote}</p><a href={simulation.officialUrl} target="_blank" rel="noopener noreferrer">{simulation.officialLabel} <span aria-hidden="true">↗</span></a></section>
    <SimulationRunner simulation={simulation}/>
    {siblings.length > 0 && <nav className="simulation-siblings" aria-labelledby="outros-simulados"><h2 id="outros-simulados">Outros simulados de {meta.label}</h2><ul>{siblings.map((item) => <li key={item.id}><Link href={`/simulados/${item.id}`}>Simulado {simulationParts(item).number}: {simulationParts(item).theme}</Link></li>)}</ul><Link className="text-link" href="/simulados">Ver todos os simulados de inglês grátis <b>↗</b></Link></nav>}
  </div></main>;
}
