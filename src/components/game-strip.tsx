"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGame } from "@/components/use-game";
import { badges, rankFor, unlockedBadges } from "@/lib/gamification";

type Summary = {
  accountsEnabled: boolean;
  signedIn: boolean;
  unavailable?: boolean;
  profileName?: string;
  xp?: number;
  streak?: number;
  best?: number;
  completed?: number;
  badges?: string[];
};

export function GameStrip() {
  const local = useGame();
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/progresso/resumo", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: Summary) => { if (alive) setSummary(data); })
      .catch(() => { if (alive) setSummary({ accountsEnabled: false, signedIn: false }); });
    return () => { alive = false; };
  }, []);

  // Sem conta: convite para criar (o progresso só é salvo com conta).
  if (summary && summary.accountsEnabled && !summary.signedIn) {
    return (
      <section className="game-strip game-strip-cta" aria-label="Crie sua conta gratuita">
        <span className="game-flame" aria-hidden="true">🔥</span>
        <div className="game-cta-copy">
          <b>Ganhe XP, ofensiva diária e conquistas</b>
          <small>Crie sua conta grátis: seu progresso fica salvo no celular e no computador, e você continua sempre de onde parou.</small>
        </div>
        <div className="game-cta-actions">
          <Link className="button button-primary" href="/login?mode=signup&next=/curso">Criar conta grátis <span aria-hidden="true">↗</span></Link>
          <Link className="text-link" href="/login?mode=signin&next=/curso">Já tenho conta</Link>
        </div>
      </section>
    );
  }

  const fromServer = Boolean(summary?.signedIn);
  const loading = summary === null;
  const xp = fromServer ? summary?.xp ?? 0 : local.xp;
  const streak = fromServer ? summary?.streak ?? 0 : local.streak;
  const completed = fromServer ? summary?.completed ?? 0 : local.lessons.length;
  const unlockedIds = fromServer ? summary?.badges ?? [] : unlockedBadges(local).map((badge) => badge.id);
  const { rank, next } = rankFor(xp);
  const toNext = next ? Math.max(0, next.min - xp) : 0;
  const pct = next ? Math.min(100, Math.round(((xp - rank.min) / (next.min - rank.min)) * 100)) : 100;

  return (
    <section className={loading ? "game-strip is-loading" : "game-strip"} aria-label="Seu progresso no curso" aria-busy={loading}>
      <div className="game-stat game-stat-xp">
        <span className="game-rank-icon" aria-hidden="true">{rank.icon}</span>
        <div>
          <b>{loading ? "—" : `${xp} XP`}</b>
          <small>{rank.name}{next ? ` · faltam ${toNext} para ${next.name}` : " · nível máximo"}</small>
          <span className="game-xp-track"><i style={{ width: `${loading ? 0 : pct}%` }} /></span>
        </div>
      </div>

      <div className="game-stat game-stat-streak">
        <span className="game-flame" aria-hidden="true">🔥</span>
        <div>
          <b>{loading ? "—" : `${streak} ${streak === 1 ? "dia" : "dias"}`}</b>
          <small>{streak > 0 ? "de ofensiva — volte amanhã!" : "comece sua ofensiva hoje"}</small>
        </div>
      </div>

      <div className="game-stat game-stat-badges">
        <span className="game-trophy" aria-hidden="true">🏅</span>
        <div>
          <b>{loading ? "—" : `${unlockedIds.length} / ${badges.length}`}</b>
          <small>conquistas{fromServer && summary?.profileName ? ` · ${summary.profileName}` : ""}</small>
          <div className="game-badge-row" aria-hidden="true">
            {badges.slice(0, 8).map((badge) => {
              const got = unlockedIds.includes(badge.id);
              return <span key={badge.id} className={got ? "game-badge-dot got" : "game-badge-dot"} title={got ? `${badge.name} — ${badge.desc}` : "Conquista bloqueada"}>{got ? badge.icon : "·"}</span>;
            })}
          </div>
        </div>
      </div>

      {!loading && completed === 0 && (
        <Link className="game-cta" href="/aula/hello-new-world">Comece sua primeira aula ↗</Link>
      )}
      {!loading && completed > 0 && fromServer && (
        <Link className="game-cta" href="/progresso">Ver meu progresso ↗</Link>
      )}
    </section>
  );
}
