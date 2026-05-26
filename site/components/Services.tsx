'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { services } from '@/lib/content'

/** Maps service.id → CRM offer category */
const SERVICE_TO_CATEGORY: Record<string, string> = {
  web: 'website',
  gestionali: 'crm',
  app: 'custom',
  automazioni: 'custom',
  api: 'custom',
}

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
  smartphone: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function Services() {
  const { lang } = useLanguage()
  const t = useT(lang)

  return (
    <section
      id="servizi"
      className="py-20 md:py-28 px-6 bg-slate-50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.services.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.services.sectionSubtitle}
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service) => (
            <motion.a
              key={service.id}
              href="#offerte"
              onClick={() => {
                const cat = SERVICE_TO_CATEGORY[service.id] ?? 'custom'
                window.dispatchEvent(new CustomEvent('select-offer-category', { detail: cat }))
              }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer block overflow-hidden"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {icons[service.icon]}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {service.title[lang]}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {service.description[lang]}
              </p>
              {/* Arrow reveal */}
              <span className="absolute bottom-5 right-5 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200 text-base select-none">
                →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
