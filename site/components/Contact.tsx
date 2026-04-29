'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { CAL_URL } from '@/lib/content'
import { useInView } from '@/lib/hooks'

export default function Contact() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const { ref, visible } = useInView(0.15)

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-24 px-6 border-t border-[#1f1f1f] section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-[#00ff88] text-sm mb-2">05 /</p>
          <h2 className="text-3xl font-bold text-white">
            {t.contact.sectionTitle}
          </h2>
        </div>

        <div className="max-w-xl">
          <h3 className="text-2xl text-white font-semibold mb-3">
            {t.contact.headline}
          </h3>
          <p className="text-[#666] mb-12 leading-relaxed">
            {t.contact.subheadline}
          </p>

          <div className="space-y-3">
            {/* Email — primary */}
            <a
              href="mailto:alebernardini95@gmail.com"
              className="flex items-center gap-4 p-5 rounded-xl border border-[#00ff88]/25 bg-[#00ff88]/5 hover:bg-[#00ff88]/10 transition-all group"
            >
              <span className="text-xl select-none">✉</span>
              <div className="min-w-0">
                <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-0.5">
                  {t.contact.email}
                </p>
                <p className="text-white group-hover:text-[#00ff88] transition-colors truncate">
                  alebernardini95@gmail.com
                </p>
              </div>
              <span className="ml-auto text-[#444] group-hover:text-[#00ff88] transition-colors shrink-0">
                ↗
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/alessiobernardini"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] hover:border-[#2a2a2a] transition-all group"
            >
              <span className="font-mono text-sm font-bold text-[#0a66c2] select-none">
                in
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-0.5">
                  {t.contact.linkedin}
                </p>
                <p className="text-[#888] group-hover:text-white transition-colors">
                  /in/alessiobernardini
                </p>
              </div>
              <span className="ml-auto text-[#444] group-hover:text-white transition-colors shrink-0">
                ↗
              </span>
            </a>

            {/* Cal.com */}
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] hover:border-[#2a2a2a] transition-all group"
            >
              <span className="text-xl select-none">📅</span>
              <div>
                <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-0.5">
                  {t.contact.call}
                </p>
                <p className="text-[#888] group-hover:text-white transition-colors">
                  {t.contact.callSub}
                </p>
              </div>
              <span className="ml-auto text-[#444] group-hover:text-white transition-colors shrink-0">
                ↗
              </span>
            </a>
          </div>

          <p className="mt-8 font-mono text-xs text-[#2a2a2a]">
            <span className="text-[#00ff88]/50">/qr</span> —{' '}
            {t.contact.qrNote}
          </p>
        </div>
      </div>
    </section>
  )
}
