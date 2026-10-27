import { z } from 'zod'
import { kv } from '@vercel/kv'
import { hashPassword } from '@/lib/password'
import { checkRecaptchaV3, json, verifyRecaptchaV2 } from '@/lib/security'
const schema = z.object({ orgName: z.string().min(2).max(120), contactName: z.string().min(2).max(100), email: z.string().email(), password: z.string().min(10).max(128), orgType: z.enum(['CBO','NGO','Faith-based','School programme','Other']), county: z.string().min(2).max(80), recaptchaToken: z.string().optional(), recaptchaV2Token: z.string().optional() })
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return json({ error: 'Please check the details and try again.' }, 400)
  if (parsed.data.recaptchaV2Token) {
    if (!(await verifyRecaptchaV2(parsed.data.recaptchaV2Token))) return json({ error: 'The verification check did not pass. Please try again.' }, 403)
  } else {
    const captcha = await checkRecaptchaV3(parsed.data.recaptchaToken)
    if (captcha.needsV2) return json({ error: 'Please complete the additional verification check.' , needsV2: true }, 428)
    if (!captcha.valid) return json({ error: 'Verification needed. Please try again or contact support.' }, 403)
  }
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return json({ error: 'Registration storage is not configured yet. Add KV_REST_API_URL and KV_REST_API_TOKEN.' }, 503)
  const { orgName, contactName, email, password, orgType, county } = parsed.data
  const normalized = email.toLowerCase()
  if (await kv.exists(`member:${normalized}`)) return json({ error: 'This email already has an account.' }, 409)
  const orgId = `org_${crypto.randomUUID()}`
  await kv.set(`member:${normalized}`, { email: normalized, name: contactName, orgId, passwordHash: await hashPassword(password) })
  await kv.set(`org:${orgId}`, { id: orgId, name: orgName, orgType, county, createdAt: new Date().toISOString(), published: false })
  return json({ ok: true, message: 'Your board is ready. Sign in to continue.' }, 201)
}
