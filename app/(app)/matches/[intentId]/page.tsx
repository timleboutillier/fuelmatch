'use client'
import useSWR from 'swr'
import { supabase } from '@/lib/supabaseClient'

const fetcher = async (intentId: string) => {
  const { data, error } = await supabase
    .from('matches')
    .select('id, score, masked, requested_intro, counterparty_org_id, orgs!matches_counterparty_org_id_fkey(name, role, state)')
    .eq('intent_id', intentId)
    .order('score', { ascending: false })
  if (error) throw error
  return data as any[]
}

export default function MatchesPage({ params }: { params: { intentId: string } }) {
  const { data, mutate } = useSWR(params.intentId, fetcher)

  async function requestIntro(matchId: string) {
    await fetch('/api/request-intro', { method: 'POST', body: JSON.stringify({ matchId }) })
    mutate()
  }

  return (
    <div>
      <h1>Your Matches</h1>
      <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:12}}>
        {data?.map((m:any) => (
          <div key={m.id} className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600}}>{m.orgs?.name ?? 'Company'} ({m.orgs?.role})</div>
              <div style={{fontSize:14, color:'#6b7280'}}>State: {m.orgs?.state} • Score: {Number(m.score).toFixed(2)}</div>
            </div>
            <button className="btn" onClick={()=>requestIntro(m.id)}>
              {m.requested_intro ? 'Requested' : 'Request Intro'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
