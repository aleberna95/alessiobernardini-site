'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLanguage()
  const t = useT(lang)

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="h-px bg-linear-to-r from-transparent via-slate-300 to-transparent" />
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <p className="text-sm text-slate-400">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
