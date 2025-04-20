'use client';
import { Vortex } from '@/components/ui/vortex';
import { Button } from '@/components/ui/button';
import { Code, Rocket, Sparkles, Wallet, FileCode, Network, ShieldCheck, Layers, Database, Zap, Globe, Cpu } from 'lucide-react';
import Link from 'next/link';
import { ThreeDCardDemo } from '@/components/ui/3d-card';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { GlowingStarsBackgroundCard } from '@/components/ui/glowing-stars';
import { Meteors } from '@/components/ui/meteors';
import { ThreeDTabs } from '@/components/ui/3d-tabs';
import { FounderSection } from '@/components/ui/founder-section';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const products = [
  { 
    title: "Smart Contract Studio", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop" 
  },
  { 
    title: "Multi-Chain Deployer", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop" 
  },
  { 
    title: "AI Security Auditor", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1639762681053-c47ac3c51309?q=80&w=2232&auto=format&fit=crop" 
  },
  { 
    title: "Team Collaboration Hub", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2232&auto=format&fit=crop" 
  },
  { 
    title: "Real-Time Analytics", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2232&auto=format&fit=crop" 
  },
  { 
    title: "Token Management", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1639762681032-6df246860ca0?q=80&w=2232&auto=format&fit=crop" 
  },
  { 
    title: "Governance Toolkit", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop" 
  },
  { 
    title: "DevOps Pipeline", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2232&auto=format&fit=crop" 
  },
  { 
    title: "Web3 API Gateway", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop" 
  },
  { 
    title: "NFT Utilities", 
    link: "#", 
    thumbnail: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=2232&auto=format&fit=crop" 
  },
];

const testimonials = [
  {
    quote: "Reduced our deployment time by 70% with their multi-chain tools. The interface is incredibly intuitive yet powerful.",
    name: "Sarah K.",
    title: "Lead Developer at Web3Corp",
    stars: 5
  },
  {
    quote: "The AI security audits caught vulnerabilities we missed in three separate manual audits. This platform pays for itself in risk mitigation alone.",
    name: "Mark T.",
    title: "CTO at DeFi Solutions",
    stars: 5
  },
  {
    quote: "Game-changing collaboration features for our distributed team across 12 countries. The version control designed for blockchain is revolutionary.",
    name: "Lena P.",
    title: "Project Manager at DAO Collective",
    stars: 5
  }
];

const words = [
  { text: "Build" },
  { text: "secure" },
  { text: "blockchain" },
  { text: "applications" },
  { text: "with" },
  { text: "DevChainHub.", className: "text-purple-500" },
];

const SmartContractStudioCard = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 shadow-2xl"
      >
        {/* Glowing background elements */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl"></div>
        
        <div className="relative z-10">
          {/* Card Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-start space-x-4 mb-6 md:mb-0">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                <Network className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Smart Contract Studio
                </h3>
                <p className="text-lg text-zinc-400 mt-1">Multi-Chain Deployment Suite</p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-5 text-md font-semibold">
                <Rocket className="w-5 h-5" />
                <span>Launch Studio</span>
              </Button>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-80 w-full rounded-xl overflow-hidden border border-zinc-800">
              <Image
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Blockchain Network Visualization"
                fill
                className="object-cover"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-transparent" />
              
              {/* Animated network nodes */}
              <div className="absolute top-1/4 left-1/4 h-4 w-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/30 animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 h-4 w-4 rounded-full bg-pink-500 shadow-lg shadow-pink-500/30 animate-pulse delay-100"></div>
              <div className="absolute bottom-1/4 left-1/2 h-4 w-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30 animate-pulse delay-200"></div>
              <div className="absolute top-1/2 right-1/3 h-4 w-4 rounded-full bg-green-500 shadow-lg shadow-green-500/30 animate-pulse delay-300"></div>
            </div>

            {/* Features Section */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                <ul className="space-y-4">
                  {[
                    { icon: <FileCode className="h-5 w-5 text-purple-400" />, text: "One-click multi-chain deployments" },
                    { icon: <ShieldCheck className="h-5 w-5 text-blue-400" />, text: "Real-time contract verification" },
                    { icon: <Zap className="h-5 w-5 text-yellow-400" />, text: "Gas optimization tools" },
                    { icon: <Globe className="h-5 w-5 text-green-400" />, text: "Network health monitoring" },
                    { icon: <Code className="h-5 w-5 text-pink-400" />, text: "Automated testing suite" }
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3">
                        {feature.icon}
                      </div>
                      <p className="text-zinc-300">{feature.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supported Chains */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Supported Blockchains</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Ethereum", color: "bg-purple-500/10 text-purple-400" },
                    { name: "Polygon", color: "bg-pink-500/10 text-pink-400" },
                    { name: "Solana", color: "bg-green-500/10 text-green-400" },
                    { name: "Polkadot", color: "bg-blue-500/10 text-blue-400" },
                    { name: "Cosmos", color: "bg-orange-500/10 text-orange-400" },
                    { name: "Avalanche", color: "bg-red-500/10 text-red-400" },
                    { name: "BNB Chain", color: "bg-yellow-500/10 text-yellow-400" },
                    { name: "Arbitrum", color: "bg-cyan-500/10 text-cyan-400" }
                  ].map((chain, index) => (
                    <span key={index} className={`px-3 py-1 rounded-full text-sm ${chain.color}`}>
                      {chain.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ThreeDTabsWithSkeleton = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full isolate" style={{ perspective: "2500px", minHeight: "700px", zIndex: 30 }}>
      {isLoading ? (
        <div className="w-full max-w-7xl mx-auto p-6">
          <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-lg">
            {/* Skeleton for tab bar */}
            <div className="flex border-b border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-900/30 p-3">
              <div className="flex items-center pl-1">
                <Skeleton className="h-3 w-3 rounded-full mr-2" />
                <Skeleton className="h-3 w-3 rounded-full mr-2" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
              <div className="flex-1 flex justify-center">
                <Skeleton className="h-8 w-48 rounded-md" />
              </div>
              <div className="pr-1">
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
            </div>
            
            {/* Skeleton for tab content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-80 w-full rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto h-full pt-16 pb-32 px-4">
          <div className="relative w-full">
            {/* Glass morphism container */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-lg shadow-2xl shadow-purple-500/10">
              {/* Tab bar */}
              <div className="flex border-b border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-900/30">
                <div className="flex items-center pl-4 pt-3">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-6 py-3 text-sm font-medium text-zinc-300 border-b-2 border-purple-500">
                    SmartContract.sol
                  </div>
                </div>
                <div className="pr-4 pt-3">
                  <div className="h-3 w-3"></div>
                </div>
              </div>
              
              
              {/* The 3D tabs component */}
              <div className="p-6">
                <ThreeDTabs 
                  containerClassName="bg-zinc-900/50"
                  tabClassName="bg-zinc-800 hover:bg-zinc-700/50 data-[state=active]:bg-zinc-700/80 data-[state=active]:border-purple-500/30 transition-all duration-300"
                  activeTabClassName="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border-purple-500/50 shadow-lg shadow-purple-500/20"
                  titleClassName="text-zinc-200 group-hover:text-white"
                  descriptionClassName="text-zinc-400 group-hover:text-zinc-300"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section with Enhanced Typography */}
      <div className="relative h-[100vh] overflow-visible">
        <Vortex
          backgroundColor="black"
          particleCount={500}
          baseHue={260}
          className="flex items-center justify-center px-4 md:px-6 overflow-visible"
        >
          <div className="max-w-7xl mx-auto text-center relative z-10 pt-20 overflow-visible">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <Sparkles className="h-16 w-16 text-purple-500 animate-pulse" />
                <div className="absolute -inset-2 bg-purple-500/20 blur-xl rounded-full" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-3xl" />
              <TypewriterEffectSmooth words={words} className="mb-8" />
              <p className="relative max-w-3xl mx-auto text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-400 mb-12">
                The complete platform for building, testing, and deploying decentralized applications across multiple blockchain networks.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button 
                size="lg" 
                className="relative group overflow-hidden rounded-full px-8 py-6 text-lg font-semibold"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-transform group-hover:scale-[1.02]" />
                <div className="relative flex items-center gap-2 text-white">
                  <Rocket className="w-5 h-5" />
                  Start Building Free
                </div>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 text-white border-zinc-600 hover:bg-zinc-900/50 rounded-full px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                <Wallet className="w-5 h-5" />
                Live Demo
              </Button>
            </motion.div>
          </div>
        </Vortex>
      </div>

      {/* 3D Tabs Section with Beautiful Background */}
      <section className="relative w-full py-32 bg-gradient-to-b from-black via-zinc-900/30 to-black overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&blur=50')] bg-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        
        {/* Glowing elements */}
        <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-32 right-1/4 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <ThreeDTabsWithSkeleton />
          </motion.div>
        </div>
      </section>

      {/* Smart Contract Studio Section */}
      <section className="w-full py-20 bg-gradient-to-b from-zinc-900/50 to-black relative overflow-hidden">
        <Meteors number={15} />
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-12">
            Smart Contract Studio
          </h2>
          <p className="max-w-3xl mx-auto text-center text-lg text-zinc-300 mb-16">
            Deploy, manage, and optimize your smart contracts across multiple blockchains with our powerful studio.
          </p>
          <SmartContractStudioCard />
        </div>
      </section>

      {/* Product Showcase */}
      <div className="py-20 bg-black">
        <HeroParallax products={products} />
      </div>

      {/* Features Section */}
      <section className="w-full py-20 bg-gradient-to-b from-black to-zinc-900/50 relative overflow-hidden">
        <Meteors number={20} />
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-12">
            Enterprise-Grade Web3 Tooling
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ThreeDCardDemo 
              icon={<FileCode className="h-10 w-10 text-purple-500" />}
              title="Smart Contract Management"
              description="Advanced version control with built-in security analysis and multi-chain deployment."
            />
            <ThreeDCardDemo 
              icon={<Network className="h-10 w-10 text-pink-500" />}
              title="Multi-Chain Deployment"
              description="Deploy to multiple networks simultaneously with advanced orchestration tools."
            />
            <ThreeDCardDemo 
              icon={<ShieldCheck className="h-10 w-10 text-blue-500" />}
              title="AI Security Audits"
              description="Automated vulnerability detection with our proprietary AI technology."
            />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="w-full py-20 bg-zinc-900/50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
            Supported Technologies
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[
              { name: "Ethereum", icon: <Layers className="w-8 h-8" />, color: "purple" },
              { name: "Polygon", icon: <Database className="w-8 h-8" />, color: "pink" },
              { name: "Solana", icon: <Zap className="w-8 h-8" />, color: "green" },
              { name: "Polkadot", icon: <Globe className="w-8 h-8" />, color: "blue" },
              { name: "Cosmos", icon: <Cpu className="w-8 h-8" />, color: "orange" },
            ].map((tech, index) => (
              <GlowingStarsBackgroundCard key={index} color={tech.color as any}>
                <div className="p-6 flex flex-col items-center">
                  <div className={`text-${tech.color}-500 mb-4`}>
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-white">{tech.name}</h3>
                </div>
              </GlowingStarsBackgroundCard>
            ))}
          </div>
        </div>
      </section>

      {/* Add Founder Section */}
      <FounderSection />

      {/* Testimonials */}
      <section className="w-full py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
            Trusted by Leading Web3 Teams
          </h2>
          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-gradient-to-b from-zinc-900/50 to-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">50K+</div>
              <div className="text-zinc-300">Developers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">12K+</div>
              <div className="text-zinc-300">Projects</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">$4.2B+</div>
              <div className="text-zinc-300">Value Secured</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">25+</div>
              <div className="text-zinc-300">Blockchains</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&blur=3')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Ready to Transform Your Web3 Development?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 text-lg font-semibold">
              <Rocket className="w-5 h-5" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="gap-2 text-white border-zinc-600 hover:bg-zinc-900/50 rounded-full px-8 py-6 text-lg font-semibold">
              <Code className="w-5 h-5" />
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800 bg-black/50 backdrop-blur-lg py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-purple-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">DevChainHub</span>
              </div>
              <p className="text-zinc-300 mb-6">
                The complete platform for blockchain development and deployment.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0-2.917-.01-3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Webinars</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} DevChainHub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Cookies</Link>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}