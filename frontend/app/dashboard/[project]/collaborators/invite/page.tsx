'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function InviteCollaboratorPage() {
  const { project } = useParams()
  
  // Ensure projectName is not undefined
  const projectName = Array.isArray(project) ? project[0] : project
  if (!projectName) {
    return <div>Error: Project name is missing.</div> // Display an error if projectName is missing
  }

  const displayName = projectName.replace(/-/g, ' ')

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Invite Collaborator to {displayName}</h1>
      
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Collaborator Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Wallet Address or DevChainHub ID</label>
                <Input placeholder="0x... or username" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Developer</option>
                  <option>Auditor</option>
                  <option>Viewer</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Permissions</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Contract Deployment</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Contract Modification</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Test Execution</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Team Management</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Send Invitation</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
