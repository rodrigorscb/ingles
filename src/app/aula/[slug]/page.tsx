import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonFlow } from "@/components/lesson-flow";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPublishedLesson } from "@/lib/published-lessons";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, breadcrumbs, organizationRef } from "@/lib/site";

function lessonSeo(entry: NonNullable<ReturnType<typeof getPublishedLesson>>) {
  const { lesson, level } = entry;
  const title = `${lesson.title} — ${lesson.focus} (Aula ${level})`;
  const full = `Aula de inglês ${level} grátis: ${lesson.objective.replace(/\.$/, "")}. Frases com áudio, explicação em português e exercícios com correção.`;
  const description = full.length > 160 ? `${full.slice(0, 157).replace(/\s+\S*$/, "")}…` : full;
  return { title, description };
}

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ profile?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPublishedLesson(slug);
  if (!entry) return { title: "Aula não encontrada", robots: { index: false, follow: false } };
  const seo = lessonSeo(entry);
  return entry ? { title: seo.title.length > 38 ? { absolute: seo.title } : seo.title, description: seo.description, alternates: { canonical: `/aula/${entry.lesson.slug}` }, openGraph: { title: seo.title, description: seo.description, url: `/aula/${entry.lesson.slug}`, type: "article" } } : { title: "Aula não encontrada", robots: { index: false, follow: false } };
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
  const seo = lessonSeo(entry);
  const url = absoluteUrl(`/aula/${entry.lesson.slug}`);
  const resource = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: seo.title,
    headline: entry.lesson.title,
    description: seo.description,
    url,
    inLanguage: ["pt-BR", "en"],
    learningResourceType: "Lesson",
    educationalLevel: `CEFR ${entry.level}`,
    teaches: entry.lesson.focus,
    timeRequired: `PT${entry.lesson.duration}M`,
    isAccessibleForFree: true,
    position: entry.index + 1,
    isPartOf: { "@type": "Course", "@id": absoluteUrl(`/curso#${entry.level.toLowerCase()}`), name: `Curso de inglês ${entry.level} grátis` },
    provider: organizationRef,
  };
  return <main className="inner-page lesson-page"><JsonLd data={[resource, breadcrumbs([["Início", "/"], ["Curso de inglês", "/curso"], [`Aulas ${entry.level}`, "/curso"], [entry.lesson.title, `/aula/${entry.lesson.slug}`]])]} /><div className="wrap inner-wrap"><LessonFlow lesson={entry.lesson} index={entry.index} level={entry.level} sequence={entry.sequence} initialCompleted={initialCompleted} profileId={profileId} /></div></main>;
}
