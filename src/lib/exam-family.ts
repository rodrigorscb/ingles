import type { SimulationFamily } from "@/lib/simulation-types";
import { buildCambridgeQuestions, type CambridgeTest } from "@/lib/cambridge/builder";

export type ExamMeta = {
  slug: string;
  exam: string;
  level: string;
  component: string;
  officialUrl: string;
  duration: number;
  questionCount: number;
  format: string;
  durationNote: string;
  scoringNote: string;
  tests: CambridgeTest[];
};

/** Turns exam metadata and authored tests into simulation families. `seedBase` keeps answer keys stable per exam group. */
export function buildFamilies(exams: ExamMeta[], seedBase: number): SimulationFamily[] {
  return exams.filter((exam) => exam.tests.length > 0).map((exam, examIndex) => ({
    key: exam.slug,
    title: exam.exam,
    level: exam.level,
    component: exam.component,
    officialUrl: exam.officialUrl,
    simulations: exam.tests.map((test, index) => ({
      id: `${exam.slug}-${index + 1}`,
      exam: exam.exam,
      family: exam.slug,
      level: exam.level,
      title: `Simulado ${index + 1} · ${test.title}`,
      subtitle: `${exam.questionCount} questões autorais no formato do ${exam.component}, com cronômetro opcional e correção comentada em português.`,
      duration: exam.duration,
      officialQuestionCount: exam.questionCount,
      durationNote: exam.durationNote,
      format: exam.format,
      officialLabel: `Formato oficial do ${exam.exam}`,
      officialUrl: exam.officialUrl,
      scoringNote: exam.scoringNote,
      questions: buildCambridgeQuestions(test, seedBase + (examIndex + 1) * 1000 + index + 1),
    })),
  }));
}
