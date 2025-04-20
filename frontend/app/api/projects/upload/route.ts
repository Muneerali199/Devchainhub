import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('file') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, files: [], error: 'No files provided' },
        { status: 400 }
      )
    }

    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const fileExt = file.name.split('.').pop() || 'bin'
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${fileExt}`
        const filePath = `uploads/${fileName}`

        const { data, error } = await supabase.storage
          .from('project-files')
          .upload(filePath, file)

        if (error) throw error

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('project-files')
          .getPublicUrl(filePath)

        return {
          name: file.name,
          type: 'file',
          path: filePath,
          url: urlData.publicUrl,
          size: file.size,
          contentType: file.type
        }
      })
    )

    return NextResponse.json({
      success: true,
      files: uploadResults
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, files: [], error: 'Upload failed' },
      { status: 500 }
    )
  }
}