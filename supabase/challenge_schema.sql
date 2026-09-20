-- =========================================================================
-- OLABISI ONABANJO UNIVERSITY (OOU) ENTREPRENEURSHIP CHALLENGE 2026/2027
-- DIRECTORATE OF ENTREPRENEURSHIP AND INNOVATION (DR. OGUNKOYA)
-- Supabase / PostgreSQL Schema Definition
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. INSTITUTIONAL KPIS TABLE
create table if not exists public.challenge_kpis (
    id text primary key default 'oou_2026_2027',
    academic_year text not null default '2026/2027',
    student_engagements integer not null default 642,
    target_student_engagements integer not null default 1000,
    venture_ideas integer not null default 41,
    target_venture_ideas integer not null default 60,
    prototypes_developed integer not null default 18,
    target_prototypes_developed integer not null default 30,
    market_validated integer not null default 6,
    target_market_validated integer not null default 10,
    total_funding_pool_ngn numeric not null default 5000000,
    current_streak_days integer not null default 14,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. VENTURE SUBMISSIONS TABLE
create table if not exists public.challenge_ventures (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    track text not null check (track in ('Waste-to-Wealth', 'Digital Agriculture', 'Student Employability', 'Community Health')),
    lead_name text not null,
    lead_email text not null,
    lead_phone text not null,
    lead_matric text not null,
    lead_faculty text not null,
    lead_campus text not null,
    team_members jsonb not null default '[]'::jsonb,
    problem_statement text not null,
    solution_summary text not null,
    stage text not null default 'idea' check (stage in ('idea', 'matchmaking', 'prototype', 'validated', 'finalist')),
    score_innovation integer,
    score_viability integer,
    score_diversity integer,
    score_track_fit integer,
    score_total integer,
    director_feedback text,
    prototype_url text,
    pitch_deck_url text,
    is_flagged boolean default false,
    submitted_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CROSS-FACULTY MATCHMAKING PROFILES
create table if not exists public.challenge_matchmaking (
    id uuid primary key default uuid_generate_v4(),
    student_name text not null,
    matric_no text not null,
    faculty text not null,
    department text not null,
    campus text not null,
    skills text[] not null default '{}',
    looking_for text not null,
    track_preference text not null,
    contact_email text not null,
    status text not null default 'open' check (status in ('open', 'matched')),
    matched_with text,
    joined_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. OFFICIAL DIRECTORATE ANNOUNCEMENTS
create table if not exists public.challenge_announcements (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    content text not null,
    author text not null default 'Directorate of Entrepreneurship & Innovation',
    is_urgent boolean default false,
    tag text not null default 'General',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. AUDIT LOGS FOR DIRECTORATE ACTIONS
create table if not exists public.challenge_audit_logs (
    id uuid primary key default uuid_generate_v4(),
    action_type text not null,
    performed_by text not null default 'Dr. Ogunkoya (Director)',
    details jsonb not null default '{}'::jsonb,
    timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.challenge_kpis enable row level security;
alter table public.challenge_ventures enable row level security;
alter table public.challenge_matchmaking enable row level security;
alter table public.challenge_announcements enable row level security;
alter table public.challenge_audit_logs enable row level security;

-- Public read policies for students & showcase
create policy "Allow public read of challenge KPIs" on public.challenge_kpis
    for select using (true);

create policy "Allow public read of announcements" on public.challenge_announcements
    for select using (true);

create policy "Allow public insert of matchmaking requests" on public.challenge_matchmaking
    for insert with check (true);

-- Functions to update KPIs automatically
create or replace function public.recalculate_challenge_kpis()
returns trigger as $$
begin
    update public.challenge_kpis
    set 
        venture_ideas = (select count(*) from public.challenge_ventures),
        prototypes_developed = (select count(*) from public.challenge_ventures where stage in ('prototype', 'validated', 'finalist')),
        market_validated = (select count(*) from public.challenge_ventures where stage in ('validated', 'finalist')),
        updated_at = timezone('utc'::text, now())
    where id = 'oou_2026_2027';
    return null;
end;
$$ language plpgsql security definer;

-- Trigger to recalculate KPIs when ventures change
drop trigger if exists on_venture_stage_change on public.challenge_ventures;
create trigger on_venture_stage_change
after insert or update of stage or delete on public.challenge_ventures
for each statement execute procedure public.recalculate_challenge_kpis();
