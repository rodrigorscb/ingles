import type { Metadata } from "next";
import Link from "next/link";
import { Diagnostic } from "@/components/diagnostic";
import { JsonLd } from "@/components/json-ld";
import { levels } from "@/lib/course";
import { breadcrumbs } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Teste de Nível de Inglês Grátis e Online (A1 a C2)" },
  description: "Faça um teste de nível de inglês grátis e online, sem cadastro. Descubra por onde começar entre os níveis A1 e C2 do CEFR e siga direto para as aulas indicadas.",
  alternates: { canonical: "/diagnostico" },
  openGraph: { title: "Teste de nível de inglês grátis e online", description: "Sem cadastro: descubra seu ponto de partida entre A1 e C2 e comece pelas aulas certas.", url: "/diagnostico" },
};

const faq: [string, string][] = [
  ["O teste de nível de inglês é gratuito?", "Sim. O teste é gratuito, funciona no navegador e não exige cadastro. Você responde às perguntas e recebe uma sugestão de nível para começar as aulas."],
  ["O resultado vale como certificado?", "Não. O teste é orientativo: ele indica uma faixa inicial para estudar. Certificados oficiais de proficiência vêm de exames como Cambridge, TOEFL, IELTS e TOEIC, que você pode treinar na nossa página de simulados."],
  ["Quanto tempo leva o teste?", "Poucos minutos. As perguntas são curtas e cobrem vocabulário, gramática e compreensão de frases em situações do dia a dia."],
  ["E se eu errar muitas questões?", "Tudo bem. Errar faz parte do diagnóstico: o objetivo é encontrar um ponto de partida confortável, e você pode mudar de nível a qualquer momento."],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
};

export default function DiagnosticPage() {
  return <main className="inner-page"><JsonLd data={[faqSchema, breadcrumbs([["Início", "/"], ["Teste de nível de inglês", "/diagnostico"]])]} /><div className="wrap inner-wrap">
    <div className="inner-heading"><p className="section-kicker">SEU PONTO DE PARTIDA</p><h1>Teste de nível de inglês grátis</h1><p>Um mapa, não uma prova: descubra uma faixa inicial para explorar, sem cadastro. Você não precisa acertar tudo para começar a aprender.</p></div>
    <Diagnostic />
    <section className="seo-copy" aria-labelledby="como-funciona">
      <h2 id="como-funciona">Como funciona o teste de nível</h2>
      <p>O teste apresenta frases curtas em inglês, do nível iniciante ao avançado. A cada resposta, você mostra o que já reconhece de vocabulário, gramática e compreensão. No final, indicamos um nível de referência do CEFR (Quadro Europeu Comum de Referência), a mesma escala usada por Cambridge, IELTS e por muitas escolas, e sugerimos a primeira aula para você começar.</p>
      <p>O resultado é uma orientação, não uma nota. Se as aulas parecerem fáceis demais ou difíceis demais, basta avançar ou voltar uma trilha no <Link href="/curso">curso de inglês grátis</Link>.</p>
      <h2>O que significa cada nível de inglês</h2>
      <dl className="seo-levels">{levels.map((level) => <div key={level.code}><dt><span>{level.code}</span>{level.name}</dt><dd>{level.description}</dd></div>)}</dl>
      <p>Se você quer um certificado internacional, use o resultado para escolher o exame certo: A2 Key e B1 Preliminary para os primeiros níveis, B2 First, C1 Advanced e C2 Proficiency para os mais altos, ou TOEFL, IELTS e TOEIC para estudo e trabalho no exterior. Treine com os <Link href="/simulados">simulados de inglês grátis</Link>, com correção comentada.</p>
      <h2>Perguntas frequentes sobre o teste</h2>
      <div className="seo-faq">{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </div></main>;
}
