import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import verifyUser  from '@/lib/auth'

interface CommitRequest {
  message: string
  files: {
    path: string
    content: string
    action: 'create' | 'update' | 'delete'
  }[]
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Authentication
    const user = await verifyUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Input Validation
    const body: CommitRequest = await request.json()
    if (!body.message || !body.files?.length) {
      return NextResponse.json(
        { error: 'Message and files are required' },
        { status: 400 }
      )
    }

    // 3. Create commit in database
    const { data: commit, error } = await supabase
      .from('commits')
      .insert({
        project_id: params.id,
        user_id: user.id,
        message: body.message,
        changes: body.files
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      sha: commit.id,
      author: {
        name: user.user_metadata?.full_name || user.email?.split('@')[0],
        email: user.email,
        date: new Date().toISOString()
      },
      message: body.message
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Commit failed' },
      { status: 500 }
    )
  }
}