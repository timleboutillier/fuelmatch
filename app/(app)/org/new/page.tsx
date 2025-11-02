'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NewOrg() {
  const [name, setName] = useState('')
  const [role, setRole] = useState<'buyer'|'supplier'|'carrier'|'broker'>('buyer')
  const [state, setState] = useState('ID')
  const [zip, setZip] = useState('83702')
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { data: user } = await supabase.auth.getUser()
    const owner_user_id = user.user?.id
    const { data, error } = await supabase
      .from('orgs')
      .insert({ name, role, state, zip, owner_user_id })
      .select('id')
      .single()
    if (!error && data?.id) {
      await supabase.from('members').insert({ org_id: data.id, user_id: owner_user_id, role: 'owner' })
      router.push('/dashboard')
    } else {
      alert(error?.message || 'Error creating org')
    }
  }

  return (
    <div style={{maxWidth:520}}>
      <h1>Create your company</h1>
      <form onSubmit={onSubmit}>
        <label>Company name</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        <label>Role</label>
        <select className="input" value={role} onChange={e=>setRole(e.target.value as any)}>
          <option value="buyer">Buyer</option>
          <option value="supplier">Supplier</option>
          <option value="carrier">Carrier</option>
          <option value="broker">Broker</option>
        </select>
        <label>State (e.g., ID)</label>
        <input className="input" value={state} onChange={e=>setState(e.target.value)} />
        <label>ZIP</label>
        <input className="input" value={zip} onChange={e=>setZip(e.target.value)} />
        <div style={{marginTop:12}}>
          <button className="btn">Save</button>
        </div>
      </form>
    </div>
  )
}
