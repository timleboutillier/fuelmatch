import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl">Connect buyers, suppliers, and carriers in minutes.</h1>
      <p style={{marginTop:12, color:'#4b5563'}}>Post what you need. Meet who can deliver. Pilot launch.</p>
      <div style={{marginTop:24}}>
        <Link href="/login" className="btn">Get Started</Link>
      </div>
    </div>
  )
}
