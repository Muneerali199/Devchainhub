const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const uploadFiles = async (projectId: string, files: File[]) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));

  const response = await fetch(`${API_URL}/projects/${projectId}/files`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });

  if (!response.ok) throw new Error('Failed to upload files');
  return response.json();
};

export const createReadme = async (projectId: string, content: string) => {
  const response = await fetch(`${API_URL}/projects/${projectId}/readme`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content }),
    credentials: 'include'
  });

  if (!response.ok) throw new Error('Failed to create README');
  return response.json();
};

export const getProjectFiles = async (projectId: string) => {
  const response = await fetch(`${API_URL}/projects/${projectId}/files`, {
    credentials: 'include'
  });

  if (!response.ok) throw new Error('Failed to fetch files');
  return response.json();
};