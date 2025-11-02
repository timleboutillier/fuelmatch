import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="card" style={{border:0, borderBottom:'1px solid #eee', borderRadius:0}}>
          <div className="container" style={{display:'flex', gap:16, alignItems:'center', justifyContent:'space-between'}}>
            <Link href="/"><strong>FuelMatch (Pilot)</strong></Link>
            <nav style={{display:'flex', gap:12}}>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/login">Login</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
