"use client";

import { useEffect, useState } from "react";
import { SpeechButton } from "@/components/speech-button";
import type { LessonExercise } from "@/lib/course";

const normalize = (s: string) =>
  s.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[.,!?;:]+$/g, "").replace(/\s+/g, " ");

type Props = { exercise: LessonExercise; index: number; resolved: boolean; onResolve: (index: number, ok: boolean) => void };

export function LessonExerciseItem({ exercise, index, resolved, onResolve }: Props) {
  const kind = exercise.type ?? "choice";
  const num = String(index + 1).padStart(2, "0");

  // --- Escolha e compreensão de áudio ---
  const [selected, setSelected] = useState<number | null>(null);
  // --- Completar digitando ---
  const [value, setValue] = useState("");
  const [fillChecked, setFillChecked] = useState<boolean | null>(null);
  // --- Ordenar palavras ---
  const words = exercise.words ?? [];
  const [order, setOrder] = useState<number[]>(words.map((_, i) => i));
  const [built, setBuilt] = useState<number[]>([]);
  const [orderChecked, setOrderChecked] = useState<boolean | null>(null);
  // --- Escrita ---
  const [text, setText] = useState("");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (kind === "order") setOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, [kind]);

  if (kind === "choice" || kind === "listen") {
    const correctIndex = typeof exercise.answer === "number" ? exercise.answer : 0;
    const isCorrect = selected === correctIndex;
    return (
      <fieldset className="practice-question">
        <legend><span>{num}</span>{exercise.prompt}</legend>
        {kind === "listen" && exercise.audio && (
          <div className="exercise-audio"><SpeechButton text={exercise.audio} label="▶ Ouvir o áudio" /><small>Ouça quantas vezes quiser e escolha a resposta.</small></div>
        )}
        <div className="practice-options">
          {(exercise.options ?? []).map((option, optionIndex) => (
            <button key={option} type="button" className={`practice-option${selected === optionIndex ? (optionIndex === correctIndex ? " correct" : " incorrect") : ""}`} aria-pressed={selected === optionIndex}
              onClick={() => { setSelected(optionIndex); if (optionIndex === correctIndex) onResolve(index, true); }}>
              <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>{option}
              {selected === optionIndex && <span className="option-feedback">{optionIndex === correctIndex ? "Correto" : "Tente outra vez"}</span>}
            </button>
          ))}
        </div>
        {selected !== null && exercise.explanation && <p className={isCorrect ? "answer-explanation right" : "answer-explanation"} role="status">{isCorrect ? `✓ ${exercise.explanation}` : `Uma pista: ${exercise.explanation}`}</p>}
      </fieldset>
    );
  }

  if (kind === "fill") {
    const accepted = Array.isArray(exercise.answer) ? exercise.answer : [String(exercise.answer ?? "")];
    const check = () => { const ok = accepted.some((a) => normalize(a) === normalize(value)); setFillChecked(ok); if (ok) onResolve(index, true); };
    return (
      <fieldset className="practice-question">
        <legend><span>{num}</span>{exercise.prompt}</legend>
        <div className="exercise-fill">
          {exercise.before && <span>{exercise.before}</span>}
          <input type="text" value={value} onChange={(e) => { setValue(e.target.value); setFillChecked(null); }} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); check(); } }}
            placeholder="digite aqui" aria-label="Sua resposta" disabled={resolved}
            className={fillChecked === true ? "fill-input correct" : fillChecked === false ? "fill-input incorrect" : "fill-input"} />
          {exercise.after && <span>{exercise.after}</span>}
          <button type="button" className="exercise-check" onClick={check} disabled={resolved || !value.trim()}>Verificar</button>
        </div>
        {fillChecked === true && exercise.explanation && <p className="answer-explanation right" role="status">✓ {exercise.explanation}</p>}
        {fillChecked === false && <p className="answer-explanation" role="status">Quase! A resposta é <b>{accepted[0]}</b>. {exercise.explanation}</p>}
      </fieldset>
    );
  }

  if (kind === "order") {
    const sentence = built.map((b) => words[order[b]]).join(" ");
    const add = (slot: number) => { if (built.includes(slot)) return; setBuilt([...built, slot]); setOrderChecked(null); };
    const reset = () => { setBuilt([]); setOrderChecked(null); };
    const check = () => { const ok = normalize(sentence) === normalize(String(exercise.answer ?? "")); setOrderChecked(ok); if (ok) onResolve(index, true); };
    return (
      <fieldset className="practice-question">
        <legend><span>{num}</span>{exercise.prompt}</legend>
        <div className={orderChecked === true ? "order-answer correct" : orderChecked === false ? "order-answer incorrect" : "order-answer"}>{sentence || <span className="order-placeholder">Toque nas palavras na ordem certa</span>}</div>
        <div className="order-words">{order.map((_, slot) => (
          <button key={slot} type="button" className="order-chip" disabled={built.includes(slot) || resolved} onClick={() => add(slot)}>{words[order[slot]]}</button>
        ))}</div>
        <div className="order-actions">
          <button type="button" className="exercise-check" onClick={check} disabled={built.length !== words.length || resolved}>Verificar</button>
          <button type="button" className="order-reset" onClick={reset} disabled={resolved || built.length === 0}>Limpar</button>
        </div>
        {orderChecked === true && <p className="answer-explanation right" role="status">✓ {exercise.explanation ?? "Frase correta!"}</p>}
        {orderChecked === false && <p className="answer-explanation" role="status">A ordem ainda não está certa — tente de novo.</p>}
      </fieldset>
    );
  }

  if (kind === "speak") {
    return (
      <fieldset className="practice-question">
        <legend><span>{num}</span>{exercise.prompt}</legend>
        <div className="exercise-speak">
          <p className="speak-target">{exercise.target}</p>
          <SpeechButton text={exercise.target ?? ""} label="▶ Ouvir" />
          <small>{exercise.tip ?? "Ouça e repita em voz alta algumas vezes."}</small>
        </div>
        <button type="button" className="selfcheck-btn" onClick={() => onResolve(index, true)} disabled={resolved}>{resolved ? "Praticado ✓" : "Já pratiquei em voz alta"}</button>
      </fieldset>
    );
  }

  // write
  return (
    <fieldset className="practice-question">
      <legend><span>{num}</span>{exercise.prompt}</legend>
      <textarea className="write-area" value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Escreva a sua resposta aqui…" disabled={resolved} />
      {exercise.tip && <small className="write-tip">{exercise.tip}</small>}
      {!revealed ? (
        <button type="button" className="exercise-check" onClick={() => setRevealed(true)} disabled={!text.trim()}>Ver resposta-modelo</button>
      ) : (
        <>
          <div className="write-model"><small>Resposta-modelo — compare com a sua</small><p>{exercise.model}</p></div>
          <button type="button" className="selfcheck-btn" onClick={() => onResolve(index, true)} disabled={resolved}>{resolved ? "Concluído ✓" : "Comparei — marcar como feito"}</button>
        </>
      )}
    </fieldset>
  );
}
