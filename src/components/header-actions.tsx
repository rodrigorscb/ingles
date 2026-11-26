"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type SessionState = "unknown" | "in" | "out";

export function HeaderActions() {
  const [state, setState] = useState<SessionState>("unknown");

  useEffect(() => {
    let supabase: ReturnType<typeof createSupabaseBrowserClient>;
    try {
      supabase = createSupabaseBrowserClient();
    } catch {
      setState("out");
      return;
    }
    supabase.auth.getSession().then(({ data }) => setState(data.session ? "in" : "out")).catch(() => setState("out"));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setState(session ? "in" : "out"));
    return () => data.subscription.unsubscribe();
  }, []);

  if (state === "in") {
    return (
      <div className="header-actions">
        <Link className="header-login" href="/progresso">Meu progresso</Link>
        <Link className="header-cta" href="/progresso">Continuar curso <span aria-hidden="true">↗</span></Link>
      </div>
    );
  }

  return (
    <div className="header-actions">
      <Link className="header-login" href="/login?mode=signin">Entrar</Link>
      <Link className="header-cta" href="/login?mode=signup">Criar conta grátis <span aria-hidden="true">↗</span></Link>
    </div>
  );
}
