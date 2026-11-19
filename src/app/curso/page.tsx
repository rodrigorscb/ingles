import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbs, organizationRef } from "@/lib/site";
import { a1Modules, a2Modules, b1Modules, b2Modules, c1PublishedModules, c2Modules, levels, fullCourseRoadmap, publishedRoadmapLessons } from "@/lib/course";

export const metadata: Metadata = { title: { absolute: "Curso de Inglês Online Grátis do A1 ao C2: Todas as Aulas" }, description: "Curso de inglês online e grátis do iniciante (A1) ao avançado (C2): mais de 200 aulas em módulos, com áudio, exercícios corrigidos e níveis CEFR.", alternates: { canonical: "/curso" }, openGraph: { title: "Curso de inglês online grátis do A1 ao C2", description: "Mais de 200 aulas gratuitas em módulos, do iniciante ao avançado, com áudio e exercícios corrigidos.", url: "/curso" } };

const levelModules = { A1: a1Modules, A2: a2Modules, B1: b1Modules, B2: b2Modules, C1: c1PublishedModules, C2: c2Modules } as const;

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Curso de inglês grátis do A1 ao C2",
  itemListElement: levels.map((level, index) => {
    const lessons = levelModules[level.code as keyof typeof levelModules].flatMap((module) => module.lessons);
    const minutes = lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        "@id": absoluteUrl(`/curso#${level.code.toLowerCase()}`),
        url: absoluteUrl(`/curso#${level.code.toLowerCase()}`),
        name: `Curso de inglês ${level.code} grátis: ${level.name}`,
        description: `${level.description} ${lessons.length} aulas online gratuitas no nível ${level.code} do CEFR, com áudio e exercícios corrigidos.`,
        inLanguage: "pt-BR",
        educationalLevel: `CEFR ${level.code}`,
        teaches: `Inglês nível ${level.code}`,
        isAccessibleForFree: true,
        provider: organizationRef,
        offers: { "@type": "Offer", category: "Free", price: 0, priceCurrency: "BRL" },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: `PT${Math.max(1, Math.round(minutes / 60))}H` },
      },
    };
  }),
};

export default function CoursePage() {
  const totalLessons = a1Modules.reduce((count, module) => count + module.lessons.length, 0);
  const totalMinutes = a1Modules.reduce((count, module) => count + module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0), 0);
  return <main className="inner-page"><JsonLd data={[courseSchema, breadcrumbs([["Início", "/"], ["Curso de inglês", "/curso"]])]} /><div className="wrap inner-wrap"><div className="inner-heading"><p className="section-kicker">SUA TRILHA DE INGLÊS</p><h1>Curso de inglês grátis do A1 ao C2</h1><p>Um próximo passo claro: as seis trilhas, do iniciante ao avançado, têm aulas completas disponíveis. Cada aula traz frases com áudio, explicação de gramática em português e exercícios com correção. Explore os módulos e avance na sequência que combina com seu percurso.</p></div>
    <section className="course-featured" aria-labelledby="module-title"><div className="featured-copy"><span className="featured-level">A1 · TRILHA INICIANTE</span><h2 id="module-title">Comece a conversar.</h2><p>Aprenda a se apresentar, falar de lugares e contar sobre sua rotina — no seu ritmo, com prática em cada etapa.</p><div className="featured-meta"><span>{totalLessons} aulas A1</span><span>cerca de {totalMinutes} minutos</span><span>iniciante</span></div><Link className="button button-primary" href={`/aula/${a1Modules[0].lessons[0].slug}`}>Começar pela primeira aula <span>↗</span></Link></div><div className="featured-note" aria-label="Exemplo de conversa"><span>UMA CONVERSA COMEÇA ASSIM</span><p>“Hi, I’m Maya.<br/>Where are you from?”</p><small>Oi, eu sou Maya. De onde você é?</small></div></section>
    {[["A1", a1Modules], ["A2", a2Modules], ["B1", b1Modules], ["B2", b2Modules], ["C1", c1PublishedModules], ["C2", c2Modules]].flatMap(([levelCode, modules]) => (modules as typeof a1Modules).map((module, moduleIndex) => ({ levelCode: levelCode as string, module, moduleIndex }))).map(({ levelCode, module, moduleIndex }) => <section id={moduleIndex === 0 ? levelCode.toLowerCase() : `${levelCode.toLowerCase()}-${module.id}`} className="module-outline" aria-labelledby={`module-${module.id}`} key={module.id}><div className="module-heading"><div><p className="section-kicker">MÓDULO {String(moduleIndex + 1).padStart(2, "0")} · {levelCode}</p><h2 id={`module-${module.id}`}>{module.title}</h2><p className="module-subtitle">{module.subtitle}</p></div><span className="module-count">{module.lessons.length} aulas · {module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)} min</span></div><ol className="course-lessons">{module.lessons.map((lesson, index) => <li key={lesson.id}><Link href={`/aula/${lesson.slug}`} className="course-lesson-link"><span className="course-lesson-number">{String(index + 1).padStart(2, "0")}</span><span className="course-lesson-copy"><b>{lesson.title}</b><small>{lesson.subtitle}</small></span><span className="course-lesson-time">{lesson.duration} min</span><span className="course-lesson-open" aria-hidden="true">↗</span></Link></li>)}</ol></section>)}
    <section className="roadmap-next"><div><p className="section-kicker">O MAPA COMPLETO</p><h2>Uma referência para cada etapa.</h2><p>O percurso completo está publicado: explore as aulas de cada nível, acompanhe sua sequência e pratique cada habilidade.</p><p className="roadmap-summary">{publishedRoadmapLessons.length} aulas disponíveis · {fullCourseRoadmap.reduce((count, level) => count + level.modules.reduce((sum, module) => sum + module.chapters.reduce((chapterCount, item) => chapterCount + item.lessons.length, 0), 0), 0) - publishedRoadmapLessons.length} em desenvolvimento</p></div><div className="roadmap-levels roadmap-levels-detailed">{fullCourseRoadmap.map((level) => { const levelInfo = levels.find((item) => item.code === level.code)!; const available = level.modules.reduce((count, module) => count + module.chapters.reduce((sum, item) => sum + item.lessons.filter((lesson) => lesson.status === "available").length, 0), 0); const total = level.modules.reduce((count, module) => count + module.chapters.reduce((sum, item) => sum + item.lessons.length, 0), 0); return <details className={available ? "roadmap-level available" : "roadmap-level"} id={level.code.toLowerCase()} key={level.code}><summary><span className={`level-code level-${levelInfo.color}`}>{level.code}</span><span className="roadmap-level-copy"><b>{levelInfo.name}</b><small>{available === total ? `${total} aulas publicadas` : `${available} disponíveis · ${total - available} em breve`}</small></span><span className="roadmap-toggle" aria-hidden="true">+</span></summary><div className="roadmap-modules">{level.modules.map((module, moduleIndex) => <section className="roadmap-module" key={module.id}><h3><span>Módulo {String(moduleIndex + 1).padStart(2, "0")}</span>{module.title}</h3><p>{module.objective}</p>{module.chapters.map((item) => <div className="roadmap-chapter" key={item.id}><h4>{item.title}</h4><p>{item.objective}</p><ol>{item.lessons.map((lesson) => { const published = lesson.status === "available"; return <li key={lesson.id}>{published ? <Link href={`/aula/${lesson.slug}`}><b>{lesson.title}</b><span>{lesson.objective}</span></Link> : <div className="roadmap-coming"><b>{lesson.title}</b><span>{lesson.objective}</span><small>Em breve</small></div>}</li>; })}</ol></div>)}</section>)}</div></details>; })}</div></section>
    <p className="course-note">O diagnóstico é orientativo e não substitui uma avaliação oficial de proficiência CEFR.</p>
  </div></main>;
}
