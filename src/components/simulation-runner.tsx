"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAnswerCorrect, type Simulation, type SimulationQuestion } from "@/lib/simulation-types";

type Answer = number | string | null;

function clock(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remaining = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function isAnswered(answer: Answer) {
  return typeof answer === "number" || (typeof answer === "string" && answer.trim() !== "");
}

function answerText(question: SimulationQuestion, answer: Answer) {
  if (typeof answer === "string" && answer.trim()) return answer.trim();
  if (typeof answer === "number") return question.options[answer] ?? "Sem resposta";
  return "Sem resposta";
}

function correctText(question: SimulationQuestion) {
  if (question.type === "text") return (question.accepted ?? []).join(" / ");
  return question.options[question.answer];
}

export function SimulationRunner({ simulation }: { simulation: Simulation }) {
  const total = simulation.questions.length;
  const [answers, setAnswers] = useState<Answer[]>(Array(total).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [started, setStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(simulation.duration * 60);
  const score = answers.reduce<number>((sum, answer, index) => sum + (isAnswerCorrect(simulation.questions[index], answer) ? 1 : 0), 0);
  const percentage = Math.round((score / total) * 100);
  const answeredCount = answers.filter(isAnswered).length;
  const unanswered = total - answeredCount;
  const isSubmitted = submitted || (started && timerEnabled && secondsLeft <= 0);

  useEffect(() => {
    if (!started || submitted || !timerEnabled || secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft, started, submitted, timerEnabled]);

  function setAnswer(index: number, value: Answer) {
    setAnswers((current) => current.map((answer, answerIndex) => (answerIndex === index ? value : answer)));
  }

  function reset() {
    setAnswers(Array(total).fill(null));
    setSubmitted(false);
    setStarted(false);
    setSecondsLeft(simulation.duration * 60);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (isSubmitted) return <section className="simulation-shell simulation-results" aria-live="polite">
    <div className="simulation-score-line"><span className="simulation-score">{score}<small> / {total}</small></span><span className="simulation-percent">{percentage}%<small> de acerto</small></span></div>
    <h2>{percentage >= 80 ? "Ótimo desempenho. Continue refinando." : percentage >= 60 ? "Uma base promissora. Revise os pontos abaixo." : "Use o feedback para escolher seu próximo treino."}</h2>
    <p className="simulation-caveat">{simulation.scoringNote}</p>
    {unanswered > 0 && <p className="simulation-caveat">{unanswered} {unanswered === 1 ? "questão ficou sem resposta" : "questões ficaram sem resposta"}; elas contam como incorretas neste resultado.</p>}
    <div className="simulation-review"><h3>Correção comentada</h3>{simulation.questions.map((question, index) => {
      const correct = isAnswerCorrect(question, answers[index]);
      return <article className={`simulation-review-item ${correct ? "is-correct" : "is-incorrect"}`} key={`${index}-${question.skill}`}>
        <div className="simulation-review-head"><span>Questão {index + 1}{question.partLabel ? ` · ${question.partLabel}` : ""} · {question.skill}</span><b>{correct ? "Acertou" : "Revise"}</b></div>
        <p className="simulation-review-prompt">{question.prompt}</p>
        <p className="simulation-answer"><strong>Sua resposta:</strong> {answerText(question, answers[index])}</p>
        {(!correct || question.type === "text") && <p className="simulation-answer"><strong>{question.type === "text" ? "Respostas aceitas:" : "Resposta correta:"}</strong> {correctText(question)}</p>}
        <p className="simulation-explanation">{question.explanation}</p>
      </article>;
    })}</div>
    <div className="simulation-result-actions"><button className="button button-primary" onClick={reset}>Tentar novamente</button><Link className="button button-quiet" href="/simulados">Escolher outro simulado</Link></div>
  </section>;

  if (!started) return <section className="simulation-shell simulation-start-panel">
    <h2>Como você quer praticar?</h2>
    <p>{simulation.durationNote}</p>
    <label className="simulation-timer-choice"><input type="checkbox" checked={timerEnabled} onChange={(event) => setTimerEnabled(event.target.checked)}/><span><b>Usar cronômetro</b><small>{simulation.duration} minutos, seguindo a recomendação para esta prova.</small></span></label>
    <button className="button button-primary" onClick={() => { setSecondsLeft(simulation.duration * 60); setStarted(true); }}>Começar simulado</button>
  </section>;

  return <form className="simulation-shell" onSubmit={(event) => {
    event.preventDefault();
    if (unanswered > 0 && !window.confirm(`Ainda faltam ${unanswered} ${unanswered === 1 ? "questão" : "questões"}. Deseja finalizar mesmo assim?`)) return;
    setSubmitted(true);
  }}>
    <div className="simulation-progress"><span>{timerEnabled ? "Tempo de prova" : "Sem cronômetro"} · {answeredCount} / {total} respondidas</span>{timerEnabled && <span className={secondsLeft <= 300 ? "simulation-clock is-low" : "simulation-clock"} role="timer" aria-live="off">{clock(secondsLeft)}</span>}</div>
    {simulation.questions.map((question, index) => {
      const previous = simulation.questions[index - 1];
      const startsPart = index === 0 || previous?.part !== question.part;
      const sharesPassage = Boolean(question.passage) && previous?.passage === question.passage;
      let lastSharedIndex = index;
      while (question.passage && simulation.questions[lastSharedIndex + 1]?.passage === question.passage) lastSharedIndex += 1;
      const span = lastSharedIndex - index;
      const passageHeading = span === 0 ? `Texto para a questão ${index + 1}` : span === 1 ? `Texto para as questões ${index + 1} e ${lastSharedIndex + 1}` : `Texto para as questões ${index + 1} a ${lastSharedIndex + 1}`;
      const compactOptions = question.options.length > 0 && question.options.every((option) => option.length <= 4);
      return <div className="simulation-question" key={`${index}-${question.skill}`}>
        {startsPart && <div className="simulation-part-head"><p className="simulation-part-label">{question.partLabel ?? `Bloco ${question.part}`}</p>{question.partInstruction && <p className="simulation-part-instruction" lang="en">{question.partInstruction}</p>}</div>}
        {question.passage && !sharesPassage && <div className="simulation-passage-block"><p className="simulation-passage-label">{passageHeading}{question.passageLabel ? ` · ${question.passageLabel}` : ""}</p><blockquote className="simulation-passage" lang="en">{question.passage}</blockquote></div>}
        {sharesPassage && <p className="simulation-passage-ref">Use o texto acima.</p>}
        <fieldset><legend><span className="simulation-question-number">{String(index + 1).padStart(2, "0")}</span><span>{question.prompt}</span></legend>
          {question.type === "text"
            ? <input className="simulation-text-answer" type="text" lang="en" autoComplete="off" autoCapitalize="none" spellCheck={false} aria-label={`Resposta da questão ${index + 1}`} placeholder="Digite sua resposta" value={typeof answers[index] === "string" ? answers[index] as string : ""} onChange={(event) => setAnswer(index, event.target.value)}/>
            : <div className={compactOptions ? "simulation-options is-compact" : "simulation-options"}>{question.options.map((option, optionIndex) => <label className={answers[index] === optionIndex ? "simulation-option selected" : "simulation-option"} key={optionIndex}><input type="radio" name={`q-${index}`} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => setAnswer(index, optionIndex)}/><span className="simulation-option-letter">{compactOptions ? option : String.fromCharCode(65 + optionIndex)}</span>{!compactOptions && <span>{option}</span>}</label>)}</div>}
        </fieldset>
      </div>;
    })}
    <div className="simulation-submit"><p>{unanswered === 0 ? "Você respondeu todas as questões." : `Ainda faltam ${unanswered} ${unanswered === 1 ? "questão" : "questões"}.`} O resultado é apenas deste exercício, não uma nota oficial.</p><button className="button button-primary" type="submit">Finalizar e ver correção</button></div>
  </form>;
}
