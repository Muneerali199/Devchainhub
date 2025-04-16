'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { GitBranch, Cpu, Lock, Server, Database, Zap, Globe, Layers, Shield } from 'lucide-react'

const blockchainOptions = [
  { value: 'ethereum', label: 'Ethereum', icon: <Layers className="w-4 h-4" /> },
  { value: 'polygon', label: 'Polygon', icon: <Database className="w-4 h-4" /> },
  { value: 'solana', label: 'Solana', icon: <Zap className="w-4 h-4" /> },
  { value: 'polkadot', label: 'Polkadot', icon: <Globe className="w-4 h-4" /> },
  { value: 'cosmos', label: 'Cosmos', icon: <Cpu className="w-4 h-4" /> },
  { value: 'avalanche', label: 'Avalanche', icon: <Server className="w-4 h-4" /> },
  { value: 'bnb', label: 'BNB Chain', icon: <Shield className="w-4 h-4" /> },
  { value: 'arbitrum', label: 'Arbitrum', icon: <Lock className="w-4 h-4" /> },
]

export default function NewProjectPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [chain, setChain] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [readme, setReadme] = useState('# Project Description\n\n## Overview\n\n## Features\n\n## Smart Contracts\n\n## Deployment')

  const handleCreate = () => {
    // Simulate saving to DB or API
    console.log({ name, chain, description, isPrivate, readme })
    router.push(`/projects/${name.toLowerCase().replace(/\s+/g, '-')}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Blockchain Project</h1>
        <p className="text-muted-foreground">Set up your new repository to manage smart contracts and decentralized applications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name</label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">devchainhub/</span>
                <Input 
                  placeholder="my-awesome-project" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Input 
                placeholder="A decentralized NFT marketplace with multi-chain support" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Blockchain Network</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {blockchainOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setChain(option.value)}
                    className={`flex items-center gap-2 p-3 rounded-md border ${chain === option.value ? 'border-purple-500 bg-purple-500/10' : 'border-muted hover:bg-muted/50'}`}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="public"
                  checked={!isPrivate}
                  onChange={() => setIsPrivate(false)}
                />
                <label htmlFor="public">Public</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="private"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(true)}
                />
                <label htmlFor="private">Private</label>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">SmartChain.md</h3>
              <div className="text-sm text-muted-foreground">Markdown</div>
            </div>
            <Textarea
              value={readme}
              onChange={(e) => setReadme(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-medium">Project Template</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-md border border-muted hover:bg-muted/50">
                <div className="font-medium">Empty Repository</div>
                <div className="text-sm text-muted-foreground">Start from scratch</div>
              </button>
              <button className="w-full text-left p-3 rounded-md border border-muted hover:bg-muted/50">
                <div className="font-medium">NFT Marketplace</div>
                <div className="text-sm text-muted-foreground">ERC-721 template</div>
              </button>
              <button className="w-full text-left p-3 rounded-md border border-muted hover:bg-muted/50">
                <div className="font-medium">DeFi Protocol</div>
                <div className="text-sm text-muted-foreground">ERC-20 template</div>
              </button>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-medium">Additional Options</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="ci" className="w-4 h-4" />
                <label htmlFor="ci" className="text-sm">Add CI/CD Pipeline</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="security" className="w-4 h-4" />
                <label htmlFor="security" className="text-sm">Enable Security Scanning</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="multisig" className="w-4 h-4" />
                <label htmlFor="multisig" className="text-sm">Multi-sig Wallet Setup</label>
              </div>
            </div>
          </Card>

          <div className="sticky top-6">
            <Button 
              onClick={handleCreate}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              disabled={!name || !chain}
            >
              Create Project
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              By creating a project, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}