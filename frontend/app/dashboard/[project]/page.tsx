import { notFound } from 'next/navigation'

// Define the project type
type Project = {
  chain: string
  status: 'active' | 'development' | 'planning'
  readme: string
}

// Type the mockProjects object with explicit typing
const mockProjects: Record<string, Project> = {
  'NFT Marketplace': {
    chain: 'Ethereum',
    status: 'active',
    readme: 'This is a Web3 NFT marketplace on Ethereum...'
  },
  'DeFi Protocol': {
    chain: 'Polygon',
    status: 'development',
    readme: 'A DeFi yield protocol on Polygon.'
  },
  'DAO Governance': {
    chain: 'Arbitrum',
    status: 'planning',
    readme: 'Governance for a DAO using smart contracts.'
  }
} as const

// Helper function for type-safe project access
function getProject(name: string): Project | undefined {
  return mockProjects[name as keyof typeof mockProjects]
}

export default function ProjectDetailPage({ params }: { params: { project: string } }) {
  const projectName = decodeURIComponent(params.project)
  const project = getProject(projectName)
  
  if (!project) return notFound()

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{projectName}</h1>
      <p className="text-muted-foreground">Blockchain: {project.chain}</p>
      <p className="text-sm">Status: {project.status}</p>

      <div className="border rounded-md p-4 mt-4">
        <pre className="whitespace-pre-wrap">{project.readme}</pre>
      </div>
    </div>
  )
}