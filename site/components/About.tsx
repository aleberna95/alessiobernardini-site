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
