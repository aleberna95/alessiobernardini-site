'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { projects } from '@/lib/content'
import { useInView } from '@/lib/hooks'

export default function Work() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const [expanded, setExpanded] = useState<string | null>(null)
  const { ref, visible } = useInView(0.05)

  return (
    <section
      id="work"
      ref={ref}
      className={`py-24 px-6 border-t border-[#1f1f1f] section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-[#00ff88] text-sm mb-2">03 /</p>
          <h2 className="text-3xl font-bold text-white">{t.work.sectionTitle}</h2>
          <p className="text-[#555] mt-2">{t.work.sectionSubtitle}</p>
        </div>

        <div className="space-y-3">
          {projects.map((project, i) => {
            const isOpen = expanded === project.id
            return (
              <div
                key={project.id}
                className={`border rounded-xl overflow-hidden transition-colors duration-200 cursor-pointer ${
                  isOpen
                    ? 'border-[#00ff88]/30 bg-[#0c0c0c]'
                    : 'border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#2a2a2a]'
                }`}
                onClick={() => setExpanded(isOpen ? null : project.id)}
              >
                {/* Header row */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="font-mono text-xs text-[#333]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-white font-semibold">{project.name}</h3>
                      {project.highlight && (
                        <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">
                          {project.highlight[lang]}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#444] font-mono flex-wrap">
                      <span>{project.role[lang]}</span>
                      <span>·</span>
                      <span>{project.period[lang]}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[#444] transition-transform duration-300 mt-0.5 select-none text-xl leading-none shrink-0 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-[#1a1a1a]">
                    <div className="pt-6 space-y-6">
                      {/* Problem */}
                      <div>
                        <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-2">
                          {t.work.problem}
                        </p>
                        <p className="text-[#888] italic">
                          &ldquo;{project.problem[lang]}&rdquo;
                        </p>
                      </div>

                      {/* Built */}
                      <div>
                        <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-3">
                          {t.work.built}
                        </p>
                        <ul className="space-y-2">
                          {project.built[lang].map((item, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3 text-[#888] text-sm"
                            >
                              <span className="text-[#00ff88] font-mono mt-0.5 shrink-0">
                                →
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stack */}
                      <div>
                        <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-3">
                          {t.work.stack}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map(tech => (
                            <span
                              key={tech}
                              className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#111] border border-[#1f1f1f] text-[#777]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Link */}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-2 font-mono text-sm text-[#00ff88] hover:text-white transition-colors"
                        >
                          {t.work.viewLive} ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
