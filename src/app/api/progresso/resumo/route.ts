import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureLearnerProfiles } from "@/lib/learner-profile";
import { statsFromCompletions } from "@/lib/gamification";

export const dynamic = "force-dynamic";

// Resumo de XP/ofensiva/conquistas da conta logada (primeiro perfil).
export async function GET() {
  const accountsEnabled = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const headers = { "Cache-Control": "private, no-store" };
  if (!accountsEnabled) return NextResponse.json({ accountsEnabled: false, signedIn: false }, { headers });

  try {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getClaims();
    const userId = auth?.claims?.sub;
    if (!userId) return NextResponse.json({ accountsEnabled: true, signedIn: false }, { headers });

    const profiles = await ensureLearnerProfiles(supabase, userId);
    const profile = profiles[0];
    const { data: progress } = await supabase.from("lesson_progress").select("lesson_id, completed_at").eq("learner_profile_id", profile.id);
    const stats = statsFromCompletions(progress ?? []);
    return NextResponse.json({
      accountsEnabled: true,
      signedIn: true,
      profileName: profile.display_name,
      xp: stats.xp,
      streak: stats.streak,
      best: stats.best,
      completed: stats.lessons.length,
      badges: stats.seenBadges,
    }, { headers });
  } catch (error) {
    console.error("[progress] Unable to build the progress summary:", error instanceof Error ? error.name : "unknown error");
    return NextResponse.json({ accountsEnabled: true, signedIn: false, unavailable: true }, { headers });
  }
}
