
'use client';
import { Vortex } from '@/components/ui/vortex';
import { Button } from '@/components/ui/button';
import { Code, Rocket, Sparkles, FileCode, Network, ShieldCheck, Layers, Database, Zap, Globe, Cpu, Mail, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { ThreeDCardDemo } from '@/components/ui/3d-card';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { GlowingStarsBackgroundCard } from '@/components/ui/glowing-stars';
import { Meteors } from '@/components/ui/meteors';
import { ThreeDTabs } from '@/components/ui/3d-tabs';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { GlobeConfig, Position } from '@/components/ui/globe';

// Dynamically import World component with SSR disabled
const World = dynamic(() => import('@/components/ui/globe').then((mod) => mod.World), {
  ssr: false,
});

// TypeScript Interfaces
interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  stars: number;
}

interface FAQItem {
  question: string;
  answer: string;
}

// Data
const products: Product[] = [
  {
    title: 'Smart Contract Studio',
    link: '/products/smart-contract-studio',
    thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Multi-Chain Deployer',
    link: '/products/multi-chain-deployer',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'AI Security Auditor',
    link: '/products/ai-security-auditor',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Team Collaboration Hub',
    link: '/products/team-collaboration-hub',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Real-Time Analytics',
    link: '/products/real-time-analytics',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Token Management',
    link: '/products/token-management',
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Governance Toolkit',
    link: '/products/governance-toolkit',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'DevOps Pipeline',
    link: '/products/devops-pipeline',
    thumbnail: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Web3 API Gateway',
    link: '/products/web3-api-gateway',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'NFT Utilities',
    link: '/products/nft-utilities',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Decentralized Identity',
    link: '/products/decentralized-identity',
    thumbnail: 'https://images.pexels.com/photos/7710717/pexels-photo-7710717.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Cross-Chain Bridge',
    link: '/products/cross-chain-bridge',
    thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const testimonials: Testimonial[] = [
  {
    quote: 'Reduced our deployment time by 70% with their multi-chain tools. The interface is incredibly intuitive yet powerful.',
    name: 'Sarah K.',
    title: 'Lead Developer at Web3Corp',
    stars: 5,
  },
  {
    quote: 'The AI security audits caught vulnerabilities we missed in three separate manual audits. This platform pays for itself in risk mitigation alone.',
    name: 'Mark T.',
    title: 'CTO at DeFi Solutions',
    stars: 5,
  },
  {
    quote: 'Game-changing collaboration features for our distributed team across 12 countries. The version control designed for blockchain is revolutionary.',
    name: 'Lena P.',
    title: 'Project Manager at DAO Collective',
    stars: 5,
  },
];

const words = [
  { text: 'Build' },
  { text: 'secure' },
  { text: 'blockchain' },
  { text: 'applications' },
  { text: 'with' },
  { text: 'DevChainHub.', className: 'text-purple-500' },
];

const globeData: Position[] = [
  {
    order: 1,
    startLat: 40.7128, // New York
    startLng: -74.0060,
    endLat: 1.3521, // Singapore
    endLng: 103.8198,
    arcAlt: 0.2,
    color: '#EC4899',
  },
  {
    order: 2,
    startLat: 25.2048, // Dubai
    startLng: 55.2708,
    endLat: 51.5074, // London
    endLng: -0.1278,
    arcAlt: 0.3,
    color: '#A855F7',
  },
  {
    order: 3,
    startLat: -33.8688, // Sydney
    startLng: 151.2093,
    endLat: 35.6762, // Tokyo
    endLng: 139.6503,
    arcAlt: 0.25,
    color: '#D946EF',
  },
];

const globeConfig: GlobeConfig = {
  pointSize: 1,
  globeColor: '#6B21A8',
  showAtmosphere: true,
  atmosphereColor: '#ffffff',
  atmosphereAltitude: 0.1,
  emissive: '#000000',
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: 'rgba(255,255,255,0.7)',
  ambientLight: '#ffffff',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 1,
};

// ProductShowcase Component
const ProductShowcase = ({ products }: { products: Product[] }) => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black to-zinc-900/50 relative overflow-hidden">
      <Meteors number={15} />
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-12">
          Our Products
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-zinc-300 mb-16">
          Explore our suite of tools designed to empower Web3 developers and teams.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900/30 backdrop-blur-lg shadow-xl transition-transform duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="relative h-48 w-full transition-transform duration-300 group-hover:-translate-z-2"
                style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                <Link
                  href={product.link}
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                  aria-label={`Learn more about ${product.title}`}
                >
                  Learn More
                </Link>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-xl pointer-events-none transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// GlobeSection Component
const GlobeSection = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black to-zinc-900/50 relative overflow-hidden">
      <Meteors number={20} />
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-12">
          Global Web3 Connectivity
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-zinc-300 mb-16">
          Connect and deploy across the globe with our multi-chain infrastructure, powering decentralized applications worldwide.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[600px] max-w-4xl mx-auto rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900/30 backdrop-blur-lg shadow-2xl shadow-purple-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
          <World globeConfig={globeConfig} data={globeData} />
          <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-purple-500/50 rounded-xl transition-all duration-300" />
        </motion.div>
      </div>
    </section>
  );
};

// ThreeDTabsWithSkeleton Component
const ThreeDTabsWithSkeleton = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full isolate" style={{ perspective: '2500px', minHeight: '700px', zIndex: 30 }}>
      {isLoading ? (
        <div className="w-full max-w-7xl mx-auto p-6">
          <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-lg">
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
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {Array.from({ length: 3 }).map((_, i) => (
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
            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-lg shadow-2xl shadow-purple-500/10">
              <div className="flex border-b border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-900/30 p-3">
                <div className="flex items-center pl-4">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-6 py-3 text-sm font-medium text-zinc-300 border-b-2 border-purple-500">
                    SmartContract.sol
                  </div>
                </div>
                <div className="pr-4 pt-3">
                  <div className="h-3 w-3" />
                </div>
              </div>
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

// Pricing Component
const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0/mo',
      features: [
        'Access to basic tools',
        '1 project',
        'Community support',
        '5 blockchains',
      ],
    },
    {
      name: 'Pro',
      price: 'Contact Sales',
      features: [
        'All Free features',
        'Unlimited projects',
        'Priority support',
        '15 blockchains',
        'AI security audits',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'All Pro features',
        'Dedicated support',
        'Custom integrations',
        '25+ blockchains',
        'White-labeling',
      ],
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-zinc-900/50 to-black relative overflow-hidden">
      <Meteors number={15} />
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-12">
          Pricing Plans
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-zinc-300 mb-16">
          Choose the plan that best fits your Web3 development needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-xl border ${plan.highlighted ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-pink-900/20' : 'border-zinc-800 bg-zinc-900/50'} backdrop-blur-lg p-6`}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-zinc-300">
                    <svg className="h-5 w-5 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${plan.highlighted ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-zinc-800 text-zinc-300'} rounded-full py-3 font-semibold`}
                aria-label={`Get started with ${plan.name} plan`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs: FAQItem[] = [
    {
      question: 'What blockchains does DevChainHub support?',
      answer: 'We support over 25 blockchains, including Ethereum, Polygon, Solana, Polkadot, Cosmos, Avalanche, BNB Chain, and Arbitrum.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, our Free plan includes access to basic tools and 5 blockchains, perfect for getting started with no cost.',
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Absolutely! You can upgrade from Free to Pro or Enterprise at any time to access more features and support.',
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'Free plan users get community support, Pro users get priority support, and Enterprise users receive dedicated support with SLAs.',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-black to-zinc-900/50 relative overflow-hidden">
      <Meteors number={15} />
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4 group rounded-xl border border-zinc-700 bg-zinc-900/30 backdrop-blur-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left text-white hover:bg-zinc-800/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                onMouseEnter={() => setOpenIndex(openIndex === null ? index : openIndex)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-purple-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 text-zinc-300 bg-gradient-to-b from-zinc-900/50 to-zinc-900/30"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Home Component
export default function Home() {
  const router = useRouter();

  const handleDocsClick = () => {
    router.push('/docs');
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Head>
        <title>DevChainHub - Web3 Development Platform</title>
        <meta name="description" content="DevChainHub is the complete platform for building, testing, and deploying decentralized applications across multiple blockchain networks." />
        <meta property="og:title" content="DevChainHub - Web3 Development Platform" />
        <meta property="og:description" content="Build secure blockchain applications with DevChainHub's suite of tools for smart contracts, multi-chain deployment, and more." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1200&auto=format&fit=crop" />
        <meta property="og:url" content="https://www.devchainhub.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button
                    size="lg"
                    className="relative group overflow-hidden rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                    aria-label="Start building for free"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 transition-transform group-hover:scale-[1.05]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2 text-white">
                      <Rocket className="w-5 h-5 group-hover:animate-pulse" />
                      Start Building Free
                    </div>
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button
                  size="lg"
                  className="relative group overflow-hidden rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                  onClick={() => router.push('/dashboard')}
                  aria-label="Go to dashboard"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 transition-transform group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-2 text-white">
                    <Rocket className="w-5 h-5 group-hover:animate-pulse" />
                    Go to Dashboard
                  </div>
                </Button>
              </SignedIn>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-white border-zinc-600 hover:bg-zinc-900/50 rounded-full px-8 py-6 text-lg font-semibold backdrop-blur-sm"
                onClick={handleDocsClick}
                aria-label="View documentation"
              >
                <Code className="w-5 h-5" />
                Documentation
              </Button>
            </motion.div>
          </div>
        </Vortex>
      </div>
      <section className="relative w-full py-32 bg-gradient-to-b from-black via-zinc-900/30 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&blur=50')] bg-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
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
      <GlobeSection />
      <ProductShowcase products={products} />
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
      <section className="w-full py-20 bg-zinc-900/50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
            Supported Technologies
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[
              { name: 'Ethereum', icon: <Layers className="w-8 h-8" />, color: 'purple' },
              { name: 'Polygon', icon: <Database className="w-8 h-8" />, color: 'pink' },
              { name: 'Solana', icon: <Zap className="w-8 h-8" />, color: 'green' },
              { name: 'Polkadot', icon: <Globe className="w-8 h-8" />, color: 'blue' },
              { name: 'Cosmos', icon: <Cpu className="w-8 h-8" />, color: 'orange' },
            ].map((tech, index) => (
              <GlowingStarsBackgroundCard key={index} color={tech.color as any}>
                <div className="p-6 flex flex-col items-center">
                  <div className={`text-${tech.color}-500 mb-4`}>{tech.icon}</div>
                  <h3 className="font-semibold text-white">{tech.name}</h3>
                </div>
              </GlowingStarsBackgroundCard>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
            Trusted by Leading Web3 Teams
          </h2>
          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
        </div>
      </section>
      <Pricing />
      <FAQ />
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
      <section className="w-full py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&blur=3')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Ready to Transform Your Web3 Development?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
                  aria-label="Start free trial"
                >
                  <Rocket className="w-5 h-5" />
                  Start Free Trial
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
                onClick={() => router.push('/dashboard')}
                aria-label="Go to dashboard"
              >
                <Rocket className="w-5 h-5" />
                Go to Dashboard
              </Button>
            </SignedIn>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-white border-zinc-600 hover:bg-zinc-900/50 rounded-full px-8 py-6 text-lg font-semibold"
              onClick={handleDocsClick}
              aria-label="View documentation"
            >
              <Code className="w-5 h-5" />
              View Documentation
            </Button>
          </div>
        </div>
      </section>
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
              <div className="flex items-center space-x-4 mb-4">
                <Mail className="h-5 w-5 text-zinc-400" />
                <p className="text-zinc-400">Subscribe to our newsletter</p>
              </div>
              <div className="flex space-x-4">
                <Link href="https://github.com/devchainhub" className="text-zinc-400 hover:text-white transition-colors" aria-label="GitHub">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="https://x.com/devchainhub" className="text-zinc-400 hover:text-white transition-colors" aria-label="X">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link href="https://linkedin.com/company/devchainhub" className="text-zinc-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/products" className="text-zinc-400 hover:text-white transition-colors" aria-label="Explore products">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="text-zinc-400 hover:text-white transition-colors" aria-label="Marketplace">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-zinc-400 hover:text-white transition-colors" aria-label="Integrations">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-zinc-400 hover:text-white transition-colors" aria-label="Changelog">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/docs" className="text-zinc-400 hover:text-white transition-colors" aria-label="Documentation">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-zinc-400 hover:text-white transition-colors" aria-label="Guides">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors" aria-label="Blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/webinars" className="text-zinc-400 hover:text-white transition-colors" aria-label="Webinars">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-zinc-400 hover:text-white transition-colors" aria-label="About">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-zinc-400 hover:text-white transition-colors" aria-label="Careers">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-zinc-400 hover:text-white transition-colors" aria-label="Press">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors" aria-label="Contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-400 text-sm">
            © {new Date().getFullYear()} DevChainHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
