'use client'

import { useState, useEffect, useRef } from 'react';
import { FileText, Folder, Upload, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { uploadFiles, getProjectFiles } from '@/lib/api';
import { FileActionDialog } from './FileActionDialog'
interface FileExplorerProps {
  projectId: string;
}

interface FileItem {
  name: string;
  type: 'file' | 'directory';
  path: string;
}

export default function FileExplorer({ projectId }: FileExplorerProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const data = await getProjectFiles(projectId);
        setFiles(data.files);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load files',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [projectId, toast]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    try {
      setLoading(true);
      const uploaded = await uploadFiles(projectId, Array.from(selectedFiles));
      setFiles(uploaded.files);
      toast({
        title: 'Success',
        description: `${selectedFiles.length} file(s) uploaded`
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload files',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await getProjectFiles(projectId);
      setFiles(data.files);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Project Files</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
          </Button>
          <FileActionDialog 
            type="readme" 
            projectId={projectId} 
            onSuccess={handleRefresh}
          />
          <FileActionDialog 
            type="folder" 
            projectId={projectId} 
            onSuccess={handleRefresh}
          />
        </div>
      </div>

      {loading ? (
        <div className="border rounded-lg p-8 text-center">
          <p>Loading files...</p>
        </div>
      ) : files.length > 0 ? (
        <div className="border rounded-lg divide-y">
          {files.map((file, index) => (
            <div key={index} className="flex items-center p-4 hover:bg-muted/50">
              {file.type === 'directory' ? (
                <Folder className="w-5 h-5 mr-3 text-yellow-500" />
              ) : (
                <FileText className="w-5 h-5 mr-3 text-blue-500" />
              )}
              <span className="font-medium">{file.name}</span>
              <span className="text-muted-foreground text-sm ml-2">{file.path}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center">
          <FolderPlus className="w-12 h-12 mx-auto text-muted-foreground" />
          <h4 className="mt-4 font-medium">No files yet</h4>
          <p className="text-muted-foreground text-sm mt-2">
            Upload files or create a README to get started
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
            <FileActionDialog 
              type="readme" 
              projectId={projectId} 
              onSuccess={handleRefresh}
              trigger={
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Create README
                </Button>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}