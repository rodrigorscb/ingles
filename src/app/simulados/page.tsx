import type { Metadata } from "next";
import Link from "next/link";
import { simulationsByFamily } from "@/lib/simulations";

const totalSimulations = simulationsByFamily.reduce((sum, family) => sum + family.simulations.length, 0);

export const metadata: Metadata = {
  title: "Simulados de inglês grátis: ENEM, Cambridge, IELTS, TOEFL e TOEIC",
  description: "Simulados gratuitos de inglês no formato do ENEM, das provas Cambridge (KET, PET, FCE, CAE e CPE), do IELTS Academic e General Training do TOEFL iBT e ITP e do TOEIC Reading, com cronômetro opcional e correção comentada em português.",
  alternates: { canonical: "/simulados" },
  openGraph: { title: "Simulados de inglês: ENEM, Cambridge, IELTS, TOEFL e TOEIC", description: "Questões autorais no formato real das provas, cronômetro opcional e correção comentada.", url: "/simulados" },
};

function cardTheme(title: string) {
  return title.replace(/^(Simulado|Caderno)\s+\d+\s*·\s*/, "");
}

function formatDuration(minutes: number) {
  return minutes >= 60 ? `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, "0")}` : `${minutes} min`;
}

export default function SimuladosPage() {
  return <main className="inner-page simulations-page"><div className="wrap inner-wrap">
    <header className="simulations-hero"><div className="simulations-hero-copy"><p className="section-kicker">PRÁTICA COM DEVOLUTIVA</p><h1>Uma prova de cada vez.<br/>Uma ideia mais clara do seu próximo passo.</h1><p>{totalSimulations} simulados gratuitos no formato do ENEM, das provas Cambridge (do A2 Key ao C2 Proficiency), do IELTS, do TOEFL e do TOEIC. Cada um segue a estrutura e a quantidade de questões da prova real, com tempo sugerido, cronômetro opcional e correção comentada em português.</p><a className="button button-primary" href="#provas">Escolher um simulado <span aria-hidden="true">↓</span></a></div><div className="simulations-scorecard" aria-label="Como funciona a prática"><div className="scorecard-mark">A—D</div><p>Leia com atenção.<br/><b>Escolha com intenção.</b></p><span>Respostas comentadas no final.</span></div></header>
    <section className="simulation-library" id="provas"><div className="simulation-library-heading"><div><p className="section-kicker">ESCOLHA SEU TREINO</p><h2>Práticas por exame e nível</h2></div><p>Todas as questões são autorais: seguem o formato oficial, mas não são itens oficiais nem reproduções de provas do Inep, da Cambridge, do IELTS ou da ETS.</p></div><div className="simulation-library-families">{simulationsByFamily.map((family, familyIndex) => { const first = family.simulations[0]; return <section className={`simulation-family family-tone-${familyIndex % 6}`} key={family.key} id={family.key}>
      <div className="simulation-family-heading"><div><h3>{family.title}</h3><p>{family.component} · {family.level}</p></div><div className="simulation-family-meta">{first && <><span>{first.questions.length} questões</span><span>{formatDuration(first.duration)}</span></>}<span>{family.simulations.length} provas</span><a href={family.officialUrl} target="_blank" rel="noopener noreferrer">Formato oficial ↗</a></div></div>
      <div className="simulation-cards">{family.simulations.map((simulation, index) => <Link className="sim-card" href={`/simulados/${simulation.id}`} key={simulation.id} aria-label={`${simulation.exam}, prova ${index + 1}: ${cardTheme(simulation.title)}`}>
        <span className="sim-card-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="sim-card-kicker">Prova {index + 1} de {family.simulations.length}</span>
        <h4>{cardTheme(simulation.title)}</h4>
        <span className="sim-card-meta"><span>{simulation.questions.length} questões</span><span>{formatDuration(simulation.duration)}</span></span>
        <span className="sim-card-cta">Começar <span aria-hidden="true">→</span></span>
      </Link>)}</div>
    </section>; })}</div></section>
    <aside className="simulation-integrity"><span aria-hidden="true">i</span><p><b>Sobre o ENEM</b> — a prova oficial tem cinco questões de língua estrangeira (Inglês ou Espanhol), além das demais áreas e da redação. Os cadernos de 50 itens são prática ampliada, no mesmo formato das questões do exame. O ENEM usa TRI; o percentual de acertos aqui não prevê nota, classificação ou ingresso.</p></aside>
    <aside className="simulation-integrity"><span aria-hidden="true">i</span><p><b>Sobre as provas Cambridge</b> — os simulados cobrem o paper de Reading (A2 Key e B1 Preliminary) ou de Reading and Use of English (B2 First, C1 Advanced e C2 Proficiency), com o mesmo número de partes e questões da prova oficial. Writing, Listening e Speaking não estão incluídos. Aqui cada item vale 1 ponto; a Cambridge pondera as partes e converte o resultado para a Cambridge English Scale, então o percentual não é uma nota oficial.</p></aside>
    <aside className="simulation-integrity"><span aria-hidden="true">i</span><p><b>Sobre IELTS e TOEFL</b> — os simulados de IELTS (Academic e General Training) reproduzem o Reading completo, com 40 questões em 60 minutos. O TOEFL ITP Level 1 traz as seções Structure and Written Expression e Reading (90 questões). O TOEFL iBT segue o formato de Reading adotado em 2026; como a prova real é adaptativa, usamos uma versão fixa de 50 itens. As seções de Listening, Writing e Speaking não estão incluídas, e nenhum percentual daqui equivale a uma banda ou pontuação oficial.</p></aside>
    <aside className="simulation-integrity"><span aria-hidden="true">i</span><p><b>Sobre o TOEIC</b> — os simulados reproduzem a seção de Reading do TOEIC Listening &amp; Reading: 100 questões em 75 minutos, nas Parts 5, 6 e 7 (frases incompletas, textos para completar e leitura de textos únicos e múltiplos). Aqui as questões vão de 1 a 100; na prova oficial, de 101 a 200. A seção de Listening não está incluída, e o percentual não equivale à escala oficial de 5 a 495.</p></aside>
  </div></main>;
}
