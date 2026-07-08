import type { Metadata } from 'next'
import QrReveal from './QrReveal'

// Destinazione finale del QR del biglietto da visita.
const DESTINATION = '/'

export const metadata: Metadata = {
  title: 'QR — Reindirizzamento',
  description: 'Reindirizzamento dal QR code.',
  robots: { index: false, follow: false },
}

export default function QrPage() {
  return (
    <>
      {/* Fallback senza JavaScript: redirect immediato */}
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${DESTINATION}`} />
      </noscript>
      <QrReveal destination={DESTINATION} />
    </>
  )
}
