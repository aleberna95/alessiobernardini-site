'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { stats } from '@/lib/content'

const bioContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const bioParagraphVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const statsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const statCardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const tagsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } },
}

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Bio */}
          <motion.div
            className="md:col-span-2 space-y-4"
            variants={bioContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {t.about.bio.map((paragraph, i) => (
              <motion.p key={i} variants={bioParagraphVariants} className="text-base text-slate-600 leading-relaxed">
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="space-y-6"
            variants={statsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={statCardVariants} className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <p className="text-3xl font-bold text-blue-600 mb-1">{stats.years}</p>
              <p className="text-sm text-slate-500">{t.about.statsYears}</p>
            </motion.div>
            <motion.div variants={statCardVariants} className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <p className="text-3xl font-bold text-blue-600 mb-1">{stats.projects}</p>
              <p className="text-sm text-slate-500">{t.about.statsProjects}</p>
            </motion.div>
            <motion.div variants={statCardVariants} className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500 mb-2">{t.about.statsSectors}</p>
              <motion.div className="flex flex-wrap gap-2" variants={tagsContainerVariants}>
                {stats.sectors[lang].map((sector) => (
                  <motion.span
                    key={sector}
                    variants={tagVariants}
                    className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full"
                  >
                    {sector}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
