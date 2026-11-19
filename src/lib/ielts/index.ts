import { buildFamilies, type ExamMeta } from "@/lib/exam-family";
import { ieltsAcademicTests } from "./academic";
import { ieltsGeneralTests } from "./general";

const scoringNote = "Questões autorais no formato do IELTS, sem reprodução de material oficial. O IELTS converte o número de acertos (de 0 a 40) em uma banda de 1 a 9 usando tabelas que variam de prova para prova; por isso, o resultado aqui mostra apenas acertos e percentual, sem estimar banda oficial.";

const exams: ExamMeta[] = [
  {
    slug: "ielts-academic",
    exam: "IELTS Academic",
    level: "Bandas 1–9",
    component: "Reading (3 textos acadêmicos)",
    officialUrl: "https://ielts.org/take-a-test/test-types/ielts-academic-test",
    duration: 60,
    questionCount: 40,
    format: "40 questões · Reading · 60 min",
    durationNote: "O Reading do IELTS Academic tem 3 textos longos e 40 questões, em 60 minutos, sem tempo extra para transferir respostas na versão em computador. As respostas digitadas devem respeitar o limite de palavras indicado em cada instrução. Listening, Writing e Speaking não fazem parte deste treino.",
    scoringNote,
    tests: ieltsAcademicTests,
  },
  {
    slug: "ielts-general-training",
    exam: "IELTS General Training",
    level: "Bandas 1–9",
    component: "Reading (textos do cotidiano e do trabalho)",
    officialUrl: "https://ielts.org/take-a-test/test-types/ielts-general-training-test",
    duration: 60,
    questionCount: 40,
    format: "40 questões · Reading · 60 min",
    durationNote: "O Reading do IELTS General Training tem 40 questões em 60 minutos, divididas em três seções: textos curtos do dia a dia, dois textos sobre trabalho e um texto mais longo de interesse geral. As respostas digitadas devem respeitar o limite de palavras de cada instrução. Listening, Writing e Speaking não fazem parte deste treino.",
    scoringNote,
    tests: ieltsGeneralTests,
  },
];

export const ieltsFamilies = buildFamilies(exams, 20000);
