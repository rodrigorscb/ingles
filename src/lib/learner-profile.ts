import type { createSupabaseServerClient } from "@/lib/supabase/server";

type ServerClient = Awaited<ReturnType<typeof createSupabaseServerClient>>;
export type LearnerProfileRow = { id: string; display_name: string };

// Garante que a conta tenha ao menos um perfil de aprendizagem, para que o
// progresso das aulas seja salvo desde o primeiro acesso (sem passo extra).
export async function ensureLearnerProfiles(supabase: ServerClient, userId: string): Promise<LearnerProfileRow[]> {
  const { data, error } = await supabase.from("learner_profiles").select("id, display_name").order("created_at", { ascending: true });
  if (error) throw error;
  if (data && data.length > 0) return data;

  const { data: guardian } = await supabase.from("guardian_profiles").select("display_name").eq("id", userId).maybeSingle();
  const guardianName = typeof guardian?.display_name === "string" ? guardian.display_name.trim() : "";
  const displayName = (guardianName && guardianName !== "Responsável" ? guardianName : "Meu perfil").slice(0, 40);

  const { data: created, error: insertError } = await supabase
    .from("learner_profiles")
    .insert({ guardian_id: userId, display_name: displayName, age_band: "adult", suggested_level: "A1" })
    .select("id, display_name")
    .single();
  if (insertError) throw insertError;
  return [created];
}
