-- Parent/guardian-owned learner profiles and lesson progress.
-- Safe additive migration: creates new objects and does not modify existing data.

create table if not exists public.guardian_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'Responsável' check (char_length(display_name) between 1 and 80),
  created_at timestamptz not null default now()
);

-- Add the public-schema relation before any auth trigger can depend on it.
-- The auth trigger below also inserts the first row for newly created users.

create table if not exists public.learner_profiles (
  id uuid primary key default gen_random_uuid(),
  guardian_id uuid not null references public.guardian_profiles (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 40),
  age_band text not null default 'adult' check (age_band in ('child_8_12', 'teen_13_17', 'adult')),
  suggested_level text not null default 'A1' check (suggested_level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists learner_profiles_guardian_id_idx on public.learner_profiles (guardian_id, created_at);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  learner_profile_id uuid not null references public.learner_profiles (id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) between 1 and 160),
  completed_at timestamptz not null default now(),
  unique (learner_profile_id, lesson_id)
);

create index if not exists lesson_progress_profile_idx on public.lesson_progress (learner_profile_id, completed_at desc);

create or replace function public.create_guardian_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.guardian_profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(left(new.raw_user_meta_data ->> 'display_name', 80), ''), 'Responsável')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.create_guardian_profile_for_new_user() from public, anon, authenticated;

-- Backfill guardians for accounts that existed before this migration.
insert into public.guardian_profiles (id, display_name)
select
  u.id,
  coalesce(nullif(left(u.raw_user_meta_data ->> 'display_name', 80), ''), 'Responsável')
from auth.users u
on conflict (id) do nothing;

drop trigger if exists on_auth_user_created_guardian_profile on auth.users;
create trigger on_auth_user_created_guardian_profile
after insert on auth.users
for each row execute function public.create_guardian_profile_for_new_user();

create or replace function public.enforce_three_learner_profiles()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_count integer;
begin
  -- Serialize concurrent profile creations for the same guardian.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.guardian_id::text, 0));
  select count(*) into current_count
  from public.learner_profiles
  where guardian_id = new.guardian_id
    and (tg_op = 'INSERT' or id <> new.id);
  if current_count >= 3 then
    raise exception 'A conta pode ter no máximo 3 perfis de aprendizagem.' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

revoke all on function public.enforce_three_learner_profiles() from public, anon, authenticated;
drop trigger if exists enforce_three_learner_profiles_limit on public.learner_profiles;
create trigger enforce_three_learner_profiles_limit
before insert or update of guardian_id on public.learner_profiles
for each row execute function public.enforce_three_learner_profiles();

alter table public.guardian_profiles enable row level security;
alter table public.learner_profiles enable row level security;
alter table public.lesson_progress enable row level security;

revoke all on public.guardian_profiles from anon, authenticated;
revoke all on public.learner_profiles from anon, authenticated;
revoke all on public.lesson_progress from anon, authenticated;

grant select, update on public.guardian_profiles to authenticated;
grant select, insert, update, delete on public.learner_profiles to authenticated;
grant select, insert, update, delete on public.lesson_progress to authenticated;

drop policy if exists "guardian reads own profile" on public.guardian_profiles;
create policy "guardian reads own profile"
on public.guardian_profiles for select to authenticated
using ((select auth.uid()) = id);

drop policy if exists "guardian updates own profile" on public.guardian_profiles;
create policy "guardian updates own profile"
on public.guardian_profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "guardian manages own learner profiles" on public.learner_profiles;
create policy "guardian manages own learner profiles"
on public.learner_profiles for all to authenticated
using ((select auth.uid()) = guardian_id)
with check ((select auth.uid()) = guardian_id);

drop policy if exists "guardian manages progress for own learners" on public.lesson_progress;
create policy "guardian manages progress for own learners"
on public.lesson_progress for all to authenticated
using (
  exists (
    select 1 from public.learner_profiles lp
    where lp.id = learner_profile_id and lp.guardian_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.learner_profiles lp
    where lp.id = learner_profile_id and lp.guardian_id = (select auth.uid())
  )
);
