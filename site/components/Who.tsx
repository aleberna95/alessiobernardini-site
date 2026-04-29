'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { useInView } from '@/lib/hooks'

export default function Who() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const [mode, setMode] = useState<'recruiter' | 'human'>('recruiter')
  const [photoError, setPhotoError] = useState(false)
  const { ref, visible } = useInView(0.15)

  const content = mode === 'recruiter' ? t.who.recruiter : t.who.human

  return (
    <section
      id="who"
      ref={ref}
      className={`py-24 px-6 border-t border-[#1f1f1f] section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-[#00ff88] text-sm mb-2">01 /</p>
          <h2 className="text-3xl font-bold text-white">{t.who.sectionTitle}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 items-start">
          {/* Content */}
          <div>
            {/* Tab switcher */}
            <div className="flex gap-1 mb-8 p-1 bg-[#111] border border-[#1f1f1f] rounded-lg w-fit">
              {(['recruiter', 'human'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 rounded-md text-sm font-mono transition-all duration-200 ${
                    mode === m
                      ? 'bg-[#00ff88] text-[#0a0a0a] font-semibold'
                      : 'text-[#555] hover:text-white'
                  }`}
                >
                  {m === 'recruiter' ? t.who.tabs.recruiter : t.who.tabs.human}
                </button>
              ))}
            </div>

            {/* Bio */}
            <div className="transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-1">
                {content.title}
              </h3>
              <p className="text-[#555] font-mono text-sm mb-6">
                {content.subtitle}
              </p>
              <p className="text-[#999] leading-relaxed mb-8">{content.bio}</p>
              <ul className="space-y-3">
                {content.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#777]">
                    <span className="text-[#00ff88] font-mono mt-0.5 shrink-0">
                      →
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-56 aspect-square lg:w-full rounded-xl overflow-hidden border border-[#1f1f1f] bg-[#0f0f0f]">
              {!photoError ? (
                <Image
                  src="/photo.png"
                  alt="Alessio Bernardini"
                  fill
                  className="object-cover"
                  onError={() => setPhotoError(true)}
                  unoptimized
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-[#222] rounded-xl gap-2">
                  <span className="text-3xl">📷</span>
                  <p className="text-[#333] font-mono text-xs text-center px-4">
                    aggiungi
                    <br />
                    public/photo.jpg
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
