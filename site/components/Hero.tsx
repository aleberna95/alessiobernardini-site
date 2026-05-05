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
