import { buildFamilies, type ExamMeta } from "@/lib/exam-family";
import { itpTestsA } from "./itp-a";
import { itpTestsB } from "./itp-b";
import { ibtTests } from "./ibt";

const exams: ExamMeta[] = [
  {
    slug: "toefl-ibt-reading",
    exam: "TOEFL iBT (formato 2026)",
    level: "Escala 1–6 (CEFR A1–C2)",
    component: "Reading: Complete the Words, Read in Daily Life e Read an Academic Passage",
    officialUrl: "https://www.ets.org/toefl/test-takers/ibt/about/content.html",
    duration: 30,
    questionCount: 50,
    format: "50 questões · Reading (formato 2026) · tempo sugerido: 30 min",
    durationNote: "Desde 21 de janeiro de 2026, a seção de Reading do TOEFL iBT dura cerca de 30 minutos e reúne três tarefas: Complete the Words (completar palavras), Read in Daily Life (textos curtos do cotidiano) e Read an Academic Passage (texto acadêmico). Na prova real a seção é adaptativa e o número de itens varia conforme o desempenho; este simulado usa uma versão fixa de 50 itens para treino. Listening, Writing e Speaking não estão incluídos.",
    scoringNote: "Questões autorais no formato do TOEFL iBT, sem reprodução de material oficial. A prova real é adaptativa e informa o resultado em uma escala de 1 a 6 (com correspondência ao CEFR); como este simulado tem formato fixo e não inclui as outras seções, o percentual mostrado não equivale a uma nota oficial.",
    tests: ibtTests,
  },
  {
    slug: "toefl-itp-level-1",
    exam: "TOEFL ITP Level 1",
    level: "Intermediário a avançado (B1–C1)",
    component: "Structure and Written Expression + Reading Comprehension",
    officialUrl: "https://www.ets.org/toefl/itp/test-content.html",
    duration: 80,
    questionCount: 90,
    format: "90 questões · Structure (40) + Reading (50) · tempo sugerido: 1h20",
    durationNote: "O TOEFL ITP Level 1 tem três seções: Listening Comprehension (50 questões, 35 min), Structure and Written Expression (40 questões, 25 min) e Reading Comprehension (50 questões, 55 min). Este simulado traz as duas seções escritas, com o tempo oficial somado (80 minutos). A seção de Listening exige áudio e não está incluída.",
    scoringNote: "Questões autorais no formato do TOEFL ITP, sem reprodução de material oficial. O ITP converte os acertos de cada seção em uma escala própria (total de 310 a 677) usando tabelas da ETS; como este simulado não inclui Listening, o percentual mostrado não equivale a uma pontuação oficial.",
    tests: [...itpTestsA, ...itpTestsB],
  },
];

export const toeflFamilies = buildFamilies(exams, 30000);
