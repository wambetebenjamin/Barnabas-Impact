import { z } from 'zod'
import nodemailer from 'nodemailer'
import { checkRecaptchaV3, json, verifyRecaptchaV2 } from '@/lib/security'
const schema = z.object({ name: z.string().min(2).max(100), email: z.string().email(), message: z.string().min(10).max(3000), recaptchaToken: z.string().optional(), recaptchaV2Token: z.string().optional() })
export async function POST(request: Request) {
  const p = schema.safeParse(await request.json().catch(() => null)); if (!p.success) return json({ error: 'Please check your message.' }, 400)
  if (p.data.recaptchaV2Token) { if (!(await verifyRecaptchaV2(p.data.recaptchaV2Token))) return json({ error: 'The verification check did not pass. Please try again.' }, 403) }
  else { const captcha = await checkRecaptchaV3(p.data.recaptchaToken); if (captcha.needsV2) return json({ error: 'Please complete the additional verification check.', needsV2: true }, 428); if (!captcha.valid) return json({ error: 'Verification needed. Please try again.' }, 403) }
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.ADMIN_EMAIL) return json({ error: 'Enquiry delivery is not configured yet.' }, 503)
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: Number(process.env.SMTP_PORT) === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
  await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: process.env.ADMIN_EMAIL, replyTo: p.data.email, subject: `Barnabas Impact enquiry from ${p.data.name}`, text: p.data.message })
  return json({ ok: true }, 201)
}
