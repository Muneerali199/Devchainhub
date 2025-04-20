// frontend/app/dashboard/[project]/nodes/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Server } from 'lucide-react'

export default function NodesPage() {
  const { project } = useParams();

  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName?.replace(/-/g, ' ') ?? 'Unnamed Project'
  


  const nodes = [
    { name: 'Mainnet Node', status: 'Online', type: 'Full Node', url: 'https://mainnet.devchainhub.com' },
    { name: 'Testnet Node', status: 'Online', type: 'Archive Node', url: 'https://testnet.devchainhub.com' },
    { name: 'Dev Node', status: 'Offline', type: 'Light Node', url: 'https://dev.devchainhub.com' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Node Management for {displayName}</h1>
      
      <div className="mb-6">
        <Button>
          <Server className="w-4 h-4 mr-2" />
          Add New Node
        </Button>
      </div>

      <div className="space-y-4">
        {nodes.map((node, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{node.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {node.type} • Status: <span className={node.status === 'Online' ? 'text-green-500' : 'text-red-500'}>
                    {node.status}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Configure</Button>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-mono">{node.url}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}