"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createLearnerProfile(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect("/login?next=/progresso");

  const displayName = String(formData.get("displayName") ?? "").trim().slice(0, 40);
  const ageBand = String(formData.get("ageBand") ?? "adult");
  const level = String(formData.get("level") ?? "A1");
  if (!displayName || !["child_8_12", "teen_13_17", "adult"].includes(ageBand) || !["A1", "A2", "B1", "B2", "C1", "C2"].includes(level)) {
    redirect("/progresso?error=profile-validation");
  }

  const { data, error } = await supabase.from("learner_profiles").insert({ guardian_id: userId, display_name: displayName, age_band: ageBand, suggested_level: level }).select("id").single();
  if (error) redirect(`/progresso?error=${encodeURIComponent(error.code === "P0001" ? "profile-limit" : "profile-create")}`);
  redirect(`/progresso?profile=${data.id}`);
}

export async function completeSampleLesson(formData: FormData) {
  const profileId = String(formData.get("profileId") ?? "");
  const supabase = await createSupabaseServerClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims?.sub) redirect("/login?next=/progresso");
  const { error } = await supabase.from("lesson_progress").upsert({ learner_profile_id: profileId, lesson_id: "hello-new-world" }, { onConflict: "learner_profile_id,lesson_id" });
  if (error) redirect("/progresso?error=progress-save");
  redirect(`/progresso?profile=${profileId}&saved=1`);
}
