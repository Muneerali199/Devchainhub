'use client'

import { useState, useCallback, ChangeEvent } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, File, Folder, Upload, Save, Trash2, Copy } from 'lucide-react'

interface ProjectFile {
  name: string
  type: 'file' | 'directory'
  path: string
  content?: string
  size?: number
}

export function FileManager({ initialFiles = [] }: { initialFiles: ProjectFile[] }) {
  const [files, setFiles] = useState<ProjectFile[]>(initialFiles)
  const [currentPath, setCurrentPath] = useState('')
  const [editingFile, setEditingFile] = useState<ProjectFile | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const filesToUpload = e.target.files
    if (!filesToUpload || filesToUpload.length === 0) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      Array.from(filesToUpload).forEach(file => {
        formData.append('file', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      setFiles(prev => [...prev, ...result.files])
      toast({
        title: 'Upload successful',
        description: `${filesToUpload.length} file(s) added`,
      })

    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
      if (e.target) e.target.value = ''
    }
  }, [toast])

  const saveFile = useCallback(async () => {
    if (!editingFile) return

    try {
      const response = await fetch('/api/files', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: editingFile.path,
          content: fileContent
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save file')
      }

      setFiles(prev => prev.map(f =>
        f.path === editingFile.path ? { ...f, content: fileContent } : f
      ))
      setEditingFile(null)

      toast({
        title: "File saved",
        description: `${editingFile.name} updated successfully`,
      })

    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      })
    }
  }, [editingFile, fileContent, toast])

  const deleteFile = useCallback(async (file: ProjectFile) => {
    if (!confirm(`Delete ${file.name}? This cannot be undone.`)) return

    try {
      // In a real app, you would call your delete API here
      setFiles(prev => prev.filter(f => f.path !== file.path))

      toast({
        title: "File deleted",
        description: `${file.name} has been removed`,
      })
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      })
    }
  }, [toast])

  const filteredFiles = files.filter(file =>
    file.path.startsWith(currentPath) &&
    file.path.replace(currentPath, '').split('/').filter(Boolean).length <= 1
  )

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <label>
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
            <input
              type="file"
              className="hidden"
              multiple
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </Button>
      </div>

      {editingFile ? (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{editingFile.name}</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button onClick={saveFile} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
          <textarea
            className="w-full h-64 font-mono text-sm p-2 border rounded"
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
          />
        </div>
      ) : (
        <div className="border rounded-lg divide-y">
          {filteredFiles.map((file) => (
            <div key={file.path} className="flex items-center justify-between p-4 hover:bg-muted/50">
              <div className="flex items-center gap-3">
                {file.type === 'directory' ? (
                  <Folder className="w-5 h-5 text-yellow-500" />
                ) : (
                  <File className="w-5 h-5 text-blue-500" />
                )}
                <span>{file.name}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8" // Added consistent sizing
                  onClick={(e) => {
                    e.stopPropagation(); // Added to prevent event bubbling
                    setEditingFile(file);
                    setFileContent(file.content || '');
                  }}
                  aria-label="Edit file" // Added for accessibility
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => deleteFile(file)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}