'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import LeadFormModal from './LeadFormModal'

const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL ?? 'https://crm.alessiobernardini.dev'

interface PublicOffer {
  id: string
  title: string
  slug: string
  shortDescription: string
  description: string
  category: string
  setupPriceFromCents: number | null
  setupPriceToCents: number | null
  monthlyPriceFromCents: number | null
  monthlyPriceToCents: number | null
  discountLabel: string | null
  minimumDurationMonths: number | null
  features: string[]
  exclusions: string[]
  ctaLabel: string | null
  ctaUrl: string | null
  isPublished: boolean
  isFeatured: boolean
  sortOrder: number
}

function centsToDisplay(cents: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}

function getSetupLabel(offer: PublicOffer, t: ReturnType<typeof useT>): string | null {
  if (offer.setupPriceFromCents == null) return null
  const from = centsToDisplay(offer.setupPriceFromCents)
  return offer.setupPriceToCents != null
    ? `${from} – ${centsToDisplay(offer.setupPriceToCents)}`
    : `${t.offers.from} ${from}`
}

function getMonthlyLabel(offer: PublicOffer, t: ReturnType<typeof useT>): string | null {
  if (offer.monthlyPriceFromCents == null) return null
  const from = centsToDisplay(offer.monthlyPriceFromCents)
  return offer.monthlyPriceToCents != null
    ? `${from} – ${centsToDisplay(offer.monthlyPriceToCents)}${t.offers.perMonth}`
    : `${t.offers.from} ${from}${t.offers.perMonth}`
}

function getDurationLabel(months: number, t: ReturnType<typeof useT>): string {
  if (months >= 12 && months % 12 === 0) {
    const years = months / 12
    return `${years} ${t.offers.durationYears}`
  }
  return `${months} ${t.offers.durationMonths}`
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  website: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  ),
  crm: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  custom: (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
}

const pickerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const pickerCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const offerCardsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const offerCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function Offers() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const [offers, setOffers] = useState<PublicOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [leadOffer, setLeadOffer] = useState<PublicOffer | null>(null)

  // Listen for category selection from Services section
  useEffect(() => {
    function handleSelectCategory(e: Event) {
      const cat = (e as CustomEvent<string>).detail
      setSelectedCategory(cat)
    }
    window.addEventListener('select-offer-category', handleSelectCategory)
    return () => window.removeEventListener('select-offer-category', handleSelectCategory)
  }, [])

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch(`${CRM_API_URL}/api/public/offers`)
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        setOffers(json.data ?? [])
      } catch {
        setOffers([])
      } finally {
        setLoading(false)
      }
    }
    fetchOffers()
  }, [])

  // Extract unique categories preserving order
  const categories = [...new Set(offers.map((o) => o.category))]

  const categoryOffers = selectedCategory
    ? offers.filter((o) => o.category === selectedCategory)
    : []

  const featured = categoryOffers.filter((o) => o.isFeatured)
  const rest = categoryOffers.filter((o) => !o.isFeatured)

  function getCategoryLabel(cat: string): string {
    return t.offers.categoryLabels[cat] ?? cat
  }

  function getCategoryDescription(cat: string): string {
    return t.offers.categoryDescriptions[cat] ?? ''
  }

  return (
    <section
      id="offerte"
      className="py-20 md:py-28 px-6 bg-slate-50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.offers.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.offers.sectionSubtitle}
        </p>

        {loading && (
          <p className="text-slate-400 text-center py-12">{t.offers.loading}</p>
        )}

        {!loading && offers.length === 0 && (
          <p className="text-slate-400 text-center py-12">{t.offers.noOffers}</p>
        )}

        <AnimatePresence mode="wait">
        {/* Category picker */}
        {!loading && !selectedCategory && categories.length > 0 && (
          <motion.div
            key="picker"
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="grid gap-6 sm:grid-cols-2"
              variants={pickerContainerVariants}
              initial="hidden"
              animate="visible"
            >
            {categories.map((cat) => {
              const count = offers.filter((o) => o.category === cat).length
              return (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  variants={pickerCardVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-start gap-5 rounded-xl border border-slate-200 bg-white p-6 text-left hover:shadow-md hover:border-slate-300 transition-shadow"
                >
                  <div className="w-14 h-14 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    {CATEGORY_ICONS[cat] ?? CATEGORY_ICONS.custom}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {getCategoryLabel(cat)}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {getCategoryDescription(cat)}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      {count} {t.offers.offersCount}
                    </p>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="mt-1 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </motion.button>
              )
            })}
            </motion.div>
          </motion.div>
        )}

        {/* Category detail view */}
        {!loading && selectedCategory && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back button */}
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              {t.offers.back}
            </button>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {getCategoryLabel(selectedCategory)}
            </h3>
            <p className="text-base text-slate-500 mb-8">
              {getCategoryDescription(selectedCategory)}
            </p>

            {/* Featured offers */}
            {featured.length > 0 && (
              <div className="mb-8">
                <h4 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-5">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-amber-500">
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      fill="currentColor"
                    />
                  </svg>
                  {t.offers.featured}
                </h4>
                <motion.div
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  variants={offerCardsContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {featured.map((offer) => (
                    <motion.div key={offer.id} variants={offerCardVariants}>
                      <OfferCard offer={offer} featured t={t} onRequestInfo={() => setLeadOffer(offer)} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <h4 className="text-base font-semibold text-slate-900 mb-5">
                    {t.offers.allServices}
                  </h4>
                )}
                <motion.div
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  variants={offerCardsContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {rest.map((offer) => (
                    <motion.div key={offer.id} variants={offerCardVariants}>
                      <OfferCard offer={offer} t={t} onRequestInfo={() => setLeadOffer(offer)} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <LeadFormModal
        open={leadOffer !== null}
        onClose={() => setLeadOffer(null)}
        offerTitle={leadOffer?.title}
        offerId={leadOffer?.id}
      />
    </section>
  )
}

function OfferCard({
  offer,
  featured = false,
  t,
  onRequestInfo,
}: {
  offer: PublicOffer
  featured?: boolean
  t: ReturnType<typeof useT>
  onRequestInfo: () => void
}) {
  const setupLabel = getSetupLabel(offer, t)
  const monthlyLabel = getMonthlyLabel(offer, t)

  return (
    <article
      className={`flex flex-col rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow ${
        featured ? 'ring-2 ring-blue-500/30' : ''
      }`}
    >
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-slate-900 leading-tight">{offer.title}</h4>
          {featured && (
            <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-medium text-amber-700">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {t.offers.recommended}
            </span>
          )}
        </div>
      </div>

      {/* Short description */}
      <p className="text-sm text-slate-500 mb-4 flex-1 leading-relaxed">
        {offer.shortDescription}
      </p>

      {/* Prices */}
      {(setupLabel || monthlyLabel) && (
        <div className="mb-4 space-y-1.5">
          {setupLabel && (
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{t.offers.setupLabel}</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">{setupLabel}</span>
            </div>
          )}
          {monthlyLabel && (
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {t.offers.recurring}{offer.minimumDurationMonths != null ? ` ${getDurationLabel(offer.minimumDurationMonths, t)}` : ''}
              </span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">{monthlyLabel}</span>
            </div>
          )}
        </div>
      )}

      {/* Discount badge */}
      {offer.discountLabel && (
        <span className="mb-4 inline-block self-start rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-xs font-medium text-green-700">
          {offer.discountLabel}
        </span>
      )}

      {/* Features */}
      {offer.features.length > 0 && (
        <ul className="space-y-1.5 mb-4 text-sm">
          {offer.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="mt-0.5 text-blue-500 shrink-0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-slate-600">{f}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Exclusions */}
      {offer.exclusions.length > 0 && (
        <ul className="space-y-1.5 mb-4 text-sm">
          {offer.exclusions.map((e, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-400">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="mt-0.5 shrink-0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6M9 9l6 6" />
              </svg>
              <span>{e}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={onRequestInfo}
        className="mt-auto inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        {offer.ctaLabel ?? t.offers.requestInfo}
      </button>
    </article>
  )
}
