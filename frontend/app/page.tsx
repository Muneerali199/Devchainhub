import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GitBranch, Star, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                The Next Generation of Blockchain Development
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Build, collaborate, and deploy blockchain projects with enhanced
                features and superior developer experience.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="p-6">
              <GitBranch className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-bold mb-2">Smart Contract Management</h3>
              <p className="text-muted-foreground">
                Advanced version control specifically designed for blockchain
                development with built-in security analysis.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-bold mb-2">
                Decentralized Collaboration
              </h3>
              <p className="text-muted-foreground">
                Work together seamlessly with integrated Web3 features and
                token-based contribution rewards.
              </p>
            </Card>
            <Card className="p-6">
              <Star className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-bold mb-2">AI-Powered Development</h3>
              <p className="text-muted-foreground">
                Enhanced code review, smart suggestions, and automated security
                checks powered by artificial intelligence.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}