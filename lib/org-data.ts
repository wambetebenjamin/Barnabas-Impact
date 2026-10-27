import { kv } from '@vercel/kv'

type BaseRow = Record<string, unknown> & { createdAt?: string; date?: string; orgId?: string }
type Beneficiary = BaseRow & { idCode?: string; ageBand?: string; gender?: string; county?: string; program?: string }
type Activity = BaseRow & { title?: string; program?: string; county?: string; beneficiariesReached?: number }
type Finance = BaseRow & { type?: 'In' | 'Out'; category?: string; amount?: number; project?: string; notes?: string }
type Volunteer = BaseRow & { name?: string; phone?: string; skills?: string; status?: string }
type Evidence = BaseRow & { url?: string; caption?: string; fileName?: string; contentType?: string }
export type OrgReportData = {
  summary: { beneficiariesMTD: number; totalBeneficiaries: number; activities: number; fundsDeployed: number; activeVolunteers: number; counties: number }
  chartData: { months: { month: string; beneficiaries: number }[]; programs: { program: string; activities: number }[]; funds: { category: string; amount: number }[] }
  beneficiaries: Beneficiary[]; activities: Activity[]; finance: Finance[]; volunteers: Volunteer[]; evidence: Evidence[]
}
const empty: OrgReportData = { summary: { beneficiariesMTD: 0, totalBeneficiaries: 0, activities: 0, fundsDeployed: 0, activeVolunteers: 0, counties: 0 }, chartData: { months: [], programs: [], funds: [] }, beneficiaries: [], activities: [], finance: [], volunteers: [], evidence: [] }
export async function loadOrgReportData(orgId: string): Promise<OrgReportData> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return empty
  const [beneficiaries, activities, finance, volunteers, evidence] = await Promise.all([
    kv.lrange<Beneficiary>(`org:${orgId}:beneficiaries`, 0, 999),
    kv.lrange<Activity>(`org:${orgId}:activities`, 0, 999),
    kv.lrange<Finance>(`org:${orgId}:finance`, 0, 999),
    kv.lrange<Volunteer>(`org:${orgId}:volunteers`, 0, 999),
    kv.lrange<Evidence>(`org:${orgId}:evidence`, 0, 999),
  ])
  const now = new Date()
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`
  const months: OrgReportData['chartData']['months'] = []
  const monthKeys: string[] = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`
    monthKeys.push(key); months.push({ month: d.toLocaleString('en-KE',{month:'short'}), beneficiaries: 0 })
  }
  const monthMap = new Map(monthKeys.map((key,i)=>[key,i]))
  beneficiaries.forEach(row => { const key = String(row.date || row.createdAt || '').slice(0,7); const index=monthMap.get(key); if(index!==undefined) months[index].beneficiaries++ })
  const programCounts = new Map<string,number>()
  activities.forEach(row => { const name=String(row.program||'Other'); programCounts.set(name,(programCounts.get(name)||0)+1) })
  const fundCounts = new Map<string,number>()
  finance.filter(row=>row.type==='Out').forEach(row => { const name=String(row.category||'Other'); fundCounts.set(name,(fundCounts.get(name)||0)+Number(row.amount||0)) })
  return {
    summary: {
      beneficiariesMTD: beneficiaries.filter(row=>String(row.date||row.createdAt||'').startsWith(thisMonth)).length,
      totalBeneficiaries: beneficiaries.length,
      counties: new Set([...beneficiaries.map(row=>String(row.county||'')),...activities.map(row=>String(row.county||''))].filter(Boolean)).size,
      activities: activities.length,
      fundsDeployed: finance.filter(row=>row.type==='Out').reduce((sum,row)=>sum+Number(row.amount||0),0),
      activeVolunteers: volunteers.filter(row=>row.status==='active').length,
    },
    chartData: {
      months,
      programs: [...programCounts].map(([program,count])=>({program,activities:count})),
      funds: [...fundCounts].map(([category,amount])=>({category,amount})),
    },
    beneficiaries, activities, finance, volunteers, evidence,
  }
}
