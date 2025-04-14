'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, Edit, Book, Code, FileText } from 'lucide-react';

const mockDocs = {
  sidebar: [
    {
      title: 'Getting Started',
      items: ['Introduction', 'Quick Start', 'Installation'],
    },
    {
      title: 'Smart Contracts',
      items: ['Solidity Basics', 'Security Best Practices', 'Testing'],
    },
    {
      title: 'Web3 Integration',
      items: ['Wallet Connection', 'Transaction Handling', 'Event Listening'],
    },
  ],
  versions: ['v1.0.0', 'v0.9.0', 'v0.8.0'],
};

const codeExample = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;
    
    event ValueChanged(uint256 newValue);
    
    function setValue(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }
    
    function getValue() public view returns (uint256) {
        return value;
    }
}`;

export default function DocsPage() {
  const [selectedVersion, setSelectedVersion] = useState(mockDocs.versions[0]);
  const [activeTab, setActiveTab] = useState('docs');

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 hidden md:block">
        <ScrollArea className="h-full py-6">
          <div className="px-4 mb-4">
            <Select value={selectedVersion} onValueChange={setSelectedVersion}>
              <SelectTrigger>
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {mockDocs.versions.map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <nav>
            {mockDocs.sidebar.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="px-4 text-sm font-medium mb-2">{section.title}</h3>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 text-sm"
                      >
                        <ChevronRight className="h-4 w-4 mr-2" />
                        {item}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Documentation</h1>
            <Button variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit this page
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="docs" className="gap-2">
                <Book className="h-4 w-4" />
                Docs
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-2">
                <Code className="h-4 w-4" />
                API Reference
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="gap-2">
                <FileText className="h-4 w-4" />
                Tutorials
              </TabsTrigger>
            </TabsList>

            <TabsContent value="docs" className="mt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Getting Started with Smart Contracts</h2>
                <p>
                  Learn how to create, deploy, and interact with smart contracts
                  using Solidity and Web3.js/ethers.js.
                </p>
                
                <h3>Code Example</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="api">
              <div className="prose dark:prose-invert max-w-none">
                <h2>API Reference</h2>
                <p>
                  Comprehensive API documentation for smart contract interaction
                  and blockchain integration.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="tutorials">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Tutorials</h2>
                <p>
                  Step-by-step guides for building decentralized applications
                  and working with blockchain technology.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}