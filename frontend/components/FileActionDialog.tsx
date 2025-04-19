// components/FileActionDialog.tsx
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { FileText, FolderPlus } from 'lucide-react'

interface FileActionDialogProps {
  type: 'readme' | 'folder'
  projectId: string
  onSuccess: () => void
  trigger?: React.ReactNode
}

export function FileActionDialog({ 
  type, 
  projectId, 
  onSuccess,
  trigger 
}: FileActionDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(type === 'readme' ? 'README.md' : '')
  const [content, setContent] = useState('')
  const { toast } = useToast()

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/files`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          type: type === 'readme' ? 'file' : 'directory',
          content: type === 'readme' ? content : undefined
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create')
      }

      toast({
        title: 'Success',
        description: type === 'readme' 
          ? 'README.md created successfully' 
          : 'Folder created successfully',
      })
      setOpen(false)
      onSuccess()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error creating the file',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            {type === 'readme' ? (
              <FileText className="w-4 h-4 mr-2" />
            ) : (
              <FolderPlus className="w-4 h-4 mr-2" />
            )}
            {type === 'readme' ? 'Create README' : 'New Folder'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'readme' ? 'Create README.md' : 'Create New Folder'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {type === 'folder' && (
            <Input
              placeholder="Folder name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {type === 'readme' && (
            <Textarea
              placeholder={`# Project Title\n\nDescribe your project here...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {type === 'readme' ? 'Create README' : 'Create Folder'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}