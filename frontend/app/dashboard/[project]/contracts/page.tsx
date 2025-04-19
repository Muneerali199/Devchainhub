// frontend/app/dashboard/[project]/contracts/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink } from 'lucide-react'

export default function ContractsPage() {
  const { project } = useParams()
  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName.replace(/-/g, ' ')

  const contracts = [
    { 
      name: 'MyToken', 
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 
      network: 'Ethereum Mainnet',
      verified: true
    },
    { 
      name: 'NFTCollection', 
      address: '0x892d35Cc6634C0532925a3b844Bc454e4438a23b', 
      network: 'Ethereum Testnet',
      verified: false
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contracts for {displayName}</h1>
      
      <div className="space-y-4">
        {contracts.map((contract, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">{contract.name}</h3>
                <p className="text-sm text-muted-foreground">{contract.network}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${contract.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {contract.verified ? 'Verified' : 'Unverified'}
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-sm font-mono truncate flex-1">{contract.address}</p>
              <Button variant="ghost" size="sm" className="ml-2">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="ml-1">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button>Deploy New Contract</Button>
      </div>
    </div>
  )
}