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
import { ChevronRight, Edit, Book, Code, FileText, Play, Terminal, Wallet, Package, Cpu, Shield, TestTube2 } from 'lucide-react';
import { CodeEditor } from '@/components/CodeEditor';
import { Web3Demo } from '@/components/Web3Demo';
import { Abi } from 'abitype';

const mockDocs = {
  sidebar: [
    {
      title: 'Getting Started',
      items: ['Introduction', 'Quick Start', 'Installation', 'Configuration'],
      icon: <Play className="h-4 w-4 mr-2" />
    },
    {
      title: 'Smart Contracts',
      items: ['Solidity Basics', 'Contract Structure', 'Data Types', 'Functions', 'Events', 'Security Best Practices', 'Testing'],
      icon: <Terminal className="h-4 w-4 mr-2" />
    },
    {
      title: 'Web3 Integration',
      items: ['Wallet Connection', 'Transaction Handling', 'Event Listening', 'Error Handling', 'API Reference'],
      icon: <Wallet className="h-4 w-4 mr-2" />
    },
  ],
  versions: ['v1.0.0', 'v0.9.0', 'v0.8.0'],
};

// Solidity Examples
const contractExamples = {
  basic: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicContract {
    // State variable
    string public message = "Hello, World!";
    
    // Function to update message
    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}`,

  dataTypes: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataTypes {
    // Primitive types
    bool public isReady = true;
    uint256 public count = 100;
    int256 public temperature = -10;
    address public owner = msg.sender;
    bytes32 public dataHash = keccak256(abi.encodePacked("data"));
    
    // Complex types
    string public name = "Ethereum";
    bytes public rawData = hex"00112233";
    
    // Fixed-size array
    uint[3] public fixedArray = [1, 2, 3];
    
    // Dynamic array
    uint[] public dynamicArray;
    
    // Struct
    struct User {
        string name;
        uint age;
    }
    User public currentUser;
    
    // Mapping
    mapping(address => uint) public balances;
    
    // Enum
    enum State { Created, Active, Inactive }
    State public currentState = State.Created;
}`,

  functions: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FunctionExamples {
    uint256 public value;
    
    // Pure function (no state access)
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
    
    // View function (read-only)
    function getValue() public view returns (uint256) {
        return value;
    }
    
    // Payable function
    function deposit() public payable {
        value += msg.value;
    }
    
    // Function with modifiers
    modifier onlyPositive(uint256 _value) {
        require(_value > 0, "Value must be positive");
        _;
    }
    
    function setValue(uint256 _value) public onlyPositive(_value) {
        value = _value;
    }
    
    // Function with events
    event ValueUpdated(uint256 newValue);
    
    function updateValue(uint256 _newValue) public {
        value = _newValue;
        emit ValueUpdated(_newValue);
    }
}`,

  security: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecurityExamples {
    address public owner;
    uint256 public balance;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    // Reentrancy protection
    bool private locked;
    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }
    
    function withdraw() public noReentrant {
        payable(msg.sender).transfer(balance);
        balance = 0;
    }
    
    // Input validation
    function safeTransfer(address _to, uint256 _amount) public {
        require(_to != address(0), "Invalid address");
        require(_amount > 0 && _amount <= balance, "Invalid amount");
        // Transfer logic
    }
}`,

  testing: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@forge-std/Test.sol";

contract CounterTest is Test {
    Counter public counter;
    
    function setUp() public {
        counter = new Counter();
    }
    
    function testIncrement() public {
        counter.increment();
        assertEq(counter.count(), 1);
    }
    
    function testFailDecrement() public {
        counter.decrement();
    }
    
    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.getNumber(), x);
    }
}`,

  simpleStorage: `// SPDX-License-Identifier: MIT
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
}`
};

// Web3 Interaction Examples
const web3Examples = {
  walletConnection: `import { ethers } from 'ethers';

// Detect if Ethereum provider is available
if (typeof window.ethereum !== 'undefined') {
  // Create provider
  const provider = new ethers.BrowserProvider(window.ethereum);
  
  // Request account access
  async function connectWallet() {
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("Connected account:", accounts[0]);
      
      // Get signer
      const signer = await provider.getSigner();
      return signer;
    } catch (error) {
      console.error("User denied account access", error);
    }
  }
  
  connectWallet();
} else {
  console.error("MetaMask not detected!");
}`,

  transactionHandling: `import { ethers } from 'ethers';

async function sendTransaction() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  // Transaction parameters
  const tx = {
    to: "0xRecipientAddress",
    value: ethers.parseEther("1.0"), // 1 ETH
    gasLimit: 21000
  };
  
  try {
    // Send transaction
    const transaction = await signer.sendTransaction(tx);
    console.log("Transaction sent:", transaction.hash);
    
    // Wait for confirmation
    const receipt = await transaction.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
}`,

  eventListening: `import { ethers } from 'ethers';

// Connect to contract
const provider = new ethers.BrowserProvider(window.ethereum);
const contract = new ethers.Contract(
  "0xContractAddress",
  contractABI,
  provider
);

// Listen for events
contract.on("ValueChanged", (newValue, event) => {
  console.log("Value changed to:", newValue.toString());
  console.log("Event details:", event);
});

// To stop listening
function stopListening() {
  contract.off("ValueChanged");
}`,

  errorHandling: `import { ethers } from 'ethers';

async function interactWithContract() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(address, abi, provider);
    
    // Call view function
    const result = await contract.getBalance();
    console.log("Balance:", result.toString());
    
    // Send transaction
    const tx = await contract.setValue(42);
    await tx.wait();
    
  } catch (error) {
    console.error("Error details:");
    
    // Handle specific error cases
    if (error.code === 'ACTION_REJECTED') {
      console.error("User rejected transaction");
    } else if (error.info?.error?.data?.message) {
      console.error("Contract revert reason:", error.info.error.data.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}`
};

// API Reference Data
const apiReference = {
  provider: [
    {
      name: 'getBlockNumber',
      description: 'Returns the current block number',
      example: `const blockNumber = await provider.getBlockNumber();`
    },
    {
      name: 'getBalance',
      description: 'Returns the balance of an address',
      example: `const balance = await provider.getBalance("0x...");`
    }
  ],
  contract: [
    {
      name: 'callStatic',
      description: 'Simulate a contract call without sending a transaction',
      example: `const result = await contract.callStatic.myFunction();`
    },
    {
      name: 'estimateGas',
      description: 'Estimate gas for a transaction',
      example: `const gasEstimate = await contract.estimateGas.myFunction(arg1, arg2);`
    }
  ],
  utilities: [
    {
      name: 'ethers.encodeFunctionData',
      description: 'Encodes function call data',
      example: `const data = ethers.encodeFunctionData("myFunction", [arg1, arg2]);`
    },
    {
      name: 'ethers.parseEther',
      description: 'Converts ETH string to wei',
      example: `const wei = ethers.parseEther("1.0"); // 1 ETH in wei`
    }
  ]
};

// ABI Definitions
const contractABIs: Record<string, Abi> = {
  simpleStorage: [
    {
      name: 'setValue',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [{ name: '_value', type: 'uint256' }],
      outputs: []
    },
    {
      name: 'getValue',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'uint256' }]
    },
    {
      name: 'ValueChanged',
      type: 'event',
      inputs: [{ name: 'newValue', type: 'uint256', indexed: false }]
    }
  ],
  token: [
    {
      name: 'transfer',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: [{ name: '', type: 'bool' }]
    },
    {
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }]
    }
  ]
};

export default function DocsPage() {
  const [selectedVersion, setSelectedVersion] = useState(mockDocs.versions[0]);
  const [activeTab, setActiveTab] = useState('docs');
  const [activeSidebarItem, setActiveSidebarItem] = useState('Introduction');

  const renderContent = () => {
    switch (activeSidebarItem) {
      case 'Installation':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Installation</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Using npm</h3>
              <CodeEditor 
                code={`npm install @web3-react/core @web3-react/injected-connector ethers`}
                language="bash"
                height="60px"
              />
              
              <h3 className="text-xl font-semibold">Using yarn</h3>
              <CodeEditor 
                code={`yarn add @web3-react/core @web3-react/injected-connector ethers`}
                language="bash"
                height="60px"
              />
              
              <h3 className="text-xl font-semibold">Basic Setup</h3>
              <CodeEditor 
                code={`import { initializeConnector } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const [connector, hooks] = initializeConnector(
  (actions) => new InjectedConnector({ actions })
);`}
                language="javascript"
                height="160px"
              />
            </div>
          </div>
        );
      
      case 'Solidity Basics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Solidity Basics</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contract Structure</h3>
              <CodeEditor 
                code={contractExamples.basic}
                language="solidity"
                height="300px"
              />
              
              <h3 className="text-xl font-semibold">Data Types</h3>
              <CodeEditor 
                code={contractExamples.dataTypes}
                language="solidity"
                height="500px"
              />
            </div>
          </div>
        );
      
      case 'Functions':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Functions</h2>
            <div className="space-y-4">
              <CodeEditor 
                code={contractExamples.functions}
                language="solidity"
                height="600px"
              />
            </div>
          </div>
        );
      
      case 'Security Best Practices':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Security Best Practices</h2>
            <div className="space-y-4">
              <CodeEditor 
                code={contractExamples.security}
                language="solidity"
                height="500px"
              />
              <div className="prose dark:prose-invert">
                <h4>Key Security Considerations:</h4>
                <ul>
                  <li>Always use the latest stable compiler version</li>
                  <li>Implement proper access control (like onlyOwner)</li>
                  <li>Protect against reentrancy attacks</li>
                  <li>Validate all external inputs</li>
                  <li>Use SafeMath or built-in checked arithmetic (Solidity 0.8+)</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'Testing':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Testing Smart Contracts</h2>
            <div className="space-y-4">
              <CodeEditor 
                code={contractExamples.testing}
                language="solidity"
                height="400px"
              />
              <div className="prose dark:prose-invert">
                <h4>Testing Best Practices:</h4>
                <ul>
                  <li>Test all possible execution paths</li>
                  <li>Include edge cases in your tests</li>
                  <li>Test for failure conditions</li>
                  <li>Use property-based testing when possible</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'Wallet Connection':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Wallet Connection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Web3 Provider Setup</h3>
                <CodeEditor 
                  code={web3Examples.walletConnection}
                  language="javascript"
                  height="300px"
                />
              </div>
              <div className="border rounded-lg p-6 bg-muted/50">
                <h3 className="text-lg font-medium mb-4">Try It Out</h3>
                <Web3Demo 
                  contractName="Wallet Demo"
                  contractAddress="0x0000000000000000000000000000000000000000"
                  abi={[]}
                />
              </div>
            </div>
          </div>
        );
      
      case 'Transaction Handling':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Transaction Handling</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Sending Transactions</h3>
                <CodeEditor 
                  code={web3Examples.transactionHandling}
                  language="javascript"
                  height="300px"
                />
              </div>
              <div className="border rounded-lg p-6 bg-muted/50">
                <h3 className="text-lg font-medium mb-4">Try It Out</h3>
                <Web3Demo 
                  contractName="Transaction Demo"
                  contractAddress="0x0000000000000000000000000000000000000000"
                  abi={[
                    {
                      name: 'transfer',
                      type: 'function',
                      stateMutability: 'payable',
                      inputs: [
                        { name: 'to', type: 'address' },
                        { name: 'amount', type: 'uint256' }
                      ],
                      outputs: []
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        );
      
      case 'API Reference':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">API Reference</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Provider API</h3>
                <div className="space-y-4">
                  {apiReference.provider.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-mono font-bold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <CodeEditor 
                        code={item.example}
                        language="javascript"
                        height="60px"
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Contract API</h3>
                <div className="space-y-4">
                  {apiReference.contract.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-mono font-bold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <CodeEditor 
                        code={item.example}
                        language="javascript"
                        height="60px"
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Utilities</h3>
                <div className="space-y-4">
                  {apiReference.utilities.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-mono font-bold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <CodeEditor 
                        code={item.example}
                        language="javascript"
                        height="60px"
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h2>{activeSidebarItem}</h2>
            <p>
              This is the documentation content for {activeSidebarItem}. 
              The documentation will appear here with proper formatting, 
              examples, and explanations.
            </p>
            
            {activeSidebarItem === 'Introduction' && (
              <div className="space-y-6">
                <h3>Welcome to Web3 Developer Documentation</h3>
                <p>
                  This documentation provides comprehensive guides for blockchain 
                  development, from smart contract basics to advanced Web3 integration.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <h4 className="font-medium flex items-center gap-2">
                      <Terminal className="h-4 w-4" /> Smart Contracts
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Learn Solidity development and security best practices
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <h4 className="font-medium flex items-center gap-2">
                      <Wallet className="h-4 w-4" /> Web3 Integration
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Connect your dApp to blockchain networks
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <h4 className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" /> API Reference
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Complete API documentation for our platform
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4>Getting Started</h4>
                  <ol className="space-y-2">
                    <li>1. Install the required dependencies</li>
                    <li>2. Set up your development environment</li>
                    <li>3. Explore the documentation sections</li>
                    <li>4. Try the interactive examples</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

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
                <h3 className="px-4 text-sm font-medium mb-2 flex items-center">
                  {section.icon}
                  {section.title}
                </h3>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <Button
                        variant={activeSidebarItem === item ? "secondary" : "ghost"}
                        className="w-full justify-start px-4 py-2 text-sm"
                        onClick={() => setActiveSidebarItem(item)}
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
            <div>
              <h1 className="text-3xl font-bold">Documentation</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {selectedVersion} • {activeSidebarItem}
              </p>
            </div>
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
              {renderContent()}
            </TabsContent>

            <TabsContent value="api" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">API Reference</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Provider API</h3>
                    <div className="space-y-4">
                      {apiReference.provider.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-mono font-bold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <CodeEditor 
                            code={item.example}
                            language="javascript"
                            height="60px"
                            className="mt-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Contract API</h3>
                    <div className="space-y-4">
                      {apiReference.contract.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-mono font-bold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <CodeEditor 
                            code={item.example}
                            language="javascript"
                            height="60px"
                            className="mt-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Utilities</h3>
                    <div className="space-y-4">
                      {apiReference.utilities.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-mono font-bold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <CodeEditor 
                            code={item.example}
                            language="javascript"
                            height="60px"
                            className="mt-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Tutorials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <h3 className="text-xl font-semibold mb-2">Building Your First dApp</h3>
                    <p className="text-muted-foreground mb-4">
                      Step-by-step guide to creating a decentralized application
                    </p>
                    <Button variant="outline" className="w-full">
                      Start Tutorial
                    </Button>
                  </div>
                  <div className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <h3 className="text-xl font-semibold mb-2">Deploying Smart Contracts</h3>
                    <p className="text-muted-foreground mb-4">
                      Learn how to deploy contracts to various networks
                    </p>
                    <Button variant="outline" className="w-full">
                      Start Tutorial
                    </Button>
                  </div>
                  <div className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <h3 className="text-xl font-semibold mb-2">Testing Strategies</h3>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive guide to testing smart contracts
                    </p>
                    <Button variant="outline" className="w-full">
                      Start Tutorial
                    </Button>
                  </div>
                  <div className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <h3 className="text-xl font-semibold mb-2">Advanced Web3 Patterns</h3>
                    <p className="text-muted-foreground mb-4">
                      Learn advanced integration techniques
                    </p>
                    <Button variant="outline" className="w-full">
                      Start Tutorial
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}