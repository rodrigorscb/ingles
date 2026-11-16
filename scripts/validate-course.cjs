/* eslint-disable @typescript-eslint/no-require-imports, @next/next/no-assign-module-variable */
const ts = require("typescript");
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const modules = new Map();
function resolveModule(specifier, fromFile) {
  let target = specifier.startsWith("@/") ? path.join(root, "src", specifier.slice(2)) : path.resolve(path.dirname(fromFile), specifier);
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
const expectedA2 = ["last-weekend","a-special-day","childhood-memories","past-questions","stories-review","plans-for-next-month","travel-experiences","making-arrangements","what-i-have-done","my-life-so-far","finding-the-right-size","returns-and-receipts","at-the-post-office","booking-an-appointment","services-review","something-is-wrong","at-the-doctors","directions-in-detail","explaining-what-happened","a2-practical-review","describing-people","getting-along","community-places","invitations-and-events","people-review","moving-house","sharing-a-home","community-events","being-a-good-neighbor","first-then-finally","a2-community-project"];
const actualA1 = course.a1Lessons.slice(25).map((lesson) => lesson.slug);
const actualA2 = course.a2Lessons.map((lesson) => lesson.slug);
const actualNewA2 = actualA2.slice(1);
const expectedAllA2 = expectedA2;
const errors = validateCourseRoadmap();
const sequenceMatches = JSON.stringify(actualA1) === JSON.stringify(expectedA1) && JSON.stringify(actualA2) === JSON.stringify(expectedAllA2);
console.log(JSON.stringify({ publishedA1: course.a1Lessons.length, publishedA2: course.a2Lessons.length, newA1: actualA1.length, newA2: actualNewA2.length, sequenceMatches, roadmapErrors: errors }, null, 2));
if (errors.length || !sequenceMatches || actualA1.length !== 24 || actualNewA2.length !== 30) process.exit(1);
