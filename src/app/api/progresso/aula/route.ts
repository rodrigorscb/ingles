import { NextResponse, type NextRequest } from "next/server";
import { publishedLessons } from "@/lib/published-lessons";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { dayKeyInZone, statsFromCompletions } from "@/lib/gamification";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid-request" }, { status: 400 });
  const { profileId, lessonId } = body as { profileId?: unknown; lessonId?: unknown };
  if (typeof profileId !== "string" || !/^[0-9a-f-]{36}$/i.test(profileId) || typeof lessonId !== "string" || !publishedLessons.some((lesson) => lesson.id === lessonId)) {
    return NextResponse.json({ error: "invalid-lesson-or-profile" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getClaims();
  const userId = auth?.claims?.sub;
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("learner_profiles").select("id").eq("id", profileId).maybeSingle();
  if (!profile) return NextResponse.json({ error: "profile-not-found" }, { status: 404 });

  const { data: before } = await supabase.from("lesson_progress").select("lesson_id, completed_at").eq("learner_profile_id", profileId);
  const beforeEntries = before ?? [];

  const { error } = await supabase.from("lesson_progress").upsert({ learner_profile_id: profileId, lesson_id: lessonId }, { onConflict: "learner_profile_id,lesson_id" });
  if (error) return NextResponse.json({ error: "save-failed" }, { status: 500 });

  const now = new Date();
  const alreadyDone = beforeEntries.some((entry) => entry.lesson_id === lessonId);
  const afterEntries = alreadyDone ? beforeEntries : [...beforeEntries, { lesson_id: lessonId, completed_at: now.toISOString() }];
  const beforeStats = statsFromCompletions(beforeEntries, now);
  const afterStats = statsFromCompletions(afterEntries, now);
  const newBadges = afterStats.seenBadges.filter((id) => !beforeStats.seenBadges.includes(id));

  return NextResponse.json({
    saved: true,
    gainedXp: afterStats.xp - beforeStats.xp,
    streakUp: beforeStats.lastDay !== dayKeyInZone(now) && !alreadyDone,
    newBadges,
    stats: { xp: afterStats.xp, streak: afterStats.streak, best: afterStats.best, completed: afterStats.lessons.length },
  });
}
