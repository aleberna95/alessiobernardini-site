# alessiobernardini.dev — Brainstorming Sito Personale

> Documento di concept / north star per il sito personale.
> Obiettivo: distinguersi nel mare di portfolio "Hi I'm a developer" copiati da Vercel templates.

---

## 1. Posizionamento — Chi sei in 5 secondi

**NON sei** "un altro full stack developer".

**SEI**:
> *Full Stack Developer con cervello da game programmer e mani da imprenditore. Costruisco prodotti che girano in produzione, non slide.*

Tre asset narrativi unici dal tuo CV che NESSUNO ha:
1. **Background videogiochi** (AIV, C++, performance, networking) → rarissimo tra full stack web
2. **Tre verticali reali**: Mobility (OnMobility) + Agritech (Acontel) + FinTech (Zero) + Wine SaaS (Vinolab) → polymath, non monoculturale
3. **AI-Assisted Development nativo** (Gemini, Antigravity, Copilot) — non come buzzword ma come metodologia

→ Il sito deve URLARE queste tre cose senza dirle.

---

## 2. Concept Creativi — scegline UNO (non fare il minestrone)

### 🎮 Concept A — "Dev Console" *(consigliato)*
Il sito È un terminale interattivo / console di gioco.
- Boot animation tipo BIOS all'arrivo: `LOADING ALESSIO.OS v1.0...`
- Comandi disponibili: `whoami`, `projects`, `play`, `contact`, `cv`, `qr`
- L'utente "normale" può comunque scrollare la versione GUI sotto
- Easter egg: comandi nascosti tipo `sudo hire-me`, `konami`, `cat secrets.txt`
- **Perché funziona per te**: unisce il tuo lato game dev + dev tool + è memorabile

### 🌱 Concept B — "Living Garden"
Il sito è un giardino digitale che cresce in tempo reale:
- Ogni progetto è una pianta che ha "germogliato" in un certo anno
- L'AI Chat di Zero diventa metafora visiva (radici dati che si espandono)
- Riferimento Agritech sottile ma intelligente
- **Rischio**: troppo metaforico, può sembrare arty senza sostanza

### 🕹️ Concept C — "Boss Fight Portfolio"
Ogni progetto è un "boss" da affrontare con stats:
- HP = complessità del progetto
- Stack mostrato come "moveset"
- Quando "sconfiggi" il boss vedi case study
- **Pro**: usa il tuo Unity game come tutorial level
- **Rischio**: gimmick che stanca al secondo progetto

### 🎯 La mia raccomandazione
**Concept A (Dev Console) come hero**, ma con sezioni GUI normali sotto. Best of both worlds: WOW factor per recruiter tech, leggibilità per HR/clienti.

---

## 3. Struttura Pagina (single-page, scroll-driven)

```
┌──────────────────────────────────────────┐
│ 1. HERO — Console interattiva            │  ← solo console, 100vh
├──────────────────────────────────────────┤
│ 2. WHO — 3 frasi taglienti               │
├──────────────────────────────────────────┤
│ 3. NOW — cosa sto facendo OGGI           │  ← /now page style
├──────────────────────────────────────────┤
│ 4. WORK — progetti come case study       │  ← non lista, storia
├──────────────────────────────────────────┤
│ 5. PLAYGROUND — Unity game embed         │  ← il differentiator
├──────────────────────────────────────────┤
│ 6. STACK — non lista, ma "weapons"       │
├──────────────────────────────────────────┤
│ 7. WRITING / THOUGHTS (opzionale)        │
├──────────────────────────────────────────┤
│ 8. CONTACT — un solo CTA chiaro          │
└──────────────────────────────────────────┘
```

---

## 4. Sezione per sezione — cosa metterci esattamente

### 🟢 1. HERO — Console
Idee per il primo paint:
```
> ./alessio --init
[OK] Loading 8 anni di codice in produzione...
[OK] Indexing 4 verticali (mobility, agritech, fintech, wine)...
[OK] Caricato 1 game playabile.

Hi. Sono Alessio. Costruisco software che gira.
Digita 'help' o scrolla.
```
- Cursor che lampeggia
- Tasti tab/freccia funzionanti
- Mobile: input tappabile + tastiera scorciatoie

### 🟢 2. WHO — Bio in 2 livelli
Mostra 2 versioni della stessa bio, switchabili:
- 👔 **Recruiter** (formale, tech stack, numeri)
- 🍺 **Human** (umano, diretto, "ho iniziato facendo videogiochi")

Idea forte: switch animato, stessa persona, due lenti.

> Niente versione "founder" / "pirate" separata: due voci sono già abbastanza, tre diventano cosplay.

### 🟢 3. NOW — la sezione che NESSUNO fa bene
Stile [nownownow.com](https://nownownow.com), sezione viva:
- "Sto leggendo: ..."
- "Sto buildando: ..."  ← agganciato a GitHub API per ultimo commit
- "Ultima feature shippata su Zero: ... (3 giorni fa)"
- "Disponibile per consulenze: ✅ Sì / ❌ Pieno fino a..."
- **Auto-aggiornata**: data dell'ultima modifica visibile → segnale "questo sito è vivo"

### 🟢 4. WORK — Case study, non lista
Per ogni progetto, una mini-storia con questa struttura:
```
[Logo/visual] [Anno] [Ruolo]
Il problema (1 frase concreta)
Cosa ho costruito (3 bullet, verbi all'attivo)
Numeri reali (500 transazioni, X utenti, Y latency)
Stack (icone, non lista)
[Link live] [Link case study esteso]
```

Ordine consigliato (dall'impressionante al solido):
1. **Zero** — lead, è tuo, ha numeri (500+ tx, AI, SSE)
2. **Vinolab** — SaaS reale, Stripe, k8s
3. **Acontel** — Agritech, IoT, scala enterprise
4. **OnMobility** — il "long-runner", 4+ anni

### 🟢 5. PLAYGROUND — il tuo asso 🎮 *(desktop only)*
**Gioco scelto**: **Piliffo and the Lost Island** (Global Game Jam 2021).

**Tecnicamente fattibile**: Unity → WebGL build, embed iframe.

Setup:
- Unity Editor → `File > Build Settings > WebGL > Build`
- Output: cartella con `index.html` + `Build/` + `TemplateData/`
- Carichi `Build/` su Firebase Hosting in `/public/play/`
- Embed nel sito con `<iframe src="/play/" />` o canvas diretto

**Caveat reali**:
- Build WebGL pesa (15-50MB) → usa compression Brotli, Firebase la serve out-of-the-box
- Mostra un "▶ Play" poster prima, NON auto-load: rispetto bandwidth

**Mobile / tablet — fallback esplicito**:
Unity WebGL su mobile è inaffidabile (touch input, memoria, audio). Quindi:
- Detect `window.matchMedia('(pointer: fine)')` + width ≥ 1024px
- Se mobile/tablet → mostra **placeholder** invece dell'iframe:
  ```
  ┌──────────────────────────────────────┐
  │  🎮  Piliffo and the Lost Island     │
  │                                      │
  │  C'è un giochino vero qui sotto.     │
  │  Per giocarci ti serve un desktop    │
  │  con tastiera — torna da PC.         │
  │                                      │
  │  [Screenshot statico del gioco]      │
  │  [Link al video gameplay su YouTube] │
  └──────────────────────────────────────┘
  ```
- Bonus: link a un GIF/video gameplay 30s così anche su mobile capiscono cosa si stanno perdendo

**Microcopy attorno al gioco** (questa è la parte importante):
> "Ho fatto videogiochi prima di fare web. Premi play, è un giochino di 2 minuti.
> Mentre giochi, sotto il cofano sta girando lo stesso tipo di pensiero
> con cui ottimizzo cold-start delle Cloud Functions.
> Se ti diverti, scrivimi. Se ti diverti E vuoi assumermi, scrivimi prima."

→ Questo è il momento "vengo sulla poltrona" che hai chiesto. Funziona perché collega gioco → mentalità → business.

### 🟢 6. STACK — "Weapons", non checkbox
Visualizzazione orizzontale, 3 categorie:
- **Daily drivers** (uso ogni giorno: TS, Next, Firebase, Tailwind)
- **Battle-tested** (li ho usati in produzione: Angular, AdonisJS, k8s, Prisma, MySQL)
- **Side quests** (li conosco da gamedev/uni: C++, C#, Unity)

Hover su ogni tech → "ultima volta usata: 3 giorni fa, in [progetto]". Vivo.

### 🟢 7. WRITING / THOUGHTS — opzionale ma potente
3-5 brevi note tipo "post-it":
- "Perché non mi fido dei microservizi prima dei 10k utenti"
- "AI-assisted ≠ AI-generated: la differenza vale il tuo stipendio"
- "Da game dev a web dev: 5 cose che il browser ha rubato a Unity"

→ SEO, condivisibilità, e ti posiziona come **opinione**, non solo esecutore.

### 🟢 8. CONTACT — Un solo CTA
Niente form lungo. Tre opzioni in fila:
- 📧 Email diretta (mailto, niente form)
- 💼 LinkedIn (`/qr` in piccolo: "questo è anche il mio QR del biglietto da visita")
- 📅 Cal.com / 15 min call

**Bottone primario**: "Hai un problema da risolvere?" (non "Contattami")

---

## 5. Dettagli che fanno la differenza

### Tone of voice
- **Diretto, italiano-inglese mix naturale** (sei italiano, non fingere)
- Zero buzzword vuote ("sinergie", "innovativo", "passionate")
- Numeri reali quando ci sono. Quando non ci sono, racconta il problema.
- Self-deprecating leggero ("ho iniziato facendo videogiochi, mi è rimasto il vizio dei loop ottimizzati")

### Visual identity
- **Mono-color con un accent forte** (es. bianco/nero + verde terminal #00FF41 o ambra console #FFB000)
- Font: Mono per console (JetBrains Mono / Geist Mono), sans per il resto (Inter / Geist)
- **Niente glassmorphism, niente gradient violacei**: tutti li usano nel 2026
- Movimento sì, ma minimale: micro-interactions, non parallax pesanti

### Performance / SEO
- 100/100 Lighthouse (è il MINIMO per un dev portfolio)
- OG image custom per `/qr` con foto + LinkedIn
- `meta description` curata, non default
- Sitemap + robots.txt
- `/now` indexata
- Schema.org `Person` per Google Knowledge Panel

### Funzionalità "vive"
- Ultimo commit GitHub via API (cached 1h)
- Status disponibilità (manuale, JSON in repo)
- View counter discreto su singoli case study (Firebase Analytics)
- Dark/light auto + toggle

### Easter eggs (perché te lo meriti)
- Konami code → spawn enemy/coin
- `console.log` di benvenuto per chi apre devtools (recruiter tecnici lo fanno)
- View source pulito e commentato → bonus credibility
- 404 page giocabile (mini-game in canvas)

---

## 6. Stack tecnico consigliato per il sito

Scelta opinionata (per te, che hai Next.js 16 fresco da Zero):

| Layer | Scelta | Perché |
|-------|--------|--------|
| Framework | **Next.js 16 App Router** | Già lo usi, SSG perfetto qui |
| Styling | **Tailwind CSS** | Stack tuo, veloce |
| Animation | **Motion (ex-Framer)** | Solo dove serve |
| Console | **xterm.js** o custom canvas | Vero terminale o simulato |
| Game embed | **Unity WebGL build** statico | Iframe in /play |
| Hosting | **Firebase Hosting** | Già configurato, redirect /qr già live |
| Analytics | **Plausible** o **Firebase Analytics** | Plausible se vuoi privacy-first |
| CMS contenuti | **MDX in repo** | Niente Sanity/Contentful per 5 pagine |

→ Tutto deployabile con `firebase deploy`. Stesso progetto del redirect.

---

## 7. Roadmap suggerita (per fasi)

### Fase 1 — MVP (1 weekend)
- Hero console statica (no logica, solo estetica)
- Bio + 4 case study brevi
- Stack section
- Contact
- Deploy. Online.

### Fase 2 — Vita (1 settimana)
- Console interattiva con 5 comandi
- /now page
- Unity game embed
- Easter eggs base

### Fase 3 — Authority (continuo)
- 3 articoli /writing
- OG images custom
- View counter
- Bio "3 livelli" switcher

→ **Importante**: non aspettare la Fase 3 per andare live. La Fase 1 già batte il 90% dei portfolio dev.

---

## 8. Cosa NON mettere (anti-pattern da evitare)

- ❌ "Welcome to my portfolio" / hero generico
- ❌ Lista lunga di skill con barre 80% / 95% (cringe e mente)
- ❌ Form contatti con 6 campi obbligatori
- ❌ Animazioni di scroll che bloccano la lettura
- ❌ Carousel di testimonianze fasulle
- ❌ "Available for hire" lampeggiante senza dire COSA cerchi
- ❌ Foto stock di "developer at desk"
- ❌ Sezione blog vuota con "Coming soon"
- ❌ Sezione "Hobbies: coffee, music, traveling" (vero per tutti = vero per nessuno)

---

## 9. Microcopy / frasi che potresti rubare al volo

- *"Costruisco software che gira in produzione, non slide."*
- *"Da videogiochi a finance app: stesso loop, target diverso."*
- *"AI-assisted, human-decided."*
- *"Se hai un problema strano, probabilmente l'ho già visto in un altro verticale."*
- *"P.IVA disponibile. Niente burocrazia, solo codice."*
- *"Questo sito è hostato sullo stesso Firebase di Zero. Eat your own dogfood."*

---

## 10. Decisioni prese ✅

1. **Lingua**: ✅ **bilingue IT/EN**, switch top-right. **Default: italiano**. Switch a EN disponibile.
2. **Foto**: ✅ **Sì**, una sola, professionale ma non rigida. Contesto reale, non headshot LinkedIn.
3. **Game**: ✅ **Piliffo and the Lost Island**, embed Unity WebGL, **desktop only** con fallback informativo su mobile/tablet.
4. **Bio voices**: ✅ **2 livelli** (Recruiter / Human), niente Pirate o Founder separati.
5. **CV PDF**: ✅ **No**. Il sito È il CV.
6. **Rate cards / pricing**: ✅ **No**. Niente listino pubblico.

Tutte le decisioni sono prese. Nessuna domanda aperta rimasta.

---

## TL;DR

Costruisci un sito che sembra un terminale, racconta 4 progetti reali con numeri, embedda un Unity game come "level secret", parla come un essere umano italiano che codifica da 8 anni, e tieni `/qr` come collegamento al LinkedIn dal biglietto da visita. 

Spendi un weekend per la Fase 1, vai online, itera dal vivo. Fatto > perfetto.

E sì: **vieni sulla poltrona**. Quel gioco Unity è il dettaglio che ti farà ricordare.
