// app/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Code, Wallet, Smartphone, Database } from 'lucide-react';

interface Project {
  name: string;
  chain: string;
  status: 'active' | 'development' | 'planning';
}

export default async function Dashboard() {
  const authResult = await auth() as { userId: string | null };
  const { userId } = authResult;

  if (!userId) {
    redirect('/sign-in');
  }

  const userProjects: Project[] = [
    { name: 'NFT Marketplace', chain: 'Ethereum', status: 'active' },
    { name: 'DeFi Protocol', chain: 'Polygon', status: 'development' },
    { name: 'DAO Governance', chain: 'Arbitrum', status: 'planning' }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userProjects.map((project, index) => (
          <Link key={index} href={`/dashboard/${project.name}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Button asChild className="gap-2">
          <Link href="/dashboard/new">
            <Code className="w-4 h-4" />
            New Project
          </Link>
        </Button>
        <Button variant="outline" className="gap-2">
          <Database className="w-4 h-4" />
          Connect Database
        </Button>
        <Button variant="outline" className="gap-2">
          <Wallet className="w-4 h-4" />
          Add Wallet
        </Button>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-secondary">
          <Smartphone className="w-5 h-5" />
        </div>
        <h3 className="font-semibold">{project.name}</h3>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{project.chain}</span>
        <StatusBadge status={project.status} />
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const statusClasses = {
    active: 'bg-green-500/10 text-green-500',
    development: 'bg-yellow-500/10 text-yellow-500',
    planning: 'bg-gray-500/10 text-gray-500'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}>
      {status}
    </span>
  );
}