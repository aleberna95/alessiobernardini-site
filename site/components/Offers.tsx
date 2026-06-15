'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '@/lib/language-context'
import { useT } from '@/lib/translations'

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
  discountPercentage: number | null
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

function getPriceLabel(offer: PublicOffer, t: ReturnType<typeof useT>): string | null {
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function Offers() {
  const { lang } = useLanguage()
  const t = useT(lang)
  const [offers, setOffers] = useState<PublicOffer[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <section id="offerte" className="py-20 md:py-28 px-6 bg-slate-50">
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

        {!loading && offers.length > 0 && (
          <div className="space-y-12">
            {[...new Set(offers.map((o) => o.category))].map((category) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                  {t.offers.categoryLabels[category] ?? category}
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  {t.offers.categoryDescriptions[category] ?? ''}
                </p>
                <motion.div
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                >
                  {offers.filter((o) => o.category === category).map((offer) => {
                    const priceLabel = getPriceLabel(offer, t)

                    return (
                      <motion.div
                        key={offer.id}
                        variants={cardVariants}
                        className="flex flex-col rounded-xl border border-slate-200 bg-white p-6"
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

                        <a
                          href="#contatti"
                          className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          {offer.ctaLabel ?? t.offers.requestInfo}
                        </a>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
