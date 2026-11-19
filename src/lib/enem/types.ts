// Source format for authored ENEM-style reading questions.
// Texts are in English; stems, options and explanations are in Portuguese, as in the real exam.
// The correct option is always written first here and shuffled deterministically at build time.

export type EnemQuestionSource = {
  skill: string;
  prompt: string;
  correct: string;
  distractors: [string, string, string, string];
  explanation: string;
};

export type EnemTextSource = {
  genre: string;
  passage: string;
  questions: [EnemQuestionSource, EnemQuestionSource];
};

export type EnemSetSource = {
  title: string;
  texts: EnemTextSource[];
};

export function q(skill: string, prompt: string, correct: string, distractors: [string, string, string, string], explanation: string): EnemQuestionSource {
  return { skill, prompt, correct, distractors, explanation };
}
