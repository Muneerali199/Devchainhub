// frontend/app/dashboard/[project]/contract/new/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function NewContractPage() {
  const { project } = useParams();
  const projectName = Array.isArray(project) ? project[0] : project;
  
  // Check if projectName is undefined, if so, provide a fallback
  const displayName = projectName ? projectName.replace(/-/g, ' ') : 'Unnamed Project';
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Smart Contract for {displayName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-40 flex flex-col items-center justify-center gap-2">
          <Plus className="w-8 h-8" />
          <span>Empty Contract</span>
        </Button>
        <Button variant="outline" className="h-40 flex flex-col items-center justify-center gap-2">
          <Plus className="w-8 h-8" />
          <span>ERC20 Token</span>
        </Button>
        <Button variant="outline" className="h-40 flex flex-col items-center justify-center gap-2">
          <Plus className="w-8 h-8" />
          <span>ERC721 NFT</span>
        </Button>
        <Button variant="outline" className="h-40 flex flex-col items-center justify-center gap-2">
          <Plus className="w-8 h-8" />
          <span>ERC1155 Multi-Token</span>
        </Button>
        <Button variant="outline" className="h-40 flex flex-col items-center justify-center gap-2">
          <Plus className="w-8 h-8" />
          <span>Customizable</span>
        </Button>
        <Button variant="outline" className="h-40 flex flex-col items-center justify-center gap-2">
          <Plus className="w-8 h-8" />
          <span>From Template</span>
        </Button>
      </div>
    </div>
  )
}