declare global {
    interface ProjectFile {
      name: string
      type: 'file' | 'directory'
      path: string
      content?: string
      size?: number
      publicUrl?: string
      updatedAt?: string
    }
  
    interface FileUploadResponse {
      success: boolean
      files: ProjectFile[]
      error?: string
    }
  
    interface FileSaveResponse {
      success: boolean
      file?: ProjectFile
      error?: string
    }
  }
  
  export {}