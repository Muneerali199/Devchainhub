import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json(
      { error: 'Path parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Download file content
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('project-files')
      .download(path)

    if (downloadError) throw downloadError

    // Get file metadata
    const { data: metaData } = await supabase.storage
      .from('project-files')
      .getPublicUrl(path)

    const content = await fileData.text()

    return NextResponse.json({
      name: path.split('/').pop(),
      type: 'file',
      path,
      content,
      url: metaData.publicUrl,
      size: fileData.size
    })

  } catch (error) {
    console.error('File fetch error:', error)
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    )
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const { content } = await request.json()

  if (!path || !content) {
    return NextResponse.json(
      { error: 'Path and content are required' },
      { status: 400 }
    )
  }

  try {
    const blob = new Blob([content])
    const { error } = await supabase.storage
      .from('project-files')
      .upload(path, blob, {
        upsert: true,
        contentType: 'text/plain'
      })

    if (error) throw error

    return NextResponse.json({
      message: 'File saved successfully',
      path,
      size: content.length
    })

  } catch (error) {
    console.error('File save error:', error)
    return NextResponse.json(
      { error: 'Failed to save file' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json(
      { error: 'Path parameter is required' },
      { status: 400 }
    )
  }

  try {
    const { error } = await supabase.storage
      .from('project-files')
      .remove([path])

    if (error) throw error

    return NextResponse.json({
      message: 'File deleted successfully'
    })

  } catch (error) {
    console.error('File delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}