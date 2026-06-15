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
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  ),
  layout: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  smartphone: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  zap: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  link: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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

export default function Services() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [offers, setOffers] = useState<PublicOffer[]>([])
  const [loadingOffers, setLoadingOffers] = useState(false)
  const [fetchedOnce, setFetchedOnce] = useState(false)
  const [leadOffer, setLeadOffer] = useState<PublicOffer | null>(null)

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

  return (
    <section id="servizi" className="py-20 md:py-28 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t.services.sectionTitle}
        </h2>
        <p className="text-lg text-slate-500 mb-12">
          {t.services.sectionSubtitle}
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
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
                className={`group relative bg-white rounded-xl border p-6 overflow-hidden text-left transition-colors duration-200 cursor-pointer ${
                  isExpanded
                    ? 'border-blue-300 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200 ${
                  isExpanded ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-600'
                }`}>
                  {icons[service.icon]}
                </div>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-200 ${
                  isExpanded ? 'text-blue-700' : 'text-slate-900'
                }`}>
                  {service.title[lang]}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {service.description[lang]}
                </p>
                {/* Expand indicator */}
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className={`absolute top-4 right-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-blue-500' : 'text-slate-300'
                  }`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Expanded offers panel */}
        <AnimatePresence mode="wait">
          {expandedService && (
            <motion.div
              key={expandedService}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pt-8">
                {loadingOffers ? (
                  <p className="text-slate-400 text-center py-8">{t.offers.loading}</p>
                ) : getOffersForService(expandedService).length === 0 ? (
                  <p className="text-slate-400 text-center py-8">{t.offers.noOffers}</p>
                ) : (
                  <motion.div
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
                            onClick={(e) => {
                              e.stopPropagation()
                              setLeadOffer(offer)
                            }}
                            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                          >
                            {offer.ctaLabel ?? t.offers.requestInfo}
                          </button>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </div>
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
