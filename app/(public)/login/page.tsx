'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${site}/dashboard` }
    })
    if (!error) setSent(true)
  }

  return (
    <div style={{maxWidth:420}}>
      <h1>Sign in</h1>
      {sent ? (
        <p>Check your email for a magic link.</p>
      ) : (
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input className="input" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <div style={{marginTop:12}}>
            <button className="btn">Send Link</button>
          </div>
        </form>
      )}
    </div>
  )
}
