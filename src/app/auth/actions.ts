"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function safeNextPath(value: FormDataEntryValue | null) {
  const path = typeof value === "string" ? value : "/progresso";
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("\\") ? path : "/progresso";
}

function confirmationRedirect(next = "/progresso") {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000").origin;
  return new URL(`/auth/callback?next=${encodeURIComponent(next)}`, origin).toString();
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(formData.get("next"));
  if (!email || !password) redirect(`/login?mode=signin&error=missing&next=${encodeURIComponent(next)}`);

  let signInError: "password" | "signin" | "unconfirmed" | "unavailable" | undefined;
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) signInError = error.code === "email_not_confirmed" ? "unconfirmed" : /invalid login credentials/i.test(error.message) ? "password" : "signin";
  } catch (error) {
    signInError = "unavailable";
    console.error("[auth] Sign-in request failed:", error instanceof Error ? error.name : "unknown error");
  }
  redirect(signInError ? `/login?mode=signin&error=${signInError}&next=${encodeURIComponent(next)}` : next);
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "Responsável").trim().slice(0, 80) || "Responsável";
  const guardianDeclaration = formData.get("guardianDeclaration") === "on";
  const next = safeNextPath(formData.get("next"));
  const nextParam = `&next=${encodeURIComponent(next)}`;
  if (!email || password.length < 8 || !guardianDeclaration) redirect(`/login?mode=signup&error=validation${nextParam}`);

  let signUpError: "signup" | "signup-unavailable" | undefined;
  let signedInImmediately = false;
  try {
    const supabase = await createSupabaseServerClient();
    const emailRedirectTo = confirmationRedirect(next);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
        data: { display_name: displayName, adult_guardian_declaration: true },
      },
    });
    if (error) {
      signUpError = error.code === "over_email_send_rate_limit" ? "signup-unavailable" : "signup";
      console.error("[auth] Sign-up request was rejected:", error.code || "Supabase auth error");
    } else if (!data.user) {
      signUpError = "signup";
      console.error("[auth] Sign-up returned without a user.");
    } else {
      // With email confirmation enabled, Supabase returns the user without a session until the link is clicked.
      signedInImmediately = Boolean(data.session);
    }
  } catch (error) {
    signUpError = "signup-unavailable";
    console.error("[auth] Sign-up request failed:", error instanceof Error ? error.name : "unknown error");
  }
  if (signUpError) redirect(`/login?mode=signup&error=${signUpError}${nextParam}`);
  redirect(signedInImmediately ? next : `/login?message=check-email${nextParam}`);
}

export async function resendConfirmationAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) redirect("/login?mode=signin&error=unconfirmed");

  let resendError: "resend" | "signup-unavailable" | undefined;
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.resend({ type: "signup", email, options: { emailRedirectTo: confirmationRedirect() } });
    if (error) {
      resendError = error.code === "over_email_send_rate_limit" ? "signup-unavailable" : "resend";
      console.error("[auth] Confirmation resend was rejected:", error.code || "Supabase auth error");
    }
  } catch (error) {
    resendError = "signup-unavailable";
    console.error("[auth] Confirmation resend failed:", error instanceof Error ? error.name : "unknown error");
  }
  redirect(resendError ? `/login?mode=signin&error=${resendError}` : "/login?mode=signin&message=resent");
}

export async function signOutAction() {
  let signOutFailed = false;
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();
    signOutFailed = Boolean(error);
    if (error) console.error("[auth] Sign-out request was rejected:", error.code || "Supabase auth error");
  } catch (error) {
    signOutFailed = true;
    console.error("[auth] Sign-out request failed:", error instanceof Error ? error.name : "unknown error");
  }
  redirect(signOutFailed ? "/login?error=signout-error" : "/");
}
