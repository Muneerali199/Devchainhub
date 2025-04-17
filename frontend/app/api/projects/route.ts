// app/api/projects/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, owner_id } = await request.json();
  
  // Generate slug
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  const { data, error } = await supabase
    .from('projects')
    .insert([{ name, slug, owner_id }])
    .select();

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data[0]);
}