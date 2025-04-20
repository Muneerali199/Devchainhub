// frontend/app/dashboard/[project]/ide/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HardHat } from 'lucide-react'

export default function IDEPage() {
  const { project } = useParams();

  // Ensure projectName is defined and handle the case when it's undefined
  const projectName = Array.isArray(project) ? project[0] : project;
  
  // Safely handle undefined projectName by providing a default value
  const displayName = projectName ? projectName.replace(/-/g, ' ') : 'Unnamed Project';  // Provide default if undefined
  



  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IDE for {displayName}</h1>
      
      <Card className="p-6 mb-6">
        <div className="flex flex-col items-center justify-center py-12">
          <HardHat className="w-12 h-12 mb-4 text-primary" />
          <h2 className="text-xl font-medium mb-2">Launch Remix IDE</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Open your project in Remix IDE, a powerful web-based development environment for smart contracts.
          </p>
          <Button className="w-full max-w-xs">
            Open in Remix
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-2">VS Code Online</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Access your project directly in VS Code through your browser.
          </p>
          <Button variant="outline" className="w-full">
            Open VS Code
          </Button>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium mb-2">Local Development</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Set up your local development environment with these tools.
          </p>
          <Button variant="outline" className="w-full">
            Setup Guide
          </Button>
        </Card>
      </div>
    </div>
  )
}