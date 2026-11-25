"use client";

import Link from "next/link";
import { useGame } from "@/components/use-game";
import { badges, rankFor, unlockedBadges } from "@/lib/gamification";

export function GameStrip() {
  const game = useGame();
  const { rank, next } = rankFor(game.xp);
  const unlocked = unlockedBadges(game);
  const toNext = next ? Math.max(0, next.min - game.xp) : 0;
  const pct = next ? Math.min(100, Math.round(((game.xp - rank.min) / (next.min - rank.min)) * 100)) : 100;
  const started = game.xp > 0 || game.lessons.length > 0;

  return (
    <section className="game-strip" aria-label="Seu progresso no curso">
      <div className="game-stat game-stat-xp">
        <span className="game-rank-icon" aria-hidden="true">{rank.icon}</span>
        <div>
          <b>{game.xp} XP</b>
          <small>{rank.name}{next ? ` · faltam ${toNext} para ${next.name}` : " · nível máximo"}</small>
          <span className="game-xp-track"><i style={{ width: `${pct}%` }} /></span>
        </div>
      </div>

      <div className="game-stat game-stat-streak">
        <span className="game-flame" aria-hidden="true">🔥</span>
        <div>
          <b>{game.streak} {game.streak === 1 ? "dia" : "dias"}</b>
          <small>{game.streak > 0 ? "de ofensiva — volte amanhã!" : "comece sua ofensiva hoje"}</small>
        </div>
      </div>

      <div className="game-stat game-stat-badges">
        <span className="game-trophy" aria-hidden="true">🏅</span>
        <div>
          <b>{unlocked.length} / {badges.length}</b>
          <small>conquistas</small>
          <div className="game-badge-row" aria-hidden="true">
            {badges.slice(0, 8).map((badge) => {
              const got = unlocked.some((item) => item.id === badge.id);
              return <span key={badge.id} className={got ? "game-badge-dot got" : "game-badge-dot"} title={got ? `${badge.name} — ${badge.desc}` : "Conquista bloqueada"}>{got ? badge.icon : "·"}</span>;
            })}
          </div>
        </div>
      </div>

      {!started && (
        <Link className="game-cta" href="#a1">Conclua uma aula para ganhar XP ↗</Link>
      )}
    </section>
  );
}
