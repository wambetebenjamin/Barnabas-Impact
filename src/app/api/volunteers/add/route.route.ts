import { z } from 'zod'
import { auth } from '@/lib/auth'; import { kv } from '@vercel/kv'; import { json } from '@/lib/security'
const schema = z.object({ name: z.string().min(2), phone: z.string().min(7).max(24), skills: z.string().max(300), status: z.enum(['active','inactive']) })
export async function POST(request: Request) { const s = await auth(); if (!s?.user) return json({ error: 'Sign in required.' }, 401); const p = schema.safeParse(await request.json().catch(() => null)); if (!p.success) return json({ error: 'Invalid volunteer record.' }, 400); const orgId = (s.user as typeof s.user & { orgId?: string }).orgId || s.user.email || 'unknown'; await kv.lpush(`org:${orgId}:volunteers`, { ...p.data, orgId, createdAt: new Date().toISOString() }); return json({ ok: true }, 201) }
