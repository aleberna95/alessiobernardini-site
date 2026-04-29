import type { Lang } from './language-context'

export interface Translation {
  nav: {
    who: string
    now: string
    work: string
    stack: string
    contact: string
  }
  hero: {
    bootLines: string[]
    placeholder: string
    skipLabel: string
    commands: {
      help: string
      whoami: string
      projects: string
      contact: string
      unknown: (cmd: string) => string
    }
  }
  who: {
    sectionTitle: string
    tabs: { recruiter: string; human: string }
    recruiter: {
      title: string
      subtitle: string
      bio: string
      highlights: string[]
    }
    human: {
      title: string
      subtitle: string
      bio: string
      highlights: string[]
    }
  }
  now: {
    sectionTitle: string
    sectionSubtitle: string
    building: string
    reading: string
    lastCommit: string
    available: string
    availableYes: string
    availableNo: string
    loadingCommit: string
    commitError: string
  }
  work: {
    sectionTitle: string
    sectionSubtitle: string
    problem: string
    built: string
    stack: string
    viewLive: string
  }
  stack: {
    sectionTitle: string
    sectionSubtitle: string
    categories: { daily: string; tested: string; quests: string }
    dailyDesc: string
    testedDesc: string
    questsDesc: string
  }
  contact: {
    sectionTitle: string
    headline: string
    subheadline: string
    email: string
    linkedin: string
    call: string
    callSub: string
    qrNote: string
  }
  footer: {
    madeWith: string
    eatDogfood: string
  }
}

const translations: Record<Lang, Translation> = {
  it: {
    nav: {
      who: 'Chi sono',
      now: 'Ora',
      work: 'Lavori',
      stack: 'Stack',
      contact: 'Contatti',
    },
    hero: {
      bootLines: [
        '> ./alessio --init',
        '[■■■■■■■■■■■■■■■■] Caricamento...',
        '[OK] 8 anni di codice in produzione',
        '[OK] 4 verticali attivi: mobility · agritech · fintech · wine',
        '[OK] AI-assisted development: ON',
        '[OK] P.IVA: disponibile per consulenze',
        '[WARN] 1 gioco Unity in standby',
        '',
        'Ciao. Sono Alessio.',
        'Costruisco software che gira in produzione, non slide.',
        '',
        "Digita 'help' per i comandi disponibili, o scrolla.",
      ],
      placeholder: 'digita un comando...',
      skipLabel: 'Scrolla al portfolio',
      commands: {
        help: `Comandi disponibili:\n  whoami     — chi sono\n  projects   — i miei progetti\n  contact    — come contattarmi\n  clear      — pulisci il terminale`,
        whoami:
          'Full Stack Developer. Ex game programmer. Faccio prodotti reali con P.IVA.',
        projects:
          'Scrolla fino alla sezione WORK, o visita zerofinance.it e vinolab.pro',
        contact:
          'alebernardini95@gmail.com · linkedin.com/in/alessiobernardini',
        unknown: (cmd: string) =>
          `Comando non trovato: '${cmd}'. Digita 'help' per la lista.`,
      },
    },
    who: {
      sectionTitle: 'Chi sono',
      tabs: { recruiter: 'Recruiter', human: 'Umano' },
      recruiter: {
        title: 'Full Stack Web Developer',
        subtitle: 'Ascoli Piceno (AP) · P.IVA disponibile',
        bio: "Full Stack Developer con esperienza consolidata nello sviluppo di applicazioni web e mobile e gestione di architetture cloud. Specializzato in ambiti Mobility e Agricoltura 4.0, con una forte propensione all'utilizzo di AI-Assisted Development per accelerare il ciclo di vita del software.",
        highlights: [
          '4+ anni in mobilità elettrica (OnMobility)',
          '3+ anni in Agritech IoT (Acontel)',
          'Lead dev su 2 prodotti SaaS indie (Zero, Vinolab)',
          'Background in programmazione videogiochi (AIV, C++)',
        ],
      },
      human: {
        title: 'Ciao, sono Alessio.',
        subtitle: 'Faccio cose con il computer da quando avevo 10 anni.',
        bio: "Ho iniziato facendo videogiochi. Poi ho scoperto che il web era un altro posto dove ottimizzare loop e costruire sistemi che non si rompono. Da allora ho lavorato su app di mobilità elettrica, piattaforme agritech, un finance manager personale con AI integrata, e un SaaS per l'analisi chimica del vino. Ogni progetto è diverso, la metodologia è sempre la stessa: capire il problema vero, costruire la soluzione minima, iterare dal vivo.",
        highlights: [
          "Ho fatto survival-crafting games prima di fare API REST",
          "Uso l'AI per codare più veloce, non per non capire cosa scrivo",
          'P.IVA aperta, zero burocrazia, solo deliverable',
          '"Eat your own dogfood": questo sito gira su Firebase, come i miei prodotti',
        ],
      },
    },
    now: {
      sectionTitle: 'Ora',
      sectionSubtitle: 'Cosa sto facendo in questo momento.',
      building: 'Sto costruendo',
      reading: 'Sto leggendo',
      lastCommit: 'Ultimo commit',
      available: 'Disponibile per consulenze',
      availableYes: 'Sì',
      availableNo: 'No, pieno fino a',
      loadingCommit: 'Caricamento...',
      commitError: 'Impossibile caricare',
    },
    work: {
      sectionTitle: 'Lavori',
      sectionSubtitle: 'Prodotti reali, non esperimenti.',
      problem: 'Il problema',
      built: 'Cosa ho costruito',
      stack: 'Stack',
      viewLive: 'Vedi live',
    },
    stack: {
      sectionTitle: 'Stack',
      sectionSubtitle:
        'Quello con cui costruisco, non quello su cui metto spunta.',
      categories: {
        daily: 'Daily drivers',
        tested: 'Battle-tested',
        quests: 'Side quests',
      },
      dailyDesc: 'Uso ogni giorno',
      testedDesc: 'In produzione',
      questsDesc: 'Da game dev / uni',
    },
    contact: {
      sectionTitle: 'Contatti',
      headline: 'Hai un problema da risolvere?',
      subheadline:
        'Scrivimi. Se è qualcosa in cui posso aiutare, ti rispondo entro 24h.',
      email: 'Email',
      linkedin: 'LinkedIn',
      call: 'Prenota una call',
      callSub: '15 min, niente fuffa',
      qrNote: 'Questo è anche il link del QR sul mio biglietto da visita.',
    },
    footer: {
      madeWith: 'Fatto con Next.js + Firebase.',
      eatDogfood: 'Eat your own dogfood.',
    },
  },

  en: {
    nav: {
      who: 'About',
      now: 'Now',
      work: 'Work',
      stack: 'Stack',
      contact: 'Contact',
    },
    hero: {
      bootLines: [
        '> ./alessio --init',
        '[■■■■■■■■■■■■■■■■] Loading...',
        '[OK] 8 years of code in production',
        '[OK] 4 active verticals: mobility · agritech · fintech · wine',
        '[OK] AI-assisted development: ON',
        '[OK] Available for freelance',
        '[WARN] 1 Unity game on standby',
        '',
        "Hi. I'm Alessio.",
        'I build software that runs in production, not slides.',
        '',
        "Type 'help' for available commands, or scroll.",
      ],
      placeholder: 'type a command...',
      skipLabel: 'Scroll to portfolio',
      commands: {
        help: `Available commands:\n  whoami     — who I am\n  projects   — my projects\n  contact    — how to reach me\n  clear      — clear terminal`,
        whoami: 'Full Stack Developer. Ex game programmer. I ship real products.',
        projects:
          'Scroll to the WORK section, or visit zerofinance.it and vinolab.pro',
        contact:
          'alebernardini95@gmail.com · linkedin.com/in/alessiobernardini',
        unknown: (cmd: string) =>
          `Command not found: '${cmd}'. Type 'help' for the list.`,
      },
    },
    who: {
      sectionTitle: 'About',
      tabs: { recruiter: 'Recruiter', human: 'Human' },
      recruiter: {
        title: 'Full Stack Web Developer',
        subtitle: 'Ascoli Piceno, Italy · Available for freelance',
        bio: 'Full Stack Developer with solid experience in web and mobile application development and cloud architecture management. Specialized in Mobility and Agriculture 4.0, with a strong inclination toward AI-Assisted Development to accelerate the software lifecycle.',
        highlights: [
          '4+ years in electric mobility (OnMobility)',
          '3+ years in Agritech IoT (Acontel)',
          'Lead dev on 2 indie SaaS products (Zero, Vinolab)',
          'Background in game programming (AIV, C++)',
        ],
      },
      human: {
        title: "Hey, I'm Alessio.",
        subtitle: "I've been doing things with computers since I was 10.",
        bio: "I started making video games. Then I found out the web was another place to optimize loops and build systems that don't break. Since then I've worked on electric mobility apps, agritech platforms, a personal finance manager with integrated AI, and a SaaS for chemical wine analysis. Every project is different. The approach is always the same: find the real problem, build the minimum solution, iterate in production.",
        highlights: [
          'I made survival-crafting games before making REST APIs',
          "I use AI to code faster, not to avoid understanding what I write",
          'Freelance available, zero overhead, only deliverables',
          '"Eat your own dogfood": this site runs on Firebase, like my products',
        ],
      },
    },
    now: {
      sectionTitle: 'Now',
      sectionSubtitle: "What I'm working on right now.",
      building: 'Building',
      reading: 'Reading',
      lastCommit: 'Last commit',
      available: 'Available for freelance',
      availableYes: 'Yes',
      availableNo: 'No, booked until',
      loadingCommit: 'Loading...',
      commitError: 'Could not load',
    },
    work: {
      sectionTitle: 'Work',
      sectionSubtitle: 'Real products, not experiments.',
      problem: 'The problem',
      built: 'What I built',
      stack: 'Stack',
      viewLive: 'View live',
    },
    stack: {
      sectionTitle: 'Stack',
      sectionSubtitle: "What I actually build with, not what I just checkbox.",
      categories: {
        daily: 'Daily drivers',
        tested: 'Battle-tested',
        quests: 'Side quests',
      },
      dailyDesc: 'Use every day',
      testedDesc: 'In production',
      questsDesc: 'From game dev / uni',
    },
    contact: {
      sectionTitle: 'Contact',
      headline: 'Got a problem to solve?',
      subheadline:
        "Write me. If it's something I can help with, I'll reply within 24h.",
      email: 'Email',
      linkedin: 'LinkedIn',
      call: 'Book a call',
      callSub: '15 min, no fluff',
      qrNote: 'This is also the link behind the QR on my business card.',
    },
    footer: {
      madeWith: 'Built with Next.js + Firebase.',
      eatDogfood: 'Eat your own dogfood.',
    },
  },
}

export function useT(lang: Lang): Translation {
  return translations[lang]
}
