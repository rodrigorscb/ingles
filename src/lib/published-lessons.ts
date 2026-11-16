import { a1Lessons, a2Lessons, a1Modules, a2Modules } from "@/lib/course";

export type PublishedLesson = { lesson: (typeof a1Lessons)[number]; level: "A1" | "A2"; index: number; sequence: (typeof a1Lessons)[number][] };

export const publishedLessons = [...a1Lessons, ...a2Lessons];
export const publishedModules = [...a1Modules, ...a2Modules];

export function getPublishedLesson(slug: string): PublishedLesson | undefined {
  const a1Index = a1Lessons.findIndex((lesson) => lesson.slug === slug);
  if (a1Index >= 0) return { lesson: a1Lessons[a1Index], level: "A1", index: a1Index, sequence: a1Lessons };
  const a2Index = a2Lessons.findIndex((lesson) => lesson.slug === slug);
  if (a2Index >= 0) return { lesson: a2Lessons[a2Index], level: "A2", index: a2Index, sequence: a2Lessons };
  return undefined;
}
