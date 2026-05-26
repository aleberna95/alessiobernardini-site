'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { available } from '@/lib/content'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function Hero() {
  const { lang } = useLanguage()
  const t = useT(lang)

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16 bg-white">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Availability badge */}
        {available && (
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-700 font-medium">
              {t.hero.available}
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6"
        >
          {t.hero.headline.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {i === 0 ? (
                <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  {line}
                </span>
              ) : (
                line
              )}
            </span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-500 mb-4"
        >
          {t.hero.subheadline}
        </motion.p>

        {/* Services line */}
        <motion.p
          variants={itemVariants}
          className="text-base text-slate-400 mb-10"
        >
          {t.hero.services}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#contatti"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors w-full sm:w-auto"
          >
            {t.hero.ctaPrimary}
          </motion.a>
          <motion.a
            href="#servizi"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors w-full sm:w-auto"
          >
            {t.hero.ctaSecondary}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
