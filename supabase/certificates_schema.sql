-- UniLife certificates: storage, serial generation and public verification.
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).
--
-- Design notes
--  * The table is locked down by Row Level Security with NO public policies, so
--    nobody can list or read it with the anon key. Recipient emails and the
--    list of everyone who holds a certificate stay private.
--  * The only public door is verify_certificate(serial): you must already know
--    a serial to get one record back, and the email is never returned.
--  * Serials are random (UL-VOL-26-7K2QX9), not sequential, so they can't be
--    guessed by counting up. The trigger below generates them for you.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.certificates (
  id              uuid primary key default gen_random_uuid(),
  serial          text not null unique,
  type            text not null check (type in ('volunteer', 'role_completion')),

  recipient_name  text not null check (length(trim(recipient_name)) > 0),
  recipient_email text,                       -- private: never returned publicly

  -- volunteer:        title = what they volunteered as  (e.g. Campus Ambassador)
  --                   org_unit = campus                 (e.g. University of Lagos)
  -- role_completion:  title = role completed            (e.g. UI/UX Designer)
  --                   org_unit = team / department      (e.g. Product & Engineering)
  title           text not null,
  org_unit        text not null,

  period_start    date not null,
  period_end      date not null,
  issued_at       date not null default current_date,

  signatory_name  text not null default 'Harrison King',
  signatory_title text not null default 'Founder, UniLife',

  status          text not null default 'valid' check (status in ('valid', 'revoked')),
  revoked_reason  text,
  revoked_at      timestamptz,

  created_at      timestamptz not null default now(),

  constraint certificates_period_order check (period_end >= period_start)
);

alter table public.certificates enable row level security;
-- Deliberately no policies: anon/authenticated roles can't touch the table.
-- (The service role and the SQL editor bypass RLS, so staff can still insert.)

-- ---------------------------------------------------------------------------
-- Auto-generate the serial when you insert a row without one.
-- Format: UL-<VOL|ROLE>-<YY>-<6 random chars>. The alphabet skips I, O, 0, 1
-- so serials are easy to read out loud and type from a printout.
-- ---------------------------------------------------------------------------
create or replace function public.set_certificate_serial()
returns trigger
language plpgsql
set search_path = public, extensions
as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- 32 chars
  prefix text;
  code   text;
  tries  int := 0;
begin
  if new.serial is not null and length(trim(new.serial)) > 0 then
    new.serial := upper(trim(new.serial));
    return new;
  end if;

  prefix := case new.type when 'volunteer' then 'VOL' else 'ROLE' end;

  loop
    code := '';
    for i in 1..6 loop
      -- 256 is divisible by 32, so this is unbiased.
      code := code || substr(alphabet, 1 + (get_byte(gen_random_bytes(1), 0) % 32), 1);
    end loop;

    new.serial := 'UL-' || prefix || '-' || to_char(new.issued_at, 'YY') || '-' || code;
    exit when not exists (select 1 from public.certificates c where c.serial = new.serial);

    tries := tries + 1;
    if tries > 10 then
      raise exception 'Could not generate a unique certificate serial';
    end if;
  end loop;

  return new;
end;
$$;

drop trigger if exists certificates_set_serial on public.certificates;
create trigger certificates_set_serial
  before insert on public.certificates
  for each row execute function public.set_certificate_serial();

-- Stamp revoked_at automatically when a certificate is revoked.
create or replace function public.stamp_certificate_revocation()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'revoked' and old.status <> 'revoked' then
    new.revoked_at := now();
  elsif new.status = 'valid' then
    new.revoked_at := null;
    new.revoked_reason := null;
  end if;
  return new;
end;
$$;

drop trigger if exists certificates_stamp_revocation on public.certificates;
create trigger certificates_stamp_revocation
  before update on public.certificates
  for each row execute function public.stamp_certificate_revocation();

-- ---------------------------------------------------------------------------
-- Public verification: one serial in, one safe record out.
-- SECURITY DEFINER lets it read the locked table; it only ever returns the
-- fields that are printed on the certificate, never the email.
-- A revoked certificate returns only its status, serial and dates (no name).
-- ---------------------------------------------------------------------------
create or replace function public.verify_certificate(p_serial text)
returns table (
  serial          text,
  type            text,
  status          text,
  recipient_name  text,
  title           text,
  org_unit        text,
  period_start    date,
  period_end      date,
  issued_at       date,
  signatory_name  text,
  signatory_title text,
  revoked_at      timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    c.serial,
    c.type,
    c.status,
    case when c.status = 'valid' then c.recipient_name  end,
    case when c.status = 'valid' then c.title           end,
    case when c.status = 'valid' then c.org_unit        end,
    case when c.status = 'valid' then c.period_start    end,
    case when c.status = 'valid' then c.period_end      end,
    c.issued_at,
    case when c.status = 'valid' then c.signatory_name  end,
    case when c.status = 'valid' then c.signatory_title end,
    c.revoked_at
  from public.certificates c
  where c.serial = upper(trim(p_serial))
  limit 1;
$$;

revoke all on function public.verify_certificate(text) from public;
grant execute on function public.verify_certificate(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Example: issue a certificate (serial is generated for you)
-- ---------------------------------------------------------------------------
-- insert into public.certificates
--   (type, recipient_name, recipient_email, title, org_unit, period_start, period_end)
-- values
--   ('volunteer', 'Adaeze Okonkwo', 'adaeze@example.com',
--    'Campus Ambassador', 'University of Lagos', '2026-03-01', '2026-11-30'),
--   ('role_completion', 'Adaeze Okonkwo', 'adaeze@example.com',
--    'UI/UX Designer', 'Product & Engineering', '2026-06-01', '2026-11-30')
-- returning serial, recipient_name, type;
--
-- Example: revoke one
-- update public.certificates
--    set status = 'revoked', revoked_reason = 'Issued in error'
--  where serial = 'UL-VOL-26-XXXXXX';
