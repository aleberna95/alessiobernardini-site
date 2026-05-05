'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLanguage()
  const t = useT(lang)

  return (
    <footer className="border-t border-slate-200 py-8 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <p className="text-sm text-slate-400">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
