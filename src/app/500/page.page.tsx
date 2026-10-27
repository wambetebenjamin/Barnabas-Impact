import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export default function ServerErrorPage() {
  return <main className="container" style={{padding:'88px 16px',textAlign:'center'}}>
    <span className="eyebrow">Barnabas Impact · 500</span>
    <h1 className="heading" style={{fontSize:'clamp(2.4rem,7vw,4rem)'}}>We could not load this page.</h1>
    <p className="muted" style={{maxWidth:560,margin:'0 auto 22px'}}>Your work matters. Please try again or message our support team.</p>
    <div className="hero-actions" style={{justifyContent:'center'}}>
      <Link className="btn" href="/">Go to homepage</Link>
      <a className="btn secondary" href="https://wa.me/254112272061"><MessageCircle size={18}/> WhatsApp +254 112 272 061</a>
    </div>
  </main>
}
