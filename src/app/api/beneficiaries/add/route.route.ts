import { z } from 'zod'
import { auth } from '@/lib/auth'
import { kv } from '@vercel/kv'
import { json } from '@/lib/security'
const schema = z.object({ idCode: z.string().min(2).max(40), ageBand: z.string(), gender: z.string(), county: z.string().min(2), program: z.string().min(2), date: z.string(), anonymous: z.boolean().default(true) })
export async function POST(request: Request) {
  const session = await auth(); if (!session?.user) return json({ error: 'Sign in required.' }, 401)
  const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return json({ error: 'Invalid beneficiary record.' }, 400)
  const orgId = (session.user as typeof session.user & { orgId?: string }).orgId || session.user.email || 'unknown'
  const row = { ...parsed.data, orgId, createdAt: new Date().toISOString() }
  await kv.lpush(`org:${orgId}:beneficiaries`, row)
  return json({ ok: true }, 201)
}
