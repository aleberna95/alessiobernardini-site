'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'
import { services } from '@/lib/content'
import LeadFormModal from './LeadFormModal'

const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL ?? 'https://crm.alessiobernardini.dev'

/** Maps service.id → CRM offer category */
const SERVICE_TO_CATEGORY: Record<string, string> = {
  web: 'website',
  gestionali: 'crm',
  app: 'app',
  automazioni: 'automation',
  api: 'api',
}

interface PublicOffer {
  id: string
  title: string
  slug: string
  shortDescription: string
  category: string
  setupPriceFromCents: number | null
  setupPriceToCents: number | null
  monthlyPriceFromCents: number | null
  monthlyPriceToCents: number | null
  features: string[]
  ctaLabel: string | null
  isPublished: boolean
  sortOrder: number
}

function centsToDisplay(cents: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

const icons: Record<string, React.ReactNode> = {
  globe: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  ),
  layout: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  smartphone: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  zap: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  link: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const offersContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const offerCardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return isMobile
}

export default function Services() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [offers, setOffers] = useState<PublicOffer[]>([])
  const [loadingOffers, setLoadingOffers] = useState(false)
  const [fetchedOnce, setFetchedOnce] = useState(false)
  const [leadOffer, setLeadOffer] = useState<PublicOffer | null>(null)
  const isMobile = useIsMobile()

  // Lock body scroll when bottom sheet is open on mobile
  useEffect(() => {
    if (isMobile && expandedService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobile, expandedService])

  // Fetch offers on first expand
  useEffect(() => {
    if (!expandedService || fetchedOnce) return
    setLoadingOffers(true)
    fetch(`${CRM_API_URL}/api/public/offers`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((json) => setOffers(json.data ?? []))
      .catch(() => setOffers([]))
      .finally(() => {
        setLoadingOffers(false)
        setFetchedOnce(true)
      })
  }, [expandedService, fetchedOnce])

  function handleToggle(serviceId: string) {
    setExpandedService((prev) => (prev === serviceId ? null : serviceId))
  }

  function getOffersForService(serviceId: string): PublicOffer[] {
    const category = SERVICE_TO_CATEGORY[serviceId]
    if (!category) return []
    return offers.filter((o) => o.category === category)
  }

  function getPriceLabel(offer: PublicOffer): string | null {
    if (offer.setupPriceFromCents == null && offer.monthlyPriceFromCents == null) return null
    const parts: string[] = []
    if (offer.setupPriceFromCents != null) {
      parts.push(
        offer.setupPriceToCents != null
          ? `${centsToDisplay(offer.setupPriceFromCents)} – ${centsToDisplay(offer.setupPriceToCents)}`
          : `${t.offers.from} ${centsToDisplay(offer.setupPriceFromCents)}`
      )
    }
    if (offer.monthlyPriceFromCents != null) {
      parts.push(
        offer.monthlyPriceToCents != null
          ? `${t.offers.recurring} ${centsToDisplay(offer.monthlyPriceFromCents)} – ${centsToDisplay(offer.monthlyPriceToCents)}${t.offers.perMonth}`
          : `${t.offers.recurring} ${centsToDisplay(offer.monthlyPriceFromCents)}${t.offers.perMonth}`
      )
    }
    return parts.join(' · ')
  }

  const expandedServiceData = services.find((s) => s.id === expandedService)

  return (
    <section id="servizi" className="py-20 md:py-28 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.services.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.services.sectionSubtitle}
        </p>

        {!expandedService || isMobile ? (
          /* Grid view: always on mobile, on desktop when nothing is selected */
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {services.map((service) => {
              const isExpanded = expandedService === service.id
              return (
                <motion.button
                  key={service.id}
                  type="button"
                  onClick={() => handleToggle(service.id)}
                  variants={cardVariants}
                  className={`group flex flex-col bg-white rounded-2xl border p-7 text-left transition-all duration-200 cursor-pointer ${
                    isExpanded
                      ? 'border-blue-300 shadow-md shadow-blue-50/80'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-200 ${
                    isExpanded ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                  }`}>
                    {icons[service.icon]}
                  </div>
                  <h3 className={`text-lg font-semibold mb-2.5 transition-colors duration-200 ${
                    isExpanded ? 'text-blue-700' : 'text-slate-900'
                  }`}>
                    {service.title[lang]}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                    {service.description[lang]}
                  </p>
                  <div className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                    isExpanded ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'
                  }`}>
                    <span>
                      {isExpanded
                        ? (lang === 'it' ? 'Chiudi' : 'Close')
                        : (lang === 'it' ? 'Vedi le offerte' : 'View offers')}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${isExpanded ? '-rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        ) : (
          /* Desktop master-detail: sidebar nav + offers panel */
          <motion.div
            className="flex gap-6 lg:gap-8 items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left: service navigation */}
            <div className="w-52 lg:w-60 shrink-0 flex flex-col gap-1.5">
              {services.map((service) => {
                const isSelected = expandedService === service.id
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleToggle(service.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    <div className={`shrink-0 ${
                      isSelected ? 'text-white' : 'text-blue-600'
                    }`}>
                      {icons[service.icon]}
                    </div>
                    <span className="text-sm font-medium leading-tight">{service.title[lang]}</span>
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => setExpandedService(null)}
                className="flex items-center gap-1.5 px-2 py-2 mt-3 text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                {lang === 'it' ? 'Vedi tutte' : 'View all'}
              </button>
            </div>

            {/* Right: offers panel */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={expandedService}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Service header */}
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      {expandedServiceData && icons[expandedServiceData.icon]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{expandedServiceData?.title[lang]}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mt-0.5">{expandedServiceData?.description[lang]}</p>
                    </div>
                  </div>
                  {/* Offers */}
                  {loadingOffers ? (
                    <p className="text-slate-400 text-center py-8">{t.offers.loading}</p>
                  ) : getOffersForService(expandedService).length === 0 ? (
                    <p className="text-slate-400 text-center py-8">{t.offers.noOffers}</p>
                  ) : (
                    <motion.div
                      className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
                      variants={offersContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {getOffersForService(expandedService).map((offer) => {
                        const priceLabel = getPriceLabel(offer)
                        return (
                          <motion.div
                            key={offer.id}
                            variants={offerCardVariants}
                            className="flex flex-col rounded-xl border border-slate-200 bg-white p-5"
                          >
                            <h4 className="font-semibold text-slate-900 mb-2">{offer.title}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                              {offer.shortDescription}
                            </p>
                            {priceLabel && (
                              <p className="text-sm font-medium text-slate-700 mb-4">
                                {priceLabel}
                              </p>
                            )}
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setLeadOffer(offer) }}
                              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                              {offer.ctaLabel ?? t.offers.requestInfo}
                            </button>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile: bottom sheet */}
      <AnimatePresence>
        {isMobile && expandedService && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setExpandedService(null)}
            />
            {/* Sheet */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl flex flex-col"
              style={{ maxHeight: '85dvh' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            >
              {/* Handle bar */}
              <div className="shrink-0 pt-3 px-5">
                <div className="w-9 h-1 bg-slate-200 rounded-full mx-auto" />
              </div>
              {/* Header */}
              <div className="shrink-0 flex items-center justify-between px-5 pt-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    {expandedServiceData && icons[expandedServiceData.icon]}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">
                    {expandedServiceData?.title[lang]}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedService(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500"
                  aria-label="Chiudi"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Scrollable offers list */}
              <div className="overflow-y-auto flex-1 px-5 pt-5 pb-10">
                {loadingOffers ? (
                  <p className="text-slate-400 text-center py-8">{t.offers.loading}</p>
                ) : getOffersForService(expandedService).length === 0 ? (
                  <p className="text-slate-400 text-center py-8">{t.offers.noOffers}</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {getOffersForService(expandedService).map((offer) => {
                      const priceLabel = getPriceLabel(offer)
                      return (
                        <div
                          key={offer.id}
                          className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <h4 className="font-semibold text-slate-900 mb-1.5">{offer.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed mb-3">
                            {offer.shortDescription}
                          </p>
                          {priceLabel && (
                            <p className="text-sm font-medium text-slate-700 mb-3">{priceLabel}</p>
                          )}
                          <button
                            type="button"
                            onClick={() => setLeadOffer(offer)}
                            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 active:bg-blue-700 rounded-xl transition-colors"
                          >
                            {offer.ctaLabel ?? t.offers.requestInfo}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LeadFormModal
        open={leadOffer !== null}
        onClose={() => setLeadOffer(null)}
        offerTitle={leadOffer?.title}
        offerId={leadOffer?.id}
      />
    </section>
  )
}
