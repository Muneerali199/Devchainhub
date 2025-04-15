'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Loader2, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { ethers } from 'ethers';
import { AbiFunction } from 'abitype';
import { formatEther } from 'viem';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Define a compatible ABI type that matches ethers.js expectations
type CompatibleAbi = Array<{
  type: string;
  name?: string;
  inputs?: Array<{
    name: string;
    type: string;
    internalType?: string;
  }>;
  outputs?: Array<{
    name: string;
    type: string;
    internalType?: string;
  }>;
  stateMutability?: string;
  anonymous?: boolean;
}>;

interface Web3DemoProps {
  contractName: string;
  contractAddress: string;
  abi: AbiFunction[];
  className?: string;
  chainId?: number;
}

export function Web3Demo({ 
  contractName, 
  contractAddress,
  abi,
  className,
  chainId = 1
}: Web3DemoProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('methods');
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [callResult, setCallResult] = useState<any>(null);
  const [eventLogs, setEventLogs] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [network, setNetwork] = useState<{name: string, id: number} | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [userAddress, setUserAddress] = useState<string>('');

  // Initialize provider and check network
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const init = async () => {
        try {
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(browserProvider);

          // Check network
          const network = await browserProvider.getNetwork();
          setNetwork({
            name: network.name,
            id: Number(network.chainId)
          });

          // Handle network changes
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

          // Handle account changes
          window.ethereum.on('accountsChanged', (accounts: string[]) => {
            if (accounts.length > 0 && isConnected) {
              setUserAddress(accounts[0]);
              updateBalance(accounts[0]);
            } else {
              handleDisconnect();
            }
          });
        } catch (error) {
          console.error("Initialization error:", error);
        }
      };
      init();
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('chainChanged');
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, [isConnected]);

  const updateBalance = async (address: string) => {
    if (!provider) return;
    const balance = await provider.getBalance(address);
    setBalance(formatEther(balance));
  };

  const handleConnect = async () => {
    if (!provider) {
      toast({
        title: 'Provider Not Found',
        description: 'Please install MetaMask or another Ethereum wallet',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Check if we need to switch networks
      if (chainId && network?.id !== chainId) {
        await switchNetwork(chainId);
      }

      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setSigner(signer);
      setUserAddress(accounts[0]);
      
      // Convert the ABI to a format compatible with ethers.js
      const compatibleAbi: CompatibleAbi = abi.map(item => ({
        ...item,
        // Ensure any numeric values are converted to strings
        gas: item.gas?.toString()
      }));
      
      const contract = new ethers.Contract(
        contractAddress,
        compatibleAbi as ethers.InterfaceAbi,
        signer
      );
      setContract(contract);
      
      await updateBalance(accounts[0]);
      
      setIsConnected(true);
      toast({
        title: 'Wallet Connected',
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
      
      // Setup event listeners
      setupEventListeners(contract);
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Connection Failed',
        description: error.reason || error.message || 'Could not connect to wallet',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSigner(null);
    setContract(null);
    setUserAddress('');
    setBalance('0');
    setEventLogs([]);
    toast({
      title: 'Wallet Disconnected',
      description: 'You have been disconnected',
    });
  };

  const switchNetwork = async (chainId: number) => {
    if (!provider) return;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      const network = await provider.getNetwork();
      setNetwork({
        name: network.name,
        id: Number(network.chainId)
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        toast({
          title: 'Network Not Found',
          description: 'Please add the network to your wallet',
          variant: 'destructive',
        });
      }
      throw error;
    }
  };

  const setupEventListeners = (contract: ethers.Contract) => {
    abi
      .filter(item => item.type === 'event')
      .forEach(event => {
        contract.on(event.name, (...args: any[]) => {
          const eventString = `${event.name}(${args.map(arg => {
            try {
              return JSON.stringify(arg);
            } catch {
              return arg.toString();
            }
          }).join(', ')})`;
          
          setEventLogs(prev => [eventString, ...prev.slice(0, 9)]);
        });
      });
  };

  const handleMethodCall = async (method: AbiFunction) => {
    if (!contract || !isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const args = method.inputs?.map(input => {
        const value = inputValues[`${method.name}_${input.name}`];
        return convertInput(input.type, value);
      }) || [];

      let result;
      if (method.stateMutability === 'view' || method.stateMutability === 'pure') {
        result = await contract[method.name](...args);
      } else {
        const tx = await contract[method.name](...args);
        result = { hash: tx.hash };
        const receipt = await tx.wait();
        result.receipt = {
          blockNumber: receipt.blockNumber,
          status: receipt.status === 1 ? 'success' : 'failed'
        };
      }

      setCallResult(result);
      toast({
        title: 'Success',
        description: `${method.name} executed successfully`,
      });
    } catch (error: any) {
      console.error(error);
      let errorMessage = error.reason || error.message || 'Transaction failed';
      
      // Parse common revert reasons
      if (error.info?.error?.data?.message) {
        errorMessage = error.info.error.data.message;
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const convertInput = (type: string, value: string) => {
    if (!value) return undefined;
    
    try {
      if (type.includes('int')) {
        return BigInt(value);
      }
      if (type === 'bool') {
        return value.toLowerCase() === 'true';
      }
      if (type.includes('bytes')) {
        return ethers.getBytes(value);
      }
      if (type === 'address') {
        return ethers.getAddress(value);
      }
      return value;
    } catch (error) {
      console.error(`Error converting ${value} to ${type}:`, error);
      return value;
    }
  };

  const handleInputChange = (methodName: string, inputName: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [`${methodName}_${inputName}`]: value,
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: 'Text copied to clipboard',
    });
  };

  const viewOnExplorer = () => {
    if (!network) return;
    const explorers: Record<number, string> = {
      1: 'https://etherscan.io',
      5: 'https://goerli.etherscan.io',
      10: 'https://optimistic.etherscan.io',
      56: 'https://bscscan.com',
      137: 'https://polygonscan.com',
      42161: 'https://arbiscan.io',
      43114: 'https://snowtrace.io',
      80001: 'https://mumbai.polygonscan.com',
      11155111: 'https://sepolia.etherscan.io',
    };
    const baseUrl = explorers[network.id] || 'https://etherscan.io';
    window.open(`${baseUrl}/address/${contractAddress}`, '_blank');
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <div className="p-4 bg-muted/50 border-b flex justify-between items-center">
        <div>
          <h3 className="font-medium">{contractName}</h3>
          <p className="text-sm text-muted-foreground">
            {isConnected ? (
              network ? (
                <>
                  Connected to {network.name} (Chain ID: {network.id})<br />
                  {userAddress && (
                    <span className="text-xs">
                      {userAddress.slice(0, 6)}...{userAddress.slice(-4)} | Balance: {parseFloat(balance).toFixed(4)} ETH
                    </span>
                  )}
                </>
              ) : 'Connected'
            ) : 'Connect wallet to interact'}
          </p>
        </div>
        <div className="flex gap-2">
          {isConnected && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDisconnect}
              disabled={isLoading}
            >
              Disconnect
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={viewOnExplorer}
            className="gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            View
          </Button>
        </div>
      </div>

      {!isConnected ? (
        <div className="p-6 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-center">
            Connect your wallet to interact with the contract
          </p>
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect Wallet'
            )}
          </Button>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
          <TabsList>
            <TabsTrigger value="methods">Methods</TabsTrigger>
            {abi.some(item => item.type === 'event') && (
              <TabsTrigger value="events">Events</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="methods" className="mt-4 space-y-4">
            {abi
              .filter(item => item.type === 'function')
              .map(method => (
                <Collapsible key={method.name} className="border rounded-lg">
                  <CollapsibleTrigger className="w-full p-3 flex justify-between items-center">
                    <span className="font-medium">{method.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {method.stateMutability}
                      </span>
                      <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 space-y-4">
                    {method.inputs?.map(input => (
                      <div key={`${method.name}_${input.name}`} className="grid gap-2">
                        <Label htmlFor={`${method.name}_${input.name}`}>
                          {input.name} ({input.type})
                        </Label>
                        <Input
                          id={`${method.name}_${input.name}`}
                          placeholder={`Enter ${input.type} value`}
                          value={inputValues[`${method.name}_${input.name}`] || ''}
                          onChange={e => handleInputChange(method.name, input.name, e.target.value)}
                        />
                      </div>
                    ))}

                    <Button
                      onClick={() => handleMethodCall(method)}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Executing...
                        </>
                      ) : (
                        method.stateMutability === 'view' || method.stateMutability === 'pure' 
                          ? 'Call' 
                          : 'Send Transaction'
                      )}
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              ))}

            {callResult && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Result:</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(JSON.stringify(callResult, null, 2))}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="text-sm overflow-auto max-h-60">
                  {JSON.stringify(callResult, null, 2)}
                </pre>
              </div>
            )}
          </TabsContent>

          {abi.some(item => item.type === 'event') && (
            <TabsContent value="events" className="mt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Event Logs</h4>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(eventLogs.join('\n\n'))}
                      disabled={eventLogs.length === 0}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy All
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEventLogs([])}
                      disabled={eventLogs.length === 0}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
                {eventLogs.length > 0 ? (
                  <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
                    {eventLogs.map((log, i) => (
                      <div key={i} className="p-3 text-sm font-mono">
                        {log}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No events emitted yet. Interact with the contract to see events.
                  </p>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
}