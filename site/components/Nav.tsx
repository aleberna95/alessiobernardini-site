'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.25 },
  }),
}

export default function Nav() {
  const { lang, setLang } = useLanguage()
  const t = useT(lang)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const links = [
    { href: '#chi-sono', label: t.nav.about },
    { href: '#progetti', label: t.nav.work },
    { href: '#siti', label: t.nav.sites },
    { href: '#servizi', label: t.nav.services },
    { href: '#contatti', label: t.nav.contact },
  ]

  const handleMobileClick = (href: string) => {
    setMenuOpen(false)
    // Wait for menu close animation then scroll
    setTimeout(() => {
      const el = document.getElementById(href.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 200)
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    links.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1))
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(href) },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(obs => obs.disconnect())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#0b1120] flex items-center justify-center shrink-0 overflow-hidden">
            <Image src="/logo.png" alt="BA" width={32} height={32} className="w-full h-full object-cover" />
          </span>
          <span className="text-base font-bold text-slate-900">Alessio Bernardini</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-slate-600 hover:text-slate-900 transition-colors pb-0.5"
            >
              {link.label}
              {activeSection === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-600 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            {lang === 'it' ? 'EN' : 'IT'}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            {lang === 'it' ? 'EN' : 'IT'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-slate-600 p-2 -m-2 touch-manipulation active:scale-95 transition-transform"
            aria-label="Menu"
            aria-expanded={menuOpen}
            type="button"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white border-t border-slate-200 shadow-lg"
          >
            <div className="px-6 py-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  custom={i}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={(e) => {
                    e.preventDefault()
                    handleMobileClick(link.href)
                  }}
                  className="block text-sm text-slate-600 hover:text-slate-900 transition-colors py-2 touch-manipulation"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

