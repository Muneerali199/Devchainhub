// frontend/app/dashboard/[project]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Plus, Upload, GitBranch, Shield, Server, Wallet, Smartphone, HardHat, Code, TestTube2 } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function ProjectPage() {
  const { project } = useParams()
  const router = useRouter()

  if (!project) {
    return <div>Project not found</div>
  }

  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName.replace(/-/g, ' ')

  // Blockchain project details
  const projectDetails = {
    name: displayName,
    isPrivate: false,
    chain: 'ethereum',
    repoUrl: `https://devchainhub.com/${projectName}.git`,
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    testnetUrl: `https://testnet.devchainhub.com/${projectName}.git`,
    explorerUrl: `https://explorer.devchainhub.com/address/${projectName}`
  }

  const navigateTo = (path: string) => {
    router.push(`/dashboard/${projectName}/${path}`)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold capitalize">{displayName}</h1>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs rounded-full bg-muted">
            {projectDetails.isPrivate ? 'Private' : 'Public'}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-muted capitalize">
            {projectDetails.chain}
          </span>
          <a href={projectDetails.explorerUrl} target="_blank" rel="noopener noreferrer"
            className="px-2 py-1 text-xs rounded-full bg-muted flex items-center gap-1">
            <Wallet className="w-3 h-3" /> View on Explorer
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Start building on {projectDetails.chain}</h2>
              <p className="text-muted-foreground">
                Initialize your blockchain development environment with smart contract templates,
                deployment scripts, and testing frameworks.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => navigateTo('contract/new')}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Smart Contract
                </Button>
                <Button variant="outline" onClick={() => navigateTo('config/hardhat')}>
                  <HardHat className="w-4 h-4 mr-2" />
                  Add Hardhat Config
                </Button>
                <Button variant="outline" onClick={() => navigateTo('tests/create')}>
                  <TestTube2 className="w-4 h-4 mr-2" />
                  Create Test Suite
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Blockchain Quick Start</h3>
            <p className="text-muted-foreground mb-4">
              Get started with your {projectDetails.chain} project using these DevChainHub-specific commands.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Initialize a new blockchain project</h4>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>
                    # Install DevChain CLI<br />
                    npm install -g @devchain/cli<br /><br />
                    # Initialize project<br />
                    devchain init {projectName} --chain {projectDetails.chain}<br /><br />
                    # Connect to DevChainHub<br />
                    devchain remote add origin {projectDetails.repoUrl}
                  </code>
                </pre>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Deploy to {projectDetails.chain} testnet</h4>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>
                    # Set up environment variables<br />
                    cp .env.example .env<br /><br />
                    # Compile contracts<br />
                    devchain compile<br /><br />
                    # Run tests<br />
                    devchain test<br /><br />
                    # Deploy to testnet<br />
                    devchain deploy --network testnet
                  </code>
                </pre>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Verify and publish contract</h4>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>
                    # Verify contract on {projectDetails.chain}<br />
                    devchain verify-contract --address {projectDetails.contractAddress}<br /><br />
                    # Publish to DevChainHub<br />
                    devchain publish --version 1.0.0
                  </code>
                </pre>
              </div>

              <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium mb-2 text-blue-800 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> DevChainHub Mobile App
                </h4>
                <p className="text-sm text-blue-700 mb-2">
                  Monitor your deployments and interact with contracts from our mobile app.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-blue-700" onClick={() => window.open('https://apps.apple.com/app/devchainhub')}>
                    iOS App
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-700" onClick={() => window.open('https://play.google.com/store/apps/details?id=com.devchainhub')}>
                    Android App
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-medium">Add Team Members</h3>
              <p className="text-sm text-muted-foreground">
                Collaborate with other developers using wallet addresses or DevChainHub IDs.
              </p>
              <div className="space-y-3">
                <Input placeholder="0x... or username" />
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full">
                    Developer
                  </Button>
                  <Button variant="outline" className="w-full">
                    Auditor
                  </Button>
                </div>
                <Button className="w-full" onClick={() => navigateTo('collaborators/invite')}>
                  Invite Team Member
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-medium">Blockchain Tools</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigateTo('explorer')}>
                  <Code className="w-4 h-4 mr-2" />
                  Contract Explorer
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigateTo('security/scan')}>
                  <Shield className="w-4 h-4 mr-2" />
                  Security Scan
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigateTo('nodes')}>
                  <Server className="w-4 h-4 mr-2" />
                  Node Management
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigateTo('fork/mainnet')}>
                  <GitBranch className="w-4 h-4 mr-2" />
                  Fork Mainnet
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-medium">Project Links</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between" onClick={() => navigateTo('contracts')}>
                  <span>Contract Address</span>
                  <span className="text-muted-foreground text-xs truncate max-w-[120px]">
                    {projectDetails.contractAddress}
                  </span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Testnet Explorer</span>
                  <span className="text-muted-foreground text-xs">view</span>
                </Button>
                <Button variant="outline" className="w-full justify-between" onClick={() => navigateTo('deploy/mainnet')}>
                  <span>Mainnet Deployer</span>
                  <span className="text-muted-foreground text-xs">setup</span>
                </Button>
              </div>
            </div>
          </Card>

          <div className="sticky top-6 space-y-4">
            <Button className="w-full gap-2">
              <Copy className="w-4 h-4" />
              Copy Repo URL
            </Button>
            <Button variant="outline" className="w-full gap-2" onClick={() => navigateTo('ide')}>
              <HardHat className="w-4 h-4" />
              Open Remix IDE
            </Button>
            <p className="text-xs text-muted-foreground">
              Need help? Check our <a href="#" className="text-primary">blockchain documentation</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}