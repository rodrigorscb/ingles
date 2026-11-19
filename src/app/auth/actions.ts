"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function safeNextPath(value: FormDataEntryValue | null) {
  const path = typeof value === "string" ? value : "/progresso";
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("\\") ? path : "/progresso";
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(formData.get("next"));
  if (!email || !password) redirect(`/login?mode=signin&error=missing&next=${encodeURIComponent(next)}`);

  let signInError: "password" | "signin" | "unavailable" | undefined;
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) signInError = /invalid login credentials/i.test(error.message) ? "password" : "signin";
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
  if (!email || password.length < 8 || !guardianDeclaration) redirect("/login?mode=signup&error=validation");

  let signUpError: "signup" | "signup-unavailable" | undefined;
  let signedInImmediately = false;
  try {
    const supabase = await createSupabaseServerClient();
    const redirectOrigin = process.env.NEXT_PUBLIC_SITE_URL || new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000").origin;
    const emailRedirectTo = new URL("/auth/callback?next=/progresso", redirectOrigin).toString();
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
  if (signUpError) redirect(`/login?mode=signup&error=${signUpError}`);
  redirect(signedInImmediately ? "/progresso" : "/login?message=check-email");
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
