'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NewIntent() {
  const [intentType, setIntentType] = useState<'need_supply'|'have_supply'|'need_freight'|'have_freight'>('need_supply')
  const [product, setProduct] = useState('ULSD')
  const [volume, setVolume] = useState(9000)
  const [state, setState] = useState('ID')
  const [zip, setZip] = useState('83702')
  const [notes, setNotes] = useState('')
  const [orgId, setOrgId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const { data: user } = await supabase.auth.getUser()
      const { data } = await supabase.from('orgs').select('id').eq('owner_user_id', user.user?.id).limit(1).maybeSingle()
      if (data?.id) setOrgId(data.id)
    })()
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.from('intents').insert({ org_id: orgId, intent_type: intentType, product, volume_gal: volume, state, zip, notes }).select('id').single()
    if (!error && data?.id) {
      await fetch('/api/intent', { method: 'POST', body: JSON.stringify({ intentId: data.id }) })
      router.push(`/matches/${data.id}`)
    } else {
      alert(error?.message || 'Error creating intent')
    }
  }

  return (
    <div style={{maxWidth:520}}>
      <h1>Post an Intent</h1>
      <form onSubmit={onSubmit}>
        <label>Type</label>
        <select className="input" value={intentType} onChange={e=>setIntentType(e.target.value as any)}>
          <option value="need_supply">Need Supply</option>
          <option value="have_supply">Have Supply</option>
          <option value="need_freight">Need Freight</option>
          <option value="have_freight">Have Freight</option>
        </select>
        <label>Product</label>
        <select className="input" value={product} onChange={e=>setProduct(e.target.value)}>
          <option>ULSD</option>
          <option>RBOB87</option>
          <option>E10</option>
        </select>
        <label>Volume (gal)</label>
        <input className="input" type="number" value={volume} onChange={e=>setVolume(parseInt(e.target.value||'0'))} />
        <label>State</label>
        <input className="input" value={state} onChange={e=>setState(e.target.value)} />
        <label>ZIP</label>
        <input className="input" value={zip} onChange={e=>setZip(e.target.value)} />
        <label>Notes</label>
        <textarea className="input" value={notes} onChange={e=>setNotes(e.target.value)} />
        <div style={{marginTop:12}}>
          <button className="btn">Create</button>
        </div>
      </form>
    </div>
  )
}
