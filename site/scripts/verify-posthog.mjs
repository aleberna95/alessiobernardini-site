// Verifica che la chiave PostHog in .env.local sia valida pingando l'API.
// Uso: node scripts/verify-posthog.mjs
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ENV_FILE = join(process.cwd(), ".env.local");

// Legge .env.local in modo minimale (no dipendenze esterne)
function parseEnvFile(path) {
  const vars = {};
  if (!existsSync(path)) return vars;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    vars[key] = val;
  }
  return vars;
}

const env = parseEnvFile(ENV_FILE);
const key = env["NEXT_PUBLIC_POSTHOG_KEY"];
const host = env["NEXT_PUBLIC_POSTHOG_HOST"] ?? "https://eu.i.posthog.com";

if (!key || key === "phc_xxx") {
  console.error("✗ NEXT_PUBLIC_POSTHOG_KEY non configurata in .env.local (o ancora placeholder).");
  console.error("  Imposta la chiave reale e rilancia.");
  process.exit(1);
}

console.log(`Ping PostHog → ${host} …`);

// /decide/?v=3 è l'endpoint leggero usato dall'SDK per validare la chiave
const res = await fetch(`${host}/decide/?v=3`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ api_key: key, distinct_id: "verify-ping" }),
});

if (res.status === 401 || res.status === 403) {
  console.error(`✗ Chiave non autorizzata (HTTP ${res.status}). Verifica NEXT_PUBLIC_POSTHOG_KEY.`);
  process.exit(1);
}

if (!res.ok) {
  const text = await res.text().catch(() => "");
  console.error(`✗ Risposta inattesa da PostHog: HTTP ${res.status} — ${text.slice(0, 200)}`);
  process.exit(1);
}

const json = await res.json().catch(() => null);

// Risposta attesa: { errorCode: undefined } oppure oggetto con featureFlags/config
if (json && json.errorCode) {
  console.error(`✗ PostHog ha risposto con errore: ${json.errorCode}`);
  process.exit(1);
}

console.log(`✓ Chiave valida — PostHog risponde correttamente (${host}).`);
