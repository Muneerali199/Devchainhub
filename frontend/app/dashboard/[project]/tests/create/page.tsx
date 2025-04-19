// frontend/app/dashboard/[project]/tests/create/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { TestTube2 } from 'lucide-react'

export default function CreateTestPage() {
  const { project } = useParams()
  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName.replace(/-/g, ' ')

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Test Suite for {displayName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button variant="outline" className="h-32 flex flex-col items-center justify-center gap-2">
          <TestTube2 className="w-8 h-8" />
          <span>Basic Test Suite</span>
        </Button>
        <Button variant="outline" className="h-32 flex flex-col items-center justify-center gap-2">
          <TestTube2 className="w-8 h-8" />
          <span>ERC20 Test Suite</span>
        </Button>
        <Button variant="outline" className="h-32 flex flex-col items-center justify-center gap-2">
          <TestTube2 className="w-8 h-8" />
          <span>ERC721 Test Suite</span>
        </Button>
        <Button variant="outline" className="h-32 flex flex-col items-center justify-center gap-2">
          <TestTube2 className="w-8 h-8" />
          <span>Custom Test Suite</span>
        </Button>
      </div>
      <div className="bg-muted p-4 rounded-md">
        <h2 className="font-medium mb-2">Test Command</h2>
        <pre className="text-sm bg-background p-2 rounded">
          npx hardhat test
        </pre>
      </div>
    </div>
  )
}