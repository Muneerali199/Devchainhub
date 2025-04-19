// components/FileUploader.tsx
'use client'

import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useState, useRef, ChangeEvent } from 'react'

interface FileUploaderProps {
  projectId: string
  onUploadSuccess: () => void
}

export function FileUploader({ projectId, onUploadSuccess }: FileUploaderProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    
    try {
      const formData = new FormData()
      Array.from(files).forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch(`/api/projects/${projectId}/files`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to upload files')
      }

      toast({
        title: 'Success',
        description: `${files.length} file(s) uploaded successfully`
      })
      onUploadSuccess()
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload files',
        variant: 'destructive'
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        multiple
        disabled={isUploading}
      />
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isUploading ? 'Uploading...' : 'Upload Files'}
      </Button>
    </div>
  )
}