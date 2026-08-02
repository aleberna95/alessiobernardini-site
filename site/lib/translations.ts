import type { Lang } from './language-context'

export interface Translation {
  nav: {
    services: string
    about: string
    work: string
    offers: string
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
  offers: {
    sectionTitle: string
    sectionSubtitle: string
    featured: string
    recommended: string
    allServices: string
    requestInfo: string
    noOffers: string
    loading: string
    perMonth: string
    from: string
    included: string
    notIncluded: string
    back: string
    recurring: string
    setupLabel: string
    durationMonths: string
    durationYears: string
    categoryLabels: Record<string, string>
    categoryDescriptions: Record<string, string>
    offersCount: string
  }
  leadForm: {
    title: string
    subtitle: string
    name: string
    namePlaceholder: string
    email: string
    emailPlaceholder: string
    phone: string
    phonePlaceholder: string
    company: string
    companyPlaceholder: string
    message: string
    messagePlaceholder: string
    send: string
    sending: string
    success: string
    successMessage: string
    error: string
    close: string
    interestedIn: string
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
    ctaNote: string
    formTitle: string
  }
  sites: {
    sectionTitle: string
    sectionSubtitle: string
    visit: string
  }
  footer: {
    copyright: string
    privacy: string
  }
}

const translations: Record<Lang, Translation> = {
  it: {
    nav: {
      services: 'Servizi',
      about: 'Chi sono',
      work: 'Progetti',
      offers: 'Offerte',
      sites: 'Siti',
      contact: 'Contatti',
      cta: 'Contattami',
    },
    hero: {
      headline: 'Sviluppo software\nper aziende e professionisti',
      subheadline: 'Alessio Bernardini — Full Stack Developer con P.IVA ad Ascoli Piceno, specializzato in gestionali, app e automazioni per aziende agritech, fintech e mobility.',
      services: 'Gestionali · App · Siti web · Automazioni · API / AI',
      ctaPrimary: 'Contattami',
      ctaSecondary: 'Scopri i servizi',
      available: 'Disponibile per nuovi progetti',
    },
    services: {
      sectionTitle: 'Servizi',
      sectionSubtitle: 'Cosa posso fare per la tua azienda',
    },
    offers: {
      sectionTitle: 'Offerte',
      sectionSubtitle: 'Pacchetti e soluzioni pronte per il tuo business',
      featured: 'In evidenza',
      recommended: 'Consigliato',
      allServices: 'Tutti i servizi',
      requestInfo: 'Richiedi informazioni',
      noOffers: 'Nessuna offerta disponibile al momento.',
      loading: 'Caricamento offerte…',
      perMonth: '/mese',
      from: 'A partire da',
      included: 'Incluso',
      notIncluded: 'Non incluso',
      back: 'Tutte le categorie',
      recurring: 'Canone',
      setupLabel: 'Costo iniziale',
      durationMonths: 'mesi',
      durationYears: 'anni',
      categoryLabels: {
        website: 'Siti Web',
        crm: 'Gestionali / CRM',
        app: 'App iOS · Android · Web',
        automation: 'Automazioni',
        api: 'API / AI',
        custom: 'Progetto su misura',
      },
      categoryDescriptions: {
        website: 'Siti vetrina, landing page e portali web su misura.',
        crm: 'Software gestionali, CRM e dashboard personalizzate.',
        app: 'Applicazioni mobile e progressive web app. Esperienza nativa su ogni dispositivo.',
        automation: 'Automatizzazione di flussi di lavoro ripetitivi. Import dati, notifiche e sincronizzazioni.',
        api: 'Integrazioni con servizi esterni, API REST e intelligenza artificiale.',
        custom: 'Hai un\'idea diversa? Raccontamela e costruiamo la soluzione giusta.',
      },
      offersCount: 'offerte',
    },
    leadForm: {
      title: 'Richiedi informazioni',
      subtitle: 'Compila il form e ti rispondo entro 24 ore.',
      name: 'Nome e Cognome',
      namePlaceholder: 'Mario Rossi',
      email: 'Email',
      emailPlaceholder: 'mario@esempio.it',
      phone: 'Telefono',
      phonePlaceholder: '+39 333 123 4567',
      company: 'Azienda',
      companyPlaceholder: 'Nome azienda (opzionale)',
      message: 'Messaggio',
      messagePlaceholder: 'Descrivi brevemente di cosa hai bisogno\u2026',
      send: 'Invia richiesta',
      sending: 'Invio in corso\u2026',
      success: 'Richiesta inviata!',
      successMessage: 'Ti ricontatterò il prima possibile.',
      error: 'Si è verificato un errore. Riprova più tardi.',
      close: 'Chiudi',
      interestedIn: 'Interessato a',
    },
    about: {
      sectionTitle: 'Chi sono',
      sectionSubtitle: 'Alessio Bernardini — Full Stack Developer',
      bio: [
        'Alessio Bernardini è un Full Stack Developer con P.IVA ad Ascoli Piceno, con oltre 8 anni di esperienza nello sviluppo di applicazioni web e gestione di architetture cloud.',
        "Specializzato nei settori Mobility, Agritech e FinTech, progetta e realizza gestionali su misura, app mobile e automazioni per aziende e professionisti. Forte propensione all'utilizzo di AI-Assisted Development per accelerare il ciclo di vita del software.",
        'Disponibile per consulenze e progetti freelance tramite Partita IVA. Operativo da remoto in tutta Italia.',
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
      sectionTitle: 'Hai un progetto in mente?',
      sectionSubtitle: 'Scrivimi, sono sempre disponibile a sentire nuove idee.',
      phone: 'Telefono',
      email: 'Email',
      linkedin: 'LinkedIn',
      location: 'Sede',
      cta: 'Scrivi su WhatsApp',
      ctaNote: 'Di solito rispondo entro poche ore.',
      formTitle: 'Oppure scrivimi qui',
    },
    sites: {
      sectionTitle: 'Siti',
      sectionSubtitle: 'Siti web che ho realizzato',
      visit: 'Visita il sito',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Alessio Bernardini — P.IVA 02607070444`,
      privacy: 'Privacy',
    },
  },
  en: {
    nav: {
      services: 'Services',
      about: 'About',
      work: 'Projects',
      offers: 'Offers',
      sites: 'Sites',
      contact: 'Contact',
      cta: 'Get in touch',
    },
    hero: {
      headline: 'Software development\nfor businesses and professionals',
      subheadline: 'Alessio Bernardini — Full Stack Developer based in Ascoli Piceno, Italy, specialized in management software, apps and automations for agritech, fintech and mobility companies.',
      services: 'Management Software · Apps · Websites · Automations · API / AI',
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'View services',
      available: 'Available for new projects',
    },
    services: {
      sectionTitle: 'Services',
      sectionSubtitle: 'What I can do for your business',
    },
    offers: {
      sectionTitle: 'Offers',
      sectionSubtitle: 'Packages and solutions ready for your business',
      featured: 'Featured',
      recommended: 'Recommended',
      allServices: 'All services',
      requestInfo: 'Request info',
      noOffers: 'No offers available at the moment.',
      loading: 'Loading offers…',
      perMonth: '/month',
      from: 'Starting from',
      included: 'Included',
      notIncluded: 'Not included',
      back: 'All categories',
      recurring: 'Monthly',
      setupLabel: 'Upfront cost',
      durationMonths: 'months',
      durationYears: 'years',
      categoryLabels: {
        website: 'Websites',
        crm: 'Management Software / CRM',
        app: 'iOS · Android · Web Apps',
        automation: 'Automations',
        api: 'API / AI',
        custom: 'Custom project',
      },
      categoryDescriptions: {
        website: 'Showcase sites, landing pages and custom web portals.',
        crm: 'Custom management software, CRM and dashboards.',
        app: 'Mobile and progressive web apps. Native-like experience on every device.',
        automation: 'Automation of repetitive workflows. Data import, notifications and synchronization.',
        api: 'Integration with external services, REST APIs and artificial intelligence.',
        custom: 'Have a different idea? Tell me about it and we\'ll build the right solution.',
      },
      offersCount: 'offers',
    },
    leadForm: {
      title: 'Request info',
      subtitle: 'Fill out the form and I\'ll get back to you within 24 hours.',
      name: 'Full name',
      namePlaceholder: 'John Doe',
      email: 'Email',
      emailPlaceholder: 'john@example.com',
      phone: 'Phone',
      phonePlaceholder: '+1 555 123 4567',
      company: 'Company',
      companyPlaceholder: 'Company name (optional)',
      message: 'Message',
      messagePlaceholder: 'Briefly describe what you need\u2026',
      send: 'Send request',
      sending: 'Sending\u2026',
      success: 'Request sent!',
      successMessage: 'I\'ll get back to you as soon as possible.',
      error: 'Something went wrong. Please try again later.',
      close: 'Close',
      interestedIn: 'Interested in',
    },
    about: {
      sectionTitle: 'About',
      sectionSubtitle: 'Alessio Bernardini — Full Stack Developer',
      bio: [
        'Alessio Bernardini is a Full Stack Developer based in Ascoli Piceno, Italy, with over 8 years of experience building web applications and managing cloud architectures.',
        'Specialized in Mobility, Agritech and FinTech, he designs and builds custom management software, mobile apps and automations for businesses. Strong focus on AI-Assisted Development to accelerate the software lifecycle.',
        'Available for freelance consulting and projects. Works remotely across Italy.',
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
      sectionTitle: 'Have a project in mind?',
      sectionSubtitle: "Get in touch \u2014 I'm always open to hearing new ideas.",
      phone: 'Phone',
      email: 'Email',
      linkedin: 'LinkedIn',
      location: 'Location',
      cta: 'Write on WhatsApp',
      ctaNote: 'I usually reply within a few hours.',
      formTitle: 'Or write to me here',
    },
    sites: {
      sectionTitle: 'Sites',
      sectionSubtitle: 'Websites I have built',
      visit: 'Visit site',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Alessio Bernardini — VAT 02607070444`,
      privacy: 'Privacy',
    },
  },
}

export function useT(lang: Lang): Translation {
  return translations[lang]
}
