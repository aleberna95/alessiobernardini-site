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
    year: '2026',
    period: { it: '2026', en: '2026' },
    role: { it: 'Lead Developer & Architect', en: 'Lead Developer & Architect' },
    name: 'Zero — Personal Finance Manager',
    url: 'https://zerofinance.it',
    description: {
      it: 'App mobile e web per la gestione delle finanze personali, disponibile su Google Play Store e prossimamente su Apple App Store. Accessibile anche via web per gli utenti registrati. Architettura serverless con AI integrata.',
      en: 'Mobile and web app for personal finance management, available on Google Play Store and coming soon to Apple App Store. Also accessible via web for registered users. Serverless architecture with integrated AI.',
    },
    results: {
      it: [
        'Disponibile su Google Play Store · Apple App Store in arrivo · Accesso web per utenti registrati',
        'Chat finanziaria AI con streaming SSE integrata con Gemini 2.5 Flash',
        'Import automatico estratti conto con test unitari Vitest',
        'Dashboard interattiva per investimenti, asset e budget mensili',
        'Notifiche push e autenticazione biometrica',
      ],
      en: [
        'Available on Google Play Store · Apple App Store coming soon · Web access for registered users',
        'AI financial chat with SSE streaming via Gemini 2.5 Flash',
        'Automatic bank statement import with Vitest unit tests',
        'Interactive dashboard for investments, assets and monthly budgets',
        'Push notifications and biometric authentication',
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Gemini AI'],
  },
  {
    id: 'vinifera',
    year: '2026',
    period: { it: '2026', en: '2026' },
    role: { it: 'Lead Developer & Architect', en: 'Lead Developer & Architect' },
    name: 'Vinifera — CRM per Laboratorio Enologico',
    url: 'https://crm.viniferastudioenologico.it/',
    description: {
      it: 'CRM full-stack per laboratorio di analisi enologiche. Gestione clienti, preventivi con PDF personalizzati, campioni in lavorazione, pacchetti prepagati e rate di pagamento.',
      en: 'Full-stack CRM for a wine analysis laboratory. Client management, quotes with custom PDFs, samples in progress, prepaid packages and payment instalments.',
    },
    results: {
      it: [
        'Gestione completa di clienti, preventivi e campioni in lavorazione',
        'Generazione PDF personalizzati per preventivi e documenti',
        'Dashboard con aggregazioni dati in tempo reale',
        'Pacchetti prepagati e gestione rate di pagamento',
        'Notifiche automatiche via Telegram ed email (Resend)',
      ],
      en: [
        'Full management of clients, quotes and samples in progress',
        'Custom PDF generation for quotes and documents',
        'Dashboard with real-time data aggregations',
        'Prepaid packages and payment instalment management',
        'Automatic notifications via Telegram and email (Resend)',
      ],
    },
    stack: ['Next.js 15', 'TypeScript', 'Firebase', 'Vercel', 'shadcn/ui', 'react-pdf', 'Resend'],
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
        "Lead backend development, ciclo end-to-end dall'analisi al deploy",
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

// --- SITI ---
export interface Site {
  id: string
  name: string
  url: string
  description: Record<Lang, string>
  year: string
}

export const sites: Site[] = [
  {
    id: 'alessiobernardini',
    name: 'alessiobernardini.dev',
    url: 'https://alessiobernardini.dev',
    description: {
      it: 'Sito personale e portfolio professionale.',
      en: 'Personal site and professional portfolio.',
    },
    year: '2026',
  },
  {
    id: 'colleiano',
    name: 'colleiano.it',
    url: 'https://colleiano.it',
    description: {
      it: 'Sito web per il Comune di Colleiano.',
      en: 'Website for the Municipality of Colleiano.',
    },
    year: '2026',
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

