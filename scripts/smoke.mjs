// Smoke test: loads every page in the sitemap and checks the basics.
//   1) npm run build && npm start         (or: npm run dev)
//   2) node scripts/smoke.mjs [baseUrl]   (default http://localhost:3000)
// Exits with code 1 if anything fails, so it can run in CI before deploy.
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const PUBLIC_ORIGIN = "https://unilife.com.ng";

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error("  FAIL  " + msg);
};

const sitemapRes = await fetch(`${base}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`Could not load ${base}/sitemap.xml (${sitemapRes.status}). Is the server running?`);
  process.exit(1);
}
const xml = await sitemapRes.text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
console.log(`Checking ${paths.length} pages on ${base}\n`);

for (const path of paths) {
  const res = await fetch(base + path, { redirect: "manual" });
  const html = res.ok ? await res.text() : "";
  const problems = [];

  if (res.status >= 300 && res.status < 400) problems.push(`redirects (${res.status}); remove it from the sitemap`);
  else if (!res.ok) problems.push(`status ${res.status}`);
  else {
    if (!/<title>[^<]{3,}<\/title>/.test(html)) problems.push("missing <title>");
    if (!/<meta name="description" content="[^"]{20,}"/.test(html)) problems.push("missing meta description");
    if (!/property="og:title"/.test(html)) problems.push("missing og:title");
    if (!/name="twitter:card"/.test(html)) problems.push("missing twitter:card");
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!canonical) problems.push("missing canonical");
    else if (path !== "" && path !== "/" && !canonical.endsWith(path))
      problems.push(`canonical points elsewhere (${canonical.replace(PUBLIC_ORIGIN, "")})`);
    if (/Application error|Internal Server Error/.test(html)) problems.push("error text in page");
  }

  if (problems.length) {
    console.error(`${path || "/"}`);
    problems.forEach(fail);
  } else {
    console.log(`  ok    ${path || "/"}`);
  }
}

console.log(failures ? `\n${failures} problem(s) found.` : "\nAll pages passed.");
process.exit(failures ? 1 : 0);
