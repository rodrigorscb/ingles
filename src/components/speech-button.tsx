"use client";

import { useState } from "react";

export function SpeechButton({ text, label = "Ouvir pronúncia" }: { text: string; label?: string }) {
  const [message, setMessage] = useState("");

  function speak() {
    if (!("speechSynthesis" in window)) {
      setMessage("Seu navegador não oferece leitura de voz. Leia a frase em voz alta e pratique no seu ritmo.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
    setMessage("Reproduzindo em inglês americano.");
  }

  return <span className="speech-control"><button className="listen-button" type="button" onClick={speak} aria-label={`${label}: ${text}`}><span aria-hidden="true">▶</span> {label}</button>{message && <span className="sr-only" aria-live="polite">{message}</span>}</span>;
}
