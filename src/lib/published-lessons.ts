import { a1Lessons, a2Lessons, a1Modules, a2Modules, b1Modules, b2Modules, c1PublishedModules, fullCourseRoadmap } from "@/lib/course";
import type { A1Module, Lesson } from "@/lib/course";

export type CourseLessonLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type PublishedLesson = { lesson: Lesson; level: CourseLessonLevel; index: number; sequence: Lesson[] };

const levelModules: Record<CourseLessonLevel, A1Module[]> = {
  A1: a1Modules,
  A2: a2Modules,
  B1: b1Modules,
  B2: b2Modules,
  C1: c1PublishedModules,
  C2: [],
};

export const lessonsByLevel = Object.fromEntries(
  (Object.keys(levelModules) as CourseLessonLevel[]).map((level) => {
    const roadmap = fullCourseRoadmap.find((entry) => entry.code === level);
    const authored = levelModules[level].flatMap((module) => module.lessons);
    const sequence = level === "A1" ? a1Lessons : level === "A2" ? a2Lessons : authored;
    const ordered = roadmap?.modules.flatMap((courseModule) =>
      courseModule.chapters.flatMap((chapter) => chapter.lessons.flatMap((planned) => {
        const lesson = sequence.find((candidate) => candidate.slug === planned.slug);
        return lesson ? [lesson] : [];
      })),
    ) ?? [];
    return [level, ordered];
  }),
) as Record<CourseLessonLevel, Lesson[]>;

export const publishedLessons = Object.values(lessonsByLevel).flat();
export const publishedModules = Object.values(levelModules).flat();

export function getPublishedLesson(slug: string): PublishedLesson | undefined {
  for (const level of Object.keys(lessonsByLevel) as CourseLessonLevel[]) {
    const sequence = lessonsByLevel[level];
    const index = sequence.findIndex((lesson) => lesson.slug === slug);
    if (index >= 0) return { lesson: sequence[index], level, index, sequence };
  }
  return undefined;
}
