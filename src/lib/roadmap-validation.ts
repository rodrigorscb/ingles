import { a1Lessons, a2Lessons, fullCourseRoadmap } from "@/lib/course";

const publishedLessons = [...a1Lessons, ...a2Lessons];

export function validateCourseRoadmap(): string[] {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const lessonBySlug = new Map(publishedLessons.map((lesson) => [lesson.slug, lesson]));

  for (const level of fullCourseRoadmap) {
    for (const courseModule of level.modules) {
      for (const courseChapter of courseModule.chapters) {
        for (const entry of courseChapter.lessons) {
          if (seenIds.has(entry.id)) errors.push(`Duplicate roadmap ID: ${entry.id}`);
          if (seenSlugs.has(entry.slug)) errors.push(`Duplicate roadmap slug: ${entry.slug}`);
          seenIds.add(entry.id);
          seenSlugs.add(entry.slug);
          const lesson = lessonBySlug.get(entry.slug);
          if (entry.status === "available" && !lesson) errors.push(`Published roadmap entry has no lesson content: ${entry.slug}`);
          if (entry.status === "comingSoon" && lesson) errors.push(`Authored lesson is still marked coming soon: ${entry.slug}`);
          if (lesson && entry.title !== lesson.title) errors.push(`Roadmap title differs from published lesson: ${entry.slug}`);
        }
      }
    }
  }

  for (const lesson of publishedLessons) {
    if (!seenSlugs.has(lesson.slug)) errors.push(`Published lesson is missing from roadmap: ${lesson.slug}`);
    if (!lesson.objective || !lesson.phrases.length || lesson.phrases.length < 3 || lesson.practice.length < 2 || !lesson.grammar.explanation || lesson.grammar.examples.length < 2) errors.push(`Published lesson is incomplete: ${lesson.slug}`);
    for (const question of lesson.practice) {
      if (question.options.length < 3 || question.answer < 0 || question.answer >= question.options.length || !question.explanation.trim()) errors.push(`Invalid practice question in ${lesson.slug}: ${question.prompt}`);
      if (new Set(question.options).size !== question.options.length) errors.push(`Duplicate answer option in ${lesson.slug}: ${question.prompt}`);
    }
  }
  return errors;
}
