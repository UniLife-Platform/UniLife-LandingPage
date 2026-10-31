// Downloads every remote image referenced in the source into /public/img and rewrites the URLs.
// Run once on your machine (needs internet):   node scripts/localize-images.mjs
// Then commit the new files in public/img. Safe to re-run: existing files are skipped.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, extname } from "node:path";

const ROOTS = ["app", "components", "lib"];
const OUT_DIR = "public/img";
const URL_RE = /https:\/\/images\.unsplash\.com\/[^"'`\s)]+/g;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx?|jsx?)$/.test(name)) files.push(p);
  }
  return files;
}

mkdirSync(OUT_DIR, { recursive: true });
const files = ROOTS.filter(existsSync).flatMap((r) => walk(r));
const cache = new Map(); // url -> local path

for (const file of files) {
  let src = readFileSync(file, "utf8");
  const urls = [...new Set(src.match(URL_RE) ?? [])];
  if (!urls.length) continue;

  for (const url of urls) {
    if (!cache.has(url)) {
      const id = createHash("sha1").update(url).digest("hex").slice(0, 10);
      const local = `/img/${id}.jpg`;
      const dest = join("public", local);
      if (!existsSync(dest)) {
        const res = await fetch(url);
        if (!res.ok) {
          console.error(`SKIP ${res.status} ${url}`);
          continue;
        }
        writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
        console.log(`saved ${local}  <-  ${url.slice(0, 70)}...`);
      }
      cache.set(url, local);
    }
    src = src.split(url).join(cache.get(url));
  }
  writeFileSync(file, src);
  console.log(`rewrote ${file}`);
}
console.log("Done. Review with git diff, then commit public/img.");
