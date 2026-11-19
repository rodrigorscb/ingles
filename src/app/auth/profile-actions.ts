"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createLearnerProfile(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError) {
    console.error("[auth] Profile session lookup failed:", claimsError.code || "Supabase auth error");
    redirect("/progresso?error=profile-error");
  }
  const userId = claims?.claims?.sub;
  if (!userId) redirect("/login?next=/progresso");

  const displayName = String(formData.get("displayName") ?? "").trim().slice(0, 40);
  const ageBand = String(formData.get("ageBand") ?? "adult");
  const level = String(formData.get("level") ?? "A1");
  if (!displayName || !["child_8_12", "teen_13_17", "adult"].includes(ageBand) || !["A1", "A2", "B1", "B2", "C1", "C2"].includes(level)) {
    redirect("/progresso?error=profile-validation");
  }

  try {
    const { data, error } = await supabase.from("learner_profiles").insert({ guardian_id: userId, display_name: displayName, age_band: ageBand, suggested_level: level }).select("id").single();
    if (error) {
      const code = error.code === "P0001" ? "profile-limit" : "profile-error";
      console.error("[auth] Profile insertion failed:", error.code || "Supabase database error");
      redirect(`/progresso?error=${code}`);
    }
    redirect(`/progresso?profile=${data.id}`);
  } catch (error) {
    if (error instanceof Error && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) throw error;
    console.error("[auth] Profile creation failed:", error instanceof Error ? error.name : "unknown error");
    redirect("/progresso?error=profile-error");
  }
}

export async function completeSampleLesson(formData: FormData) {
  const profileId = String(formData.get("profileId") ?? "");
  const supabase = await createSupabaseServerClient();
  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError) {
    console.error("[auth] Progress session lookup failed:", claimsError.code || "Supabase auth error");
    redirect("/progresso?error=progress-save");
  }
  if (!claims?.claims?.sub) redirect("/login?next=/progresso");

  try {
    const { error } = await supabase.from("lesson_progress").upsert({ learner_profile_id: profileId, lesson_id: "hello-new-world" }, { onConflict: "learner_profile_id,lesson_id" });
    if (error) {
      console.error("[auth] Sample lesson completion was rejected:", error.code || "Supabase database error");
      redirect("/progresso?error=progress-save");
    }
    redirect(`/progresso?profile=${profileId}&saved=1`);
  } catch (error) {
    if (error instanceof Error && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) throw error;
    console.error("[auth] Sample lesson completion failed:", error instanceof Error ? error.name : "unknown error");
    redirect("/progresso?error=progress-save");
  }
}
