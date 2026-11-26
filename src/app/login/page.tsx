import type { Metadata } from "next";
import Link from "next/link";
import { resendConfirmationAction, signInAction, signUpAction } from "@/app/auth/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Entrar ou criar conta", robots: { index: false, follow: false } };
type Props = { searchParams: Promise<{ mode?: string; error?: string; message?: string; next?: string }> };

const errorMessages: Record<string, string> = {
  password: "Senha incorreta. Tente novamente.",
  signin: "Não foi possível entrar. Confira o e-mail e a senha e tente novamente.",
  unconfirmed: "Seu e-mail ainda não foi confirmado. Abra a mensagem de noreply@mail.app.supabase.io (confira também o spam e a aba Promoções) e clique no link de confirmação. Se não encontrar, peça um novo e-mail abaixo.",
  resend: "Não foi possível reenviar o e-mail de confirmação. Confira o endereço e tente novamente.",
  missing: "Preencha o e-mail e a senha.",
  validation: "Informe um e-mail válido e uma senha com pelo menos 8 caracteres.",
  signup: "Não foi possível criar a conta. Verifique os dados e tente novamente.",
  "signup-unavailable": "Não foi possível criar a conta agora. Tente novamente em alguns instantes.",
  "signout-error": "Não foi possível encerrar a sessão agora. Atualize a página e tente novamente.",
  "profile-error": "Não foi possível carregar a conta agora. Tente novamente mais tarde.",
  unavailable: "O serviço de contas está temporariamente indisponível. Tente novamente mais tarde.",
  callback: "O link expirou ou já foi utilizado. Solicite um novo e-mail de confirmação.",
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const isSignUp = params.mode === "signup";
  const fromLesson = Boolean(params.next?.startsWith("/aula/"));
  let signedIn = false;
  let sessionLookupFailed = false;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase.auth.getClaims();
      if (error) throw error;
      signedIn = Boolean(data?.claims?.sub);
    } catch (error) {
      sessionLookupFailed = true;
      console.error("[auth] Unable to read the current login session:", error instanceof Error ? error.name : "unknown error");
    }
  }

  return <main className="inner-page"><div className="wrap inner-wrap"><div className="auth-panel"><span className="auth-flower">✳</span><p className="section-kicker">APRENDER NO SEU RITMO</p><h1>{signedIn ? <>Bem-vindo<br/>de volta.</> : isSignUp ? <>Crie sua conta<br/>grátis.</> : <>Entre para<br/>continuar.</>}</h1>
    {signedIn ? <><p>Sua sessão está ativa. Acesse os perfis de aprendizagem da sua família.</p>{params.error && <p className="form-message form-error" role="alert">{errorMessages[params.error] || "Ocorreu um erro. Tente novamente."}</p>}<Link className="button button-primary" href="/progresso">Abrir meus perfis ↗</Link><form action={async () => { "use server"; const { signOutAction } = await import("@/app/auth/actions"); await signOutAction(); }}><button className="button button-quiet auth-signout">Sair da conta</button></form></> : <>
      <p>{isSignUp ? (fromLesson ? "Falta só um passo para praticar: crie sua conta gratuita e seu progresso, XP e ofensiva ficam salvos em qualquer dispositivo." : "Leva menos de 1 minuto. Seu progresso, XP e ofensiva ficam salvos em qualquer dispositivo — e você pode ter até três perfis na família.") : (fromLesson ? "Entre para praticar esta aula e salvar seu progresso." : "Entre para continuar de onde parou, com seu progresso sincronizado.")}</p>
      {sessionLookupFailed && <p className="form-message form-error" role="alert">Não foi possível verificar sua sessão. O serviço de contas pode estar temporariamente indisponível.</p>}
      {params.error && <p className="form-message form-error" role="alert">{errorMessages[params.error] || "Ocorreu um erro. Tente novamente."}</p>}
      {params.message === "check-email" && <p className="form-message form-success" role="status">Conta criada! Confira sua caixa de entrada (e o spam) e clique no link de confirmação{fromLesson ? " — você volta direto para a aula" : ""}.</p>}
      {params.message === "resent" && <p className="form-message form-success" role="status">Enviamos um novo e-mail de confirmação. Pode levar alguns minutos; confira também o spam.</p>}
      {(params.error === "unconfirmed" || params.error === "resend") && <form className="auth-form auth-resend" action={resendConfirmationAction}>
        <label>E-mail da conta<input type="email" name="email" autoComplete="email" placeholder="voce@exemplo.com" required /></label>
        <button className="button button-quiet" type="submit">Reenviar e-mail de confirmação</button>
      </form>}
      <form className="auth-disabled auth-form" action={isSignUp ? signUpAction : signInAction}>
        {isSignUp && <label>Seu nome<input name="displayName" autoComplete="name" maxLength={80} placeholder="Como podemos chamar você?" required /></label>}
        <label>E-mail<input type="email" name="email" autoComplete="email" placeholder="voce@exemplo.com" required /></label>
        <label>Senha<input type="password" name="password" autoComplete={isSignUp ? "new-password" : "current-password"} minLength={8} placeholder={isSignUp ? "Mínimo 8 caracteres" : "Sua senha"} required /></label>
        <input type="hidden" name="next" value={params.next?.startsWith("/") && !params.next.startsWith("//") && !params.next.includes("\\") ? params.next : "/progresso"} />
        {isSignUp && <label className="guardian-consent"><input type="checkbox" name="guardianDeclaration" required /><span>Confirmo que sou adulto e responsável por esta conta. Entendo que os perfis de aprendizagem são geridos sob minha conta.</span></label>}
        <button className="button button-primary" type="submit">{isSignUp ? "Criar conta gratuita" : "Entrar"} <span>↗</span></button>
      </form>
      <p className="auth-switch">{isSignUp ? "Já tem uma conta?" : "Ainda não tem conta?"} <Link href={`/login?mode=${isSignUp ? "signin" : "signup"}${params.next ? `&next=${encodeURIComponent(params.next)}` : ""}`}>{isSignUp ? "Entrar" : "Criar conta"}</Link></p>
      <p className="auth-note">{isSignUp ? "Os termos e a política de privacidade ainda são rascunhos e precisam de revisão jurídica antes do lançamento público." : "Ao continuar, você será responsável pela conta. Os perfis de aprendizagem não precisam de e-mail próprio."}</p>
      <p className="auth-note">Login com Google será configurado depois. Não informe dados pessoais de crianças no campo de nome do responsável.</p>
    </>}
    <Link className="text-link" href="/progresso">Ver painel de demonstração ↗</Link></div></div></main>;
}
