// frontend/app/dashboard/[project]/fork/mainnet/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GitBranch } from 'lucide-react'

export default function ForkMainnetPage() {
  const { project } = useParams()
  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName.replace(/-/g, ' ')

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Fork Mainnet for {displayName}</h1>
      
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-medium">Create a Mainnet Fork</h2>
          </div>
          <p className="text-muted-foreground">
            Forking mainnet allows you to interact with contracts deployed on the mainnet in a local development environment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Block Number</label>
              <input 
                type="number" 
                placeholder="Latest" 
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chain</label>
              <select className="w-full p-2 border rounded-md">
                <option>Ethereum</option>
                <option>Polygon</option>
                <option>BNB Chain</option>
                <option>Avalanche</option>
              </select>
            </div>
          </div>
          <Button className="w-full">
            <GitBranch className="w-4 h-4 mr-2" />
            Create Fork
          </Button>
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-medium mb-4">Existing Forks</h2>
        <div className="space-y-2">
          <Card className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Ethereum Fork #12345</p>
              <p className="text-sm text-muted-foreground">Block 17823456 • Created 2 days ago</p>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </Card>
          <Card className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Polygon Fork #67890</p>
              <p className="text-sm text-muted-foreground">Block 42345678 • Created 1 week ago</p>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}