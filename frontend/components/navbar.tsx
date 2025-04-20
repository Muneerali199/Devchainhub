'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { WalletConnect } from '@/components/wallet-connect';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { Moon, Menu, X, Sparkles } from 'lucide-react';

// Logo with only Sparkles
const SparklesLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <Sparkles className="h-9 w-9 text-purple-500 animate-pulse" />
      <div className="absolute -inset-2 bg-purple-500/20 blur-xl rounded-full" />
    </div>
  );
};

export function Navbar() {
  const navRef = useRef(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { setTheme } = useTheme();

  const navItems = [
    { name: "Explore", link: "/explore" },
    { name: "Docs", link: "/docs" },
    { name: "Marketplace", link: "/marketplace" }
  ];

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 100);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <motion.header
      ref={navRef}
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        y: visible ? 0 : -10,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 50 }}
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/0 transition-all duration-200',
        visible && 'bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60'
      )}
    >
      {/* Desktop Navbar */}
      <motion.div 
        className="container hidden lg:flex h-16 items-center justify-between"
        animate={{
          width: visible ? '90%' : '100%',
          y: visible ? 0 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 50,
        }}
      >
        {/* Logo - Only Sparkles */}
        <Link href="/" className="flex items-center space-x-2 z-20">
          <SparklesLogo className="h-9 w-9" />
          <span className="sr-only">Home</span>
        </Link>

        {/* Nav Items */}
        <div 
          className="absolute inset-0 flex items-center justify-center space-x-2 text-sm font-medium"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {navItems.map((item, idx) => (
            <Link 
              key={`nav-${idx}`}
              href={item.link}
              className="relative px-4 py-2 text-neutral-300 hover:text-neutral-100 transition-colors duration-200"
              onMouseEnter={() => setHoveredItem(idx)}
            >
              {hoveredItem === idx && (
                <motion.div
                  layoutId="hovered-nav"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
              <span className="relative z-20 flex items-center">
                {item.name}
                {hoveredItem === idx && (
                  <motion.span 
                    className="ml-1.5 inline-block"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    ↗
                  </motion.span>
                )}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Items */}
        <div className="flex items-center space-x-4 z-20">
          <WalletConnect />

          <SignedIn>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="relative overflow-hidden group"
            >
              <Link href="/dashboard">
                <span className="relative z-10">Dashboard</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent border-neutral-700 hover:bg-neutral-800/50 text-white hover:text-white relative overflow-hidden group"
              >
                <span className="relative z-10">Sign In</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button 
                variant="default" 
                size="sm"
                className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute right-0 top-0 h-full w-8 bg-white/10 transform skew-x-12 translate-x-12 group-hover:-translate-x-40 transition-transform duration-500 ease-in-out"></span>
              </Button>
            </SignUpButton>
          </SignedOut>

          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-neutral-800/50"
            aria-label="Theme (dark mode)"
          >
            <Moon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </motion.div>

      {/* Mobile Navbar */}
      <motion.div 
        className="container flex lg:hidden h-14 items-center justify-between"
        animate={{
          width: visible ? '90%' : '100%',
          y: visible ? 0 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 50,
        }}
      >
        <Link href="/" className="flex items-center space-x-2">
          <SparklesLogo className="h-8 w-8" />
        </Link>

        <div className="flex items-center space-x-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="flex lg:hidden hover:bg-neutral-800/50" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </motion.div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-neutral-800 overflow-hidden"
          >
            <div className="container py-6 space-y-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, idx) => (
                  <Link
                    key={`mobile-${idx}`}
                    href={item.link}
                    className="px-2 py-3 text-lg font-medium text-neutral-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-neutral-800/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <WalletConnect />
                  
                  <SignedIn>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild 
                      className="w-full justify-center hover:bg-neutral-800/50"
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  </SignedIn>
                  
                  <SignedOut>
                    <div className="flex flex-col space-y-3 w-full">
                      <SignInButton mode="modal">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full bg-transparent border-neutral-700 hover:bg-neutral-800/50 text-white hover:text-white"
                        >
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button 
                          variant="default" 
                          size="sm"
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                        >
                          Get Started
                        </Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}