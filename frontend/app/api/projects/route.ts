import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const { data, error } = await supabase
    .from('projects')
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}