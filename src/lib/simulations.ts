import { caderno1 } from "@/lib/enem/caderno-1";
import { caderno2 } from "@/lib/enem/caderno-2";
import { caderno3 } from "@/lib/enem/caderno-3";
import { caderno4 } from "@/lib/enem/caderno-4";
import { caderno5 } from "@/lib/enem/caderno-5";
import type { EnemSetSource } from "@/lib/enem/types";
import { cambridgeFamilies } from "@/lib/cambridge";
import { ieltsFamilies } from "@/lib/ielts";
import { toeflFamilies } from "@/lib/toefl";
import { toeicFamilies } from "@/lib/toeic";
import { seededRandom, shuffle, type Simulation, type SimulationFamily, type SimulationQuestion } from "@/lib/simulation-types";

export type { Simulation, SimulationFamily, SimulationQuestion } from "@/lib/simulation-types";

const examUrl = "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos";
const examNote = "O componente oficial de língua estrangeira tem cinco questões, à escolha entre Inglês e Espanhol. Ao longo de dois dias, o ENEM aplica 180 questões objetivas e redação. Este caderno de 50 itens é treino ampliado autoral de leitura em inglês, no mesmo formato das questões do exame: textos em inglês de gêneros variados, enunciados e alternativas em português, cinco alternativas por questão. Não é a estrutura oficial do componente nem uma estimativa TRI. Sugestão de organização: 2h30, divididas em cinco blocos de 10 questões (30 minutos cada); esse tempo é uma recomendação de estudo, não o tempo oficial da língua estrangeira.";

const sets: EnemSetSource[] = [caderno1, caderno2, caderno3, caderno4, caderno5];

function buildEnemQuestions(set: EnemSetSource, setNumber: number): SimulationQuestion[] {
  const random = seededRandom(setNumber * 7919);
  const questions = set.texts.flatMap((text) => text.questions);
  // Balanced answer key: each letter A–E is correct equally often, in shuffled order.
  const answerPositions = shuffle(questions.map((_, index) => index % 5), random);
  return questions.map((question, index) => {
    const text = set.texts[Math.floor(index / 2)];
    const options = shuffle([...question.distractors], random);
    options.splice(answerPositions[index], 0, question.correct);
    return {
      passage: text.passage,
      passageLabel: text.genre,
      prompt: question.prompt,
      part: Math.floor(index / 10) + 1,
      options,
      answer: options.indexOf(question.correct),
      skill: question.skill,
      explanation: question.explanation,
    };
  });
}

const enemFamily: SimulationFamily = {
  key: "enem-english",
  title: "ENEM · Inglês",
  level: "Ensino médio",
  component: "Interpretação de textos · caderno estendido autoral",
  officialUrl: examUrl,
  simulations: sets.map((set, index): Simulation => ({
    id: `enem-english-practice-${index + 1}`,
    exam: "ENEM · Inglês",
    family: "enem-english",
    level: "Ensino médio",
    title: `Caderno ${index + 1} · ${set.title}`,
    subtitle: `50 questões autorais sobre ${set.texts.length} textos em inglês de gêneros variados, com enunciados em português, cinco alternativas e correção comentada.`,
    duration: 150,
    officialQuestionCount: 50,
    durationNote: examNote,
    format: "50 questões · 5 alternativas · tempo sugerido: 2h30",
    officialLabel: "Provas e gabaritos oficiais do Inep",
    officialUrl: examUrl,
    scoringNote: "Este caderno de 50 questões é treino ampliado, não o componente oficial de língua estrangeira (5 questões). O ENEM usa a Teoria de Resposta ao Item; o percentual de acertos mostrado aqui não estima nota TRI, classificação ou chance de ingresso.",
    questions: buildEnemQuestions(set, index + 1),
  })),
};

const setsByFamily: SimulationFamily[] = [enemFamily, ...cambridgeFamilies, ...ieltsFamilies, ...toeflFamilies, ...toeicFamilies];

export const simulations = setsByFamily.flatMap((family) => family.simulations);
export const simulationsByFamily = setsByFamily;

export function getSimulation(id: string) {
  return simulations.find((simulation) => simulation.id === id);
}

const examSearchLabels: [prefix: string, label: string][] = [
  ["enem-", "ENEM Inglês"],
  ["cambridge-a2-key", "Cambridge A2 Key (KET)"],
  ["cambridge-b1-preliminary", "Cambridge B1 Preliminary (PET)"],
  ["cambridge-b2-first", "Cambridge B2 First (FCE)"],
  ["cambridge-c1-advanced", "Cambridge C1 Advanced (CAE)"],
  ["cambridge-c2-proficiency", "Cambridge C2 Proficiency (CPE)"],
  ["ielts-academic", "IELTS Academic Reading"],
  ["ielts-general-training", "IELTS General Training Reading"],
  ["toefl-ibt", "TOEFL iBT Reading"],
  ["toefl-itp", "TOEFL ITP"],
  ["toeic-", "TOEIC Reading"],
];

/** Exam name as people search for it (e.g. "Cambridge B2 First (FCE)"). */
export function examSearchLabel(simulation: Simulation) {
  return examSearchLabels.find(([prefix]) => simulation.id.startsWith(prefix))?.[1] ?? simulation.exam;
}

/** Number of the test inside its family and its theme without the "Simulado N ·" prefix. */
export function simulationParts(simulation: Simulation) {
  const number = Number(simulation.id.match(/-(\d+)$/)?.[1] ?? 1);
  const theme = simulation.title.replace(/^(Simulado|Caderno)\s+\d+\s*·\s*/, "");
  return { number, theme };
}
