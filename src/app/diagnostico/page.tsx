import type { Metadata } from "next";
import { Diagnostic } from "@/components/diagnostic";

export const metadata: Metadata = { title: "Diagnóstico de nível", description: "Faça um diagnóstico gratuito e orientativo para escolher um nível inicial de inglês.", alternates: { canonical: "/diagnostico" }, openGraph: { url: "/diagnostico" } };

export default function DiagnosticPage() {
  return <main className="inner-page"><div className="wrap inner-wrap"><div className="inner-heading"><p className="section-kicker">SEU PONTO DE PARTIDA</p><h1>Um mapa, não uma prova.</h1><p>Descubra uma faixa inicial para explorar. Você não precisa acertar tudo para começar a aprender.</p></div><Diagnostic /></div></main>;
}
