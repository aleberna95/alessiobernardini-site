'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { contactInfo, WHATSAPP_URL } from '@/lib/content'

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

        {/* Mobile contact + menu */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-[#25D366] hover:bg-green-50 transition-colors"
            aria-label="WhatsApp"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label={lang === 'it' ? 'Chiama' : 'Call'}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          <div className="w-px h-5 bg-slate-200" />
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

