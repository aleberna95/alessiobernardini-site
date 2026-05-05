'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { projects } from '@/lib/content'
import { useInView } from '@/lib/hooks'

export default function Work() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const { ref, visible } = useInView(0.05)

  return (
    <section
      id="progetti"
      ref={ref}
      className={`py-20 md:py-28 px-6 bg-slate-50 section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.work.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.work.sectionSubtitle}
        </p>

        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {project.period[lang]} &middot; {project.role[lang]}
                  </p>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors shrink-0"
                  >
                    {t.work.viewProject}
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>

              <p className="text-base text-slate-600 mb-4">
                {project.description[lang]}
              </p>

              <ul className="space-y-2 mb-6">
                {project.results[lang].map((result, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 text-blue-500 shrink-0">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {result}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
