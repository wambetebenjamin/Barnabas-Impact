'use client'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

type Consent = { analytics?: boolean }
export default function ConsentAnalytics() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const load = () => {
      try { setEnabled(JSON.parse(localStorage.getItem('barnabas-impact-cookie-consent') || '{}').analytics === true) }
      catch { setEnabled(false) }
    }
    load()
    window.addEventListener('barnabas-consent-updated', load)
    return () => window.removeEventListener('barnabas-consent-updated', load)
  }, [])
  return enabled ? <><Analytics/><SpeedInsights/></> : null
}
