import { a1Lessons, a2Lessons, b1Modules, b2Modules, c1PublishedModules, c2Modules, fullCourseRoadmap } from "@/lib/course";

const authoredLessons = {
  A1: a1Lessons,
  A2: a2Lessons,
  B1: b1Modules.flatMap((module) => module.lessons),
  B2: b2Modules.flatMap((module) => module.lessons),
  C1: c1PublishedModules.flatMap((module) => module.lessons),
  C2: c2Modules.flatMap((module) => module.lessons),
};
const publishedLessons = Object.values(authoredLessons).flat();
const lessonBySlug = new Map(publishedLessons.map((lesson) => [lesson.slug, lesson]));

export function validateCourseRoadmap(): string[] {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const level of fullCourseRoadmap) {
    const levelSlugs = new Set((authoredLessons[level.code as keyof typeof authoredLessons] ?? []).map((lesson) => lesson.slug));
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
          if (lesson && !levelSlugs.has(lesson.slug)) errors.push(`Published lesson is assigned to the wrong level: ${entry.slug}`);
        }
      }
    }
  }

  const requiredA2Suffix = ["first-then-finally","a-surprising-day","asking-follow-up-questions","storytelling-practice","a2-story-review","plan-a-short-trip","when-plans-change","travel-roleplay","a2-speaking-project","a2-final-review"];
  const actualA2 = authoredLessons.A2.map((lesson) => lesson.slug);
  if (JSON.stringify(actualA2.slice(-requiredA2Suffix.length)) !== JSON.stringify(requiredA2Suffix)) errors.push("A2 published project and review lessons are out of order");
  for (const [levelCode, lessons] of Object.entries(authoredLessons)) {
    const expectedCount = levelCode === "A1" ? 49 : levelCode === "A2" ? 40 : levelCode === "B1" || levelCode === "B2" || levelCode === "C1" || levelCode === "C2" ? 30 : 0;
    if (lessons.length !== expectedCount) errors.push(`${levelCode} must publish ${expectedCount} lessons; found ${lessons.length}`);
    for (const lesson of lessons) {
      if (!seenSlugs.has(lesson.slug)) errors.push(`Published lesson is missing from roadmap: ${lesson.slug}`);
      const baselineLesson = levelCode === "A1";
      if (!lesson.objective.trim() || !lesson.intro.trim() || !lesson.takeaway.trim() || lesson.phrases.length < (baselineLesson ? 3 : 4) || lesson.practice.length < (baselineLesson ? 2 : 4) || !lesson.grammar.explanation.trim() || lesson.grammar.examples.length < (baselineLesson ? 2 : 4)) errors.push(`Published lesson is incomplete: ${lesson.slug}`);
      for (const question of lesson.practice) {
        const kind = question.type ?? "choice";
        if (!question.prompt.trim()) errors.push(`Practice question without prompt in ${lesson.slug}`);
        if (kind === "choice" || kind === "listen") {
          const options = question.options;
          if (!options || options.length < 3 || typeof question.answer !== "number" || question.answer < 0 || question.answer >= options.length || !question.explanation?.trim()) errors.push(`Invalid practice question in ${lesson.slug}: ${question.prompt}`);
          if (options && new Set(options).size !== options.length) errors.push(`Duplicate answer option in ${lesson.slug}: ${question.prompt}`);
          if (kind === "listen" && !question.audio?.trim()) errors.push(`Missing audio in listen question in ${lesson.slug}: ${question.prompt}`);
        } else if (kind === "fill" || kind === "order") {
          const answer = question.answer;
          const hasAnswer = typeof answer === "string" ? answer.trim().length > 0 : Array.isArray(answer) ? answer.length > 0 : false;
          if (!hasAnswer) errors.push(`Missing answer in ${kind} question in ${lesson.slug}: ${question.prompt}`);
          if (kind === "order" && (!question.words || question.words.length < 2)) errors.push(`Missing words in order question in ${lesson.slug}: ${question.prompt}`);
        } else if (kind === "speak") {
          if (!question.target?.trim()) errors.push(`Missing target in speak question in ${lesson.slug}: ${question.prompt}`);
        } else if (kind === "write") {
          if (!question.model?.trim()) errors.push(`Missing model in write question in ${lesson.slug}: ${question.prompt}`);
        }
      }
    }
  }
  return errors;
}
