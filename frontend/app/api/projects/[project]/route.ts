// app/api/projects/[project]/route.ts

import { NextResponse } from 'next/server'
import { ProjectDetails, ProjectFile, Commit, Contributor } from '@/types'

export const dynamic = 'force-dynamic' // Ensure dynamic route handling

export async function GET(
  request: Request,
  { params }: { params: { project: string } }
) {
  try {
    // Validate project ID
    if (!isValidProjectId(params.project)) {
      return NextResponse.json(
        { error: 'Invalid project identifier format' },
        { status: 400 }
      )
    }

    // Generate realistic mock data
    const mockProject = await generateMockProjectData(params.project)

    return NextResponse.json(mockProject)

  } catch (error) {
    console.error('[ProjectAPI] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Validation helper
function isValidProjectId(id: string): boolean {
  return /^[a-z0-9-]+$/.test(id) && id.length >= 3 && id.length <= 64
}

// Type guard for Contributor role
function isValidContributorRole(role: string): role is Contributor['role'] {
  return ['admin', 'developer', 'auditor'].includes(role)
}

// Mock data generator with realistic values
async function generateMockProjectData(projectId: string): Promise<ProjectDetails> {
  // Simulate network/database delay
  await simulateDelay(300, 800)

  const now = new Date()
  const projectName = formatProjectName(projectId)

  const files: ProjectFile[] = [
    createReadmeFile(projectName),
    createDirectory('contracts'),
    createSolidityFile('Greeter.sol', '/contracts'),
    createDirectory('tests'),
    createTestFile('Greeter.test.js', '/tests'),
    createConfigFile('hardhat.config.js')
  ]

  const commits: Commit[] = [
    createCommit('Initial project setup', now),
    createCommit('Add Greeter contract', new Date(now.getTime() - 86400000)),
    createCommit('Configure Hardhat', new Date(now.getTime() - 172800000))
  ]

  // Generate contributors with proper type safety
  const contributors: Contributor[] = [
    {
      wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      role: 'admin'
    },
    {
      wallet: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
      role: 'developer'
    },
    
    ...(Math.random() > 0.5 ? [{
      wallet: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
      role: 'auditor' as 'admin' | 'developer' | 'auditor', // Type assertion
    }] : [])
  ]

  return {
    id: `proj_${generateId()}`,
    name: projectName,
    description: `A decentralized ${projectName} application built on DevChainHub`,
    isPrivate: Math.random() > 0.7,
    chain: getRandomChain(),
    repoUrl: `https://devchainhub.com/${projectId}.git`,
    contractAddress: generateEthAddress(),
    testnetUrl: `https://testnet.devchainhub.com/${projectId}`,
    explorerUrl: `https://explorer.devchainhub.com/address/${generateEthAddress()}`,
    lastDeployment: now.toISOString(),
    contributors,
    branches: ['main', 'develop', 'feat/auth'],
    forks: Math.floor(Math.random() * 20),
    stars: Math.floor(Math.random() * 100),
    license: getRandomLicense(),
    defaultBranch: 'main',
    commits,
    files
  }
}

// Helper functions for mock data generation
function formatProjectName(id: string): string {
  return id.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10)
}

function generateEthAddress(): string {
  return `0x${Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 16).toString(16)).join('')}`
}

function simulateDelay(min: number, max: number): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}

function getRandomChain(): string {
  const chains = ['ethereum', 'polygon', 'arbitrum', 'optimism', 'avalanche']
  return chains[Math.floor(Math.random() * chains.length)]
}

function getRandomLicense(): string {
  const licenses = ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'Unlicense']
  return licenses[Math.floor(Math.random() * licenses.length)]
}

function createReadmeFile(projectName: string): ProjectFile {
  return {
    name: 'README.md',
    type: 'file',
    path: '/README.md',
    content: `# ${projectName}\n\n` +
      '## Project Description\n\n' +
      `This is a decentralized ${projectName} application built on DevChainHub.\n\n` +
      '## Getting Started\n\n' +
      '```bash\nnpm install\nnpm run dev\n```\n\n' +
      '## Smart Contracts\n\n' +
      '- Greeter.sol: Simple greeting contract\n' +
      '- Token.sol: ERC20 implementation\n',
    size: 2048,
    lastModified: new Date().toISOString()
  }
}

function createDirectory(name: string): ProjectFile {
  return {
    name,
    type: 'directory',
    path: `/${name.toLowerCase()}`,
    size: 0,
    lastModified: new Date().toISOString()
  }
}

function createSolidityFile(name: string, path: string): ProjectFile {
  return {
    name,
    type: 'file',
    path: `${path}/${name}`,
    content: `// SPDX-License-Identifier: MIT\n` +
      `pragma solidity ^0.8.0;\n\n` +
      `contract ${name.split('.')[0]} {\n` +
      `    string private greeting = "Hello, DevChain!";\n\n` +
      `    function greet() public view returns (string memory) {\n` +
      `        return greeting;\n` +
      `    }\n\n` +
      `    function setGreeting(string memory _greeting) public {\n` +
      `        greeting = _greeting;\n` +
      `    }\n` +
      `}`,
    size: 1024,
    lastModified: new Date().toISOString()
  }
}

function createTestFile(name: string, path: string): ProjectFile {
  return {
    name,
    type: 'file',
    path: `${path}/${name}`,
    content: `const { expect } = require('chai');\n\n` +
      `describe('Greeter', function () {\n` +
      `  it("Should return the new greeting once it's changed", async function () {\n` +
      `    const Greeter = await ethers.getContractFactory("Greeter");\n` +
      `    const greeter = await Greeter.deploy("Hello, world!");\n\n` +
      `    expect(await greeter.greet()).to.equal("Hello, world!");\n\n` +
      `    await greeter.setGreeting("Hola, mundo!");\n` +
      `    expect(await greeter.greet()).to.equal("Hola, mundo!");\n` +
      `  });\n` +
      `});`,
    size: 768,
    lastModified: new Date().toISOString()
  }
}

function createConfigFile(name: string): ProjectFile {
  return {
    name,
    type: 'file',
    path: `/${name}`,
    content: `require('@nomicfoundation/hardhat-toolbox');\n\n` +
      `module.exports = {\n` +
      `  solidity: "0.8.19",\n` +
      `  networks: {\n` +
      `    devchain: {\n` +
      `      url: "https://rpc.devchainhub.com",\n` +
      `      accounts: [process.env.PRIVATE_KEY]\n` +
      `    }\n` +
      `  }\n` +
      `};`,
    size: 512,
    lastModified: new Date().toISOString()
  }
}

function createCommit(message: string, date: Date): Commit {
  return {
    sha: Math.random().toString(36).substring(2, 10),
    author: {
      name: ['dev-user', 'blockchain-dev', 'smart-contract-engineer'][Math.floor(Math.random() * 3)],
      email: `${Math.random().toString(36).substring(2, 7)}@devchainhub.com`,
      date: date.toISOString()
    },
    message
  }
}
