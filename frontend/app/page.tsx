import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GitBranch, Star, Users, Code, Shield, Rocket, Layers, Database, Cpu, Zap, Globe, Lock, Server } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                The Next Generation of Blockchain Development
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Build, collaborate, and deploy blockchain projects with enhanced
                features and superior developer experience. Our platform supports
                multiple chains with enterprise-grade security and AI-powered tools.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" className="gap-2">
                <Rocket className="w-4 h-4" />
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Code className="w-4 h-4" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Features for Web3 Developers
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
              Everything you need to build, test, and deploy decentralized applications
              across multiple blockchain networks.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <GitBranch className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold mb-2">Smart Contract Management</h3>
              <p className="text-muted-foreground">
                Advanced version control specifically designed for blockchain
                development with built-in security analysis and multi-chain deployment.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold mb-2">
                Decentralized Collaboration
              </h3>
              <p className="text-muted-foreground">
                Work together seamlessly with integrated Web3 features,
                token-based contribution rewards, and DAO governance tools.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Star className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold mb-2">AI-Powered Development</h3>
              <p className="text-muted-foreground">
                Enhanced code review, smart suggestions, and automated security
                checks powered by artificial intelligence and machine learning.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Supported Technologies
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
              We support all major blockchain networks and development frameworks
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "Ethereum", icon: <Layers className="w-8 h-8" /> },
              { name: "Polygon", icon: <Database className="w-8 h-8" /> },
              { name: "Solana", icon: <Zap className="w-8 h-8" /> },
              { name: "Polkadot", icon: <Globe className="w-8 h-8" /> },
              { name: "Cosmos", icon: <Cpu className="w-8 h-8" /> },
              { name: "Avalanche", icon: <Server className="w-8 h-8" /> },
              { name: "BNB Chain", icon: <Shield className="w-8 h-8" /> },
              { name: "Arbitrum", icon: <Lock className="w-8 h-8" /> },
            ].map((tech) => (
              <Card key={tech.name} className="p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
                <div className="text-primary mb-2">{tech.icon}</div>
                <h3 className="font-semibold">{tech.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by Blockchain Teams
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
              Join thousands of developers building the future of decentralized applications
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Reduced our deployment time by 70% with their multi-chain tools.",
                author: "Sarah K., Lead Developer at Web3Corp"
              },
              {
                quote: "The AI security audits caught vulnerabilities we missed in three separate audits.",
                author: "Mark T., CTO at DeFi Solutions"
              },
              {
                quote: "Game-changing collaboration features for our distributed team across 12 countries.",
                author: "Lena P., Project Manager at DAO Collective"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <blockquote className="space-y-4">
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  <footer className="text-sm font-medium">{testimonial.author}</footer>
                </blockquote>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Ready to Transform Your Blockchain Development?
            </h2>
            <div className="space-x-4">
              <Button size="lg" className="gap-2">
                <Rocket className="w-4 h-4" />
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Users className="w-4 h-4" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full border-t bg-background py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">BlockDev Platform</h3>
              <p className="text-muted-foreground">
                The complete solution for blockchain development and deployment.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">Releases</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} BlockDev Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}