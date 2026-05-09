'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { sites } from '@/lib/content'
import { useInView } from '@/lib/hooks'

export default function Sites() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const { ref, visible } = useInView(0.05)

  return (
    <section
      id="siti"
      ref={ref}
      className={`py-20 md:py-28 px-6 bg-white section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.sites.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.sites.sectionSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sites.map((site) => (
            <a
              key={site.id}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              {/* Browser chrome */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono truncate border border-slate-200">
                  {site.url.replace('https://', '')}
                </div>
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Screenshot preview */}
              <div className="relative overflow-hidden bg-slate-50" style={{ aspectRatio: '16/9' }}>
                <img
                  src={`https://api.microlink.io/?url=${encodeURIComponent(site.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                  alt={`Preview di ${site.name}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement | null
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                {/* Fallback se screenshot non disponibile */}
                <div className="absolute inset-0 hidden items-center justify-center bg-slate-100">
                  <div className="text-center text-slate-400">
                    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-2">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm font-medium">{site.name}</span>
                  </div>
                </div>
              </div>

              {/* Footer card */}
              <div className="px-5 py-4 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{site.name}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{site.description[lang]}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 mt-0.5">{site.year}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
