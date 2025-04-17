'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Moon, GitBranch } from 'lucide-react'; // Removed Sun icon
import { WalletConnect } from '@/components/wallet-connect';
import {
  SignUpButton,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export function Navbar() {
  const { setTheme } = useTheme();

  // Force dark mode on mount
  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Left - Logo & Navigation */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <GitBranch className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">DevChainHub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/explore" className="hover:text-foreground/80 transition-colors">
              Explore
            </Link>
            <Link href="/docs" className="hover:text-foreground/80 transition-colors">
              Docs
            </Link>
            <Link href="/marketplace" className="hover:text-foreground/80 transition-colors">
              Marketplace
            </Link>
          </nav>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex items-center space-x-2 max-w-xl w-full">
          <Input
            type="search"
            placeholder="Search repositories..."
            className="h-9 md:w-[300px] lg:w-[400px] bg-muted text-foreground"
          />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Right - Auth Controls */}
        <div className="flex items-center space-x-2">
          <WalletConnect />

          <SignedIn>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white"
              >
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button 
                variant="default" 
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          {/* Removed Theme Toggle - Only show Moon icon */}
          <Button variant="ghost" size="icon" disabled>
            <Moon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}