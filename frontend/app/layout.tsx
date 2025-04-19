import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from './providers'
import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevChainHub - Web3 Development Platform',
  description: 'The next generation platform for blockchain development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <TooltipProvider delayDuration={300} skipDelayDuration={100}>
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
              </div>
              <Toaster />
            </TooltipProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}