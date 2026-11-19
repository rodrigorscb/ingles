// Authoring helpers for Cambridge-style reading tests.
// Instructions and texts are in English (as in the exam); explanations are in Portuguese for Brazilian learners.
import { seededRandom, shuffle, type SimulationQuestion } from "@/lib/simulation-types";

type BaseItem = { prompt: string; explanation: string; passage?: string; passageLabel?: string };
export type McItem = BaseItem & { kind: "mc"; correct: string; distractors: string[] };
export type LetterItem = BaseItem & { kind: "letter"; answer: number; count: number };
export type OpenItem = BaseItem & { kind: "open"; accepted: string[] };
export type FixedItem = BaseItem & { kind: "fixed"; options: string[]; answer: number };
export type CambridgeItem = McItem | LetterItem | OpenItem | FixedItem;

export type CambridgePart = {
  label: string;
  instruction: string;
  skill: string;
  passage?: string;
  passageLabel?: string;
  items: CambridgeItem[];
};

export type CambridgeTest = { title: string; parts: CambridgePart[] };

/** Multiple choice with the correct option written first; options are shuffled with a balanced key. */
export function mc(prompt: string, correct: string, distractors: string[], explanation: string, passage?: string): McItem {
  return { kind: "mc", prompt, correct, distractors, explanation, passage };
}

/** Choice among lettered texts, paragraphs or people printed in the passage (options are A, B, C…). */
export function letter(prompt: string, answer: string, count: number, explanation: string, passage?: string): LetterItem {
  return { kind: "letter", prompt, answer: answer.charCodeAt(0) - 65, count, explanation, passage };
}

/** Options shown in a fixed order (TRUE/FALSE/NOT GIVEN, headings i–viii, underlined segments). */
export function fixed(prompt: string, options: string[], answer: string, explanation: string, passage?: string): FixedItem {
  const index = options.indexOf(answer);
  if (index < 0) throw new Error(`Answer "${answer}" is not one of the options for "${prompt}"`);
  return { kind: "fixed", prompt, options, answer: index, explanation, passage };
}

/** Typed answer (open cloze, word formation, key word transformation). */
export function open(prompt: string, accepted: string[], explanation: string): OpenItem {
  return { kind: "open", prompt, accepted, explanation };
}

const letters = "ABCDEFGHIJ".split("");

export function buildCambridgeQuestions(test: CambridgeTest, seed: number): SimulationQuestion[] {
  const random = seededRandom(seed);
  const questions: SimulationQuestion[] = [];
  let keyOffset = 0;
  test.parts.forEach((part, partIndex) => {
    const mcItems = part.items.filter((item): item is McItem => item.kind === "mc");
    const optionCount = mcItems[0] ? mcItems[0].distractors.length + 1 : 0;
    const positions = optionCount ? shuffle(mcItems.map((_, index) => (index + keyOffset) % optionCount), random) : [];
    keyOffset += mcItems.length;
    let mcIndex = 0;
    part.items.forEach((item) => {
      const base = {
        prompt: item.prompt,
        passage: item.passage ?? part.passage ?? "",
        passageLabel: item.passage ? item.passageLabel : part.passageLabel,
        part: partIndex + 1,
        partLabel: part.label,
        partInstruction: part.instruction,
        explanation: item.explanation,
        skill: part.skill,
      };
      if (item.kind === "mc") {
        const options = shuffle([...item.distractors], random);
        const position = Math.min(positions[mcIndex] ?? 0, options.length);
        mcIndex += 1;
        options.splice(position, 0, item.correct);
        questions.push({ ...base, type: "choice", options, answer: position });
      } else if (item.kind === "fixed") {
        questions.push({ ...base, type: "choice", options: item.options, answer: item.answer });
      } else if (item.kind === "letter") {
        questions.push({ ...base, type: "choice", options: letters.slice(0, item.count), answer: item.answer });
      } else {
        questions.push({ ...base, type: "text", options: [], answer: -1, accepted: item.accepted });
      }
    });
  });
  return questions;
}
