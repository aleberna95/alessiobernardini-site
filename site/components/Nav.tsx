'use client'

import { useState, useEffect } from 'react'
import { useLanguage, type Lang } from '@/lib/language-context'
import { useT } from '@/lib/translations'

export default function Nav() {
  const { lang, setLang } = useLanguage()
  const t = useT(lang)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const links = [
    { id: 'who', label: t.nav.who },
    { id: 'now', label: t.nav.now },
    { id: 'work', label: t.nav.work },
    { id: 'stack', label: t.nav.stack },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#1f1f1f]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-mono text-sm text-[#00ff88] hover:text-white transition-colors"
        >
          ab.dev
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-mono text-xs text-[#555] hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: lang toggle + mobile hamburger */}
        <div className="flex items-center gap-3">
          <div className="flex font-mono text-xs border border-[#1f1f1f] rounded-md overflow-hidden">
            {(['it', 'en'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 transition-colors ${
                  lang === l
                    ? 'bg-[#1f1f1f] text-white'
                    : 'text-[#444] hover:text-[#888]'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-[#555] hover:text-white transition-colors font-mono text-xl leading-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '≡'}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[#1f1f1f] px-6 py-4 space-y-4">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block font-mono text-sm text-[#888] hover:text-white transition-colors w-full text-left"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
