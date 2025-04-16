import { WavyBackground } from '@/components/ui/wavy-background';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GitBranch, Star, Users, Code, Shield, Rocket, Layers, Database, Cpu, Zap, Globe, Lock, Server, Github } from 'lucide-react';
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <WavyBackground className="min-h-screen w-full">
      <div className="flex flex-col">
        {/* Navigation Bar with Auth */}
    

        {/* Hero Section with Wavy Background */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  The Next Generation of Blockchain Development
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-4">
                  Build, collaborate, and deploy blockchain projects with enhanced
                  features and superior developer experience.
                </p>
              </div>
              <div className="space-x-4">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                      <Rocket className="w-4 h-4" />
                      Get Started
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <Link href="/dashboard">
                      <Rocket className="w-4 h-4" />
                      Go to Dashboard
                    </Link>
                  </Button>
                </SignedIn>
                <Button variant="outline" size="lg" className="gap-2 text-white" asChild>
                  <Link href="/docs">
                    <Code className="w-4 h-4" />
                    View Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Powerful Features for Web3 Developers
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-4">
                Everything you need to build, test, and deploy decentralized applications
                across multiple blockchain networks.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6 hover:shadow-lg transition-shadow bg-zinc-900/80 border-zinc-800">
                <GitBranch className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-lg font-bold mb-2 text-white">Smart Contract Management</h3>
                <p className="text-gray-300">
                  Advanced version control specifically designed for blockchain
                  development with built-in security analysis and multi-chain deployment.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow bg-zinc-900/80 border-zinc-800">
                <Users className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-lg font-bold mb-2 text-white">Decentralized Collaboration</h3>
                <p className="text-gray-300">
                  Work together seamlessly with integrated Web3 features,
                  token-based contribution rewards, and DAO governance tools.
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow bg-zinc-900/80 border-zinc-800">
                <Star className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-lg font-bold mb-2 text-white">AI-Powered Development</h3>
                <p className="text-gray-300">
                  Enhanced code review, smart suggestions, and automated security
                  checks powered by artificial intelligence and machine learning.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Supported Technologies
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-4">
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
                <Card key={tech.name} className="p-6 flex flex-col items-center hover:shadow-lg transition-shadow bg-zinc-900/80 border-zinc-800">
                  <div className="text-purple-500 mb-2">{tech.icon}</div>
                  <h3 className="font-semibold text-white">{tech.name}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Trusted by Blockchain Teams
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-4">
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
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-zinc-900/80 border-zinc-800">
                  <blockquote className="space-y-4">
                    <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                    <footer className="text-sm font-medium text-white">{testimonial.author}</footer>
                  </blockquote>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-white">
                Ready to Transform Your Blockchain Development?
              </h2>
              <div className="space-x-4">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                      <Rocket className="w-4 h-4" />
                      Start Free Trial
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <Link href="/projects/new">
                      <Rocket className="w-4 h-4" />
                      Create New Project
                    </Link>
                  </Button>
                </SignedIn>
                <Button variant="outline" size="lg" className="gap-2 text-white" asChild>
                  <Link href="/contact">
                    <Users className="w-4 h-4" />
                    Schedule Demo
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="gap-2 text-white" asChild>
                  <Link href="https://github.com/Muneerali199/Devchainhub" target="_blank">
                    <Github className="w-4 h-4" />
                    Star on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="w-full border-t border-zinc-800 bg-black/50 backdrop-blur-sm py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">BlockDev Platform</h3>
                <p className="text-gray-300">
                  The complete solution for blockchain development and deployment.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Product</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="/features" className="hover:text-purple-500">Features</Link></li>
                  <li><Link href="/pricing" className="hover:text-purple-500">Pricing</Link></li>
                  <li><Link href="/docs" className="hover:text-purple-500">Documentation</Link></li>
                  <li><Link href="/releases" className="hover:text-purple-500">Releases</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Company</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="/about" className="hover:text-purple-500">About</Link></li>
                  <li><Link href="/blog" className="hover:text-purple-500">Blog</Link></li>
                  <li><Link href="/careers" className="hover:text-purple-500">Careers</Link></li>
                  <li><Link href="/contact" className="hover:text-purple-500">Contact</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Legal</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="/privacy" className="hover:text-purple-500">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-purple-500">Terms</Link></li>
                  <li><Link href="/cookies" className="hover:text-purple-500">Cookie Policy</Link></li>
                  <li><Link href="/gdpr" className="hover:text-purple-500">GDPR</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-300 text-sm">
              <p>© {new Date().getFullYear()} DevChainHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </WavyBackground>
  );
}