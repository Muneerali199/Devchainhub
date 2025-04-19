// frontend/app/dashboard/[project]/explorer/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Code, Copy } from 'lucide-react'

export default function ExplorerPage() {
  const { project } = useParams()
  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName.replace(/-/g, ' ')

  const contracts = [
    { name: 'MyToken', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', type: 'ERC20' },
    { name: 'NFTCollection', address: '0x892d35Cc6634C0532925a3b844Bc454e4438a23b', type: 'ERC721' },
    { name: 'MultiToken', address: '0x342d35Cc6634C0532925a3b844Bc454e4438b12c', type: 'ERC1155' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contract Explorer for {displayName}</h1>
      
      <div className="space-y-4">
        {contracts.map((contract, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{contract.name}</h3>
                <p className="text-sm text-muted-foreground">{contract.type}</p>
              </div>
              <Button variant="outline" size="sm">
                <Code className="w-4 h-4 mr-2" />
                View Code
              </Button>
            </div>
            <div className="mt-3 flex items-center">
              <p className="text-sm font-mono truncate flex-1">{contract.address}</p>
              <Button variant="ghost" size="sm" className="ml-2">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}