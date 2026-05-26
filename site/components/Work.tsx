'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { projects } from '@/lib/content'

const cardsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const tagsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
}

export default function Work() {
  const { lang } = useLanguage()
  const t = useT(lang)

  return (
    <section id="progetti" className="py-20 md:py-28 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.work.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.work.sectionSubtitle}
        </p>

        <motion.div
          className="space-y-6"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden p-6 md:p-8 hover:shadow-md transition-shadow duration-200"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 inset-y-0 w-1 bg-transparent group-hover:bg-blue-500 transition-colors duration-200 rounded-l-xl" />

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
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors shrink-0"
                  >
                    {t.work.viewProject}
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                    >
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

              <motion.div className="flex flex-wrap gap-2" variants={tagsContainerVariants}>
                {project.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={tagVariants}
                    className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
