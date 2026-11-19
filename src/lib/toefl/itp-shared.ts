import { fixed, mc, type CambridgeItem, type CambridgePart, type McItem } from "@/lib/cambridge/builder";

/** Sentence completion: prompt contains ______. */
export const se = (prompt: string, correct: string, distractors: [string, string, string], explanation: string) =>
  mc(prompt, correct, distractors, explanation.length < 45 ? `A forma correta é “${correct}”. ${explanation}` : explanation);

/** Written expression: options are the four underlined segments, in sentence order; `wrong` is the one that must change. */
export const we = (sentence: string, segments: [string, string, string, string], wrong: string, explanation: string) =>
  fixed(sentence, segments, wrong, `O erro está em “${wrong}”. ${explanation}`);

/** Gives short reading explanations more context (vocabulary items get the meaning spelled out). */
export function enrich(item: CambridgeItem): CambridgeItem {
  if (item.kind !== "mc" || item.explanation.length >= 45) return item;
  const mcItem = item as McItem;
  const word = mcItem.prompt.match(/The (?:word|phrase) “([^”]+)”/)?.[1];
  if (word && /closest in meaning/.test(mcItem.prompt)) {
    return { ...mcItem, explanation: `No contexto, “${word}” equivale a “${mcItem.correct}”. ${mcItem.explanation}` };
  }
  return { ...mcItem, explanation: `Resposta: “${mcItem.correct}”. ${mcItem.explanation}` };
}

export const structurePart = (items: CambridgeItem[]): CambridgePart => ({ label: "Structure", skill: "Estrutura da frase", instruction: "Section 2 · Questions 1–15. Choose the word or phrase (A, B, C or D) that best completes the sentence.", items });
export const writtenPart = (items: CambridgeItem[]): CambridgePart => ({ label: "Written Expression", skill: "Identificação de erro", instruction: "Section 2 · Questions 16–40. In each sentence, four words or phrases are underlined; they are shown as options A–D in the order they appear. Choose the ONE word or phrase that must be changed for the sentence to be correct.", items });
export const readingPart = (number: number, title: string, passage: string, items: CambridgeItem[]): CambridgePart => {
  const first = 41 + (number - 1) * 10;
  return { label: `Reading Comprehension · Passage ${number}`, skill: "Compreensão de leitura", instruction: `Section 3 · Questions ${first}–${first + 9}. Read the passage and choose the best answer (A, B, C or D) to each question.`, passage, passageLabel: title, items: items.map(enrich) };
};
