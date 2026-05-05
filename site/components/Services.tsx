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
