'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { stats } from '@/lib/content'

export default function About() {
  const { lang } = useLanguage()
  const t = useT(lang)

  return (
    <section id="chi-sono" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.about.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.about.sectionSubtitle}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Bio */}
          <motion.div
            className="lg:col-span-3 space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {t.about.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
                }}
                className={`leading-relaxed ${i === 0 ? 'text-lg text-slate-800 font-medium' : 'text-base text-slate-600'}`}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Stats card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="bg-slate-950 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-4xl font-bold text-white font-mono tracking-tight mb-1.5">{stats.years}</p>
                  <p className="text-sm text-slate-400">{t.about.statsYears}</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white font-mono tracking-tight mb-1.5">{stats.projects}</p>
                  <p className="text-sm text-slate-400">{t.about.statsProjects}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">{t.about.statsSectors}</p>
                <div className="flex flex-wrap gap-2">
                  {stats.sectors[lang].map((sector) => (
                    <span
                      key={sector}
                      className="text-xs font-medium text-slate-300 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
