// Client-safe types and helpers shared by the simulation data and the runner.

export type SimulationQuestion = {
  type?: "choice" | "text";
  prompt: string;
  passage: string;
  passageLabel?: string;
  part: number;
  partLabel?: string;
  partInstruction?: string;
  options: string[];
  answer: number;
  accepted?: string[];
  explanation: string;
  skill: string;
};

export type Simulation = {
  id: string;
  exam: string;
  family: string;
  level: string;
  title: string;
  subtitle: string;
  duration: number;
  officialQuestionCount: number;
  durationNote: string;
  format: string;
  officialLabel: string;
  officialUrl: string;
  scoringNote: string;
  questions: SimulationQuestion[];
};

export type SimulationFamily = {
  key: string;
  title: string;
  level: string;
  component: string;
  officialUrl: string;
  simulations: Simulation[];
};

export function normalizeAnswer(value: string) {
  return value
    .toLowerCase()
    .replace(/[‘’`´]/g, "'")
    .replace(/[“”]/g, "\"")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["']+|["']+$/g, "")
    .replace(/[.!?,;:]+$/g, "")
    .trim();
}

export function isAnswerCorrect(question: SimulationQuestion | undefined, answer: number | string | null) {
  if (!question || answer === null) return false;
  if (question.type === "text") {
    if (typeof answer !== "string" || !answer.trim()) return false;
    const given = normalizeAnswer(answer);
    return (question.accepted ?? []).some((accepted) => normalizeAnswer(accepted) === given);
  }
  return answer === question.answer;
}

// Small deterministic PRNG so answer keys are stable between builds but not patterned.
export function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: T[], random: () => number) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
