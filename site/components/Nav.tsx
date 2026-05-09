'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'

export default function Nav() {
  const { lang, setLang } = useLanguage()
  const t = useT(lang)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#servizi', label: t.nav.services },
    { href: '#chi-sono', label: t.nav.about },
    { href: '#progetti', label: t.nav.work },
    { href: '#siti', label: t.nav.sites },
    { href: '#contatti', label: t.nav.contact },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
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
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            {lang === 'it' ? 'EN' : 'IT'}
          </button>

          {/* CTA */}
          <a
            href="#contatti"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            {t.nav.cta}
          </a>
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
            className="text-slate-600"
            aria-label="Menu"
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
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contatti"
            onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </nav>
  )
}

