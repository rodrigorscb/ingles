// Camada de gamificação (derivada do progresso, guardada por dispositivo).
// Lógica pura, sem efeitos — usada tanto no cliente quanto para testes.

export const XP_PER_LESSON = 20;

export type GameState = {
  xp: number;
  lessons: string[];       // ids de aulas concluídas (para XP e contagem)
  streak: number;          // ofensiva diária atual
  best: number;            // melhor ofensiva
  lastDay: string | null;  // AAAA-MM-DD da última atividade
  seenBadges: string[];    // conquistas já celebradas
};

export const emptyGame: GameState = { xp: 0, lessons: [], streak: 0, best: 0, lastDay: null, seenBadges: [] };

export function dayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
}

export type Rank = { min: number; name: string; icon: string };

export const ranks: Rank[] = [
  { min: 0, name: "Explorador", icon: "🌱" },
  { min: 100, name: "Aprendiz", icon: "✦" },
  { min: 300, name: "Viajante", icon: "✈️" },
  { min: 700, name: "Comunicador", icon: "💬" },
  { min: 1500, name: "Fluente", icon: "⭐" },
  { min: 3000, name: "Mestre", icon: "👑" },
];

export function rankFor(xp: number): { rank: Rank; next: Rank | null } {
  let rank = ranks[0];
  let next: Rank | null = ranks[1] ?? null;
  for (let i = 0; i < ranks.length; i++) {
    if (xp >= ranks[i].min) {
      rank = ranks[i];
      next = ranks[i + 1] ?? null;
    }
  }
  return { rank, next };
}

export type Badge = { id: string; name: string; desc: string; icon: string; test: (s: GameState) => boolean };

export const badges: Badge[] = [
  { id: "first", name: "Primeira aula", desc: "Você concluiu sua primeira aula.", icon: "🎉", test: (s) => s.lessons.length >= 1 },
  { id: "five", name: "Aquecendo", desc: "5 aulas concluídas.", icon: "🔥", test: (s) => s.lessons.length >= 5 },
  { id: "ten", name: "Pegando o ritmo", desc: "10 aulas concluídas.", icon: "⚡", test: (s) => s.lessons.length >= 10 },
  { id: "twentyfive", name: "Dedicação", desc: "25 aulas concluídas.", icon: "🏅", test: (s) => s.lessons.length >= 25 },
  { id: "fifty", name: "Meio caminho", desc: "50 aulas concluídas.", icon: "🏆", test: (s) => s.lessons.length >= 50 },
  { id: "streak3", name: "Três dias seguidos", desc: "Ofensiva de 3 dias.", icon: "✨", test: (s) => s.best >= 3 },
  { id: "streak7", name: "Uma semana!", desc: "Ofensiva de 7 dias.", icon: "🌟", test: (s) => s.best >= 7 },
  { id: "streak30", name: "Um mês inteiro", desc: "Ofensiva de 30 dias.", icon: "💪", test: (s) => s.best >= 30 },
  { id: "xp500", name: "500 XP", desc: "Você acumulou 500 XP.", icon: "💎", test: (s) => s.xp >= 500 },
];

export function unlockedBadges(state: GameState): Badge[] {
  return badges.filter((badge) => badge.test(state));
}

export type RegisterResult = { state: GameState; gainedXp: number; newBadges: Badge[]; streak: number; streakUp: boolean };

// Registra a conclusão de uma aula e devolve o novo estado + o que mudou (para celebrar).
export function registerLesson(prev: GameState, lessonId: string): RegisterResult {
  const today = dayKey();
  const before = unlockedBadges(prev).map((badge) => badge.id);

  let streak = prev.streak;
  let streakUp = false;
  if (prev.lastDay === today) {
    // já estudou hoje — mantém a ofensiva
    if (streak === 0) { streak = 1; streakUp = true; }
  } else if (prev.lastDay && daysBetween(prev.lastDay, today) === 1) {
    streak = prev.streak + 1;
    streakUp = true;
  } else {
    streak = 1;
    streakUp = true;
  }

  const isNewLesson = !prev.lessons.includes(lessonId);
  const gainedXp = isNewLesson ? XP_PER_LESSON : 0;

  const state: GameState = {
    xp: prev.xp + gainedXp,
    lessons: isNewLesson ? [...prev.lessons, lessonId] : prev.lessons,
    streak,
    best: Math.max(prev.best, streak),
    lastDay: today,
    seenBadges: prev.seenBadges,
  };

  const afterBadges = unlockedBadges(state);
  const newBadges = afterBadges.filter((badge) => !before.includes(badge.id) && !prev.seenBadges.includes(badge.id));
  state.seenBadges = Array.from(new Set([...prev.seenBadges, ...afterBadges.map((badge) => badge.id)]));

  return { state, gainedXp, newBadges, streak, streakUp };
}
