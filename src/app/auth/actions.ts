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

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const code = /invalid login credentials/i.test(error.message) ? "password" : "signin";
    redirect(`/login?mode=signin&error=${code}&next=${encodeURIComponent(next)}`);
  }
  redirect(next);
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "Responsável").trim().slice(0, 80) || "Responsável";
  const guardianDeclaration = formData.get("guardianDeclaration") === "on";
  if (!email || password.length < 8 || !guardianDeclaration) redirect("/login?mode=signup&error=validation");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=/progresso`,
      data: { display_name: displayName, adult_guardian_declaration: true },
    },
  });
  if (error) redirect("/login?mode=signup&error=signup");
  redirect("/login?message=check-email");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
