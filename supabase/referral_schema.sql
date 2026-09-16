-- =========================================================
-- UNILIFE REFERRAL CHALLENGE — Supabase schema
-- =========================================================
-- Run this in the Supabase SQL editor for your project.
--
-- SECURITY MODEL:
-- The Next.js site talks to Supabase using the PUBLIC anon key,
-- which lives in the browser bundle. That means any table with
-- a permissive `select` RLS policy is effectively world-readable
-- by anyone who opens devtools — including email addresses and
-- matric numbers if we're not careful.
--
-- So: raw tables (referral_codes, referrals) have RLS enabled
-- with NO public select/insert policies at all. All access goes
-- through SECURITY DEFINER functions that validate input before
-- touching data, or through views that only ever expose a
-- display name + a count — never an email or matric number.
-- =========================================================

create extension if not exists pgcrypto;

-- ---------- tables ----------

create table if not exists referral_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  display_name text not null,
  email text unique not null,
  matric_number text not null,
  created_at timestamptz not null default now()
);

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  code_id uuid not null references referral_codes(id) on delete cascade,
  referred_email text,
  referred_matric text,
  status text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  created_at timestamptz not null default now(),
  verified_at timestamptz
);

create index if not exists idx_referrals_code_id on referrals(code_id);
create index if not exists idx_referrals_status on referrals(status);

alter table referral_codes enable row level security;
alter table referrals enable row level security;
-- No policies are created for these two tables — this is intentional.
-- Zero policies + RLS enabled = the anon key gets nothing back, ever.
-- All reads/writes happen through the functions and views below.

-- ---------- public leaderboard (safe to expose) ----------

create or replace view public_leaderboard as
select
  rc.display_name,
  count(r.id) filter (where r.status = 'verified') as verified_count
from referral_codes rc
left join referrals r on r.code_id = rc.id
group by rc.id, rc.display_name
having count(r.id) filter (where r.status = 'verified') > 0
order by verified_count desc, rc.created_at asc;

grant select on public_leaderboard to anon, authenticated;

-- ---------- campaign-wide live total (safe to expose) ----------

create or replace view campaign_totals as
select count(*) as total_verified_referrals
from referrals
where status = 'verified';

grant select on campaign_totals to anon, authenticated;

-- ---------- claim or fetch your own referral code ----------
-- Called when a student first sets up their link. Normalises
-- email, generates a short unique code from their name, and is
-- idempotent (calling again with the same email just returns
-- their existing code instead of erroring).

create or replace function claim_referral_code(
  p_display_name text,
  p_email text,
  p_matric_number text
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(p_email));
  v_existing_code text;
  v_new_code text;
  v_slug text;
begin
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Please enter a valid email address.';
  end if;
  if length(trim(p_display_name)) < 2 then
    raise exception 'Please enter your name.';
  end if;
  if length(trim(p_matric_number)) < 3 then
    raise exception 'Please enter a valid matric number.';
  end if;

  select code into v_existing_code from referral_codes where email = v_email;
  if v_existing_code is not null then
    return v_existing_code;
  end if;

  v_slug := lower(regexp_replace(split_part(trim(p_display_name), ' ', 1), '[^a-zA-Z0-9]', '', 'g'));
  if v_slug = '' then v_slug := 'student'; end if;

  loop
    v_new_code := v_slug || '-' || substr(md5(random()::text), 1, 5);
    exit when not exists (select 1 from referral_codes where code = v_new_code);
  end loop;

  insert into referral_codes (code, display_name, email, matric_number)
  values (v_new_code, trim(p_display_name), v_email, trim(p_matric_number));

  return v_new_code;
end;
$$;

revoke all on function claim_referral_code from public;
grant execute on function claim_referral_code to anon, authenticated;

-- ---------- fetch your own dashboard stats ----------
-- Requires the email you signed up with. Returns nothing if it
-- doesn't match, rather than leaking which emails exist.

create or replace function get_my_referral_stats(p_email text)
returns table (
  code text,
  display_name text,
  verified_count bigint,
  pending_count bigint,
  rank bigint
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(p_email));
begin
  return query
  with counts as (
    select
      rc.id,
      rc.code,
      rc.display_name,
      count(r.id) filter (where r.status = 'verified') as verified_count,
      count(r.id) filter (where r.status = 'pending') as pending_count
    from referral_codes rc
    left join referrals r on r.code_id = rc.id
    group by rc.id
  ),
  ranked as (
    select *, rank() over (order by verified_count desc) as rnk
    from counts
  )
  select ranked.code, ranked.display_name, ranked.verified_count, ranked.pending_count, ranked.rnk
  from ranked
  join referral_codes rc on rc.id = ranked.id
  where rc.email = v_email;
end;
$$;

revoke all on function get_my_referral_stats from public;
grant execute on function get_my_referral_stats to anon, authenticated;

-- ---------- record a new referral (called from the app/webhook) ----------
-- In production this should be called from your Flutter app's
-- signup flow (server-side, with a service-role key) once a new
-- user completes signup with a ?ref=CODE link — not directly from
-- this marketing site. Included here for completeness.

create or replace function record_referral(
  p_code text,
  p_referred_email text,
  p_referred_matric text
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code_id uuid;
begin
  select id into v_code_id from referral_codes where code = p_code;
  if v_code_id is null then
    raise exception 'Unknown referral code.';
  end if;

  insert into referrals (code_id, referred_email, referred_matric, status)
  values (v_code_id, lower(trim(p_referred_email)), trim(p_referred_matric), 'pending');
end;
$$;

revoke all on function record_referral from public;
-- Intentionally NOT granted to anon — only call this with the
-- service-role key from your backend/signup flow, so a random
-- visitor can't inflate someone's referral count from devtools.
grant execute on function record_referral to authenticated;

-- ---------- verifying a referral (admin only) ----------
-- Do this from the Supabase table editor or a future admin panel:
--   update referrals set status = 'verified', verified_at = now()
--   where id = '...';
-- after manually checking ID + matric number + photo match.
