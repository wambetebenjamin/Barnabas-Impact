import { auth } from '@/lib/auth'
import { put } from '@vercel/blob'
import { kv } from '@vercel/kv'
import { json } from '@/lib/security'
export async function POST(request: Request) {
  const session = await auth(); if (!session?.user) return json({ error: 'Sign in required.' }, 401)
  if (!process.env.BLOB_READ_WRITE_TOKEN) return json({ error: 'Evidence storage is not configured.' }, 503)
  const data = await request.formData(); const file = data.get('file'); const caption = String(data.get('caption') || '').slice(0, 240)
  if (!(file instanceof File) || file.size > 10 * 1024 * 1024 || !['image/jpeg','image/png','image/webp','application/pdf'].includes(file.type)) return json({ error: 'Upload a JPG, PNG, WEBP, or PDF under 10 MB.' }, 400)
  const orgId = (session.user as typeof session.user & { orgId?: string }).orgId || session.user.email || 'unknown'
  const blob = await put(`${orgId}/${crypto.randomUUID()}-${file.name}`, file, { access: 'public' })
  await kv.lpush(`org:${orgId}:evidence`, { url: blob.url, pathname: blob.pathname, caption, fileName: file.name, contentType: file.type, createdAt: new Date().toISOString(), orgId })
  return json({ ok: true, url: blob.url }, 201)
}
