import type { Lang } from './language-context'

export interface Translation {
  nav: {
    services: string
    about: string
    work: string
    sites: string
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
  sites: {
    sectionTitle: string
    sectionSubtitle: string
    visit: string
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
      sites: 'Siti',
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
        "Specializzato in ambiti Mobility, Agritech e FinTech, con una forte propensione all'utilizzo di AI-Assisted Development per accelerare il ciclo di vita del software.",
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
    sites: {
      sectionTitle: 'Siti',
      sectionSubtitle: 'Siti web che ho realizzato',
      visit: 'Visita il sito',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Alessio Bernardini — P.IVA 02607070444`,
    },
  },
  en: {
    nav: {
      services: 'Services',
      about: 'About',
      work: 'Projects',
      sites: 'Sites',
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
      sectionSubtitle: "Some of the projects I've worked on",
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
    sites: {
      sectionTitle: 'Sites',
      sectionSubtitle: 'Websites I have built',
      visit: 'Visit site',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Alessio Bernardini — VAT 02607070444`,
    },
  },
}

export function useT(lang: Lang): Translation {
  return translations[lang]
}
