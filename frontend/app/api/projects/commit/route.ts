import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const { message, changes, projectId } = await request.json()

  if (!message || !changes || !projectId) {
    return NextResponse.json(
      { error: 'Message, changes, and projectId are required' },
      { status: 400 }
    )
  }

  try {
    const newCommit = {
      id: uuidv4(),
      project_id: projectId,
      author: {
        name: "Current User",
        email: "user@example.com",
        date: new Date().toISOString()
      },
      message,
      changes,
      created_at: new Date().toISOString()
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('commits')
      .insert(newCommit)
      .select()

    if (error) throw error

    // Get updated commit list
    const { data: commits } = await supabase
      .from('commits')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    return NextResponse.json({
      commit: data[0],
      commits
    })

  } catch (error) {
    console.error('Commit error:', error)
    return NextResponse.json(
      { error: 'Commit failed' },
      { status: 500 }
    )
  }
}