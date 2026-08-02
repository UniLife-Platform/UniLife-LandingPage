# Deploying UniLife to unilife.com.ng

Your situation: Firebase project already exists (used by the Flutter app),
this Next.js code is already on GitHub, DNS is managed at Truehost (cPanel).

Firebase App Hosting requires the **Blaze (pay-as-you-go) plan**. It has a
generous free tier — you only pay if you exceed it — but the project must
be upgraded from Spark before App Hosting will work.

---

## 1. Upgrade to Blaze (if not already)

Firebase Console → your project → bottom-left "Spark plan" → **Upgrade** →
Blaze. You'll need a payment method on file even if you stay within the
free tier.

## 2. Create the App Hosting backend

Firebase Console → your project → **Hosting & Serverless → App Hosting** →
**Get started**.

- Connect your GitHub account if you haven't already, and grant access to
  the `unilife-landing` repo (or whatever you named it).
- **Root directory**: `/` (unless the Next.js app lives in a subfolder of
  the repo — set this to wherever `package.json` actually is).
- **Live branch**: `main` (or whichever branch you want auto-deploying).
- Give the backend an ID, e.g. `unilife-web`.
- Firebase will auto-detect Next.js via its framework adapter — no need to
  add a custom build command.

Once created, every push to your live branch triggers an automatic build +
rollout. You can also trigger one manually from the console.

## 3. Environment variables

`apphosting.yaml` is already in this repo with placeholders for the two
Supabase referral-system vars. Once you've set up the real Supabase
project for the referral campaign (separate step — see
`supabase/referral_schema.sql`), either:

- Edit `apphosting.yaml` directly and push, **or**
- Firebase Console → App Hosting → your backend → **Settings → Environment**
  and add/edit them there (takes effect on next rollout either way).

Until then, the referral pages will keep showing clearly-labeled demo data
— this won't block deploying the rest of the site.

## 4. Connect unilife.com.ng

Firebase Console → App Hosting → your backend → **Domains** →
**Add custom domain** → enter `unilife.com.ng`.

Firebase will give you a **TXT record** first, to prove ownership:

1. Log into Truehost → your hosting account → **cPanel** → **Domains** →
   **Zone Editor**.
2. Select `unilife.com.ng` → **Add Record** → type **TXT**.
3. Host/Name: `@` (or leave blank for root — cPanel usually auto-fills
   the domain).
4. Value: paste exactly what Firebase gave you.
5. Save, go back to Firebase, click **Verify**. This can take anywhere
   from minutes to a few hours to propagate — don't panic if it's not
   instant.

Once verified, Firebase gives you **A records** (usually two IPs) to point
the domain at App Hosting:

1. Back in Truehost's Zone Editor, **delete any existing A records** for
   `@` on this domain first — leaving old ones in place will block SSL
   provisioning.
2. Add the two A records Firebase provided, both with Host `@`.
3. If you also want `www.unilife.com.ng` to work, repeat the "Add custom
   domain" flow for that too (Firebase will likely just ask you to add a
   CNAME for `www` pointing at the apex, or its own A records).

SSL provisions automatically once DNS resolves — give it up to 24 hours.

## 5. Verify it's live

Once the Firebase console shows the domain as **Connected**, visit
`https://unilife.com.ng` and click through a few pages. Check:

- [ ] Homepage loads with the ID card hero
- [ ] Nav "Log in" and "Get the app" links work
- [ ] `/sitemap.xml` and `/robots.txt` resolve
- [ ] `/referral` still works but isn't linked from anywhere public

---

## 6. Domain migration checklist (from earlier — do this once the main site is live)

- [ ] Deploy the Flutter web build to `app.unilife.com.ng` (same
      Firebase-App-Hosting-custom-domain process, or Firebase Hosting if
      that's what the Flutter build uses — different product, same idea)
- [ ] Add a 301 redirect from `unilife.com.ng/app` → `app.unilife.com.ng`
      (do this in `next.config.ts` on the Next.js side using the
      `redirects()` config, since that path is now served by this site)
- [ ] Firebase Auth → Settings → **Authorized domains** → add
      `app.unilife.com.ng`
- [ ] Supabase → Authentication → URL Configuration → update **Site URL**
      to `https://app.unilife.com.ng`, add it to **Redirect URLs**
- [ ] Google Cloud Console (OAuth) → update Authorized JavaScript origins
      and redirect URIs to include `app.unilife.com.ng`
- [ ] Sweep the Flutter app for any hardcoded `unilife.com.ng/app` links
      (deep links, share links, email templates) and update them
