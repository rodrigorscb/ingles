"use client";

import { useSyncExternalStore } from "react";
import { emptyGame, registerLesson, type GameState, type RegisterResult } from "@/lib/gamification";

const KEY = "curso-ingles-game";
const CHANGE_EVENT = "curso-ingles-game-change";

function read(): GameState {
  try {
    const saved = window.localStorage.getItem(KEY);
    return saved ? { ...emptyGame, ...(JSON.parse(saved) as Partial<GameState>) } : emptyGame;
  } catch {
    return emptyGame;
  }
}

function write(state: GameState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // armazenamento indisponível — a gamificação é opcional
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

const serverSnapshot = JSON.stringify(emptyGame);

export function useGame(): GameState {
  const serialized = useSyncExternalStore(subscribe, () => JSON.stringify(read()), () => serverSnapshot);
  return JSON.parse(serialized) as GameState;
}

// Registra a conclusão de uma aula e persiste; devolve o que celebrar.
export function recordLesson(lessonId: string): RegisterResult {
  const result = registerLesson(read(), lessonId);
  write(result.state);
  return result;
}
