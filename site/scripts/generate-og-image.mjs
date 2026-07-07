// Genera public/og-image.png (1200×630) abbinata al brand BA.
// Uso: node scripts/generate-og-image.mjs
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const W = 1200;
const H = 630;
const ROOT = process.cwd();

const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

// --- Sfondo navy con gradiente diagonale ---
const bg = ctx.createLinearGradient(0, 0, W, H);
bg.addColorStop(0, "#0a1628");
bg.addColorStop(1, "#0e1f38");
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

// --- Glow blu radiale dietro il logo ---
const glow = ctx.createRadialGradient(300, 315, 40, 300, 315, 420);
glow.addColorStop(0, "rgba(37, 99, 235, 0.28)");
glow.addColorStop(1, "rgba(37, 99, 235, 0)");
ctx.fillStyle = glow;
ctx.fillRect(0, 0, W, H);

// --- Bordo interno sottile ---
ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
ctx.lineWidth = 2;
ctx.strokeRect(24, 24, W - 48, H - 48);

// --- Logo BA a sinistra (tile arrotondata) ---
const logo = await loadImage(join(ROOT, "public", "logo.png"));
const logoSize = 300;
const logoX = 90;
const logoY = (H - logoSize) / 2;
const radius = 36;

function roundedRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

// Ombra morbida sotto la tile
ctx.save();
ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
ctx.shadowBlur = 40;
ctx.shadowOffsetY = 16;
roundedRect(ctx, logoX, logoY, logoSize, logoSize, radius);
ctx.fillStyle = "#0a1424";
ctx.fill();
ctx.restore();

// Logo clippato dentro la tile
ctx.save();
roundedRect(ctx, logoX, logoY, logoSize, logoSize, radius);
ctx.clip();
ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
ctx.restore();

// Bordo sottile della tile
ctx.save();
roundedRect(ctx, logoX, logoY, logoSize, logoSize, radius);
ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
ctx.lineWidth = 1.5;
ctx.stroke();
ctx.restore();

// --- Testo a destra ---
const textX = 470;
const fontStack = "Segoe UI, Arial, sans-serif";

// Nome
ctx.fillStyle = "#ffffff";
ctx.font = `bold 76px ${fontStack}`;
ctx.textBaseline = "alphabetic";
ctx.fillText("Alessio", textX, 250);
ctx.fillText("Bernardini", textX, 330);

// Ruolo (blu brand)
ctx.fillStyle = "#3b82f6";
ctx.font = `600 40px ${fontStack}`;
ctx.fillText("Full Stack Developer", textX, 400);

// Linea accent
const line = ctx.createLinearGradient(textX, 0, textX + 220, 0);
line.addColorStop(0, "#2563eb");
line.addColorStop(1, "rgba(37, 99, 235, 0)");
ctx.fillStyle = line;
ctx.fillRect(textX, 430, 220, 4);

// Claim servizi
ctx.fillStyle = "#94a3b8";
ctx.font = `400 28px ${fontStack}`;
ctx.fillText("Gestionali · App · Siti web · Automazioni", textX, 480);

// Dominio (in basso)
ctx.fillStyle = "#64748b";
ctx.font = `500 26px ${fontStack}`;
ctx.fillText("alessiobernardini.dev", textX, 545);

// --- Barra accent in basso ---
const bar = ctx.createLinearGradient(0, 0, W, 0);
bar.addColorStop(0, "#2563eb");
bar.addColorStop(0.5, "#3b82f6");
bar.addColorStop(1, "#2563eb");
ctx.fillStyle = bar;
ctx.fillRect(0, H - 8, W, 8);

// --- Esporta PNG ---
const out = join(ROOT, "public", "og-image.png");
writeFileSync(out, canvas.toBuffer("image/png"));
console.log(`✅ OG image generata: ${out} (${W}×${H})`);
