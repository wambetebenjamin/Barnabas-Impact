'use client'
import { useEffect, useState } from 'react'
import { Volume2, VolumeX, MessageCircle } from 'lucide-react'

const script = 'Welcome to Barnabas Impact. Nonprofits across Kenya do important work, but reporting that work is often messy. Barnabas Impact helps you log beneficiaries, activities, and funds, then publish a clear public impact page and PDF report your donors can trust. This is a reporting tool, not an audit firm. Scroll down to see a sample or start your free board.'
type Consent = { necessary: true; functional: boolean; analytics: boolean; marketing: boolean }
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [cookie, setCookie] = useState<Consent | null>(null)
  const [preferences, setPreferences] = useState({ functional: true, analytics: false, marketing: false })
  const [manage, setManage] = useState(false)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 800)
    const stored = localStorage.getItem('barnabas-impact-cookie-consent')
    if (stored) { try { const value=JSON.parse(stored) as Consent; setCookie(value); setPreferences({functional:value.functional,analytics:value.analytics,marketing:value.marketing}) } catch { localStorage.removeItem('barnabas-impact-cookie-consent') } }
    return () => window.clearTimeout(t)
  }, [])
  useEffect(() => {
    const openPreferences = () => { setManage(true); setCookie(null) }
    window.addEventListener('barnabas-open-cookie-settings', openPreferences)
    return () => window.removeEventListener('barnabas-open-cookie-settings', openPreferences)
  }, [])
  useEffect(() => {
    let lenis: { destroy: () => void } | undefined
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 2, infinite: false, autoRaf: true })
    })
    return () => lenis?.destroy()
  }, [])
  useEffect(() => {
    const start = () => {
      if (started || muted || !('speechSynthesis' in window)) return
      setStarted(true); setSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(script)
      utterance.rate = .95; utterance.pitch = 1.1; utterance.lang = 'en-KE'
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
    window.addEventListener('scroll', start, { once: true, passive: true })
    window.addEventListener('click', start, { once: true })
    return () => { window.removeEventListener('scroll', start); window.removeEventListener('click', start) }
  }, [started, muted])
  function saveConsent(value: Consent) { localStorage.setItem('barnabas-impact-cookie-consent', JSON.stringify(value)); window.dispatchEvent(new Event('barnabas-consent-updated')); setPreferences({functional:value.functional,analytics:value.analytics,marketing:value.marketing}); setCookie(value); setManage(false) }
  function voiceClick() {
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); setMuted(true); return }
    if (!('speechSynthesis' in window)) return
    setMuted(false); setStarted(true); setSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(script)
    utterance.rate = .95; utterance.pitch = 1.1; utterance.lang = 'en-KE'
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance)
  }
  return <>
    {children}
    {loading && <div className="loading" role="status" aria-label="Loading Barnabas Impact"><div><div className="brand"><span className="brand-mark">B</span>Barnabas Impact</div><div className="loading-track"><div className="loading-fill"/></div></div></div>}
    <a className="float-button whatsapp" href="https://wa.me/254112272061?text=Hi%20Barnabas%20Impact%2C%20I%20want%20help%20setting%20up%20our%20NGO%20metrics" aria-label="Chat with us on WhatsApp" title="Chat with us on WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={24}/></a>
    <button className={`float-button voice ${speaking?'speaking':''}`} onClick={voiceClick} aria-label="Site voice tour, click to mute" title={started && !speaking ? 'Replay tour' : 'Hear what this site is about'}>{muted ? <VolumeX size={23}/> : <Volume2 size={23}/> }</button>
    {!cookie && <div className="cookie"><div className="cookie-inner"><div className="cookie-copy"><strong>Cookies, with care.</strong><div className="muted" style={{fontSize:'.86rem'}}>We use necessary storage and, with your choice, analytics to improve the site. Beneficiary and finance programme data is never used for advertising. See our <a href="/legal/cookie-policy" style={{color:'var(--primary-dark)',textDecoration:'underline'}}>cookie policy</a>.</div>{manage && <div className="cookie-preferences"><label><input type="checkbox" checked disabled/>Necessary, always on</label><label><input id="functional-cookie" type="checkbox" checked={preferences.functional} onChange={e=>setPreferences({...preferences,functional:e.target.checked})}/>Functional</label><label><input id="analytics-cookie" type="checkbox" checked={preferences.analytics} onChange={e=>setPreferences({...preferences,analytics:e.target.checked})}/>Analytics</label><label><input id="marketing-cookie" type="checkbox" checked={preferences.marketing} onChange={e=>setPreferences({...preferences,marketing:e.target.checked})}/>Marketing</label></div>}</div><div className="cookie-actions"><button className="btn small" onClick={() => saveConsent({necessary:true,functional:true,analytics:true,marketing:true})}>Accept All</button><button className="btn secondary small" onClick={() => manage ? saveConsent({necessary:true,functional:preferences.functional,analytics:preferences.analytics,marketing:preferences.marketing}) : setManage(true)}>{manage ? 'Save Preferences' : 'Manage Preferences'}</button><button className="btn tertiary small" onClick={() => saveConsent({necessary:true,functional:false,analytics:false,marketing:false})}>Necessary only</button></div></div></div>}
  </>
}
