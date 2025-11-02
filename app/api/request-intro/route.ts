import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const { matchId } = await req.json()
  const sb = supabaseServer()
  await sb.from('matches').update({ requested_intro: true, masked: false }).eq('id', matchId)
  return NextResponse.json({ ok: true })
}
