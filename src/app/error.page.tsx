'use client'
import Link from 'next/link'
export default function ErrorPage() { return <main className="container" style={{padding:'100px 16px',textAlign:'center'}}><span className="eyebrow">500, Something went wrong</span><h1 className="heading" style={{fontSize:'3rem'}}>We could not load this page.</h1><p className="muted">Your work matters. Please try again or message our support team.</p><p><a className="btn" href="https://wa.me/254112272061">WhatsApp +254 112 272 061</a></p><Link href="/">Back to home</Link></main> }
