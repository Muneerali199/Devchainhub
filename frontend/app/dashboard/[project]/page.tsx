'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Copy, Plus, Upload, GitBranch, Shield, Server, 
  Wallet, Smartphone, HardHat, Code, TestTube2,
  Users, GitFork, Settings, Terminal, Lock, Globe,
  FileText, Folder, X, GitCommit, History, Eye, Download,
  ChevronRight, ChevronDown, File, Pencil, Trash2, Save
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ScrollArea } from '@/components/ui/scroll-area'

// ========== TYPES ==========
interface ProjectFile {
  name: string
  type: 'file' | 'directory'
  path: string
  content?: string
  sha?: string
  url?: string
  size?: number
}

interface Commit {
  sha: string
  author: {
    name: string
    email: string
    date: string
  }
  message: string
}

interface ProjectDetails {
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
  contributors?: {
    wallet: string
    role: 'developer' | 'auditor' | 'admin'
  }[]
  branches?: string[]
  forks?: number
  stars?: number
  license?: string
  files?: ProjectFile[]
  commits?: Commit[]
  defaultBranch?: string
}

interface UploadedFile {
  name: string
  path: string
  size: number
  type: string
}

// ========== MAIN COMPONENT ==========
export default function ProjectPage() {
  const { project } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  
  // State management
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('files')
  const [newContributor, setNewContributor] = useState('')
  const [files, setFiles] = useState<ProjectFile[]>([])
  const [currentPath, setCurrentPath] = useState<string>('')
  const [expandedDirs, setExpandedDirs] = useState<Record<string, boolean>>({})
  const [isReadmeOpen, setIsReadmeOpen] = useState(false)
  const [currentReadme, setCurrentReadme] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [commitMessage, setCommitMessage] = useState('')
  const [commits, setCommits] = useState<Commit[]>([])
  const [editingFile, setEditingFile] = useState<ProjectFile | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [currentBranch, setCurrentBranch] = useState('main')

  // ========== API CALLS ==========
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Replace with actual API call
        const response = await fetch(`/api/projects/${project}`)
        const data = await response.json()
        
        setProjectDetails(data)
        setFiles(data.files || [])
        setCommits(data.commits || [])
        setCurrentBranch(data.defaultBranch || 'main')
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load project details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [project, toast])

  // ========== FILE MANAGEMENT ==========
  const toggleDirectory = (path: string) => {
    setExpandedDirs(prev => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const filesToUpload = e.target.files
    if (!filesToUpload || filesToUpload.length === 0) return

    setIsUploading(true)
    
    try {
      const formData = new FormData()
      Array.from(filesToUpload).forEach(file => {
        formData.append('files', file)
      })
      
      const response = await fetch('/api/projects/upload', {
        method: 'POST',
        body: formData
      })
      
      const { files: uploadedFiles } = await response.json()
      setFiles(prev => [...prev, ...uploadedFiles])
      
      toast({
        title: 'Files uploaded',
        description: `${filesToUpload.length} file(s) added to project`,
      })
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your files',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
      if (e.target) e.target.value = ''
    }
  }

  const handleCreateReadme = () => {
    const content = prompt('Enter README content:', '# Project Title\n\nProject description...')
    if (content) {
      const filePath = currentPath ? `${currentPath}/README.md` : '/README.md'
      const newReadme: ProjectFile = {
        name: 'README.md',
        type: 'file',
        path: filePath,
        content: content,
        size: content.length
      }
      
      setFiles(prev => [...prev, newReadme])
      toast({
        title: 'README created',
        description: 'README.md added to project',
      })
    }
  }

  // ========== VERSION CONTROL ==========
  const handleCommit = async () => {
    if (!commitMessage.trim()) {
      toast({
        title: "Error",
        description: "Commit message cannot be empty",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/projects/commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: commitMessage,
          changes: files.filter(f => f.type === 'file')
        })
      })
      
      const { commit } = await response.json()
      setCommits(prev => [commit, ...prev])
      
      toast({
        title: "Changes committed",
        description: `"${commitMessage}"`,
      })
    } catch (error) {
      toast({
        title: "Commit failed",
        description: "Error saving changes",
        variant: "destructive",
      })
    } finally {
      setCommitMessage('')
    }
  }

  // ========== FILE EDITING ==========
  const startEditing = (file: ProjectFile) => {
    setEditingFile(file)
    setFileContent(file.content || '')
  }

  const saveFile = async () => {
    if (!editingFile) return

    try {
      const response = await fetch('/api/projects/files', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: editingFile.path,
          content: fileContent
        })
      })
      
      const { file: updatedFile } = await response.json()
      
      setFiles(prev => prev.map(f => 
        f.path === editingFile.path ? updatedFile : f
      ))
      
      setEditingFile(null)
      toast({
        title: "File saved",
        description: `${editingFile.name} has been updated`,
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Error saving file changes",
        variant: "destructive",
      })
    }
  }

  const deleteFile = async (file: ProjectFile) => {
    if (!confirm(`Are you sure you want to delete ${file.name}?`)) return

    try {
      await fetch('/api/projects/files', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: file.path })
      })
      
      setFiles(prev => prev.filter(f => f.path !== file.path))
      toast({
        title: "File deleted",
        description: `${file.name} has been removed`,
      })
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Error deleting file",
        variant: "destructive",
      })
    }
  }

  // ========== COLLABORATION ==========
  const handleAddContributor = async () => {
    if (!newContributor) return
    
    try {
      const response = await fetch('/api/projects/collaborators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wallet: newContributor,
          role: 'developer' // Default role
        })
      })
      
      const { collaborator } = await response.json()
      
      setProjectDetails(prev => ({
        ...prev!,
        contributors: [...(prev?.contributors || []), collaborator]
      }))
      
      toast({
        title: "Invitation sent",
        description: `Added ${newContributor} as collaborator`,
      })
      setNewContributor('')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add collaborator",
        variant: "destructive",
      })
    }
  }

  // ========== UI HELPERS ==========
  const filteredFiles = files.filter(file => {
    if (!currentPath) return file.path.split('/').length === 2
    return file.path.startsWith(currentPath) && 
           file.path.replace(currentPath, '').split('/').filter(Boolean).length <= 1
  })

  const navigateToPath = (path: string) => {
    setCurrentPath(path)
  }

  const navigateUp = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/')
    setCurrentPath(parentPath || '')
  }

  const viewReadme = (file: ProjectFile) => {
    if (file.content) {
      setCurrentReadme(file.content)
      setIsReadmeOpen(true)
    } else if (file.url) {
      toast({
        title: 'Viewing README',
        description: 'Opening README in new tab',
      })
      window.open(file.url, '_blank')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    })
  }

  // ========== RENDER ==========
  if (loading) {
    return <ProjectSkeleton />
  }

  if (!project) {
    return <div className="p-8 text-center">Project not found</div>
  }

  const projectName = Array.isArray(project) ? project[0] : project
  const displayName = projectName.replace(/-/g, ' ')

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Project Header */}
        <ProjectHeader 
          projectDetails={projectDetails} 
          displayName={displayName}
          copyToClipboard={copyToClipboard}
        />

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="commits">
              <History className="w-4 h-4 mr-2" />
              Commits
            </TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="collaborators">
              <Users className="w-4 h-4 mr-2" />
              Collaborators
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width) */}
          {activeTab === 'overview' && (
            <ProjectOverview 
              project={projectName}
              projectDetails={projectDetails}
              commits={commits}
              copyToClipboard={copyToClipboard}
              navigateTo={router.push}
            />
          )}

          {activeTab === 'files' && (
            <FileExplorer 
              files={filteredFiles}
              currentPath={currentPath}
              isUploading={isUploading}
              editingFile={editingFile}
              fileContent={fileContent}
              setFileContent={setFileContent}
              commitMessage={commitMessage}
              setCommitMessage={setCommitMessage}
              expandedDirs={expandedDirs}
              handleFileUpload={handleFileUpload}
              handleCreateReadme={handleCreateReadme}
              navigateUp={navigateUp}
              navigateToPath={navigateToPath}
              toggleDirectory={toggleDirectory}
              viewReadme={viewReadme}
              copyToClipboard={copyToClipboard}
              startEditing={startEditing}
              saveFile={saveFile}
              deleteFile={deleteFile}
              handleCommit={handleCommit}
            />
          )}

          {activeTab === 'commits' && (
            <CommitHistory 
              commits={commits}
              currentBranch={currentBranch}
            />
          )}

          {/* Right Column (1/3 width) */}
          <ProjectSidebar 
            projectDetails={projectDetails}
            newContributor={newContributor}
            setNewContributor={setNewContributor}
            copyToClipboard={copyToClipboard}
            handleAddContributor={handleAddContributor}
            navigateTo={router.push}
          />
        </div>

        {/* README Viewer Modal */}
        <ReadmeModal 
          isReadmeOpen={isReadmeOpen}
          setIsReadmeOpen={setIsReadmeOpen}
          currentReadme={currentReadme}
          copyToClipboard={copyToClipboard}
        />
      </div>
    </TooltipProvider>
  )
}

// ========== SUBCOMPONENTS ==========
const ProjectSkeleton = () => (
  <div className="max-w-7xl mx-auto p-6 space-y-8">
    <div className="space-y-4">
      <div className="space-y-4">
        <Skeleton className="h-8 w-[300px]" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    </div>
  </div>
)

const ProjectHeader = ({ projectDetails, displayName, copyToClipboard }: {
  projectDetails: ProjectDetails | null
  displayName: string
  copyToClipboard: (text: string) => void
}) => (
  <div className="space-y-4">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold capitalize">{displayName}</h1>
        <p className="text-muted-foreground mt-2">
          {projectDetails?.description || 'Blockchain project repository'}
        </p>
      </div>
      <Button>
        <Code className="w-4 h-4 mr-2" />
        Open in IDE
      </Button>
    </div>

    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant={projectDetails?.isPrivate ? 'destructive' : 'outline'}>
        {projectDetails?.isPrivate ? (
          <Lock className="w-3 h-3 mr-1" />
        ) : (
          <Globe className="w-3 h-3 mr-1" />
        )}
        {projectDetails?.isPrivate ? 'Private' : 'Public'}
      </Badge>
      
      <Badge variant="outline" className="capitalize">
        <img 
          src={`/chains/${projectDetails?.chain}.svg`} 
          alt={projectDetails?.chain} 
          className="w-3 h-3 mr-1"
        />
        {projectDetails?.chain || 'ethereum'}
      </Badge>
      
      {projectDetails?.contractAddress && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="cursor-pointer">
              <Wallet className="w-3 h-3 mr-1" />
              <span 
                onClick={() => copyToClipboard(projectDetails.contractAddress!)}
                className="hover:text-primary"
              >
                {projectDetails.contractAddress.slice(0, 6)}...{projectDetails.contractAddress.slice(-4)}
              </span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to copy contract address</p>
          </TooltipContent>
        </Tooltip>
      )}
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground ml-4">
        <span className="flex items-center gap-1">
          <GitBranch className="w-4 h-4" />
          {projectDetails?.branches?.length || 1} branches
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          {projectDetails?.forks || 0} forks
        </span>
        <span>{projectDetails?.license || 'MIT License'}</span>
      </div>
    </div>
  </div>
)

const ProjectOverview = ({ project, projectDetails, commits, copyToClipboard, navigateTo }: {
  project: string
  projectDetails: ProjectDetails | null
  commits: Commit[]
  copyToClipboard: (text: string) => void
  navigateTo: (path: string) => void
}) => (
  <div className="lg:col-span-2 space-y-6">
    {/* Project Actions Card */}
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Development Quick Start</h2>
        <p className="text-muted-foreground">
          Everything you need to start building on {projectDetails?.chain || 'Ethereum'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button variant="outline" className="h-auto py-3" onClick={() => navigateTo('contract/new')}>
            <div className="text-left">
              <Plus className="w-5 h-5 mb-2 text-primary" />
              <p className="font-medium">New Contract</p>
              <p className="text-xs text-muted-foreground">Create a new smart contract</p>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto py-3" onClick={() => navigateTo('config/hardhat')}>
            <div className="text-left">
              <HardHat className="w-5 h-5 mb-2 text-primary" />
              <p className="font-medium">Hardhat Config</p>
              <p className="text-xs text-muted-foreground">Set up development environment</p>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto py-3" onClick={() => navigateTo('tests/create')}>
            <div className="text-left">
              <TestTube2 className="w-5 h-5 mb-2 text-primary" />
              <p className="font-medium">Test Suite</p>
              <p className="text-xs text-muted-foreground">Add tests for your contracts</p>
            </div>
          </Button>
        </div>
      </div>
    </Card>

    {/* Blockchain Commands Card */}
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">DevChain CLI Commands</h3>
      
      <Tabs defaultValue="init">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="init">Initialize</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
          <TabsTrigger value="verify">Verify</TabsTrigger>
        </TabsList>
        
        <TabsContent value="init">
          <div className="relative mt-4">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto font-mono">
              <code>
                # Install DevChain CLI globally\n
                npm install -g @devchain/cli\n\n
                # Clone this repository\n
                devchain clone {project}\n\n
                # Initialize new project (alternative)\n
                devchain init {project} --chain {projectDetails?.chain || 'ethereum'}
              </code>
            </pre>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2" 
              onClick={() => copyToClipboard(`npm install -g @devchain/cli && devchain clone ${project}`)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="deploy">
          <div className="relative mt-4">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto font-mono">
              <code>
                # Install dependencies\n
                npm install\n\n
                # Compile contracts\n
                devchain compile\n\n
                # Run tests\n
                devchain test\n\n
                # Deploy to testnet\n
                devchain deploy --network testnet
              </code>
            </pre>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2" 
              onClick={() => copyToClipboard('devchain compile && devchain test && devchain deploy --network testnet')}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="verify">
          <div className="relative mt-4">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto font-mono">
              <code>
                # Verify contract on {projectDetails?.chain || 'Ethereum'}\n
                devchain verify-contract --address {projectDetails?.contractAddress || 'YOUR_CONTRACT_ADDRESS'}\n\n
                # Publish to DevChainHub\n
                devchain publish --version 1.0.0\n\n
                # Create new version\n
                devchain version 1.0.1
              </code>
            </pre>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2" 
              onClick={() => copyToClipboard(`devchain verify-contract --address ${projectDetails?.contractAddress || 'YOUR_CONTRACT_ADDRESS'}`)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>

    {/* Recent Activity */}
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {commits.slice(0, 3).map((commit, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="bg-muted p-2 rounded-full">
              <GitCommit className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium">{commit.message}</p>
              <p className="text-xs text-muted-foreground">
                {commit.author.name} committed {new Date(commit.author.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
)

const FileExplorer = ({
  files,
  currentPath,
  isUploading,
  editingFile,
  fileContent,
  setFileContent,
  commitMessage,
  setCommitMessage,
  expandedDirs,
  handleFileUpload,
  handleCreateReadme,
  navigateUp,
  navigateToPath,
  toggleDirectory,
  viewReadme,
  copyToClipboard,
  startEditing,
  saveFile,
  deleteFile,
  handleCommit
}: {
  files: ProjectFile[]
  currentPath: string
  isUploading: boolean
  editingFile: ProjectFile | null
  fileContent: string
  setFileContent: (content: string) => void
  commitMessage: string
  setCommitMessage: (message: string) => void
  expandedDirs: Record<string, boolean>
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
  handleCreateReadme: () => void
  navigateUp: () => void
  navigateToPath: (path: string) => void
  toggleDirectory: (path: string) => void
  viewReadme: (file: ProjectFile) => void
  copyToClipboard: (text: string) => void
  startEditing: (file: ProjectFile) => void
  saveFile: () => void
  deleteFile: (file: ProjectFile) => void
  handleCommit: () => void
}) => (
  <div className="lg:col-span-2 space-y-6">
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={navigateUp}
            disabled={!currentPath}
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </Button>
          <span className="text-sm font-mono text-muted-foreground">
            {currentPath || '/'}
          </span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              'Uploading...'
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </>
            )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileUpload}
            />
          </Button>
          <Button 
            variant="outline"
            onClick={handleCreateReadme}
          >
            <FileText className="w-4 h-4 mr-2" />
            Create README
          </Button>
        </div>
      </div>
      
      {editingFile ? (
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-sm">{editingFile.name}</span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard(fileContent)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={saveFile}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
            <textarea
              className="w-full h-96 font-mono text-sm p-2 bg-background border rounded"
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
            />
          </div>
        </div>
      ) : files.length > 0 ? (
        <div className="border rounded-lg divide-y">
          {files.map((file, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 hover:bg-muted/50"
            >
              <div 
                className="flex items-center flex-1 cursor-pointer"
                onClick={() => {
                  if (file.type === 'directory') {
                    toggleDirectory(file.path)
                    navigateToPath(file.path)
                  } else if (file.name === 'README.md') {
                    viewReadme(file)
                  }
                }}
              >
                {file.type === 'directory' ? (
                  <>
                    {expandedDirs[file.path] ? (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-2" />
                    )}
                    <Folder className="w-5 h-5 mr-3 text-yellow-500" />
                  </>
                ) : (
                  <File className="w-5 h-5 mr-3 text-blue-500" />
                )}
                <span className="font-medium">{file.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {file.size ? `${Math.ceil(file.size / 1024)} KB` : ''}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(file.content || '')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                {file.name === 'README.md' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => viewReadme(file)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => startEditing(file)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => deleteFile(file)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
          <h4 className="mt-4 font-medium">No files in this directory</h4>
          <p className="text-muted-foreground text-sm mt-2">
            Upload files to get started
          </p>
        </div>
      )}

      {/* Commit changes section */}
      <div className="mt-6 space-y-2">
        <Input 
          placeholder="Commit message"
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleCommit}
            disabled={!commitMessage.trim()}
          >
            <GitCommit className="w-4 h-4 mr-2" />
            Commit changes
          </Button>
        </div>
      </div>
    </Card>
  </div>
)

const CommitHistory = ({ commits, currentBranch }: {
  commits: Commit[]
  currentBranch: string
}) => (
  <div className="lg:col-span-2 space-y-6">
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Commit History</h3>
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4" />
          <span>{currentBranch}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {commits.map((commit, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full">
                <GitCommit className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">{commit.message}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>{commit.author.name}</span>
                  <span>committed {new Date(commit.author.date).toLocaleString()}</span>
                  <Badge variant="outline" className="text-xs font-mono">
                    {commit.sha.slice(0, 7)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
)

const ProjectSidebar = ({
  projectDetails,
  newContributor,
  setNewContributor,
  copyToClipboard,
  handleAddContributor,
  navigateTo
}: {
  projectDetails: ProjectDetails | null
  newContributor: string
  setNewContributor: (value: string) => void
  copyToClipboard: (text: string) => void
  handleAddContributor: () => void
  navigateTo: (path: string) => void
}) => (
  <div className="space-y-6">
    {/* Repository Info Card */}
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="font-medium">Repository</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">HTTPS</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary h-6 px-2"
              onClick={() => copyToClipboard(projectDetails?.repoUrl || '')}
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-2 px-3 rounded-md text-sm overflow-x-auto">
            {projectDetails?.repoUrl}
          </pre>
          
          <Button variant="outline" className="w-full" onClick={() => navigateTo('branches')}>
            <GitBranch className="w-4 h-4 mr-2" />
            {projectDetails?.branches?.length || 1} Branches
          </Button>
          
          {projectDetails?.lastDeployment && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">Last deployed</p>
              <p className="text-sm">
                {new Date(projectDetails.lastDeployment).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>

    {/* Collaborators Card */}
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="font-medium">Collaborators</h3>
        
        <div className="space-y-3">
          <Input 
            placeholder="0x... wallet address" 
            value={newContributor}
            onChange={(e) => setNewContributor(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              Developer
            </Button>
            <Button variant="outline" className="w-full">
              Auditor
            </Button>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleAddContributor}
            disabled={!newContributor}
          >
            Invite Contributor
          </Button>
          
          <div className="pt-3 space-y-2">
            {projectDetails?.contributors?.map((contributor, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-muted p-1 rounded-full">
                    <Wallet className="w-3 h-3" />
                  </div>
                  <span className="text-sm">
                    {contributor.wallet.slice(0, 6)}...{contributor.wallet.slice(-4)}
                  </span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {contributor.role}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>

    {/* Blockchain Tools Card */}
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="font-medium">Blockchain Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-10" onClick={() => navigateTo('explorer')}>
            <Code className="w-4 h-4 mr-2" />
            Explorer
          </Button>
          <Button variant="outline" className="h-10" onClick={() => navigateTo('security/scan')}>
            <Shield className="w-4 h-4 mr-2" />
            Security Scan
          </Button>
          <Button variant="outline" className="h-10" onClick={() => navigateTo('nodes')}>
            <Server className="w-4 h-4 mr-2" />
            Nodes
          </Button>
          <Button variant="outline" className="h-10" onClick={() => navigateTo('fork/mainnet')}>
            <GitFork className="w-4 h-4 mr-2" />
            Fork Mainnet
          </Button>
        </div>
      </div>
    </Card>
  </div>
)

const ReadmeModal = ({
  isReadmeOpen,
  setIsReadmeOpen,
  currentReadme,
  copyToClipboard
}: {
  isReadmeOpen: boolean
  setIsReadmeOpen: (open: boolean) => void
  currentReadme: string
  copyToClipboard: (text: string) => void
}) => (
  <Dialog open={isReadmeOpen} onOpenChange={setIsReadmeOpen}>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
      <DialogHeader>
        <DialogTitle className="flex justify-between items-center">
          README.md
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(currentReadme)}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsReadmeOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[70vh] p-4">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {currentReadme}
          </ReactMarkdown>
        </div>
      </ScrollArea>
    </DialogContent>
  </Dialog>
)