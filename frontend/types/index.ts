// Core types for your project
export interface Contributor {
    wallet: string
    role: 'admin' | 'developer' | 'auditor'
  }
  
  export interface Commit {
    sha: string
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  
  export interface ProjectFile {
    name: string
    type: 'file' | 'directory'
    path: string
    content?: string
    size: number
    lastModified: string
  }
  
  export interface ProjectDetails {
    id: string
    name: string
    description: string
    isPrivate: boolean
    chain: string
    repoUrl: string
    contractAddress?: string
    testnetUrl: string
    explorerUrl: string
    lastDeployment?: string
    contributors?: Contributor[]
    branches?: string[]
    forks?: number
    stars?: number
    license?: string
    files?: ProjectFile[]
    commits?: Commit[]
    defaultBranch?: string
  }
  
  // Optional: Global type extensions
  declare global {
    // Add global type extensions if needed
  }