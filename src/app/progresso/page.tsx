import type { Metadata } from "next";
import Link from "next/link";
import { createLearnerProfile } from "@/app/auth/profile-actions";
import { LocalDemoProgress } from "@/components/local-demo-progress";
import { a1Lessons, a1Modules, a2Lessons, a2Modules, b1Modules, b2Modules, c1PublishedModules, c2Modules } from "@/lib/course";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureLearnerProfiles } from "@/lib/learner-profile";

export const metadata: Metadata = { title: "Seu progresso", robots: { index: false, follow: false } };
type Props = { searchParams: Promise<{ profile?: string; error?: string; saved?: string }> };

function logAuthFailure(context: string, error: unknown) {
  console.error(`[auth] ${context}:`, error instanceof Error ? error.name : "unknown error");
}
const levelNames: Record<string, string> = { A1: "Primeiros passos", A2: "Construindo frases", B1: "Mais autonomia", B2: "Conversas com confiança", C1: "Inglês avançado", C2: "Domínio e nuance" };

export default async function ProgressPage({ searchParams }: Props) {
  const params = await searchParams;
  let signedIn = false;
  let profiles: { id: string; display_name: string; age_band: string; suggested_level: string }[] = [];
  let completedIds: string[] = [];
  let accountUnavailable = params.error === "unavailable" || params.error === "profile-error";

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data: auth, error: authError } = await supabase.auth.getClaims();
      if (authError) throw authError;
      if (auth?.claims?.sub) {
        signedIn = true;
        await ensureLearnerProfiles(supabase, auth.claims.sub);
        const { data, error: profilesError } = await supabase.from("learner_profiles").select("id, display_name, age_band, suggested_level").order("created_at", { ascending: true });
        if (profilesError) throw profilesError;
        profiles = data || [];
        const selectedId = profiles.find((profile) => profile.id === params.profile)?.id || profiles[0]?.id;
        if (selectedId) {
          const { data: progress, error: progressError } = await supabase.from("lesson_progress").select("lesson_id").eq("learner_profile_id", selectedId);
          if (progressError) throw progressError;
          completedIds = (progress || []).map((entry) => entry.lesson_id);
        }
      }
    } catch (error) {
      accountUnavailable = true;
      logAuthFailure("Unable to load account progress", error);
    }
  }

  if (!signedIn) return <main className="inner-page"><div className="wrap inner-wrap"><div className="inner-heading"><p className="section-kicker">SEU CADERNO</p><h1>Um passo de cada vez.</h1><p>Entre com a conta do responsável para sincronizar perfis e progresso entre dispositivos. Você também pode experimentar a demonstração local.</p>{accountUnavailable && <p className="form-message form-error" role="alert">O serviço de contas está temporariamente indisponível. Tente novamente mais tarde.</p>}<Link className="button button-primary" href="/login?next=/progresso">Entrar ou criar conta <span>↗</span></Link></div><LocalDemoProgress /></div></main>;

  const selected = profiles.find((profile) => profile.id === params.profile) || profiles[0];
  const ageNames: Record<string, string> = { child_8_12: "8–12 anos", teen_13_17: "13–17 anos", adult: "18+ anos" };
  const publishedLessons = [...a1Lessons, ...a2Lessons, ...b1Modules.flatMap((module) => module.lessons), ...b2Modules.flatMap((module) => module.lessons), ...c1PublishedModules.flatMap((module) => module.lessons), ...c2Modules.flatMap((module) => module.lessons)];
  const publishedModules = [...a1Modules, ...a2Modules, ...b1Modules, ...b2Modules, ...c1PublishedModules, ...c2Modules];
  const nextLesson = publishedLessons.find((lesson) => !completedIds.includes(lesson.id));
  const courseCompleted = publishedLessons.filter((lesson) => completedIds.includes(lesson.id)).length;
  const moduleCounts = publishedModules.map((module) => ({ module, completed: module.lessons.filter((lesson) => completedIds.includes(lesson.id)).length }));
  return <main className="inner-page"><div className="wrap inner-wrap"><div className="inner-heading"><p className="section-kicker">CONTA DO RESPONSÁVEL</p><h1>Um passo de cada vez.</h1><p>Os perfis e conclusões desta página são carregados da sua conta Supabase.</p></div>
    {accountUnavailable && <p className="form-message form-error" role="alert">Não foi possível carregar os dados da conta agora. Tente novamente em alguns instantes.</p>}
    {params.error && <p className="form-message form-error" role="alert">{params.error === "profile-limit" ? "Sua conta já tem o limite de 3 perfis." : params.error === "profile-validation" ? "Confira o nome, a faixa etária e o nível selecionados." : params.error === "profile-create" || params.error === "progress-save" ? "O serviço de contas está temporariamente indisponível. Tente novamente mais tarde." : "Não foi possível salvar. Atualize e tente novamente."}</p>}
    {params.saved && <p className="form-message form-success" role="status">A aula foi marcada como concluída neste perfil.</p>}
    <section className="family-panel"><div className="family-heading"><div><p className="section-kicker">PERFIS DE APRENDIZAGEM</p><h2>Uma família, até três jornadas.</h2></div><span>{profiles.length}/3</span></div>
      {profiles.map((profile) => <Link className={profile.id === selected?.id ? "family-profile selected" : "family-profile"} key={profile.id} href={`/progresso?profile=${profile.id}`}><span className="learner-avatar">{profile.display_name.slice(0, 1).toUpperCase()}</span><span><b>{profile.display_name}</b><small>{ageNames[profile.age_band] || "Perfil"} · {profile.suggested_level} — {levelNames[profile.suggested_level]}</small></span><span className="family-arrow">{profile.id === selected?.id ? "✓" : "↗"}</span></Link>)}
      {profiles.length < 3 && <form className="profile-create" action={createLearnerProfile}><p>Adicionar perfil de aprendizagem</p><label>Nome de exibição<input name="displayName" maxLength={40} placeholder="Ex.: Sam" required /></label><label>Faixa etária<select name="ageBand" defaultValue="adult"><option value="adult">18 anos ou mais</option><option value="teen_13_17">13–17 anos</option><option value="child_8_12">8–12 anos</option></select></label><label>Nível inicial<select name="level" defaultValue="A1">{Object.entries(levelNames).map(([code, label]) => <option key={code} value={code}>{code} · {label}</option>)}</select></label><p className="profile-privacy">Não pedimos data de nascimento nem e-mail do aluno. Para perfis de menores, o responsável é titular da conta. Consulte a política de privacidade, que precisa de revisão jurídica antes do lançamento.</p><button className="button button-primary" type="submit">Adicionar perfil <span>↗</span></button></form>}
    </section>
    {selected ? <section className="cloud-progress"><div className="progress-overview"><div><span>PROGRESSO DE {selected.display_name.toUpperCase()}</span><b>{courseCompleted ? `${courseCompleted} de ${publishedLessons.length} aulas concluídas` : "Pronto para começar"}</b><small>{a1Lessons.length} aulas A1 e {a2Lessons.length} aulas A2 disponíveis</small></div><div className="progress-ring"><span>{courseCompleted}<small>/{publishedLessons.length}</small></span></div></div>{moduleCounts.map(({ module, completed }, moduleIndex) => <section className="progress-module" key={module.id}><header><h3>Módulo {String(moduleIndex + 1).padStart(2, "0")} · {module.title}</h3><span>{completed}/{module.lessons.length}</span></header><div className="progress-lesson-list">{module.lessons.map((lesson) => { const done = completedIds.includes(lesson.id); return <Link className="progress-lesson-row" key={lesson.id} href={`/aula/${lesson.slug}?profile=${selected.id}`}><span className={done ? "progress-check done" : "progress-check"}>{done ? "✓" : "·"}</span><span><b>{lesson.title}</b><small>{lesson.focus}</small></span><span className="progress-row-state">{done ? "Concluída" : "Abrir ↗"}</span></Link>; })}</div></section>)}{nextLesson ? <Link className="button button-primary" href={`/aula/${nextLesson.slug}?profile=${selected.id}`}>Continuar: {nextLesson.title} <span>↗</span></Link> : <p className="form-message form-success" role="status">Você concluiu todas as aulas atualmente disponíveis. Mais conteúdos dos níveis seguintes serão liberados em breve.</p>}</section> : <section className="profile-create"><p>Esta conta ainda não tem perfis de aprendizagem.</p></section>}
    <form action={async () => { "use server"; const { signOutAction } = await import("@/app/auth/actions"); await signOutAction(); }}><button className="button button-quiet auth-signout" type="submit">Sair da conta</button></form>
  </div></main>;
}
