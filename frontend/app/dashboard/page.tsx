import { auth } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Code, Wallet, Smartphone, Server, Database, Network, GitFork, Star, Eye, GitPullRequest, Globe, Lock, BarChart2 } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  chain: string;
  status: 'active' | 'development' | 'planning';
  stars: number;
  forks: number;
  watchers: number;
  lastUpdated: string;
  language: string;
  isPublic: boolean;
}

export default async function Dashboard() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Mock data - in a real app, you'd fetch this from your database
  const userProjects: Project[] = [
    {
      id: '1',
      name: 'NFT-Marketplace',
      description: 'Decentralized NFT marketplace with multi-chain support',
      chain: 'Ethereum, Polygon',
      status: 'active',
      stars: 128,
      forks: 32,
      watchers: 45,
      lastUpdated: '2 days ago',
      language: 'Solidity',
      isPublic: true
    },
    {
      id: '2',
      name: 'DeFi-Protocol',
      description: 'Lending and borrowing protocol with innovative interest model',
      chain: 'Polygon, Avalanche',
      status: 'development',
      stars: 64,
      forks: 12,
      watchers: 28,
      lastUpdated: '1 week ago',
      language: 'Rust',
      isPublic: true
    },
    {
      id: '3',
      name: 'DAO-Governance',
      description: 'Modular DAO framework for decentralized organizations',
      chain: 'Arbitrum',
      status: 'planning',
      stars: 0,
      forks: 0,
      watchers: 3,
      lastUpdated: '1 month ago',
      language: 'TypeScript',
      isPublic: false
    }
  ];

  const trendingProjects: Project[] = [
    {
      id: '4',
      name: 'Web3-Starter-Kit',
      description: 'Complete boilerplate for Web3 applications',
      chain: 'Multi-chain',
      status: 'active',
      stars: 542,
      forks: 187,
      watchers: 320,
      lastUpdated: '5 hours ago',
      language: 'TypeScript',
      isPublic: true
    },
    {
      id: '5',
      name: 'ZK-Rollup-Example',
      description: 'Zero-knowledge rollup implementation for Ethereum',
      chain: 'Ethereum',
      status: 'active',
      stars: 289,
      forks: 76,
      watchers: 142,
      lastUpdated: '1 day ago',
      language: 'Cairo',
      isPublic: true
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Dashboard header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Your Blockchain Workspace</h1>
        <p className="text-muted-foreground">
          Manage your projects, contribute to the ecosystem, and collaborate with other Web3 developers
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <StatCard 
          icon={<Code className="w-5 h-5" />}
          title="Your Projects"
          value={userProjects.length}
          change="+1 from last month"
        />
        <StatCard 
          icon={<Star className="w-5 h-5" />}
          title="Total Stars"
          value={userProjects.reduce((sum, p) => sum + p.stars, 0)}
          change="+24 this week"
          color="text-yellow-500"
        />
        <StatCard 
          icon={<GitFork className="w-5 h-5" />}
          title="Total Forks"
          value={userProjects.reduce((sum, p) => sum + p.forks, 0)}
          change="+8 this week"
          color="text-purple-500"
        />
        <StatCard 
          icon={<Eye className="w-5 h-5" />}
          title="Watchers"
          value={userProjects.reduce((sum, p) => sum + p.watchers, 0)}
          change="+12 this week"
          color="text-blue-500"
        />
      </div>

      {/* Your Projects */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          <Button className="gap-2" asChild>
            <Link href="/projects/new">
              <Code className="w-4 h-4" />
              New Project
            </Link>
          </Button>
        </div>
        <div className="grid gap-4">
          {userProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Trending in Ecosystem */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Trending in Blockchain Ecosystem</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {trendingProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 pt-4">
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/explore">
            <Globe className="w-4 h-4" />
            Explore Projects
          </Link>
        </Button>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/wallet">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </Link>
        </Button>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/analytics">
            <BarChart2 className="w-4 h-4" />
            View Analytics
          </Link>
        </Button>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, title, value, change, color = "text-primary" }: {
  icon: React.ReactNode;
  title: string;
  value: number;
  change: string;
  color?: string;
}) {
  return (
    <Card className="p-6 flex flex-col items-start">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${color}/10`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-5 h-5 ${color}` })}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm text-muted-foreground">{change}</p>
    </Card>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/projects/${project.id}`} className="font-semibold hover:underline">
              {project.name}
            </Link>
            {!project.isPublic && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                Private
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <span className={`w-3 h-3 rounded-full ${
                project.language === 'Solidity' ? 'bg-purple-500' :
                project.language === 'Rust' ? 'bg-orange-500' :
                project.language === 'TypeScript' ? 'bg-blue-500' :
                project.language === 'Cairo' ? 'bg-green-500' : 'bg-gray-500'
              }`}></span>
              {project.language}
            </span>
            <span className="text-muted-foreground">{project.chain}</span>
            <span className="text-muted-foreground">Updated {project.lastUpdated}</span>
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>
      
      <div className="flex gap-4 mt-4 pt-4 border-t">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4" />
          <span>{project.stars}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <GitFork className="w-4 h-4" />
          <span>{project.forks}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span>{project.watchers}</span>
        </div>
      </div>
    </Card>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: 'active' | 'development' | 'planning' }) {
  const statusClasses = {
    active: 'bg-green-500/10 text-green-500',
    development: 'bg-yellow-500/10 text-yellow-500',
    planning: 'bg-gray-500/10 text-gray-500'
  };

  const statusLabels = {
    active: 'Live',
    development: 'In Development',
    planning: 'Planning'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}