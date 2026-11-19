import { fixed, mc, type CambridgeItem, type CambridgePart } from "@/lib/cambridge/builder";
import { enrich } from "@/lib/toefl/itp-shared";

export { mc };

/** Part 5 sentence: correct answer first, three distractors. */
export const s5 = (prompt: string, correct: string, distractors: [string, string, string], explanation: string) =>
  mc(prompt, correct, distractors, explanation.length < 45 ? `A opção correta é “${correct}”. ${explanation}` : explanation);

/** “Where does the sentence belong?” item with fixed positions. */
export const insertion = (sentence: string, answer: "[1]" | "[2]" | "[3]" | "[4]", explanation: string) =>
  fixed(`In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong?\n“${sentence}”`, ["[1]", "[2]", "[3]", "[4]"], answer, explanation);

export const part5 = (items: CambridgeItem[]): CambridgePart => ({
  label: "Part 5 · Incomplete Sentences", skill: "Gramática e vocabulário",
  instruction: "Questions 1–30. A word or phrase is missing in each sentence. Choose the best answer (A, B, C or D) to complete the sentence.",
  items: items.map(enrich),
});

export const part6 = (first: number, title: string, passage: string, items: CambridgeItem[]): CambridgePart => ({
  label: "Part 6 · Text Completion", skill: "Completar textos",
  instruction: `Questions ${first}–${first + 3}. Read the text. A word, phrase or sentence is missing in parts of the text. Choose the best answer (A, B, C or D) for each gap.`,
  passage, passageLabel: title, items: items.map(enrich),
});

export const part7 = (range: string, kind: "single" | "multiple", title: string, passage: string, items: CambridgeItem[]): CambridgePart => ({
  label: kind === "single" ? "Part 7 · Single Passage" : "Part 7 · Multiple Passages", skill: kind === "single" ? "Leitura de texto único" : "Leitura de textos relacionados",
  instruction: `Questions ${range}. Read the ${kind === "single" ? "text" : "texts"} and choose the best answer (A, B, C or D) to each question.`,
  passage, passageLabel: title, items: items.map(enrich),
});
