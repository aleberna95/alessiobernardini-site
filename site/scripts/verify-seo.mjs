import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");
const errors = [];
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => { errors.push(msg); console.error(`  ✗ ${msg}`); };

function checkFile(rel) {
  const p = join(OUT, rel);
  if (existsSync(p)) { ok(`${rel} esiste`); return readFileSync(p, "utf8"); }
  fail(`${rel} mancante`);
  return "";
}

console.log("Verifica SEO/GEO su out/…");

// 1. File statici obbligatori
checkFile("robots.txt");
checkFile("sitemap.xml");
checkFile("llms.txt");
checkFile("og-image.png");

// 2. index.html
const html = checkFile("index.html");

// 3. Metadata assoluti
if (/rel="canonical"/.test(html)) ok("canonical presente"); else fail("canonical mancante");
if (/property="og:image"[^>]*alessiobernardini\.dev/.test(html) || /og:image"\s+content="https:\/\/alessiobernardini\.dev/.test(html))
  ok("og:image assoluto"); else fail("og:image non assoluto");
if (/summary_large_image/.test(html)) ok("twitter summary_large_image"); else fail("twitter card errata");

// 4. JSON-LD
const ldMatches = html.match(/application\/ld\+json/g) || [];
if (ldMatches.length >= 2) ok(`JSON-LD presente (${ldMatches.length} blocchi)`);
else fail(`JSON-LD insufficiente (trovati ${ldMatches.length}, attesi >= 2)`);
if (/"@type":"Person"/.test(html)) ok("schema Person"); else fail("schema Person mancante");
if (/"@type":"ProfessionalService"/.test(html)) ok("schema ProfessionalService"); else fail("schema ProfessionalService mancante");

// 5. Robots consente indicizzazione
const robots = existsSync(join(OUT, "robots.txt")) ? readFileSync(join(OUT, "robots.txt"), "utf8") : "";
if (/Sitemap:\s*https:\/\/alessiobernardini\.dev\/sitemap\.xml/.test(robots)) ok("robots → sitemap");
else fail("robots senza riferimento sitemap");

if (errors.length) {
  console.error(`\n❌ ${errors.length} problemi SEO rilevati.`);
  process.exit(1);
}
console.log("\n✅ Tutti i controlli SEO superati.");
