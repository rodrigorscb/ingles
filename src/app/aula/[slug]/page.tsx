import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonFlow } from "@/components/lesson-flow";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPublishedLesson } from "@/lib/published-lessons";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ profile?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPublishedLesson(slug);
  return entry ? { title: `${entry.lesson.title} — ${entry.level}`, description: entry.lesson.objective, alternates: { canonical: `/aula/${entry.lesson.slug}` }, openGraph: { title: entry.lesson.title, description: entry.lesson.objective, url: `/aula/${entry.lesson.slug}`, type: "article" } } : { title: "Aula não encontrada", robots: { index: false, follow: false } };
}

export default async function LessonPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;
  const entry = getPublishedLesson(slug);
  if (!entry) notFound();
  let profileId: string | undefined;
  let initialCompleted = false;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getClaims();
    if (auth?.claims?.sub) {
      const { data: profiles } = await supabase.from("learner_profiles").select("id").order("created_at", { ascending: true });
      profileId = profiles?.find((profile) => profile.id === query.profile)?.id || profiles?.[0]?.id;
      if (profileId) {
        const { data: completed } = await supabase.from("lesson_progress").select("id").eq("learner_profile_id", profileId).eq("lesson_id", entry.lesson.id).maybeSingle();
        initialCompleted = Boolean(completed);
      }
    }
  }
  return <main className="inner-page lesson-page"><div className="wrap inner-wrap"><LessonFlow lesson={entry.lesson} index={entry.index} level={entry.level} sequence={entry.sequence} initialCompleted={initialCompleted} profileId={profileId} /></div></main>;
}
