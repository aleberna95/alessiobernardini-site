import type { Lang } from './language-context'

export const GITHUB_USERNAME = 'alessiobernardini'

export const CAL_URL = 'https://cal.eu/alessiobernardini'

// --- NOW data (edit these manually when things change) ---
export const nowData = {
  building: {
    it: 'alessiobernardini.dev — questo sito',
    en: 'alessiobernardini.dev — this site',
  },
  reading: {
    it: 'The Pragmatic Programmer — Hunt & Thomas',
    en: 'The Pragmatic Programmer — Hunt & Thomas',
  },
  available: true,
  bookedUntil: '', // e.g. '2025-09-01' when not available
}

// --- PROJECTS ---
export interface Project {
  id: string
  year: string
  period: Record<Lang, string>
  role: Record<Lang, string>
  name: string
  url?: string
  problem: Record<Lang, string>
  built: Record<Lang, string[]>
  stack: string[]
  highlight?: Record<Lang, string>
}

export const projects: Project[] = [
  {
    id: 'zero',
    year: '2024',
    period: { it: '2024 – In corso', en: '2024 – Present' },
    role: { it: 'Lead Developer & Architect', en: 'Lead Developer & Architect' },
    name: 'Zero — Personal Finance Manager',
    url: 'https://zerofinance.it',
    problem: {
      it: 'Volevo un finance manager che capisse le mie transazioni, non solo le elencasse.',
      en: "I wanted a finance manager that understood my transactions, not just listed them.",
    },
    built: {
      it: [
        'AI Chat finanziaria con streaming SSE integrata con Gemini 2.5 Flash, analisi su 500+ transazioni',
        'Import automatico estratti conto (CSV parsing) protetto da test unitari Vitest',
        'Dashboard interattiva per tracciamento investimenti, asset e budget mensili via Recharts',
        'PWA con service worker, notifiche push (Firebase Cloud Messaging) e auth biometrica/PIN',
      ],
      en: [
        'Financial AI Chat with SSE streaming via Gemini 2.5 Flash, analyzing 500+ transactions',
        'Automatic bank statement import (CSV parsing) with Vitest unit tests',
        'Interactive dashboard for tracking investments, assets, and monthly budgets via Recharts',
        'PWA with service worker, push notifications (Firebase Cloud Messaging) and biometric/PIN auth',
      ],
    },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Gemini 2.5'],
    highlight: {
      it: '500+ tx analizzate con AI',
      en: '500+ transactions analyzed by AI',
    },
  },
  {
    id: 'vinolab',
    year: '2023',
    period: { it: '2023 – In corso', en: '2023 – Present' },
    role: {
      it: 'Lead Developer & Architect (Freelance)',
      en: 'Lead Developer & Architect (Freelance)',
    },
    name: 'Vinolab.pro',
    url: 'https://vinolab.pro',
    problem: {
      it: "Un'azienda vinicola aveva bisogno di una piattaforma SaaS per gestire l'analisi chimica del vino a pagamento.",
      en: 'A wine company needed a SaaS platform to manage chemical wine analysis as a paid service.',
    },
    built: {
      it: [
        'Piattaforma SaaS full-stack con modello di business a sottoscrizione via Stripe',
        'Frontend Angular + backend AdonisJS con API REST e database MySQL',
        'Deployment completo con Docker e Kubernetes (k8s)',
        'Ottimizzazione rete via Cloudflare',
      ],
      en: [
        'Full-stack SaaS platform with subscription business model via Stripe',
        'Angular frontend + AdonisJS backend with REST APIs and MySQL database',
        'Full deployment with Docker and Kubernetes (k8s)',
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
    problem: {
      it: 'Costruire il backend per sistemi IoT agricoli complessi con flussi dati in tempo reale.',
      en: 'Build the backend for complex agricultural IoT systems with real-time data streams.',
    },
    built: {
      it: [
        "Lead backend development in ambito Agritech 4.0, ciclo end-to-end dall'analisi al deploy",
        'API REST e moduli di prodotto complessi con focus su scalabilità e prestazioni',
        'Integrazione sistemi IoT e data-modeling per ottimizzazione flussi dati agricoli',
      ],
      en: [
        'Lead backend development in Agritech 4.0, full end-to-end cycle from analysis to deploy',
        'REST APIs and complex product modules focused on scalability and performance',
        'IoT system integration and data-modeling for agricultural data flow optimization',
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
    problem: {
      it: "Sviluppare l'app e il gestionale per una piattaforma di mobilità elettrica da zero.",
      en: 'Build the app and backoffice for an electric mobility platform from scratch.',
    },
    built: {
      it: [
        'Sviluppo dell\'applicazione "OnMobility" e del gestionale interno',
        'Backend con API REST e integrazione database MySQL',
        '4+ anni di iterazione continua su prodotto live',
      ],
      en: [
        'Development of the "OnMobility" application and internal management system',
        'Backend with REST APIs and MySQL database integration',
        '4+ years of continuous iteration on a live product',
      ],
    },
    stack: ['Node.js', 'MySQL', 'REST APIs'],
    highlight: {
      it: '4+ anni in produzione',
      en: '4+ years in production',
    },
  },
]

// --- STACK ---
export interface StackItem {
  name: string
  lastUsedIn?: string
}

export const stackCategories: {
  key: 'daily' | 'tested' | 'quests'
  items: StackItem[]
}[] = [
  {
    key: 'daily',
    items: [
      { name: 'TypeScript', lastUsedIn: 'Zero' },
      { name: 'Next.js', lastUsedIn: 'Zero' },
      { name: 'React', lastUsedIn: 'Zero' },
      { name: 'Firebase', lastUsedIn: 'Zero' },
      { name: 'Tailwind CSS', lastUsedIn: 'Zero' },
      { name: 'Node.js', lastUsedIn: 'Acontel' },
      { name: 'Gemini AI', lastUsedIn: 'Zero' },
    ],
  },
  {
    key: 'tested',
    items: [
      { name: 'Angular', lastUsedIn: 'Vinolab' },
      { name: 'Vue 3', lastUsedIn: 'Acontel' },
      { name: 'AdonisJS', lastUsedIn: 'Vinolab' },
      { name: 'Prisma', lastUsedIn: 'Acontel' },
      { name: 'MySQL', lastUsedIn: 'OnMobility' },
      { name: 'MongoDB', lastUsedIn: 'Zero' },
      { name: 'Docker', lastUsedIn: 'Vinolab' },
      { name: 'Kubernetes', lastUsedIn: 'Vinolab' },
      { name: 'Auth0', lastUsedIn: 'Acontel' },
      { name: 'Stripe', lastUsedIn: 'Vinolab' },
      { name: 'Cloudflare', lastUsedIn: 'Vinolab' },
    ],
  },
  {
    key: 'quests',
    items: [
      { name: 'C++', lastUsedIn: 'AIV' },
      { name: 'C#', lastUsedIn: 'Unity' },
      { name: 'Unity', lastUsedIn: 'Piliffo' },
      { name: 'Vitest', lastUsedIn: 'Zero' },
    ],
  },
]
