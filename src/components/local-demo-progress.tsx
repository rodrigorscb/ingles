"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const storageKey = "curso-ingles-demo";
const defaultState: DemoState = { learner: "Alex", completed: [], level: "A1" };
type DemoState = { learner: string; completed: string[]; level: string };

function readState(): DemoState {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) as DemoState : defaultState;
  } catch {
    return defaultState;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("curso-ingles-demo-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("curso-ingles-demo-change", callback);
  };
}

function getSnapshot() {
  return JSON.stringify(readState());
}

function getServerSnapshot() {
  return JSON.stringify(defaultState);
}

export function LocalDemoProgress() {
  const serialized = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const state = JSON.parse(serialized) as DemoState;

  function save(next: DemoState) {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event("curso-ingles-demo-change"));
  }

  function completeDemo() {
    save({ ...state, completed: state.completed.includes("hello-new-world") ? state.completed : [...state.completed, "hello-new-world"] });
  }

  return <div className="learner-dashboard"><div className="dashboard-notice"><span>i</span><p><b>Modo de demonstração.</b> Este progresso fica apenas neste navegador e não está ligado a uma conta. Não inclua dados pessoais.</p></div><div className="learner-selector"><span className="learner-avatar">A</span><div><small>PERFIL DE EXEMPLO</small><b>{state.learner}</b></div><label>Faixa sugerida<select value={state.level} onChange={(event) => save({ ...state, level: event.target.value })}><option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option><option>C2</option></select></label></div><div className="progress-overview"><div><span>UMA AULA DE AMOSTRA</span><b>{state.completed.length ? "Concluída" : "Pronta para começar"}</b><small>{state.completed.length ? "Você pode refazer quando quiser." : "Experimente uma aula demonstrativa e marque como concluída."}</small></div><div className="progress-ring"><span>{state.completed.length ? "100" : "0"}<small>%</small></span></div></div><div className="dashboard-lesson"><div className="lesson-thumb">✳</div><div><span>A1 · PRIMEIRAS CONVERSAS</span><h2>Hello, new world</h2><p>Conhecer alguém em inglês · 5 minutos</p></div><Link href="/aula/hello-new-world" className="button button-quiet">Abrir aula ↗</Link></div><button className="button button-primary" onClick={completeDemo}>{state.completed.length ? "Aula marcada como concluída ✓" : "Marcar exemplo como concluído"}</button><p className="dashboard-warning">O armazenamento local pode ser apagado pelo navegador. Para sincronizar entre dispositivos, aguarde a futura versão com conta e banco de dados.</p></div>;
}
