type V3Result = { success?: boolean; score?: number }
async function requestVerification(token: unknown) {
  if (!process.env.RECAPTCHA_SECRET_KEY || typeof token !== 'string' || !token) return null
  const form = new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET_KEY, response: token })
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body: form, cache: 'no-store' })
  return await response.json() as V3Result
}
export async function checkRecaptchaV3(token: unknown) {
  if (!process.env.RECAPTCHA_SECRET_KEY) return { valid: process.env.NODE_ENV !== 'production', needsV2: false }
  const result = await requestVerification(token)
  if (result?.success && (result.score ?? 0) >= 0.5) return { valid: true, needsV2: false }
  if (result?.success && (result.score ?? 0) < 0.5) return { valid: false, needsV2: true }
  return { valid: false, needsV2: false }
}
export async function verifyRecaptchaV2(token: unknown) {
  if (!process.env.RECAPTCHA_SECRET_KEY) return process.env.NODE_ENV !== 'production'
  const result = await requestVerification(token)
  return Boolean(result?.success)
}
export async function verifyRecaptcha(token: unknown) {
  return (await checkRecaptchaV3(token)).valid
}
export const json = (data: unknown, status = 200) => Response.json(data, { status })
