'use client'

import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Plus, Upload, GitBranch, Shield, Server } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function ProjectPage() {
  const { project } = useParams()
  
  // Handle potential undefined project
  if (!project) {
    return <div>Project not found</div>
  }
  
  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName.replace(/-/g, ' ')
  
  // This would come from your backend in a real app
  const projectDetails = {
    name: displayName,
    isPrivate: false,
    chain: 'ethereum', // This would be dynamic
    repoUrl: `https://devchainhub.com/${projectName}.git`
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold capitalize">{displayName}</h1>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-xs rounded-full bg-muted">
            {projectDetails.isPrivate ? 'Private' : 'Public'}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-muted capitalize">
            {projectDetails.chain}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Start coding with Blockchain Dev Environment</h2>
              <p className="text-muted-foreground">
                Add a README file and start coding in a secure, configurable, and dedicated development environment 
                for your {projectDetails.chain} smart contracts.
              </p>
              <div className="flex gap-4">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add new contract
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload files
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Quick setup</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating a new file or uploading an existing file. We recommend every 
              blockchain project include a README, LICENSE, and .gitignore.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">…or create a new repository on the command line</h4>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>
                    {`echo "# ${displayName}" >> README.md\n`}
                    git init<br />
                    git add README.md<br />
                    git commit -m "first commit"<br />
                    git branch -M main<br />
                    {`git remote add origin ${projectDetails.repoUrl}\n`}
                    git push -u origin main
                  </code>
                </pre>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">…or push an existing repository from the command line</h4>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>
                    {`git remote add origin ${projectDetails.repoUrl}\n`}
                    git branch -M main<br />
                    git push -u origin main
                  </code>
                </pre>
              </div>

              <p className="text-xs text-muted-foreground">
                ProTip! Use the URL for this page when adding DevChainHub as a remote.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-medium">Add collaborators to this project</h3>
              <p className="text-sm text-muted-foreground">
                Search for people using their DevChainHub username or wallet address.
              </p>
              <div className="space-y-3">
                <Input placeholder="Search by username or address" />
                <Button variant="outline" className="w-full">
                  Invite collaborators
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-medium">Blockchain Tools</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Deploy Smart Contracts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Audit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Server className="w-4 h-4 mr-2" />
                  Node Configuration
                </Button>
              </div>
            </div>
          </Card>

          <div className="sticky top-6 space-y-2">
            <Button className="w-full" variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy repository URL
            </Button>
            <p className="text-xs text-muted-foreground">
              Ready to deploy? Set up your {projectDetails.chain} node configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}