'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Wallet } from 'lucide-react';
import { RootState } from '@/lib/store';
import {
  setWalletAddress,
  setChainId,
  setConnecting,
  setError,
} from '@/lib/store/slices/walletSlice';

export function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { address, isConnecting } = useSelector(
    (state: RootState) => state.wallet
  );

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      dispatch(setError('Please install MetaMask'));
      return;
    }

    try {
      dispatch(setConnecting(true));
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      dispatch(setWalletAddress(accounts[0]));
      dispatch(setChainId(parseInt(chainId, 16)));
      setIsOpen(false);
    } catch (error) {
      dispatch(setError('Failed to connect wallet'));
    } finally {
      dispatch(setConnecting(false));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to access blockchain features
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}