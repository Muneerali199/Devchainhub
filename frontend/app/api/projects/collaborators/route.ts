import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { wallet, role } = await request.json()
  
  const newCollaborator = {
    wallet,
    role,
    joinedAt: new Date().toISOString()
  }
  
  return NextResponse.json({ collaborator: newCollaborator })
}