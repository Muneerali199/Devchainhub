// frontend/app/dashboard/[project]/config/hardhat/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { HardHat } from 'lucide-react'

export default function HardhatConfigPage() {
  const { project } = useParams();
const projectName = Array.isArray(project) ? project[0] : project;

// Ensure projectName is defined before using replace
const displayName = projectName ? projectName.replace(/-/g, ' ') : 'Unnamed Project';


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Hardhat Configuration for {displayName}</h1>
      <div className="bg-muted p-4 rounded-md mb-6">
        <pre className="text-sm overflow-x-auto">
          {`// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    devchain: {
      url: "https://rpc.devchainhub.com",
      accounts: [process.env.PRIVATE_KEY]
    },
    testnet: {
      url: "https://testnet.devchainhub.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [{
      network: "devchain",
      chainId: 1337,
      urls: {
        apiURL: "https://api.devchainhub.com/api",
        browserURL: "https://explorer.devchainhub.com"
      }
    }]
  }
};`}
        </pre>
      </div>
      <div className="flex gap-4">
        <Button>
          <HardHat className="w-4 h-4 mr-2" />
          Download Config
        </Button>
        <Button variant="outline">
          Copy to Clipboard
        </Button>
      </div>
    </div>
  )
}