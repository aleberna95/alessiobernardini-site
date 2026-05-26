'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { sites } from '@/lib/content'
import type { Site } from '@/lib/content'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 5 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

function SiteCard({ site, lang }: { site: Site; lang: 'it' | 'en' }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [3, -3]), { stiffness: 400, damping: 30 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-3, 3]), { stiffness: 400, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!window.matchMedia('(hover: hover)').matches) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.a
      ref={cardRef}
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group block rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-shadow duration-300"
    >
      {/* Browser chrome */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs font-mono truncate border border-slate-200 group-hover:text-blue-500 transition-colors duration-200">
          {site.url.replace('https://', '')}
        </div>
        <svg
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
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
        {/* Fallback */}
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
    </motion.a>
  )
}

export default function Sites() {
  const { lang } = useLanguage()
  const t = useT(lang)

  return (
    <section id="siti" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.sites.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.sites.sectionSubtitle}
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} lang={lang} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
