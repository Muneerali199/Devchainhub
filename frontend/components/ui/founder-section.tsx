'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

interface Founder {
  name: string;
  role: string;
  image: string;
  bio: string;
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const founders: Founder[] = [
  {
    name: "Alex Chen",
    role: "CEO & Blockchain Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    bio: "Former Ethereum Foundation researcher with 8+ years in blockchain development.",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Sarah Williams",
    role: "CTO & Security Expert",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    bio: "Security researcher and smart contract auditor with background in cryptography.",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Michael Park",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    bio: "Product leader with experience scaling Web3 platforms from zero to millions of users.",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  }
];

export function FounderSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black to-zinc-900/50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            Meet Our Founders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-zinc-400"
          >
            Visionaries building the future of blockchain development
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-800/30 to-zinc-900/30 p-6 border border-zinc-800 backdrop-blur-sm">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-purple-500/20">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{founder.name}</h3>
                  <p className="text-purple-400 font-medium mb-4">{founder.role}</p>
                  <p className="text-zinc-400 mb-6">{founder.bio}</p>
                  
                  <div className="flex justify-center space-x-4">
                    {founder.links.github && (
                      <Link 
                        href={founder.links.github}
                        className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                      >
                        <Github className="w-5 h-5 text-zinc-400 hover:text-white" />
                      </Link>
                    )}
                    {founder.links.linkedin && (
                      <Link 
                        href={founder.links.linkedin}
                        className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-zinc-400 hover:text-white" />
                      </Link>
                    )}
                    {founder.links.twitter && (
                      <Link 
                        href={founder.links.twitter}
                        className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                      >
                        <Twitter className="w-5 h-5 text-zinc-400 hover:text-white" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}