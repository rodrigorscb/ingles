import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Você está offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="inner-page">
      <div className="wrap inner-wrap">
        <div className="inner-heading">
          <p className="section-kicker">SEM CONEXÃO</p>
          <h1>Você está offline.</h1>
          <p>Parece que a internet caiu. As páginas que você já abriu podem continuar disponíveis. Quando a conexão voltar, atualize para continuar aprendendo.</p>
        </div>
        <Link className="button button-primary" href="/">Tentar novamente ↗</Link>
      </div>
    </main>
  );
}
