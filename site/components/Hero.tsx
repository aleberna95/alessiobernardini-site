'use client'

import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'

interface HistoryEntry {
  cmd: string
  output: string
  isError?: boolean
}

const BOOT_DELAYS = [0, 500, 900, 1200, 1500, 1800, 2100, 2350, 2650, 2950, 3150, 3400]

export default function Hero() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const bootLines = t.hero.bootLines

  const [visibleCount, setVisibleCount] = useState(0)
  const [bootDone, setBootDone] = useState(false)
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Re-run boot animation on language change
  useEffect(() => {
    setVisibleCount(0)
    setBootDone(false)
    setHistory([])

    const timers: ReturnType<typeof setTimeout>[] = bootLines.map((_, i) => {
      const delay =
        BOOT_DELAYS[i] ??
        BOOT_DELAYS[BOOT_DELAYS.length - 1] + (i - BOOT_DELAYS.length + 1) * 200
      return setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === bootLines.length - 1) {
          setTimeout(() => setBootDone(true), 300)
        }
      }, delay)
    })

    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    if (bootDone) inputRef.current?.focus()
  }, [bootDone])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [visibleCount, history])

  function lineClass(line: string, idx: number): string {
    if (line.startsWith('[OK]')) return 'text-green-400'
    if (line.startsWith('[WARN]')) return 'text-yellow-400'
    if (line.startsWith('[ERR]')) return 'text-red-400'
    if (line.startsWith('>')) return 'text-[#00ff88] font-bold'
    if (line.startsWith('[■')) return 'text-[#00ff88]'
    if (line === '') return ''
    // "Ciao / Hi" lines at index 8–9
    if (idx >= 8 && idx <= 9) return 'text-white font-semibold'
    return 'text-green-300/60'
  }

  function runCommand(raw: string) {
    const cmd = raw.trim()
    const lower = cmd.toLowerCase()
    let output = ''
    let isError = false

    if (lower === 'clear') {
      setHistory([])
      setCmdHistory(p => [cmd, ...p])
      setCmdHistoryIdx(-1)
      setCommand('')
      return
    } else if (lower === 'help') {
      output = t.hero.commands.help
    } else if (lower === 'whoami') {
      output = t.hero.commands.whoami
    } else if (lower === 'projects') {
      output = t.hero.commands.projects
    } else if (lower === 'contact') {
      output = t.hero.commands.contact
    } else if (lower === 'sudo hire-me' || lower === 'hire-me') {
      output =
        '[sudo] password for recruiter: ***\n✓ ' +
        (lang === 'it'
          ? 'Accesso consentito. Vedi sezione CONTATTI.'
          : 'Access granted. See CONTACT section.')
    } else if (lower === 'play') {
      output =
        lang === 'it'
          ? '[WARN] Gioco in standby. Torna presto.'
          : '[WARN] Game on standby. Check back soon.'
    } else {
      output = t.hero.commands.unknown(cmd)
      isError = true
    }

    setHistory(p => [...p, { cmd, output, isError }])
    setCmdHistory(p => [cmd, ...p])
    setCmdHistoryIdx(-1)
    setCommand('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (command.trim()) runCommand(command)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1)
      setCmdHistoryIdx(idx)
      if (cmdHistory[idx] !== undefined) setCommand(cmdHistory[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(cmdHistoryIdx - 1, -1)
      setCmdHistoryIdx(idx)
      setCommand(idx === -1 ? '' : cmdHistory[idx] ?? '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const completions = ['help', 'whoami', 'projects', 'contact', 'clear']
      const match = completions.find(c => c.startsWith(command.toLowerCase()))
      if (match) setCommand(match)
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-3xl">
        {/* Terminal window */}
        <div className="rounded-xl overflow-hidden border border-[#1f1f1f] shadow-[0_0_80px_rgba(0,255,136,0.04)]">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-[#111] border-b border-[#1f1f1f]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-[#333] font-mono select-none">
              alessio@dev: ~
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="font-mono text-sm leading-7 p-6 bg-[#0a0a0a] h-[420px] overflow-y-auto cursor-text"
            onClick={() => bootDone && inputRef.current?.focus()}
          >
            {/* Boot lines */}
            {bootLines.slice(0, visibleCount).map((line, i) => (
              <div key={i} className={lineClass(line, i)}>
                {line || '\u00A0'}
              </div>
            ))}

            {/* Command history */}
            {history.map((entry, i) => (
              <div key={`h-${i}`} className="mt-1">
                <div className="text-[#00ff88]">
                  <span className="text-[#333]">~/</span>{' '}
                  <span className="text-[#444]">›</span> {entry.cmd}
                </div>
                <div
                  className={`whitespace-pre-wrap ${
                    entry.isError ? 'text-red-400' : 'text-green-300/70'
                  }`}
                >
                  {entry.output}
                </div>
              </div>
            ))}

            {/* Live prompt */}
            {bootDone && (
              <div className="flex items-center mt-1 text-[#00ff88]">
                <span className="text-[#333] mr-1">~/</span>
                <span className="text-[#444] mr-2">›</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={e => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-[#00ff88] caret-[#00ff88] placeholder:text-[#333]"
                  placeholder={t.hero.placeholder}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>
            )}

            {/* Pre-boot blinking cursor */}
            {!bootDone && visibleCount > 0 && (
              <span className="inline-block w-2 h-[1.1em] bg-[#00ff88] cursor-blink align-middle ml-0.5" />
            )}
          </div>
        </div>

        {/* Scroll CTA */}
        <div
          className={`flex justify-center mt-8 transition-opacity duration-500 ${
            bootDone ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() =>
              document.getElementById('who')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="font-mono text-sm text-[#444] hover:text-[#00ff88] transition-colors flex items-center gap-2 group"
          >
            {t.hero.skipLabel}
            <span className="group-hover:translate-y-1 transition-transform inline-block">
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
