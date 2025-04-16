import { notFound } from 'next/navigation'

const mockProjects = {
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
}

export default function ProjectDetailPage({ params }: { params: { project: string } }) {
  const project = mockProjects[decodeURIComponent(params.project)]
  if (!project) return notFound()

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{params.project}</h1>
      <p className="text-muted-foreground">Blockchain: {project.chain}</p>
      <p className="text-sm">Status: {project.status}</p>

      <div className="border rounded-md p-4 mt-4">
        <pre className="whitespace-pre-wrap">{project.readme}</pre>
      </div>
    </div>
  )
}
