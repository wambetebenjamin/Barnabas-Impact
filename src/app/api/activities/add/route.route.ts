import { z } from 'zod'
import { auth } from '@/lib/auth'
import { kv } from '@vercel/kv'
import { put } from '@vercel/blob'
import { json } from '@/lib/security'

const schema = z.object({ title: z.string().min(2), program: z.string().min(2), date: z.string(), county: z.string().min(2), location: z.string().max(120).optional(), beneficiariesReached: z.coerce.number().int().min(0), notes: z.string().max(2000).optional() })
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) return json({ error: 'Sign in required.' }, 401)
  let input: Record<string, unknown>
  let photo: File | null = null
  if (request.headers.get('content-type')?.includes('multipart/form-data')) {
    const form = await request.formData()
    const raw = Object.fromEntries(form.entries())
    const upload = form.get('photo')
    if (upload instanceof File && upload.size > 0) photo = upload
    delete raw.photo
    input = raw
  } else {
    input = await request.json().catch(() => ({})) as Record<string, unknown>
  }
  const parsed = schema.safeParse(input)
  if (!parsed.success) return json({ error: 'Invalid activity.' }, 400)
  if (photo && (!photo.type.startsWith('image/') || photo.size > 10 * 1024 * 1024)) return json({ error: 'Activity photos must be an image under 10 MB.' }, 400)
  const orgId = (session.user as typeof session.user & { orgId?: string }).orgId || session.user.email || 'unknown'
  let photoUrl: string | undefined
  if (photo) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return json({ error: 'Photo storage is not configured.' }, 503)
    const blob = await put(`${orgId}/activity-${crypto.randomUUID()}-${photo.name}`, photo, { access: 'public' })
    photoUrl = blob.url
  }
  await kv.lpush(`org:${orgId}:activities`, { ...parsed.data, ...(photoUrl ? { photoUrl } : {}), orgId, createdAt: new Date().toISOString() })
  return json({ ok: true }, 201)
}
