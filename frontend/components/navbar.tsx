'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Sun,
  Moon,
  Github,
  GitBranch,
  BookOpen,
  Settings,
} from 'lucide-react';
import { WalletConnect } from '@/components/wallet-connect';

export function Navbar() {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GitBranch className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              DevChainHub
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/explore"
              className="transition-colors hover:text-foreground/80"
            >
              Explore
            </Link>
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground/80"
            >
              Docs
            </Link>
            <Link
              href="/marketplace"
              className="transition-colors hover:text-foreground/80"
            >
              Marketplace
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="w-full max-w-xl flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search repositories..."
              className="h-9 md:w-[300px] lg:w-[400px]"
            />
            <Button size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <WalletConnect />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}