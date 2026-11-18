/* eslint-disable @typescript-eslint/no-require-imports, @next/next/no-assign-module-variable */
const ts = require("typescript");
const path = require("path");
const fs = require("fs");
const root = path.resolve(__dirname, "..");
const modules = new Map();
function resolveModule(specifier, fromFile) {
  const target = specifier.startsWith("@/") ? path.join(root, "src", specifier.slice(2)) : path.resolve(path.dirname(fromFile), specifier);
  for (const candidate of [target + ".ts", target + ".tsx", path.join(target, "index.ts")]) if (fs.existsSync(candidate)) return candidate;
  throw new Error(`Cannot resolve ${specifier} from ${fromFile}`);
}
function loadModule(file) {
  if (modules.has(file)) return modules.get(file).exports;
  const source = fs.readFileSync(file, "utf8");
  const js = ts.transpile(source, { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 });
  const module = { exports: {} };
  modules.set(file, module);
  const localRequire = (specifier) => loadModule(resolveModule(specifier, file));
  new Function("require", "module", "exports", js)(localRequire, module, module.exports);
  return module.exports;
}
const course = loadModule(path.join(root, "src/lib/course.ts"));
const { validateCourseRoadmap } = loadModule(path.join(root, "src/lib/roadmap-validation.ts"));
const expectedA1 = ["food-on-the-table","like-it-or-not","at-the-market","how-much-how-many","shopping-list","market-day-review","what-do-you-do","where-we-work","a-typical-workday","can-and-cant","study-tools","my-week-review","how-do-you-feel","at-the-pharmacy","everyday-healthy-habits","please-help-me","emergency-basics","wellbeing-review","at-the-airport","checking-in","simple-travel-questions","travel-day-review","a1-conversation-project","a1-final-review"];
const expectedA2 = ["last-weekend","a-special-day","childhood-memories","past-questions","stories-review","plans-for-next-month","travel-experiences","making-arrangements","what-i-have-done","my-life-so-far","finding-the-right-size","returns-and-receipts","at-the-post-office","booking-an-appointment","services-review","something-is-wrong","at-the-doctors","directions-in-detail","explaining-what-happened","a2-practical-review","describing-people","getting-along","community-places","invitations-and-events","people-review","moving-house","sharing-a-home","community-events","being-a-good-neighbor","a2-community-project","first-then-finally","a-surprising-day","asking-follow-up-questions","storytelling-practice","a2-story-review","plan-a-short-trip","when-plans-change","travel-roleplay","a2-speaking-project","a2-final-review"];
const expectedB1 = ["a-turning-point","before-and-after","learning-from-mistakes","life-experiences-interview","change-and-growth","my-role-at-work","setting-a-goal","solving-a-work-problem","asking-for-feedback","career-conversation","a-book-worth-reading","films-and-series","news-and-perspectives","online-habits","culture-club","a-better-neighborhood","everyday-sustainability","local-volunteering","comparing-solutions","community-project","an-unexpected-journey","a-person-who-inspired-me","telling-a-funny-story","keeping-the-conversation-going","story-circle","choose-a-real-world-issue","research-and-organize","make-a-clear-proposal","present-and-answer","b1-final-reflection"];
const expectedB2 = ["claim-and-evidence","agreeing-with-nuance","responding-to-counterarguments","reliable-sources","structured-debate","technology-at-work","privacy-and-convenience","cities-of-the-future","changing-workplaces","media-literacy","opening-a-meeting","clarifying-a-point","summarizing-decisions","handling-disagreement","meeting-simulation","a-clear-professional-email","polite-follow-ups","explaining-a-delay","short-report-structure","editing-for-tone","define-the-problem","compare-possible-options","risks-and-trade-offs","recommend-with-evidence","decision-workshop","choose-a-question","organize-evidence","write-a-recommendation","present-to-an-audience","b2-final-review"];
const expectedC1 = ["formal-or-familiar","softening-a-position","reading-between-the-lines","irony-and-understatement","tone-revision-studio","synthesizing-multiple-sources","cause-correlation-and-claims","explaining-uncertainty","leading-a-deep-discussion","c1-argument-lab","research-question-and-scope","integrating-sources-responsibly","argument-structure","editing-for-cohesion","c1-written-analysis","opening-a-complex-presentation","handling-challenging-questions","negotiating-priorities","facilitating-a-workshop","c1-professional-simulation","frame-a-debatable-question","evaluate-evidence-and-bias","map-perspectives","build-a-nuanced-position","c1-critical-discussion","design-the-final-inquiry","write-the-synthesis","present-the-findings","respond-and-revise","c1-final-reflection"];
const expectedC2 = ["rhythm-and-emphasis","metaphor-and-framing","humor-and-double-meaning","voice-across-genres","style-imitation-with-purpose","dialect-and-identity","pragmatics-and-face","translation-loss-and-choice","language-and-power","c2-contextual-reading","surface-hidden-assumptions","disagree-with-care","repairing-misunderstandings","facilitating-conflict","c2-dialogue-lab","translate-expertise-for-the-public","communicating-risk-and-uncertainty","defending-a-method","ethical-recommendations","c2-expert-panel","choose-an-original-question","curate-a-source-collection","analyze-language-and-context","develop-a-subtle-thesis","c2-inquiry-conference","plan-a-multigenre-portfolio","write-with-control-and-range","present-with-adaptive-fluency","reflect-on-language-choices","c2-final-reflection"];
const roadmapSlugs = (code) => course.fullCourseRoadmap.find((level) => level.code === code).modules.flatMap((module) => module.chapters.flatMap((chapter) => chapter.lessons)).filter((lesson) => lesson.status === "available").map((lesson) => lesson.slug);
const actualA1 = course.a1Lessons.slice(25).map((lesson) => lesson.slug);
const actual = { A2: course.a2Lessons.map((lesson) => lesson.slug), B1: roadmapSlugs("B1"), B2: roadmapSlugs("B2"), C1: roadmapSlugs("C1"), C2: roadmapSlugs("C2") };
const expected = { A2: expectedA2, B1: expectedB1, B2: expectedB2, C1: expectedC1, C2: expectedC2 };
const errors = validateCourseRoadmap();
const sequenceMatches = JSON.stringify(actualA1) === JSON.stringify(expectedA1) && Object.keys(expected).every((level) => JSON.stringify(actual[level]) === JSON.stringify(expected[level]));
const publishedCounts = { A1: course.a1Lessons.length, A2: actual.A2.length, B1: actual.B1.length, B2: actual.B2.length, C1: actual.C1.length, C2: actual.C2.length };
const total = Object.values(publishedCounts).reduce((sum, count) => sum + count, 0);
const newLessonsInThisBatch = (publishedCounts.A2 - 26) + publishedCounts.B1 + publishedCounts.B2 + publishedCounts.C1 + publishedCounts.C2;
console.log(JSON.stringify({ publishedCounts, newLessonsInThisBatch, publishedTotal: total, sequenceMatches, roadmapErrors: errors }, null, 2));
if (errors.length || !sequenceMatches || publishedCounts.A1 !== 49 || publishedCounts.A2 !== 40 || publishedCounts.B1 !== 30 || publishedCounts.B2 !== 30 || publishedCounts.C1 !== 30 || publishedCounts.C2 !== 30 || total !== 209 || newLessonsInThisBatch !== 134) process.exit(1);
