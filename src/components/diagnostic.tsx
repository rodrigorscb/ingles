"use client";

import Link from "next/link";
import { useState } from "react";
import { diagnosticQuestions, getPlacement } from "@/lib/course";

export function Diagnostic() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(diagnosticQuestions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const question = diagnosticQuestions[step];
  const score = answers.reduce<number>((total, answer, index) => total + (answer === diagnosticQuestions[index]?.answer ? 1 : 0), 0);
  const placement = getPlacement(score, diagnosticQuestions.length);

  function answer(value: number | null) {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
  }

  if (finished) return <section className="diagnostic-panel result-panel"><span className="result-icon">✳</span><p className="section-kicker">SUGESTÃO INICIAL · NÃO É CERTIFICAÇÃO</p><h2>Seu próximo passo pode ser o {placement.level.code}.</h2><p>Você acertou {score} de {diagnosticQuestions.length} questões ({placement.percent}%). Esta atividade curta é apenas orientativa e não valida oficialmente um nível CEFR.</p><div className="result-recommendation"><b>{placement.level.name}</b><span>{placement.hasPublishedLessons ? placement.level.description : `${placement.level.description} Este nível ainda está em desenvolvimento; para começar agora, explore o A2, nosso nível publicado mais avançado.`}</span></div><div className="hero-actions"><Link className="button button-primary" href={`/curso#${(placement.hasPublishedLessons ? placement.level : placement.recommendationLevel).code.toLowerCase()}`}>{placement.hasPublishedLessons ? `Explorar ${placement.level.code}` : "Explorar aulas disponíveis"} <span>↗</span></Link><button className="button button-quiet" onClick={() => { setAnswers(Array(diagnosticQuestions.length).fill(null)); setStep(-1); setFinished(false); setStarted(false); }}>Refazer diagnóstico</button></div></section>;

  if (!started) return <section className="diagnostic-panel diagnostic-intro"><span className="diagnostic-illustration">✳</span><p className="section-kicker">SEM NOTA · NO SEU RITMO</p><h2>Descubra por onde começar.</h2><p>São {diagnosticQuestions.length} perguntas de vocabulário e uso da língua. Responda o que souber ou escolha “não sei”. No fim, você recebe uma sugestão inicial — não uma certificação.</p><ul><li>Leva cerca de 5 minutos</li><li>Você pode refazer quando quiser</li><li>Não pedimos seus dados</li></ul><button className="button button-primary" onClick={() => { setStep(0); setStarted(true); }}>Começar diagnóstico <span>↗</span></button></section>;

  return <section className="diagnostic-panel question-panel"><div className="question-meta"><span>Pergunta {step + 1} de {diagnosticQuestions.length}</span><span>{question.level} · {question.skill}</span></div><div className="progress-track"><span style={{ width: `${((step + 1) / diagnosticQuestions.length) * 100}%` }}/></div><h2>{question.prompt}</h2><div className="answer-options">{question.options.map((option, index) => <button className={answers[step] === index ? "answer-option selected" : "answer-option"} key={option} onClick={() => answer(index)}><span className="answer-letter">{String.fromCharCode(65 + index)}</span>{option}<span className="answer-check">{answers[step] === index ? "✓" : ""}</span></button>)}</div><div className="question-controls"><button className="button button-quiet" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Voltar</button><button className="button button-quiet" onClick={() => answer(null)}>Não sei</button><button className="button button-primary" onClick={() => step === diagnosticQuestions.length - 1 ? setFinished(true) : setStep(step + 1)} disabled={false}>{step === diagnosticQuestions.length - 1 ? "Ver sugestão" : "Próxima"} <span>↗</span></button></div></section>;
}
