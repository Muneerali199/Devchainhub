import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return new NextResponse('No files uploaded', { status: 400 })
    }

    // Here you would typically:
    // 1. Upload to Fleek/IPFS
    // 2. Save metadata to your database
    // 3. Return the file information

    // Mock response - replace with actual Fleek upload
    const uploadedFiles = files.map(file => ({
      name: file.name,
      type: 'file',
      path: `/${file.name}`,
      cid: 'mock-cid-' + Math.random().toString(36).substring(2),
      url: 'https://ipfs.io/ipfs/mock-cid',
      uploadedBy: user.id
    }))

    return NextResponse.json({ files: uploadedFiles })
  } catch (error) {
    console.error('[FILES_UPLOAD_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Mock response - replace with actual database fetch
    return NextResponse.json({
      files: [
        {
          name: 'README.md',
          type: 'file',
          path: '/README.md',
          cid: 'mock-readme-cid',
          url: 'https://ipfs.io/ipfs/mock-readme-cid',
          uploadedBy: user.id
        }
      ]
    })
  } catch (error) {
    console.error('[FILES_FETCH_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}