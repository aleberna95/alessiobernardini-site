# REBUILD — Sito alessiobernardini.dev

> Documento di esecuzione. Ogni step è atomico. Esegui in ordine.
> Non inventare testi, non aggiungere features, non cambiare tecnologie.

---

## CONTESTO

- **Tech stack**: Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS 4, Firebase Hosting
- **Working directory**: `site/`
- **Build**: `next build` → `site/out/` → Firebase Hosting
- **Config files da NON toccare**: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `package.json`, `firebase.json`
- **Route /qr**: gestita da Firebase redirect in `firebase.json`, NON serve una route Next.js
- **i18n**: IT di default, toggle EN. Usare lo stesso pattern `LanguageProvider` + `useLanguage()` + `useT(lang)` già esistente
- **Font**: Geist Sans (già configurato). NON usare Geist Mono come font principale
- **Static export**: `output: "export"` in next.config.ts — NON usare features server-side (no API routes, no SSR, no middleware)

---

## DESIGN SYSTEM

### Palette — Tema chiaro, professionale

```
Background principale:  #FFFFFF
Background sezioni alternate: #F8FAFC  (slate-50)
Surface / card: #FFFFFF con border #E2E8F0
Border: #E2E8F0  (slate-200)
Testo primario: #0F172A  (slate-900)
Testo secondario: #475569  (slate-600)
Testo muted: #94A3B8  (slate-400)
Accent primario: #2563EB  (blue-600)
Accent hover: #1D4ED8  (blue-700)
Accent light: #DBEAFE  (blue-100)
Accent gradient: from #2563EB to #3B82F6
Disponibile badge: #16A34A (green-600) su #DCFCE7 (green-100)
```

### Tipografia

- Heading: Geist Sans, font-bold, slate-900
- Body: Geist Sans, font-normal, slate-600
- Niente font monospace visibile all'utente
- Niente tutto-maiuscolo per sezioni intere

### Spaziatura sezioni

- Ogni sezione: `py-20 md:py-28 px-6`
- Container interno: `max-w-6xl mx-auto`
- Titoli sezione: `text-3xl md:text-4xl font-bold text-slate-900 mb-4`
- Sottotitoli sezione: `text-lg text-slate-500 mb-12`

---

## STRUTTURA PAGINA FINALE

```
Nav (sticky)
Hero (100vh)
Servizi (4 card)
Chi Sono (bio + numeri)
Progetti (case studies)
Contatti (info dirette)
Footer (minimo)
```

---

## STEP 1 — Pulire globals.css

**File**: `site/app/globals.css`

**Sostituire TUTTO il contenuto con**:

```css
@import "tailwindcss";

:root {
  --background: #FFFFFF;
  --background-alt: #F8FAFC;
  --surface: #FFFFFF;
  --border: #E2E8F0;
  --text: #0F172A;
  --text-secondary: #475569;
  --text-muted: #94A3B8;
  --accent: #2563EB;
  --accent-hover: #1D4ED8;
  --accent-light: #DBEAFE;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--text);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--text);
  font-family: var(--font-geist-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Scroll-reveal fade-in */
.section-fade {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-fade.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Cosa è cambiato**: via il tema scuro, via l'animazione cursor-blink, palette tutta chiara.

---

## STEP 2 — Aggiornare layout.tsx

**File**: `site/app/layout.tsx`

**Sostituire TUTTO il contenuto con**:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alessio Bernardini — Full Stack Developer",
  description:
    "Full Stack Developer. Sviluppo software, siti web, gestionali e automazioni per aziende e professionisti. Ascoli Piceno, disponibile da remoto.",
  openGraph: {
    title: "Alessio Bernardini — Full Stack Developer",
    description:
      "Sviluppo software, siti web, gestionali e automazioni per aziende e professionisti.",
    url: "https://alessiobernardini.dev",
    siteName: "Alessio Bernardini",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alessio Bernardini — Full Stack Developer",
    description:
      "Sviluppo software, siti web, gestionali e automazioni per aziende e professionisti.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-white min-h-screen">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
```

---

## STEP 3 — Riscrivere content.ts

**File**: `site/lib/content.ts`

**Sostituire TUTTO il contenuto con**:

```ts
import type { Lang } from './language-context'

export const GITHUB_USERNAME = 'alessiobernardini'
export const CAL_URL = 'https://cal.eu/alessiobernardini'

export const contactInfo = {
  phone: '+39 334 713 2869',
  email: 'alebernardini95@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alessiobernardini',
  linkedinLabel: 'linkedin.com/in/alessiobernardini',
  location: {
    it: 'Ascoli Piceno · Disponibile da remoto',
    en: 'Ascoli Piceno · Available remotely',
  },
}

export const available = true

// --- SERVIZI ---
export interface Service {
  id: string
  icon: 'globe' | 'layout' | 'zap' | 'link'
  title: Record<Lang, string>
  description: Record<Lang, string>
}

export const services: Service[] = [
  {
    id: 'web',
    icon: 'globe',
    title: { it: 'Siti web', en: 'Websites' },
    description: {
      it: 'Siti vetrina, landing page e portali web. Design responsive, veloci e ottimizzati per i motori di ricerca.',
      en: 'Showcase sites, landing pages and web portals. Responsive design, fast and SEO optimized.',
    },
  },
  {
    id: 'gestionali',
    icon: 'layout',
    title: { it: 'Gestionali', en: 'Management Software' },
    description: {
      it: 'Applicazioni web su misura per gestire dati, processi e operazioni aziendali. Dashboard, report e integrazioni.',
      en: 'Custom web applications to manage data, processes and business operations. Dashboards, reports and integrations.',
    },
  },
  {
    id: 'automazioni',
    icon: 'zap',
    title: { it: 'Automazioni', en: 'Automations' },
    description: {
      it: 'Automatizzazione di flussi di lavoro ripetitivi. Import dati, notifiche, sincronizzazione tra sistemi.',
      en: 'Automation of repetitive workflows. Data import, notifications, cross-system synchronization.',
    },
  },
  {
    id: 'api',
    icon: 'link',
    title: { it: 'API / AI', en: 'API / AI' },
    description: {
      it: 'Integrazioni con servizi esterni, API REST e intelligenza artificiale. Connessione tra piattaforme e sistemi.',
      en: 'Integration with external services, REST APIs and artificial intelligence. Cross-platform connections.',
    },
  },
]

// --- PROGETTI ---
export interface Project {
  id: string
  year: string
  period: Record<Lang, string>
  role: Record<Lang, string>
  name: string
  url?: string
  description: Record<Lang, string>
  results: Record<Lang, string[]>
  stack: string[]
}

export const projects: Project[] = [
  {
    id: 'zero',
    year: '2024',
    period: { it: '2024 – In corso', en: '2024 – Present' },
    role: { it: 'Lead Developer & Architect', en: 'Lead Developer & Architect' },
    name: 'Zero — Personal Finance Manager',
    url: 'https://zerofinance.it',
    description: {
      it: 'Applicazione web full-stack per la gestione delle finanze personali con architettura serverless.',
      en: 'Full-stack web application for personal finance management with serverless architecture.',
    },
    results: {
      it: [
        'Chat finanziaria AI con streaming SSE integrata con Gemini 2.5 Flash',
        'Import automatico estratti conto con test unitari Vitest',
        'Dashboard interattiva per investimenti, asset e budget mensili',
        'PWA con notifiche push e autenticazione biometrica',
      ],
      en: [
        'AI financial chat with SSE streaming via Gemini 2.5 Flash',
        'Automatic bank statement import with Vitest unit tests',
        'Interactive dashboard for investments, assets and monthly budgets',
        'PWA with push notifications and biometric authentication',
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Gemini AI'],
  },
  {
    id: 'vinolab',
    year: '2023',
    period: { it: '2023 – In corso', en: '2023 – Present' },
    role: { it: 'Lead Developer & Architect', en: 'Lead Developer & Architect' },
    name: 'Vinolab.pro',
    url: 'https://vinolab.pro',
    description: {
      it: 'Piattaforma SaaS per l\'analisi chimica del vino, sviluppata per un\'azienda del settore.',
      en: 'SaaS platform for chemical wine analysis, built for an industry company.',
    },
    results: {
      it: [
        'Piattaforma SaaS con modello a sottoscrizione via Stripe',
        'Frontend Angular + backend AdonisJS con API REST',
        'Deployment con Docker e Kubernetes',
        'Ottimizzazione rete via Cloudflare',
      ],
      en: [
        'SaaS platform with Stripe subscription model',
        'Angular frontend + AdonisJS backend with REST APIs',
        'Deployment with Docker and Kubernetes',
        'Network optimization via Cloudflare',
      ],
    },
    stack: ['Angular', 'AdonisJS', 'Node.js', 'TypeScript', 'MySQL', 'Docker', 'Kubernetes', 'Stripe'],
  },
  {
    id: 'acontel',
    year: '2023',
    period: { it: 'Maggio 2023 – In corso', en: 'May 2023 – Present' },
    role: { it: 'Full Stack Developer', en: 'Full Stack Developer' },
    name: 'Acontel — Agritech 4.0',
    description: {
      it: 'Sviluppo backend per sistemi IoT agricoli con flussi dati in tempo reale.',
      en: 'Backend development for agricultural IoT systems with real-time data streams.',
    },
    results: {
      it: [
        'Lead backend development, ciclo end-to-end dall\'analisi al deploy',
        'API REST e moduli di prodotto con focus su scalabilità',
        'Integrazione sistemi IoT e data-modeling per flussi dati agricoli',
      ],
      en: [
        'Lead backend development, full end-to-end cycle from analysis to deploy',
        'REST APIs and product modules focused on scalability',
        'IoT system integration and data-modeling for agricultural data flows',
      ],
    },
    stack: ['Node.js', 'TypeScript', 'Prisma', 'Firebase', 'Auth0', 'Vue 3', 'MySQL'],
  },
  {
    id: 'onmobility',
    year: '2021',
    period: { it: 'Ottobre 2021 – In corso', en: 'October 2021 – Present' },
    role: { it: 'Full Stack Developer', en: 'Full Stack Developer' },
    name: 'OnMobility — Mobilità Elettrica',
    description: {
      it: 'Applicazione e gestionale interno per una piattaforma di mobilità elettrica.',
      en: 'Application and internal management system for an electric mobility platform.',
    },
    results: {
      it: [
        'Sviluppo dell\'app "OnMobility" e del gestionale interno',
        'Backend con API REST e integrazione database MySQL',
      ],
      en: [
        'Development of the "OnMobility" app and internal management system',
        'Backend with REST APIs and MySQL database integration',
      ],
    },
    stack: ['Node.js', 'MySQL', 'REST APIs'],
  },
]

// --- STATS ---
export const stats = {
  years: '8+',
  projects: '6+',
  sectors: {
    it: ['Mobility', 'Agritech', 'FinTech', 'Wine'],
    en: ['Mobility', 'Agritech', 'FinTech', 'Wine'],
  },
}
```

---

## STEP 4 — Riscrivere translations.ts

**File**: `site/lib/translations.ts`

**Sostituire TUTTO il contenuto con**:

```ts
import type { Lang } from './language-context'

export interface Translation {
  nav: {
    services: string
    about: string
    work: string
    contact: string
    cta: string
  }
  hero: {
    headline: string
    subheadline: string
    services: string
    ctaPrimary: string
    ctaSecondary: string
    available: string
  }
  services: {
    sectionTitle: string
    sectionSubtitle: string
  }
  about: {
    sectionTitle: string
    sectionSubtitle: string
    bio: string[]
    statsYears: string
    statsProjects: string
    statsSectors: string
  }
  work: {
    sectionTitle: string
    sectionSubtitle: string
    role: string
    results: string
    stack: string
    viewProject: string
  }
  contact: {
    sectionTitle: string
    sectionSubtitle: string
    phone: string
    email: string
    linkedin: string
    location: string
    cta: string
  }
  footer: {
    copyright: string
  }
}

const translations: Record<Lang, Translation> = {
  it: {
    nav: {
      services: 'Servizi',
      about: 'Chi sono',
      work: 'Progetti',
      contact: 'Contatti',
      cta: 'Contattami',
    },
    hero: {
      headline: 'Sviluppo software\nper aziende e professionisti',
      subheadline: 'Full Stack Developer · Consulente software · P.IVA',
      services: 'Siti web · Gestionali · Automazioni · API / AI',
      ctaPrimary: 'Contattami',
      ctaSecondary: 'Scopri i servizi',
      available: 'Disponibile per nuovi progetti',
    },
    services: {
      sectionTitle: 'Servizi',
      sectionSubtitle: 'Cosa posso fare per la tua azienda',
    },
    about: {
      sectionTitle: 'Chi sono',
      sectionSubtitle: 'Alessio Bernardini — Full Stack Developer',
      bio: [
        'Full Stack Developer con esperienza consolidata nello sviluppo di applicazioni web e gestione di architetture cloud.',
        'Specializzato in ambiti Mobility, Agritech e FinTech, con una forte propensione all\'utilizzo di AI-Assisted Development per accelerare il ciclo di vita del software.',
        'Disponibile per consulenze e progetti freelance tramite Partita IVA.',
      ],
      statsYears: 'Anni di esperienza',
      statsProjects: 'Progetti in produzione',
      statsSectors: 'Settori',
    },
    work: {
      sectionTitle: 'Progetti',
      sectionSubtitle: 'Alcuni dei progetti a cui ho lavorato',
      role: 'Ruolo',
      results: 'Risultati',
      stack: 'Tecnologie',
      viewProject: 'Visita il progetto',
    },
    contact: {
      sectionTitle: 'Contatti',
      sectionSubtitle: 'Raccontami il tuo progetto',
      phone: 'Telefono',
      email: 'Email',
      linkedin: 'LinkedIn',
      location: 'Sede',
      cta: 'Prenota una call',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Alessio Bernardini — P.IVA`,
    },
  },
  en: {
    nav: {
      services: 'Services',
      about: 'About',
      work: 'Projects',
      contact: 'Contact',
      cta: 'Get in touch',
    },
    hero: {
      headline: 'Software development\nfor businesses and professionals',
      subheadline: 'Full Stack Developer · Software Consultant · Freelance',
      services: 'Websites · Management Software · Automations · API / AI',
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'View services',
      available: 'Available for new projects',
    },
    services: {
      sectionTitle: 'Services',
      sectionSubtitle: 'What I can do for your business',
    },
    about: {
      sectionTitle: 'About',
      sectionSubtitle: 'Alessio Bernardini — Full Stack Developer',
      bio: [
        'Full Stack Developer with solid experience building web applications and managing cloud architectures.',
        'Specialized in Mobility, Agritech and FinTech, with a strong focus on AI-Assisted Development to accelerate the software lifecycle.',
        'Available for freelance consulting and projects.',
      ],
      statsYears: 'Years of experience',
      statsProjects: 'Projects in production',
      statsSectors: 'Sectors',
    },
    work: {
      sectionTitle: 'Projects',
      sectionSubtitle: 'Some of the projects I\'ve worked on',
      role: 'Role',
      results: 'Results',
      stack: 'Technologies',
      viewProject: 'Visit project',
    },
    contact: {
      sectionTitle: 'Contact',
      sectionSubtitle: 'Tell me about your project',
      phone: 'Phone',
      email: 'Email',
      linkedin: 'LinkedIn',
      location: 'Location',
      cta: 'Book a call',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Alessio Bernardini`,
    },
  },
}

export function useT(lang: Lang): Translation {
  return translations[lang]
}
```

---

## STEP 5 — Mantenere hooks.ts e language-context.tsx

**NON modificare** `site/lib/hooks.ts` e `site/lib/language-context.tsx`. Sono già corretti.

---

## STEP 6 — Riscrivere page.tsx

**File**: `site/app/page.tsx`

**Sostituire TUTTO il contenuto con**:

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Work from '@/components/Work'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-white">
      <Nav />
      <Hero />
      <Services />
      <About />
      <Work />
      <Contact />
      <Footer />
    </main>
  )
}
```

---

## STEP 7 — Componente Nav

**File**: `site/components/Nav.tsx`

**Sostituire TUTTO il contenuto con**:

```tsx
'use client'

import { useState } from 'react'
import { useLanguage, type Lang } from '@/lib/language-context'
import { useT } from '@/lib/translations'

export default function Nav() {
  const { lang, setLang } = useLanguage()
  const t = useT(lang)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#servizi', label: t.nav.services },
    { href: '#chi-sono', label: t.nav.about },
    { href: '#progetti', label: t.nav.work },
    { href: '#contatti', label: t.nav.contact },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-slate-900">
          Alessio Bernardini
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            {lang === 'it' ? 'EN' : 'IT'}
          </button>

          {/* CTA */}
          <a
            href="#contatti"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            {lang === 'it' ? 'EN' : 'IT'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-slate-600"
            aria-label="Menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contatti"
            onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </nav>
  )
}
```

---

## STEP 8 — Componente Hero

**File**: `site/components/Hero.tsx`

**Sostituire TUTTO il contenuto con**:

```tsx
'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { available } from '@/lib/content'

export default function Hero() {
  const { lang } = useLanguage()
  const t = useT(lang)

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* Availability badge */}
        {available && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-700 font-medium">
              {t.hero.available}
            </span>
          </div>
        )}

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight whitespace-pre-line mb-6">
          {t.hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-500 mb-4">
          {t.hero.subheadline}
        </p>

        {/* Services line */}
        <p className="text-base text-slate-400 mb-10">
          {t.hero.services}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contatti"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors w-full sm:w-auto"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#servizi"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors w-full sm:w-auto"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
```

---

## STEP 9 — Componente Services (NUOVO)

**File**: `site/components/Services.tsx` — **CREARE NUOVO FILE**

```tsx
'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { services } from '@/lib/content'
import { useInView } from '@/lib/hooks'

const icons: Record<string, React.ReactNode> = {
  globe: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  ),
  layout: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  zap: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  link: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
}

export default function Services() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const { ref, visible } = useInView()

  return (
    <section
      id="servizi"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 md:py-28 px-6 bg-slate-50 section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.services.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.services.sectionSubtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                {icons[service.icon]}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {service.title[lang]}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {service.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## STEP 10 — Componente About (NUOVO, sostituisce Who + Now)

**File**: `site/components/About.tsx` — **CREARE NUOVO FILE**

```tsx
'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { stats } from '@/lib/content'
import { useInView } from '@/lib/hooks'

export default function About() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const { ref, visible } = useInView()

  return (
    <section
      id="chi-sono"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 md:py-28 px-6 bg-white section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.about.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.about.sectionSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="md:col-span-2 space-y-4">
            {t.about.bio.map((paragraph, i) => (
              <p key={i} className="text-base text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <p className="text-3xl font-bold text-blue-600 mb-1">{stats.years}</p>
              <p className="text-sm text-slate-500">{t.about.statsYears}</p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <p className="text-3xl font-bold text-blue-600 mb-1">{stats.projects}</p>
              <p className="text-sm text-slate-500">{t.about.statsProjects}</p>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500 mb-2">{t.about.statsSectors}</p>
              <div className="flex flex-wrap gap-2">
                {stats.sectors[lang].map((sector) => (
                  <span
                    key={sector}
                    className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## STEP 11 — Componente Work (riscrittura)

**File**: `site/components/Work.tsx`

**Sostituire TUTTO il contenuto con**:

```tsx
'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { projects } from '@/lib/content'
import { useInView } from '@/lib/hooks'

export default function Work() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const { ref, visible } = useInView()

  return (
    <section
      id="progetti"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 md:py-28 px-6 bg-slate-50 section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.work.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.work.sectionSubtitle}
        </p>

        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {project.period[lang]} · {project.role[lang]}
                  </p>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors shrink-0"
                  >
                    {t.work.viewProject}
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>

              <p className="text-base text-slate-600 mb-4">
                {project.description[lang]}
              </p>

              {/* Results */}
              <ul className="space-y-2 mb-6">
                {project.results[lang].map((result, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 text-blue-500 shrink-0">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {result}
                  </li>
                ))}
              </ul>

              {/* Stack badges */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## STEP 12 — Componente Contact (riscrittura)

**File**: `site/components/Contact.tsx`

**Sostituire TUTTO il contenuto con**:

```tsx
'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { contactInfo, CAL_URL } from '@/lib/content'

export default function Contact() {
  const { lang } = useLanguage()
  const t = useT(lang)

  const items = [
    {
      label: t.contact.phone,
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: t.contact.email,
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: t.contact.linkedin,
      value: contactInfo.linkedinLabel,
      href: contactInfo.linkedin,
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: t.contact.location,
      value: contactInfo.location[lang],
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ]

  return (
    <section id="contatti" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.contact.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.contact.sectionSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-0.5">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-base font-medium text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-base font-medium text-slate-900">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Cal.com */}
        <div className="text-center">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {t.contact.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
```

---

## STEP 13 — Componente Footer (NUOVO)

**File**: `site/components/Footer.tsx` — **CREARE NUOVO FILE**

```tsx
'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLanguage()
  const t = useT(lang)

  return (
    <footer className="border-t border-slate-200 py-8 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <p className="text-sm text-slate-400">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
```

---

## STEP 14 — Eliminare file non più usati

**Eliminare** questi file che non sono più referenziati:

1. `site/components/Who.tsx`
2. `site/components/Now.tsx`
3. `site/components/Stack.tsx`

NON eliminare `site/public/photo.png` — potrebbe servire in futuro.

---

## STEP 15 — Aggiornare firebase.json redirect /qr

**File**: `firebase.json` (nella root, NON in site/)

Cambiare la destinazione del redirect `/qr` da LinkedIn a homepage:

```json
{
  "hosting": {
    "public": "site/out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "redirects": [
      {
        "source": "/qr",
        "destination": "https://alessiobernardini.dev/",
        "type": 302
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|wasm|data)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      },
      {
        "source": "**/*.html",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }]
      }
    ]
  }
}
```

---

## STEP 16 — Build e verifica

```bash
cd site
npm run build
```

Verificare:
- Zero errori TypeScript
- Zero errori ESLint
- Output generato in `site/out/`
- Aprire `site/out/index.html` — deve mostrare la pagina chiara

---

## STEP 17 — Dev server e QA visivo

```bash
cd site
npm run dev
```

Controllare su http://localhost:3000:
- [ ] Sfondo bianco, testo scuro, accent blu
- [ ] Nav sticky con links funzionanti + CTA
- [ ] Hero centrato con badge disponibilità + headline + 2 bottoni
- [ ] Sezione servizi con 4 card + icone
- [ ] Sezione chi sono con bio + 3 stat card
- [ ] Sezione progetti con 4 card progetto, link esterni, badge stack
- [ ] Sezione contatti con telefono, email, linkedin, sede + CTA Calendly
- [ ] Footer minimo
- [ ] Toggle IT/EN funzionante ovunque
- [ ] Mobile responsive (menu hamburger)
- [ ] Scroll smooth tra sezioni
- [ ] Animazioni fade-in al scroll

---

## RIEPILOGO FILE

| Azione | File |
|--------|------|
| MODIFICA | `site/app/globals.css` |
| MODIFICA | `site/app/layout.tsx` |
| MODIFICA | `site/app/page.tsx` |
| MODIFICA | `site/lib/content.ts` |
| MODIFICA | `site/lib/translations.ts` |
| NESSUNA MODIFICA | `site/lib/hooks.ts` |
| NESSUNA MODIFICA | `site/lib/language-context.tsx` |
| MODIFICA | `site/components/Nav.tsx` |
| MODIFICA | `site/components/Hero.tsx` |
| MODIFICA | `site/components/Work.tsx` |
| MODIFICA | `site/components/Contact.tsx` |
| CREA | `site/components/Services.tsx` |
| CREA | `site/components/About.tsx` |
| CREA | `site/components/Footer.tsx` |
| ELIMINA | `site/components/Who.tsx` |
| ELIMINA | `site/components/Now.tsx` |
| ELIMINA | `site/components/Stack.tsx` |
| MODIFICA | `firebase.json` |
| NESSUNA MODIFICA | `site/next.config.ts` |
| NESSUNA MODIFICA | `site/tsconfig.json` |
| NESSUNA MODIFICA | `site/package.json` |
