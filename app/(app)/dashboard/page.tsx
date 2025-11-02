'use client'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
        <Link className="card" href="/org/new">Create Company</Link>
        <Link className="card" href="/intent/new">Post an Intent</Link>
      </div>
    </div>
  )
}
