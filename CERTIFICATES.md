# UniLife certificates: setup and use

New files only. Nothing in your existing code is changed. Copy the folders into
the project root (`app/`, `components/`, `lib/`, `supabase/`), then follow the steps.

## What you get

| URL | What it does |
| --- | --- |
| `/verify` | Search page: type a serial number to check a certificate. |
| `/verify/UL-VOL-26-7K2QX9` | Result page. Shows "This certificate is genuine" with the recipient, role, dates and a preview. Also what the QR code opens. |
| `/certificate/UL-VOL-26-7K2QX9?layout=classic` | Print-ready page for the PDF. `layout=bold` gives the poster version. Add `&print=1` to open the print dialog by itself. |

A certificate that has been revoked shows a "revoked" page with no name or details.
A serial that doesn't exist shows "No certificate found".

## Setup (about 10 minutes)

1. **Database.** In Supabase open SQL Editor, paste all of `supabase/certificates_schema.sql`, and run it.
2. **QR code package.** In the project folder run:
   ```
   npm install qrcode.react
   ```
   (needs version 4.1 or newer, which is what npm installs today)
3. **Environment.** Nothing new. The pages use the same `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_SUPABASE_ANON_KEY` your site already uses.
4. Run `npm run dev` and issue a test certificate (below).

## Issuing a certificate

In Supabase, SQL Editor (or Table Editor, or a CSV import for many people at once). Leave
`serial` empty and it is generated for you:

```sql
insert into public.certificates
  (type, recipient_name, recipient_email, title, org_unit, period_start, period_end)
values
  ('volunteer', 'Adaeze Okonkwo', 'adaeze@example.com',
   'Campus Ambassador', 'University of Lagos', '2026-03-01', '2026-11-30')
returning serial;
```

| Column | Volunteer certificate | Role completion certificate |
| --- | --- | --- |
| `type` | `volunteer` | `role_completion` |
| `title` | what they volunteered as | the role completed |
| `org_unit` | campus | team / department |

Copy the `serial` it returns and open `/verify/<serial>`. `issued_at` defaults to today,
and the signature defaults to Harrison King, Founder, UniLife.

To withdraw one:

```sql
update public.certificates
   set status = 'revoked', revoked_reason = 'Issued in error'
 where serial = 'UL-VOL-26-XXXXXX';
```

## How it protects people

- Nobody can list or read the certificates table with the public key. Names and emails
  are not exposed in bulk.
- The verify function only answers for an exact serial number, and never returns the email.
- Serials are random (`UL-VOL-26-7K2QX9`), not 1, 2, 3, so they can't be guessed by counting.
  Anyone who holds the serial can see what is printed on that certificate; that is the point of
  verification.
- Individual verify and download pages are marked `noindex`, so Google won't list them.

## Known limits

- **PDF download uses the browser's print dialog** ("Save as PDF"). It is crisp and keeps
  the fonts and QR code, but it is not a one-tap file download, and it is clumsiest on iPhone Safari.
  A true server-generated PDF is possible later but needs a headless browser, which is heavy for
  Firebase hosting.
- **No rate limiting** on the verify lookup. Random serials make guessing impractical, but add a
  limit if the site ever gets heavy traffic.
- **No admin screen or email yet.** Issuing is done in Supabase for now.
