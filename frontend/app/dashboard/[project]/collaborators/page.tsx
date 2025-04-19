// frontend/app/dashboard/[project]/collaborators/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CollaboratorsPage() {
  const { project } = useParams()
  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName.replace(/-/g, ' ')

  const collaborators = [
    { name: '0x742d...f44e', role: 'Owner', joined: 'Jan 15, 2023' },
    { name: '0x892d...a23b', role: 'Developer', joined: 'Mar 2, 2023' },
    { name: '0x342d...b12c', role: 'Auditor', joined: 'Apr 10, 2023' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Collaborators for {displayName}</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Add New Collaborator</h2>
        <div className="flex gap-4">
          <Input placeholder="Wallet address or DevChainHub ID" className="flex-1" />
          <Button>Invite</Button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Current Collaborators</h2>
        <div className="border rounded-md divide-y">
          {collaborators.map((collab, index) => (
            <div key={index} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{collab.name}</p>
                <p className="text-sm text-muted-foreground">{collab.role} • Joined {collab.joined}</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}