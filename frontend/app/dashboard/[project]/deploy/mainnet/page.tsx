// frontend/app/dashboard/[project]/deploy/mainnet/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HardHat, ChevronDown } from 'lucide-react'

export default function MainnetDeployPage() {
  const { project } = useParams()
  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName.replace(/-/g, ' ')

  const deploymentSteps = [
    { name: 'Compile Contracts', status: 'ready' },
    { name: 'Run Tests', status: 'ready' },
    { name: 'Estimate Gas', status: 'pending' },
    { name: 'Confirm Deployment', status: 'pending' },
    { name: 'Verify Contracts', status: 'pending' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mainnet Deployment for {displayName}</h1>
      
      <Card className="p-6 mb-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <HardHat className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-medium">Deployment Checklist</h2>
          </div>
          
          <div className="space-y-4">
            {deploymentSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${step.status === 'ready' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{step.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.status === 'ready' ? 'Ready to execute' : 'Will be available after previous steps'}
                  </p>
                </div>
                {step.status === 'ready' ? (
                  <Button size="sm">Run</Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Pending
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Deployment Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Network</label>
            <select className="w-full p-2 border rounded-md">
              <option>Ethereum Mainnet</option>
              <option>Polygon Mainnet</option>
              <option>BNB Chain</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gas Price</label>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Auto" 
                className="flex-1 p-2 border rounded-l-md"
              />
              <button className="px-3 border-t border-r border-b rounded-r-md flex items-center">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}