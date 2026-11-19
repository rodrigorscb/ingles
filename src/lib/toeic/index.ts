import { buildFamilies, type ExamMeta } from "@/lib/exam-family";
import { toeicTest1 } from "./test-1";
import { toeicTest2 } from "./test-2";
import { toeicTest3 } from "./test-3";
import { toeicTest4 } from "./test-4";
import { toeicTest5 } from "./test-5";

const exams: ExamMeta[] = [
  {
    slug: "toeic-reading",
    exam: "TOEIC Listening & Reading",
    level: "Escala 5–495 (Reading)",
    component: "Reading (Parts 5–7)",
    officialUrl: "https://www.ets.org/toeic/test-takers/about/listening-reading.html",
    duration: 75,
    questionCount: 100,
    format: "100 questões · Reading Parts 5–7 · 75 min",
    durationNote: "A seção de Reading do TOEIC Listening & Reading tem 100 questões em 75 minutos: Part 5 (30 frases incompletas), Part 6 (16 itens de completar textos) e Part 7 (54 questões sobre textos únicos e múltiplos). Na prova oficial, a numeração vai de 101 a 200. A seção de Listening exige áudio e não está incluída.",
    scoringNote: "Questões autorais no formato do TOEIC, sem reprodução de material oficial. A ETS converte os acertos do Reading em uma escala de 5 a 495 com tabelas próprias; o percentual mostrado aqui não equivale a uma pontuação oficial.",
    tests: [toeicTest1, toeicTest2, toeicTest3, toeicTest4, toeicTest5],
  },
];

export const toeicFamilies = buildFamilies(exams, 40000);
