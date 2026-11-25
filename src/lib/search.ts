import { articles } from "@/lib/articles";
import { levels } from "@/lib/course";
import { publishedLessons } from "@/lib/published-lessons";
import { simulationsByFamily } from "@/lib/simulations";

export const searchableItems = [
  { title: "Curso de inglês do A1 ao C2", description: "Explore a trilha de aprendizagem por níveis CEFR.", href: "/curso", keywords: "curso nível inglês aulas módulo" },
  ...publishedLessons.map((lesson) => ({ title: `Aula: ${lesson.title}`, description: lesson.objective, href: `/aula/${lesson.slug}`, keywords: `${lesson.focus} ${lesson.subtitle} inglês prática` })),
  { title: "Diagnóstico gratuito de nível", description: "Faça um teste orientativo e receba uma sugestão inicial.", href: "/diagnostico", keywords: "teste diagnóstico nível prova conhecimento" },
  ...simulationsByFamily.map((family) => ({ title: `Simulados: ${family.title}`, description: `${family.simulations.length} simulados de ${family.component}, nível ${family.level}, com correção comentada.`, href: `/simulados#${family.key}`, keywords: `simulado ${family.title} ${family.component} prova inglês questões gabarito cambridge certificado` })),
  { title: "Perguntas frequentes", description: "Saiba mais sobre gratuidade, níveis e pronúncia.", href: "/faq", keywords: "dúvidas faq gratuito" },
  { title: "Parcerias", description: "Possibilidades de colaboração com educadores e escolas.", href: "/parceiros", keywords: "escola educadores parceiros comunidade" },
  ...levels.map((level) => ({ title: `Nível ${level.code}: ${level.name}`, description: level.description, href: `/curso#${level.code.toLowerCase()}`, keywords: level.code })),
  ...articles.map((article) => ({ title: article.title, description: article.excerpt, href: `/blog/${article.slug}`, keywords: `${article.category} ${article.keywords?.join(" ") ?? ""}` })),
];
