'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import posthog from 'posthog-js'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'

const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL ?? 'https://crm.alessiobernardini.dev'

interface LeadFormModalProps {
  open: boolean
  onClose: () => void
  offerTitle?: string
  offerId?: string
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function LeadFormModal({ open, onClose, offerTitle, offerId }: LeadFormModalProps) {
  const { lang } = useLanguage()
  const t = useT(lang)

  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Save/restore focus and move focus into dialog on open
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement
      posthog.capture('lead_modal_opened', { offerId: offerId ?? null, offerTitle: offerTitle ?? null })
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    } else {
      previousFocusRef.current?.focus()
    }
  }, [open])

  // Focus trap: keep Tab/Shift+Tab inside dialog
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch(`${CRM_API_URL}/api/public/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          company: company || undefined,
          message: message || undefined,
          interestedOfferId: offerId || undefined,
          source: 'alessiobernardini.dev',
        }),
      })

      const json = await res.json()

      if (!res.ok || !json.ok) {
        setErrorMessage(json.error ?? t.leadForm.error)
        setStatus('error')
        return
      }

      setStatus('success')
      posthog.capture('lead_submitted', { offerId: offerId ?? null })
    } catch {
      setErrorMessage(t.leadForm.error)
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{ willChange: 'opacity' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            key="modal-content"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 w-full max-w-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 id="lead-form-title" className="text-xl font-bold text-slate-900">{t.leadForm.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{t.leadForm.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label={t.leadForm.close}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Interested in badge */}
            {offerTitle && (
              <div className="mb-6 flex items-center gap-2 text-sm">
                <span className="text-slate-400">{t.leadForm.interestedIn}:</span>
                <span className="font-medium text-slate-900 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs">
                  {offerTitle}
                </span>
              </div>
            )}

            {status === 'success' ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-green-500" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                    />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">{t.leadForm.success}</h4>
                  <p className="text-sm text-slate-500 mb-6">{t.leadForm.successMessage}</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {t.leadForm.close}
                  </button>
                </motion.div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-slate-700 mb-1">
                    {t.leadForm.name} *
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.leadForm.namePlaceholder}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-slate-700 mb-1">
                    {t.leadForm.email} *
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.leadForm.emailPlaceholder}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Phone + Company row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-700 mb-1">
                      {t.leadForm.phone}
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      maxLength={30}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.leadForm.phonePlaceholder}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-company" className="block text-sm font-medium text-slate-700 mb-1">
                      {t.leadForm.company}
                    </label>
                    <input
                      id="lead-company"
                      type="text"
                      maxLength={100}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t.leadForm.companyPlaceholder}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="lead-message" className="block text-sm font-medium text-slate-700 mb-1">
                    {t.leadForm.message}
                  </label>
                  <textarea
                    id="lead-message"
                    maxLength={1000}
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.leadForm.messagePlaceholder}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {errorMessage}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  {status === 'sending' && (
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </motion.svg>
                  )}
                  {status === 'sending' ? t.leadForm.sending : t.leadForm.send}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
