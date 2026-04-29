'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { nowData, GITHUB_USERNAME } from '@/lib/content'
import { useInView } from '@/lib/hooks'

interface CommitInfo {
  repo: string
  message: string
  date: string
}

function timeAgo(dateStr: string, lang: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (lang === 'it') {
    if (days > 30) return `${Math.floor(days / 30)} mes${Math.floor(days / 30) === 1 ? 'e' : 'i'} fa`
    if (days > 0) return `${days} giorn${days === 1 ? 'o' : 'i'} fa`
    if (hours > 0) return `${hours} or${hours === 1 ? 'a' : 'e'} fa`
    return `${minutes} minut${minutes === 1 ? 'o' : 'i'} fa`
  }
  if (days > 30) return `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? '' : 's'} ago`
  if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`
  if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
}

function NowCard({
  label,
  children,
  accent,
}: {
  label: string
  children: ReactNode
  accent?: boolean
}) {
  return (
    <div
      className={`p-5 rounded-xl border ${
        accent
          ? 'border-[#00ff88]/30 bg-[#00ff88]/5'
          : 'border-[#1f1f1f] bg-[#0f0f0f]'
      }`}
    >
      <p className="font-mono text-xs text-[#444] uppercase tracking-widest mb-3">
        {label}
      </p>
      {children}
    </div>
  )
}

export default function Now() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const [commit, setCommit] = useState<CommitInfo | null>(null)
  const [commitLoading, setCommitLoading] = useState(true)
  const { ref, visible } = useInView(0.1)

  useEffect(() => {
    async function fetchLastCommit() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`
        )
        if (!res.ok) throw new Error('API error')
        const events: Array<{
          type: string
          repo: { name: string }
          payload: { commits?: { message: string }[] }
          created_at: string
        }> = await res.json()
        const push = events.find(e => e.type === 'PushEvent')
        if (push) {
          setCommit({
            repo: push.repo.name,
            message: push.payload.commits?.[0]?.message?.split('\n')[0] ?? '',
            date: push.created_at,
          })
        }
      } catch {
        // silently fail — commit card shows error state
      } finally {
        setCommitLoading(false)
      }
    }
    fetchLastCommit()
  }, [])

  return (
    <section
      id="now"
      ref={ref}
      className={`py-24 px-6 border-t border-[#1f1f1f] section-fade ${visible ? 'visible' : ''}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-[#00ff88] text-sm mb-2">02 /</p>
          <h2 className="text-3xl font-bold text-white">{t.now.sectionTitle}</h2>
          <p className="text-[#555] mt-2">{t.now.sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Building */}
          <NowCard label={t.now.building} accent>
            <p className="text-white font-medium leading-snug">
              {nowData.building[lang]}
            </p>
          </NowCard>

          {/* Reading */}
          <NowCard label={t.now.reading}>
            <p className="text-[#999] leading-snug">{nowData.reading[lang]}</p>
          </NowCard>

          {/* Last commit */}
          <NowCard label={t.now.lastCommit}>
            {commitLoading ? (
              <p className="text-[#444] font-mono text-sm">
                {t.now.loadingCommit}
              </p>
            ) : commit ? (
              <div>
                <p className="text-[#00ff88] font-mono text-xs mb-1 truncate">
                  {commit.repo}
                </p>
                <p className="text-[#999] text-sm truncate">{commit.message}</p>
                <p className="text-[#444] font-mono text-xs mt-2">
                  {timeAgo(commit.date, lang)}
                </p>
              </div>
            ) : (
              <p className="text-[#444] font-mono text-sm">
                {t.now.commitError}
              </p>
            )}
          </NowCard>

          {/* Available */}
          <NowCard label={t.now.available}>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  nowData.available ? 'bg-[#00ff88] animate-pulse' : 'bg-red-400'
                }`}
              />
              <span className="text-white font-medium leading-snug">
                {nowData.available
                  ? t.now.availableYes
                  : `${t.now.availableNo} ${nowData.bookedUntil}`}
              </span>
            </div>
          </NowCard>
        </div>
      </div>
    </section>
  )
}
