import { buildFamilies, type ExamMeta } from "@/lib/exam-family";
import { keyTests } from "./key";
import { preliminaryTests } from "./preliminary";
import { firstTests } from "./first";
import { advancedTests } from "./advanced";
import { proficiencyTests } from "./proficiency";

const scoringNote = "Questões autorais no formato da prova, sem reprodução de material oficial. Aqui cada item vale 1 ponto; a Cambridge pondera partes de forma diferente e converte o resultado para a Cambridge English Scale. Por isso, o percentual mostrado não é uma nota oficial nem uma previsão de aprovação.";

const exams: ExamMeta[] = ([
  {
    slug: "cambridge-a2-key",
    exam: "Cambridge A2 Key (KET)",
    level: "CEFR A2",
    component: "Reading (Parts 1–5)",
    officialUrl: "https://www.cambridgeenglish.org/exams-and-tests/key/",
    duration: 40,
    questionCount: 30,
    format: "30 questões · Reading Parts 1–5 · tempo sugerido: 40 min",
    durationNote: "No exame oficial, Reading e Writing formam um único paper de 60 minutos: Parts 1–5 são de leitura (30 questões) e Parts 6–7 são de escrita. Este simulado cobre as cinco partes de leitura; a sugestão de 40 minutos reserva o restante do tempo para a escrita.",
    tests: keyTests,
  },
  {
    slug: "cambridge-b1-preliminary",
    exam: "Cambridge B1 Preliminary (PET)",
    level: "CEFR B1",
    component: "Reading (Parts 1–6)",
    officialUrl: "https://www.cambridgeenglish.org/exams-and-tests/preliminary/",
    duration: 45,
    questionCount: 32,
    format: "32 questões · Reading Parts 1–6 · tempo sugerido: 45 min",
    durationNote: "O paper de Reading do B1 Preliminary tem 6 partes e 32 questões, com 45 minutos de duração. Este simulado segue essa estrutura; Writing, Listening e Speaking são avaliados em papers separados e não fazem parte deste treino.",
    tests: preliminaryTests,
  },
  {
    slug: "cambridge-b2-first",
    exam: "Cambridge B2 First (FCE)",
    level: "CEFR B2",
    component: "Reading and Use of English (Parts 1–7)",
    officialUrl: "https://www.cambridgeenglish.org/exams-and-tests/first/",
    duration: 75,
    questionCount: 52,
    format: "52 questões · Reading and Use of English · tempo sugerido: 1h15",
    durationNote: "O paper Reading and Use of English do B2 First tem 7 partes e 52 questões, com 1 hora e 15 minutos de duração. As Parts 2, 3 e 4 pedem respostas digitadas. Na prova oficial, a Part 4 vale até 2 pontos por item; aqui cada questão vale 1 ponto e só a resposta completa é aceita.",
    tests: firstTests,
  },
  {
    slug: "cambridge-c1-advanced",
    exam: "Cambridge C1 Advanced (CAE)",
    level: "CEFR C1",
    component: "Reading and Use of English (Parts 1–8)",
    officialUrl: "https://www.cambridgeenglish.org/exams-and-tests/advanced/",
    duration: 90,
    questionCount: 56,
    format: "56 questões · Reading and Use of English · tempo sugerido: 1h30",
    durationNote: "O paper Reading and Use of English do C1 Advanced tem 8 partes e 56 questões, com 1 hora e 30 minutos de duração. As Parts 2, 3 e 4 pedem respostas digitadas. Na prova oficial, a Part 4 vale até 2 pontos por item e as Parts 5 a 7 têm peso maior; aqui cada questão vale 1 ponto.",
    tests: advancedTests,
  },
  {
    slug: "cambridge-c2-proficiency",
    exam: "Cambridge C2 Proficiency (CPE)",
    level: "CEFR C2",
    component: "Reading and Use of English (Parts 1–7)",
    officialUrl: "https://www.cambridgeenglish.org/exams-and-tests/proficiency/",
    duration: 90,
    questionCount: 53,
    format: "53 questões · Reading and Use of English · tempo sugerido: 1h30",
    durationNote: "O paper Reading and Use of English do C2 Proficiency tem 7 partes e 53 questões, com 1 hora e 30 minutos de duração. As Parts 2, 3 e 4 pedem respostas digitadas. Na prova oficial, a Part 4 vale até 2 pontos por item e as partes de leitura têm peso maior; aqui cada questão vale 1 ponto.",
    tests: proficiencyTests,
  },
] satisfies Omit<ExamMeta, "scoringNote">[]).map((exam) => ({ ...exam, scoringNote }));

export const cambridgeFamilies = buildFamilies(exams, 0);

export const cambridgeExpectedCounts = Object.fromEntries(exams.map((exam) => [exam.slug, exam.questionCount]));
