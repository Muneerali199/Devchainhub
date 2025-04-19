'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Code, Rocket, Shield, Terminal, CheckCircle2 } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export function ThreeDTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  
  const tabs: Tab[] = [
    {
      id: 'smart-contracts',
      label: 'Smart Contracts',
      icon: <Code className="w-4 h-4" />,
      content: (
        <div className="relative h-[500px] w-full overflow-hidden rounded-lg bg-[#0d1117] border border-zinc-800 shadow-2xl transform-style-preserve-3d">
          {/* MacBook Window Chrome */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800 rounded-t-lg flex items-center px-3 z-20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-zinc-400 mx-auto">DevChainToken.sol</div>
          </div>
          
          {/* Editor Content */}
          <div className="absolute inset-0 pt-8 flex">
            {/* Sidebar */}
            <div className="w-12 bg-[#161b22] border-r border-zinc-800 flex flex-col items-center py-4 space-y-4">
              <div className="p-2 rounded-md bg-[#1f6feb] text-white">
                <Code className="w-4 h-4" />
              </div>
              <div className="p-2 rounded-md text-zinc-400 hover:text-white">
                <Rocket className="w-4 h-4" />
              </div>
              <div className="p-2 rounded-md text-zinc-400 hover:text-white">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            
            {/* Code Editor */}
            <div className="flex-1 overflow-auto">
              <div className="h-full flex flex-col">
                {/* File Tabs */}
                <div className="flex bg-[#161b22] border-b border-zinc-800 px-2">
                  <div className="px-3 py-2 text-xs text-white bg-[#0d1117] border-t border-l border-r border-zinc-700 rounded-t-md">
                    DevChainToken.sol
                  </div>
                  <div className="px-3 py-2 text-xs text-zinc-400 hover:text-white">
                    package.json
                  </div>
                </div>
                
                {/* Line Numbers */}
                <div className="flex h-full">
                  <div className="w-10 bg-[#161b22] text-right text-xs text-zinc-500 py-2 pr-2 select-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="h-5 leading-5">{i + 1}</div>
                    ))}
                  </div>
                  
                  {/* Code Content */}
                  <div className="flex-1 font-mono text-sm leading-5 py-2 pl-2 overflow-x-auto">
                    <div className="text-[#8b949e]">// SPDX-License-Identifier: MIT</div>
                    <div><span className="text-[#79c0ff]">pragma solidity</span> <span className="text-[#a5d6ff]">^0.8.0</span>;</div>
                    <div className="h-5"></div>
                    <div><span className="text-[#79c0ff]">contract</span> <span className="text-[#7ee787]">DevChainToken</span> {'{'}</div>
                    <div className="pl-4"><span className="text-[#79c0ff]">string</span> <span className="text-[#79c0ff]">public</span> name = <span className="text-[#a5d6ff]">"DevChain"</span>;</div>
                    <div className="pl-4"><span className="text-[#79c0ff]">string</span> <span className="text-[#79c0ff]">public</span> symbol = <span className="text-[#a5d6ff]">"DCH"</span>;</div>
                    <div className="pl-4"><span className="text-[#79c0ff]">uint8</span> <span className="text-[#79c0ff]">public</span> decimals = <span className="text-[#a5d6ff]">18</span>;</div>
                    <div className="pl-4"><span className="text-[#79c0ff]">uint256</span> <span className="text-[#79c0ff]">public</span> totalSupply;</div>
                    <div className="h-5"></div>
                    <div className="pl-4"><span className="text-[#79c0ff]">mapping</span>(address => uint256) <span className="text-[#79c0ff]">public</span> balanceOf;</div>
                    <div className="h-5"></div>
                    <div className="pl-4"><span className="text-[#79c0ff]">event</span> Transfer({'{'}</div>
                    <div className="pl-8">address <span className="text-[#79c0ff]">indexed</span> from,</div>
                    <div className="pl-8">address <span className="text-[#79c0ff]">indexed</span> to,</div>
                    <div className="pl-8">uint256 value</div>
                    <div className="pl-4">{'}'});</div>
                    <div className="h-5"></div>
                    <div className="pl-4"><span className="text-[#79c0ff]">constructor</span>(uint256 _initialSupply) {'{'}</div>
                    <div className="pl-8">totalSupply = _initialSupply;</div>
                    <div className="pl-8">balanceOf[msg.sender] = _initialSupply;</div>
                    <div className="pl-4">{'}'}</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#161b22] border-t border-zinc-800 flex items-center px-3 text-xs text-zinc-400">
            <div>main</div>
            <div className="ml-auto">Solidity</div>
          </div>
        </div>
      ),
    },
    {
      id: 'deployment',
      label: 'Deployment',
      icon: <Rocket className="w-4 h-4" />,
      content: (
        <div className="relative h-[500px] w-full overflow-hidden rounded-lg bg-[#0d1117] border border-zinc-800 shadow-2xl transform-style-preserve-3d">
          {/* MacBook Window Chrome */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800 rounded-t-lg flex items-center px-3 z-20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-zinc-400 mx-auto">Deployment Console</div>
          </div>
          
          {/* Terminal Content */}
          <div className="absolute inset-0 pt-8 pb-6 flex flex-col">
            <div className="flex-1 p-4 overflow-auto font-mono text-sm">
              <div className="text-green-400">$ devchain deploy --network all</div>
              <div className="text-zinc-400 mt-2">Compiling DevChainToken.sol...</div>
              <div className="text-green-400 mt-2">✔ Compiled successfully</div>
              <div className="text-zinc-400 mt-4">Deploying to networks:</div>
              
              <div className="mt-3 ml-4">
                <div className="flex items-center text-green-400">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  <span>Ethereum Mainnet (0x1234...5678)</span>
                </div>
                <div className="flex items-center text-green-400 mt-2">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  <span>Polygon (0x9876...4321)</span>
                </div>
                <div className="flex items-center text-green-400 mt-2">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  <span>Arbitrum (0xabcd...efgh)</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-green-900/20 border border-green-800 rounded">
                <div className="text-green-400">✔ Deployment successful to all networks</div>
                <div className="text-zinc-400 text-xs mt-1">
                  Contracts verified and ABI exported to /artifacts
                </div>
              </div>
              
              <div className="mt-6 text-zinc-400">
                <div>Gas used:</div>
                <div className="ml-4">- Ethereum: 1,245,678 (0.0124 ETH)</div>
                <div className="ml-4">- Polygon: 845,321 (0.0008 MATIC)</div>
              </div>
            </div>
            
            <div className="border-t border-zinc-800 p-2 bg-[#161b22]">
              <div className="text-xs text-zinc-400 flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Ready</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Shield className="w-4 h-4" />,
      content: (
        <div className="relative h-[500px] w-full overflow-hidden rounded-lg bg-[#0d1117] border border-zinc-800 shadow-2xl transform-style-preserve-3d">
          {/* MacBook Window Chrome */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800 rounded-t-lg flex items-center px-3 z-20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-zinc-400 mx-auto">Security Audit</div>
          </div>
          
          {/* Security Dashboard */}
          <div className="absolute inset-0 pt-8 pb-6 flex flex-col">
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-green-400 font-medium">Security Score: 98/100</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1">No critical vulnerabilities detected</div>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#161b22] border border-zinc-800 rounded">
                  <div className="text-sm text-zinc-200 mb-2">Gas Efficiency</div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[95%] h-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  </div>
                  <div className="text-xs text-green-400 mt-1">95% - Excellent</div>
                </div>
                
                <div className="p-3 bg-[#161b22] border border-zinc-800 rounded">
                  <div className="text-sm text-zinc-200 mb-2">Code Coverage</div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  </div>
                  <div className="text-xs text-blue-400 mt-1">100% - Complete</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-sm text-zinc-200 mb-3">Security Checks:</div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    <span>Reentrancy protection verified</span>
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    <span>Integer overflow checks passed</span>
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    <span>Access control implementation secure</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-[#161b22] border border-zinc-800 rounded">
                <div className="text-sm text-zinc-200 mb-2">Recommendations</div>
                <div className="text-xs text-zinc-400">
                  • Consider adding NatSpec documentation
                  <br />
                  • Implement time-lock for admin functions
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* MacBook Frame */}
      <div className="relative">
        {/* Screen Bezel */}
        <div className="mx-auto w-[95%] h-8 rounded-t-2xl bg-zinc-900 flex items-center justify-center">
          <div className="w-16 h-1 rounded-full bg-zinc-800"></div>
        </div>
        
        {/* Screen Area */}
        <div className="relative mx-auto w-full rounded-b-xl bg-zinc-900 p-4 pt-0 shadow-2xl">
          {/* Screen Content */}
          <div className="overflow-hidden rounded-lg bg-zinc-950">
            {/* Tabs */}
            <div className="flex p-1 bg-[#161b22] border-b border-zinc-800">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  onMouseEnter={() => setHoveredTab(index)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "relative px-4 py-2 text-xs font-medium transition-all duration-200 flex items-center",
                    activeTab === index
                      ? "text-white bg-[#0d1117]"
                      : "text-zinc-400 hover:text-white hover:bg-[#0d1117]/50"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence>
                    {(activeTab === index || hoveredTab === index) && (
                      <motion.span
                        className="absolute inset-0 bg-[#1f6feb]/20 rounded"
                        layoutId="activeTab"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="relative h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {tabs[activeTab].content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* MacBook Base */}
        <div className="mx-auto w-[110%] h-6 rounded-b-2xl bg-zinc-800 mt-[-4px] relative z-[-1]">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 rounded-b-lg bg-zinc-900/70"></div>
        </div>
      </div>
    </div>
  );
}