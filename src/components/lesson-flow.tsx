"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SpeechButton } from "@/components/speech-button";
import { recordLesson } from "@/components/use-game";
import type { RegisterResult } from "@/lib/gamification";
import { LessonExerciseItem } from "@/components/lesson-exercise";
import { augmentPractice } from "@/lib/lesson-practice";
import { a1Modules, a2Modules, c2Modules, type Lesson } from "@/lib/course";
import { b1Modules } from "@/lib/next-b1-lessons";
import { b2Modules } from "@/lib/next-b2-lessons";
import { c1PublishedModules } from "@/lib/course";
import type { CourseLessonLevel } from "@/lib/published-lessons";

type Props = { lesson: Lesson; index: number; level: CourseLessonLevel; sequence: Lesson[]; initialCompleted: boolean; profileId?: string };
type SaveState = "idle" | "saving" | "saved" | "error";

export function LessonFlow({ lesson, index, level, sequence, initialCompleted, profileId }: Props) {
  const practice = useMemo(() => augmentPractice(lesson), [lesson]);
  const [results, setResults] = useState<boolean[]>(Array(practice.length).fill(false));
  const [completed, setCompleted] = useState(initialCompleted);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [busy, setBusy] = useState(false);
  const [celebration, setCelebration] = useState<RegisterResult | null>(null);

  async function finishLesson() {
    setCompleted(true);
    if (!profileId) {
      try {
        const key = "curso-ingles-demo";
        const current = JSON.parse(localStorage.getItem(key) || '{"learner":"Alex","completed":[],"level":"A1"}') as { learner: string; completed: string[]; level: string };
        if (!current.completed.includes(lesson.id)) current.completed.push(lesson.id);
        localStorage.setItem(key, JSON.stringify(current));
        window.dispatchEvent(new Event("curso-ingles-demo-change"));
        setSaveState("saved");
        setCelebration(recordLesson(lesson.id));
      } catch {
        setSaveState("error");
      }
      return;
    }
    setBusy(true);
    setSaveState("saving");
    try {
      const response = await fetch("/api/progresso/aula", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId, lessonId: lesson.id }),
      });
      if (!response.ok) throw new Error("save failed");
      setSaveState("saved");
      setCelebration(recordLesson(lesson.id));
    } catch {
      setSaveState("error");
      setCompleted(initialCompleted);
    } finally {
      setBusy(false);
    }
  }

  function handleResolve(exerciseIndex: number, ok: boolean) {
    if (!ok) return;
    setResults((prev) => { if (prev[exerciseIndex]) return prev; const next = [...prev]; next[exerciseIndex] = true; return next; });
  }

  const currentModules = level === "A1" ? a1Modules : level === "A2" ? a2Modules : level === "B1" ? b1Modules : level === "B2" ? b2Modules : level === "C1" ? c1PublishedModules : level === "C2" ? c2Modules : [];
  const currentModule = currentModules.find((module) => module.lessons.some((item) => item.slug === lesson.slug));
  const currentSequence = sequence;
  const localIndex = index;
  const nextLesson = currentSequence[localIndex + 1];
  const previousLesson = currentSequence[localIndex - 1];
  const total = practice.length;
  const resolvedCount = results.filter(Boolean).length;
  const readyToFinish = total === 0 ? true : results.every(Boolean);

  return <div className="lesson-workspace">
    {celebration && <div className="game-celebration" role="dialog" aria-label="Aula concluída">
      <div className="confetti" aria-hidden="true">{Array.from({ length: 16 }).map((_, i) => <span key={i} style={{ left: `${(i * 6.25) % 100}%`, animationDelay: `${(i % 6) * 0.12}s`, background: ["#f4c430", "#2d8a69", "#315eea", "#e8b61f"][i % 4] }} />)}</div>
      <div className="game-celebration-card">
        <span className="celebrate-emoji" aria-hidden="true">🎉</span>
        <h2>Aula concluída!</h2>
        <div className="celebrate-rewards">{celebration.gainedXp > 0 && <span className="reward-xp">+{celebration.gainedXp} XP</span>}<span className="reward-streak">🔥 {celebration.streak} {celebration.streak === 1 ? "dia" : "dias"} de ofensiva</span></div>
        {celebration.newBadges.length > 0 && <div className="celebrate-badges"><small>Nova conquista desbloqueada!</small><div>{celebration.newBadges.map((badge) => <span key={badge.id} className="celebrate-badge">{badge.icon} {badge.name}</span>)}</div></div>}
        <div className="celebrate-actions">{nextLesson ? <Link href={`/aula/${nextLesson.slug}`} className="button button-primary" onClick={() => setCelebration(null)}>Próxima aula →</Link> : <Link href="/curso" className="button button-primary" onClick={() => setCelebration(null)}>Voltar à trilha →</Link>}<button type="button" className="button button-quiet" onClick={() => setCelebration(null)}>Fechar</button></div>
      </div>
    </div>}
    <aside className="lesson-sidebar" aria-label="Aulas do módulo">
      <Link href="/curso" className="lesson-back">← Trilha {level}</Link>
      <p className="lesson-side-title">{currentModule?.title ?? `Trilha ${level}`}</p>
      <ol className="lesson-steps">{currentSequence.map((item, itemIndex) => <li key={item.id} className={item.slug === lesson.slug ? "current" : ""}><Link href={`/aula/${item.slug}`} aria-current={item.slug === lesson.slug ? "step" : undefined}><span className="step-mark">{item.slug === lesson.slug ? String(index + 1).padStart(2, "0") : String(itemIndex + 1).padStart(2, "0")}</span><span>{item.title}<small>{item.duration} min</small></span></Link></li>)}</ol>
      <div className="lesson-side-progress"><span>{currentSequence.filter((_, itemIndex) => itemIndex < localIndex || (itemIndex === localIndex && completed)).length} de {currentSequence.length} aulas</span><span className="side-progress-track"><i style={{ width: `${Math.round((currentSequence.filter((_, itemIndex) => itemIndex < localIndex || (itemIndex === localIndex && completed)).length / currentSequence.length) * 100)}%` }} /></span></div>
    </aside>

    <article className="lesson-main">
      <header className="lesson-topline"><span>{level} · {lesson.focus}</span><span>{lesson.duration} min</span></header>
      <p className="lesson-count">Aula {String(index + 1).padStart(2, "0")} de {sequence.length}</p>
      <h1>{lesson.title}</h1>
      <p className="lesson-subtitle">{lesson.subtitle}</p>
      <section className="lesson-goal"><span className="goal-icon" aria-hidden="true">✳</span><div><small>Ao final desta aula</small><p>{lesson.objective}</p></div></section>
      <p className="lesson-intro">{lesson.intro}</p>

      <section className="lesson-section" aria-labelledby="learn-title"><div className="lesson-section-title"><span className="lesson-section-mark">1</span><div><small>Escute e observe</small><h2 id="learn-title">Frases para levar com você</h2></div></div>
        <div className="lesson-phrase-list">{lesson.phrases.map((phrase, phraseIndex) => <article className="lesson-phrase" key={phrase.english}><span className="phrase-index">{String(phraseIndex + 1).padStart(2, "0")}</span><div className="phrase-copy"><p className="phrase-en">{phrase.english}</p><p className="phrase-pt">{phrase.portuguese}</p><p className="phrase-explain">{phrase.note}</p></div><SpeechButton text={phrase.english} label="Ouvir" /></article>)}</div>
      </section>

      <section className="lesson-section" aria-labelledby="grammar-title"><div className="lesson-section-title"><span className="lesson-section-mark">2</span><div><small>Entenda o padrão</small><h2 id="grammar-title">{lesson.grammar.title}</h2></div></div><p className="grammar-explanation">{lesson.grammar.explanation}</p><div className="grammar-examples">{lesson.grammar.examples.map((example) => <div className="grammar-example" key={example.english}><SpeechButton text={example.english} label="Ouvir" /><p>{example.english}</p><span>{example.portuguese}</span></div>)}</div></section>

      <section className="lesson-section practice-section" aria-labelledby="practice-title"><div className="lesson-section-title"><span className="lesson-section-mark">3</span><div><small>Agora é sua vez</small><h2 id="practice-title">Pratique para lembrar</h2></div></div><p className="practice-intro">Complete as atividades abaixo — pode haver escolha, áudio, ordenar, completar, falar e escrever.</p><div className="practice-questions">{practice.map((question, questionIndex) => <LessonExerciseItem key={questionIndex} exercise={question} index={questionIndex} resolved={results[questionIndex]} onResolve={handleResolve} />)}</div>{total > 0 && resolvedCount === total && <p className="practice-score" role="status">Você completou todas as {total} atividades. Excelente — agora é só concluir.</p>}</section>

      <section className="lesson-takeaway"><small>Guarde esta estrutura</small><p>{lesson.takeaway}</p><SpeechButton text={lesson.takeaway} label="Ouvir o resumo" /></section>

      <div className="lesson-completion"><div><h2>{completed ? "Aula concluída" : "Fez sentido?"}</h2><p>{saveState === "saved" ? profileId ? "Seu progresso foi salvo neste perfil." : "Esta aula foi marcada no progresso deste navegador." : saveState === "error" ? "Não foi possível salvar agora. Confira sua conexão e tente de novo." : readyToFinish ? "Você completou todas as atividades. Salve a conclusão no seu progresso." : total > 0 ? `Você completou ${resolvedCount} de ${total} atividades. Finalize as restantes para concluir.` : "Pronto para concluir esta aula."}</p></div><button type="button" className="button button-primary" onClick={finishLesson} disabled={busy || completed || !readyToFinish}>{busy ? "Salvando…" : completed ? "Concluída ✓" : !readyToFinish ? "Complete as atividades para concluir" : "Concluir aula"}</button></div>

      <nav className="lesson-navigation" aria-label="Navegação entre aulas">{previousLesson ? <Link href={`/aula/${previousLesson.slug}`} className="lesson-prev"><small>Aula anterior</small><span>← {previousLesson.title}</span></Link> : <Link href="/curso" className="lesson-prev"><small>Trilha</small><span>← Voltar ao módulo</span></Link>}{nextLesson ? <Link href={`/aula/${nextLesson.slug}`} className="lesson-next"><small>Próxima aula</small><span>{nextLesson.title} →</span></Link> : <Link href="/curso" className="lesson-next"><small>Módulo concluído</small><span>Revisar sua trilha →</span></Link>}</nav>
    </article>
  </div>;
}
