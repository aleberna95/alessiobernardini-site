'use client'

import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { stackCategories } from '@/lib/content'
import { useInView } from '@/lib/hooks'

export default function Stack() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const { ref, visible } = useInView(0.1)

  const categoryMeta = {
    daily: { label: t.stack.categories.daily, desc: t.stack.dailyDesc },
    tested: { label: t.stack.categories.tested, desc: t.stack.testedDesc },
    quests: { label: t.stack.categories.quests, desc: t.stack.questsDesc },
  }

  return (
    <section
      id="stack"
      ref={ref}
      className={`py-24 px-6 border-t border-[#1f1f1f] section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-[#00ff88] text-sm mb-2">04 /</p>
          <h2 className="text-3xl font-bold text-white">{t.stack.sectionTitle}</h2>
          <p className="text-[#555] mt-2">{t.stack.sectionSubtitle}</p>
        </div>

        <div className="space-y-10">
          {stackCategories.map(cat => {
            const meta = categoryMeta[cat.key]
            return (
              <div key={cat.key}>
                <div className="flex items-baseline gap-3 mb-4">
                  <h3 className="font-mono text-sm text-white">{meta.label}</h3>
                  <span className="text-xs text-[#333]">— {meta.desc}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => (
                    <div key={item.name} className="relative group">
                      <span
                        className={`font-mono text-sm px-3 py-1.5 rounded-lg border cursor-default block transition-colors duration-150 ${
                          cat.key === 'daily'
                            ? 'border-[#00ff88]/25 bg-[#00ff88]/5 text-[#00ff88]'
                            : cat.key === 'tested'
                            ? 'border-[#1f1f1f] bg-[#0f0f0f] text-[#777] hover:text-white hover:border-[#2a2a2a]'
                            : 'border-[#161616] bg-[#0a0a0a] text-[#444] hover:text-[#777]'
                        }`}
                      >
                        {item.name}
                      </span>
                      {item.lastUsedIn && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#111] border border-[#2a2a2a] rounded-lg text-xs font-mono text-[#888] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {lang === 'it' ? 'in' : 'in'}: {item.lastUsedIn}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2a2a2a]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
