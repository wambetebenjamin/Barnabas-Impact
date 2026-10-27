import type { Metadata, Viewport } from 'next'
import './globals.css'
import ConsentAnalytics from '@/src/app/consent-analytics'
import SiteShell from '@/src/app/site-shell'

export const metadata: Metadata = {
  title: { default: 'Barnabas Impact | Show the work. Earn the trust.', template: '%s | Barnabas Impact' },
  description: 'Practical impact reporting for Kenyan NGOs, CBOs, and community programmes.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://barnabasimpact.org'),
}
export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 5, userScalable: true }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-KE"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet"/></head><body><SiteShell>{children}</SiteShell><ConsentAnalytics/></body></html>
}
