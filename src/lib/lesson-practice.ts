import type { Lesson, LessonExercise } from "@/lib/course";

// Gera atividades de produção (fala) e de estrutura (ordenar) a partir das
// frases reais da aula, para distribuir os novos tipos a todas as aulas sem
// precisar reescrever cada uma. Só acrescenta um tipo se a aula ainda não o tiver.

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const clean = (s: string) => s.replace(/[“”"]/g, "").trim();
const stripPunct = (s: string) => s.replace(/[.?!,;:]/g, "").replace(/\s+/g, " ").trim();

export function augmentPractice(lesson: Lesson): LessonExercise[] {
  const base = lesson.practice ?? [];
  const has = (kind: string) => base.some((exercise) => (exercise.type ?? "choice") === kind);
  const extra: LessonExercise[] = [];
  const phrases = lesson.phrases ?? [];

  // Fala (shadowing) — repetir em voz alta uma frase natural da aula.
  if (!has("speak")) {
    const target = phrases.find((p) => !p.english.includes("____"))?.english
      ?? lesson.grammar?.examples?.find((e) => !e.english.includes("____"))?.english
      ?? phrases[0]?.english;
    if (target) {
      extra.push({
        type: "speak",
        prompt: "Pratique a fala desta aula:",
        target: clean(target),
        tip: "Ouça, repita em voz alta algumas vezes e tente dizer sem olhar.",
      });
    }
  }

  // Ordenar palavras — montar uma frase curta da aula.
  if (!has("order")) {
    const candidate = phrases
      .map((p) => ({ en: clean(p.english), pt: p.portuguese }))
      .find((p) => !p.en.includes("____") && /^[A-Za-z]/.test(p.en) && wordCount(stripPunct(p.en)) >= 3 && wordCount(stripPunct(p.en)) <= 7);
    if (candidate) {
      const sentence = stripPunct(candidate.en);
      extra.push({
        type: "order",
        prompt: "Toque nas palavras na ordem certa para formar a frase:",
        words: sentence.split(" "),
        answer: sentence,
        explanation: candidate.pt,
      });
    }
  }

  return [...base, ...extra];
}
