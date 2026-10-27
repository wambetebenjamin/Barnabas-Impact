import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { kv } from '@vercel/kv'
import { verifyPassword } from '@/lib/password'

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV !== 'production' ? 'barnabas-impact-local-development-secret' : undefined),
  trustHost: true,
  session: { strategy: 'jwt' },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [Google] : []),
    Credentials({
      credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
      async authorize(credentials) {
        const email = String(credentials.email || '').trim().toLowerCase()
        const password = String(credentials.password || '')
        if (!email || !password || !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null
        const member = await kv.get<{ email: string; name: string; orgId: string; passwordHash: string }>(`member:${email}`)
        if (!member || !(await verifyPassword(password, member.passwordHash))) return null
        return { id: email, email, name: member.name, orgId: member.orgId }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) { if (user && 'orgId' in user) token.orgId = user.orgId; return token },
    async session({ session, token }) { if (session.user) (session.user as typeof session.user & { orgId?: string }).orgId = String(token.orgId || token.sub || ''); return session },
  },
})
