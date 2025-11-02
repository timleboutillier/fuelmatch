import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  const { intentId } = await req.json()
  const sb = supabaseServer()
  await sb.rpc('compute_matches_for_intent', { p_intent: intentId })
  return NextResponse.json({ ok: true })
}
