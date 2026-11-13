import { siteDescription, siteName } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="setup-page">
      <p className="eyebrow">Projeto em preparação</p>
      <h1>{siteName}</h1>
      <p>{siteDescription}</p>
      <p className="setup-note">
        A base técnica está pronta para evoluir. As aulas e a experiência de
        aprendizagem serão construídas nas próximas etapas.
      </p>
    </main>
  );
}
