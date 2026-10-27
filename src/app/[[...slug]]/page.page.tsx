import { auth } from '@/lib/auth'
import { kv } from '@vercel/kv'
import { loadOrgReportData } from '@/lib/org-data'
import { notFound, redirect } from 'next/navigation'
import Site from '@/src/app/site'

export default async function RoutePage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params
  const path = `/${slug.join('/')}`
  if (path === '/dashboard' || path.startsWith('/dashboard/')) {
    if (!process.env.NEXTAUTH_SECRET) redirect('/login')
    const session = await auth()
    if (!session?.user) redirect('/login')
    const orgId = (session.user as typeof session.user & { orgId?: string }).orgId || session.user.email || 'unknown'
    const dashboardData = await loadOrgReportData(orgId)
    return <Site path={path} dashboardData={dashboardData}/>
  }
  if (slug[0] === 'p' && slug[1]) {
    let published: Record<string, unknown> | null = null
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) published = await kv.get(`public:${slug[1]}`)
    if (!published || published.published !== true) notFound()
    const org = await kv.get<Record<string, unknown>>(`org:${published.orgId}`)
    if (!org) notFound()
    const visibleMetrics = Array.isArray(published.visibleMetrics) ? published.visibleMetrics as string[] : []
    const reportData = await loadOrgReportData(String(published.orgId))
    const storedEvidence = visibleMetrics.includes('evidence') ? reportData.evidence.slice(0, 3) : []
    const evidence = storedEvidence.map(item => ({ url: String(item.url || ''), caption: String(item.caption || 'Programme evidence'), date: String(item.createdAt || ''), contentType: String(item.contentType || '') }))
    return <Site path={path} publicOrg={{ name: String(org.name || 'Community programme'), county: String(org.county || ''), blurb: String(published.blurb || ''), visibleMetrics, evidence, summary: reportData.summary, chartData: reportData.chartData }}/>
  }
  if (path.startsWith('/p/') && slug.length !== 2) notFound()
  return <Site path={path}/>
}
