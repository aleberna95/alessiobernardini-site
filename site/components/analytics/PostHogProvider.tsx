'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
      persistence: 'memory',        // niente cookie → niente consent banner
      autocapture: false,            // evita dead-clicks-autocapture.js (~6 KiB)
      capture_pageview: true,
      disable_session_recording: true, // evita posthog-recorder.js (~51 KiB)
      enable_heatmaps: false,
      disable_surveys: true,         // evita surveys.js (~32 KiB)
    })
  }, [])

  return <>{children}</>
}
